import React from 'react';
import { Link } from 'react-router-dom';


const NavbarSeller = () => {
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };
  
  return (
    <div className="bg-black sticky-top text-white flex justify-around items-center h-16">
      <div><Link to="/" className="font-bold text-4xl no-underline text-white">Rentify
      </Link></div>
        <div className="flex justify-center gap-4 items-center text-white">
          <div><Link to="/home" className="no-underline text-2xl text-white">
            Home
          </Link></div>
          <div><Link to="/requests" className="no-underline text-2xl text-white">
            Requests
          </Link></div>
          <div><Link to="/ads" className="no-underline text-white">
          <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-3xl text-sm px-3 py-2 text-center ">Your Ads</button>
          </Link></div>
          <Link to="/" onClick={handleLogout} className="no-underline text-white">
          <button type="button" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-3xl text-sm px-3 py-2 text-center">Logout</button>
          </Link>
        </div>
      </div>
  );
}

export default NavbarSeller;
