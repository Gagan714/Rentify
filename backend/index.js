const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
require('dotenv').config();
const cors = require('cors');
const { decrypt } = require('./cryptoUtils');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const bodyParser = require('body-parser');
const app = express();
app.use(cors());


const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res, next) {
    res.send('hi');
});

app.get('/ads-page', (req, res) => {
  const { page, size } = req.query;
  const offset = (page - 1) * size;
  const limit = parseInt(size, 10);

  const query = 'SELECT * FROM ads LIMIT ? OFFSET ?';
  pool.query(query, [limit, offset], (error, results) => {
    if (error) {
      res.status(500).send('Error fetching apartments');
      return;
    }
    // Fetch total count of items
    pool.query('SELECT COUNT(*) AS count FROM ads', (countError, countResults) => {
      if (countError) {
        res.status(500).send('Error fetching total count');
        return;
      }
      const total = countResults[0].count;
      res.json({ apartments: results, total });
    });
  });
});

app.post('/api/like', (req, res) => {
  const { userId,adId} = req.body;

  const query = 'INSERT INTO liked_property (user_id,ad_id) VALUES (?, ?)';
  
  pool.query(query, [userId,adId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.status(201).json({ message: 'liked successful' });
  });
});

app.post('/api/interest', (req, res) => {
  const { userId,adId} = req.body;

  const query = 'INSERT INTO request (user_id,ad_id) VALUES (?, ?)';
  
  pool.query(query, [userId,adId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.status(201).json({ message: 'liked successful' });
  });
});


app.post('/filter', (req, res) => {
  const { area, type_of_home, type, min, max} = req.body;


  let query = 'SELECT * FROM ads WHERE 1=1';
  const queryParams = [];

  if (area) {
    query += ' AND city = ?';
    queryParams.push(area);
  }

  if (type_of_home) {
    query += ' AND type = ?';
    queryParams.push(type_of_home);
  }

  if (type) {
    query += ' AND type_of_rent = ?';
    queryParams.push(type);
  }

  if (min || max) {
    query += ' AND price BETWEEN ? AND ?';
    queryParams.push(min, max);
  }

  pool.query(query, queryParams, (error, results) => {
    if (error) {
      res.status(500).send('Error fetching filtered data');
      return;
    }
    res.json(results);
  });
});

app.get('/ads', function (req, res, next) {
    let sql = `SELECT * FROM ads `;
    pool.query(sql, function (err, result) {
        if (err) {
            return res.status(500).send("Database query failed");
        }
        res.json(result);
    });
});

app.get('/ads/:user_id/:id', function (req, res, next) {
  const { user_id, id } = req.params;
  const decryptedUserId = decrypt(user_id);
  const decryptedId = decrypt(id);


  let sql = `
  SELECT ads.*, users.*
  FROM ads
  JOIN users ON ads.user_id = users.id
  WHERE ads.id = ? AND users.id = ?;
`;

pool.query(sql, [decryptedId,decryptedUserId], (err, results) => {
  if (err) {
    res.status(500).send('Error fetching ad and user data');
    return;
  }

  res.json(results); // Send the first result
});
});

app.get('/ads/:id', function (req, res, next) {
  const decryptedId = decrypt(req.params.id);
  let sql = `SELECT * FROM ads WHERE user_id = '${decryptedId}'`;
  pool.query(sql, function (err, result) {
      if (err) {
          return res.status(500).send("Database query failed");
      }
      res.json(result);
  });
});

