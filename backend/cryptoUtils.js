const CryptoJS = require('crypto-js');

const secretKey = 'thisismysecretkey';

function decrypt(ciphertext) {

  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
  

    if (!originalText) {
      throw new Error('Decryption failed');
    }
    return originalText;
  } catch (error) {
  }
}

module.exports = { decrypt };
