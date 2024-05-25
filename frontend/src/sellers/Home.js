import React from 'react'
import NavbarSeller from './NavBarSeller'
import { HomeOutlined,SearchOutlined,UsergroupAddOutlined } from '@ant-design/icons';

import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';

const HomeSeller = ({user_id}) => {
    const navigate = useNavigate();
    console.log(user_id)
  return (
    <>
        <NavbarSeller user_id={user_id}/>
    <div className='count '>
    <div class="container mt-3 mb-5 ">
    <div class="row">
    <div class="col mt-3 box-1">
    <div className='text-center'>
    <HomeOutlined className='mb-2' style={{fontSize:"30px"}}/>
    </div>
    <h5>Discover your perfect tenant today!</h5>
    <p>Begin your search for the perfect tenant today! With our extensive listings and user-friendly search tools, rent your home has never been easier. Start exploring now and let us help you find your ideal buyer.</p>
    </div>
    <div class="col  mt-3 box-4">
    <div className='text-center'>
    <SearchOutlined className='mb-2 text-center' style={{fontSize:"30px"}}/>
    </div>
    <h5>Find tenants on your need!</h5>
    <p>Embark on your journey to finding the ideal tenant that fits your every need. Whether you're having a cozy apartment in the heart of the city or a serene villa nestled in the countryside, we have a diverse range of buyers waiting to be discover. </p>
    </div>
    <div class="col mt-3 box-3">
    <div className='text-center'>
    <UsergroupAddOutlined className='mb-2' style={{fontSize:"30px"}}/>
    </div>
    <h5> Connect with the rental owners!</h5>
    <p>Unlock your ideal rental property by connecting directly with our trusted landlords! Don't delay – start browsing our listings and connecting with landlords today to find the ideal rental property that suits your lifestyle.</p>
    </div>
  </div>
</div>
</div>
    <Footer />
    </>
  )
}

export default HomeSeller