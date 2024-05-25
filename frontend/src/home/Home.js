import React, { useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Home.css';
import HomeBuyer from '../buyers/Home';
import HomeSeller from '../sellers/Home';
import { UserContext } from '../UserContext';
import { Outlet } from 'react-router-dom';
import NavbarHome from '../buyers/NavBarHome'

const Home = () => {
  const { user} = useContext(UserContext);
  console.log(user)
 
  if (!user) {
    return <div><HomeBuyer /></div>;
  }

  return (
    <>
          {user?.user?.role === 1 ? <HomeBuyer /> : user?.user?.role === 2 ? <HomeSeller /> : <div><NavbarHome />
          <h4 className='center-align'>Invalid user role: Register Again</h4></div>}
          <main>
        <Outlet />
      </main>
    </>
  );
}

export default Home;
