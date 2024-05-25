import NavbarHome from './NavBarHome';
import React, { useContext } from 'react'
import Filter from './Filter'
import NavbarBuyer from './NavBarBuyer'
import Footer from '../Footer'

import { UserContext } from '../UserContext'

const Search = () => {
  const { user} = useContext(UserContext);

  return (
    <div>
   {user?.user.role===1 ?
   <NavbarBuyer /> : <NavbarHome />
    }
    <div className='/header '>
    
    <Filter />
    </div>
     <Footer />
    </div>
  )
}

export default Search