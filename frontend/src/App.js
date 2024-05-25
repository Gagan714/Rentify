import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate} from 'react-router-dom';

import { UserProvider } from './UserContext';
import Home from './home/Home';
import Register from './Register';
import MyAds from './sellers/MyAds';
import Ads from './sellers/Ads';
import ViewAd from './buyers/ViewAd';
import Search from './buyers/Search';
import Interests from './buyers/Interests';
import Requests from './sellers/Requests';


function App() {

 
    return (
        <UserProvider>
        <Router>
        
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path='/ads' element={<MyAds />} />
            <Route path='/post-ad' element={<Ads />} />
            <Route path='/search' element={<Search />} />
            <Route path='/request' element={<Interests />} />
            <Route path='/requests' element={<Requests />} />
            <Route path='/ad/:user_id/:id' element={<ViewAd />} />
          </Routes>
        </Router>
      </UserProvider>
    );
}

export default App;