app.get('/ad/:id', function (req, res, next) {
  const decryptedId = req.params.id;
  let sql = `SELECT * FROM ads WHERE user_id = '${decryptedId}'`;
  pool.query(sql, function (err, result) {
      if (err) {
          return res.status(500).send("Database query failed");
      }
      res.json(result);
  });
});
app.get('/interest/:id', function (req, res, next) {

  let sql = `SELECT a.*
  FROM request i
  JOIN ads a ON i.ad_id = a.id
  WHERE i.user_id = ?;
  `;
  pool.query(sql, [req.params.id], function (err, result) {
      if (err) {
          return res.send("Database query failed",err);
      }
      res.json(result);
  });
});
app.get('/request/:id', function (req, res, next) {

  let sql = `SELECT i.user_id AS u_id, a.*, u.* FROM request i JOIN ads a ON i.ad_id = a.id JOIN users u ON i.user_id = u.id WHERE a.user_id = ?;
  
  ;
  `;
  pool.query(sql, [req.params.id], function (err, result) {
      if (err) {
          return res.send("Database query failed",err);
      }
      res.json(result);
  });
});


  app.put('/update/:id', function (req, res) {
    const { user_id, title, description, type, price, type_of_rent, bed_count, room_count, street, area, city, state, amenities } = req.body;
    const adId = req.params.id;
    const sql = ` UPDATE ads 
    SET title = ?, description = ?, street = ?, city = ?, state = ?, price = ?, type = ?, type_of_rent = ?, area = ?,bed_count = ?, room_count= ?,amenities= ?
    WHERE id = ? `;
  
    const values = [ title, description,street, city, state,  price, type, type_of_rent,area,bed_count, room_count, amenities,adId];

    pool.query(sql, values, function (err, result) {
      if (err) {
        res.status(500).send('Error inserting data into database');
        return;
      }
      res.send("You got it Madhu!!!");
    });
  });
  
  app.delete('/delete/:id', (req, res) => {
    const adId = req.params.id;
    const query = 'DELETE FROM ads WHERE id = ?';
    pool.query(query, [adId], function (err, result) {
        if (err) {
            res.status(500).json({ message: 'Error deleting ad', err });
            return;
          }
          res.status(200).json({ message: 'Ad deleted successfully', result });
        });
      });
      app.delete('/api/like/:id', (req, res) => {
        const adId = req.params.id;
        const query = 'DELETE FROM liked_property WHERE ad_id = ?';
        pool.query(query, [adId], function (err, result) {
            if (err) {
                res.status(500).json({ message: 'Error deleting ad', err });
                return;
              }
              res.status(200).json({ message: 'Ad deleted successfully', result });
            });
          });
          app.delete('/api/interest/:id', (req, res) => {
            const adId = req.params.id;
            const query = 'DELETE FROM liked_property WHERE ad_id = ?';
            pool.query(query, [adId], function (err, result) {
                if (err) {
                    res.status(500).json({ message: 'Error deleting ad', err });
                    return;
                  }
                  res.status(200).json({ message: 'Ad deleted successfully', result });
                });
              });
   

  
          app.post('/add-post', upload.single('image'), (req, res) => {
            const { user_id, title, description, type, price, home_type, bed_count, room_count, street, area, city, state, amenities } = req.body;
            const image = req.file ? req.file.buffer : null;
          
            if (!image) {
              return res.status(400).send('Image is required');
            }
          
            const sqlInsertAd = `INSERT INTO ads (user_id, title, description, type_of_rent, price, type, bed_count, room_count, street, area, city, state, amenities, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
          
            const values = [user_id, title, description, type, price, home_type, bed_count, room_count, street, area, city, state, amenities, image];
          
            pool.query(sqlInsertAd, values, (err, adResult) => {
              if (err) {
                return res.status(500).send('Error inserting ad into database');
              }
          
              res.send("You got it Madhu!!!");
            });
          });

  app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  
    pool.query(query, [email, password], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Database query error' });
      }
      if (results.length > 0) {
        
        res.status(200).json({ message: 'Sign-in successful', user: results[0] });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    });
  });

  app.post('/signup', (req, res) => {
    const { firstName, lastName, email, password, phoneNumber,type } = req.body;
  
    const query = 'INSERT INTO users (first_name, last_name, email, password, phone_no,role) VALUES (?, ?, ?, ?, ?,?)';
    
    pool.query(query, [firstName, lastName, email, password, phoneNumber, type], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Database query error' });
      }
      res.status(201).json({ message: 'Sign-up successful', userId: results.insertId,role:type });
    });
});


app.post('/upload', upload.single('image'), (req, res) => {
    const image = req.file.buffer;
    const sql = 'INSERT INTO images (data) VALUES (?)';
    pool.query(sql, [image], (err, result) => {
        if (err) throw err;
        res.send('Image uploaded!');
    });
});

app.get('/image/:id', (req, res) => {
    const sql = 'SELECT data FROM images WHERE id = ?';
    pool.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.set('Content-Type', 'image/jpeg');
            res.send(result[0].data);
        } else {
            res.status(404).send('Image not found');
        }
    });
});

const PORT = process.env.PORT || 3307;
app.listen(3307, () => {
    console.log(`Server running on port ${PORT}`);
});

