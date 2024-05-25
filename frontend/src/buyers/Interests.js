import React, { useContext, useEffect, useState } from 'react'
import NavbarBuyer from './NavBarBuyer'
import Footer from '../Footer'
import { Spin } from 'antd'
import axios from 'axios'
import CardAds from '../home/CardAds'
import { UserContext } from '../UserContext'

const Interests = () => {
  const { user} = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async() => {
    try {
      const response = await axios.get(`https://full-stack-virid.vercel.app/interest/${user?.user?.id}`);
      const adsWithImages = response.data.map(ad => {
        if (ad.image) {
          const base64Image = btoa(
            new Uint8Array(ad.image.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
          return {
            ...ad,
            imageSrc: `data:image/jpeg;base64,${base64Image}`
          };
        }
        return ad;
      });
      setLoading(false)
      setAds(adsWithImages);
    }catch (error) {
      }
    };

  return (

    <div><NavbarBuyer /><div className='header2-img content-post '>
    <h2>Your Requests </h2>
    </div> 
    {loading ? (<div className='center-align-mt0 mb-5'>
  <Spin  size="large" ><p className='mt-5'>Please wait..</p></Spin>
  </div>):(
    <div className='ad-area row mb-5'>
    <div><h1 className='m-3'></h1></div>

    {ads.map((note) => (
        <div className='col-md-3 mb-5'>
    <CardAds key={note.id} data={note} />
    </div>
  ))}
</div>
)}
   <Footer />
  
    </div>
  )
}

export default Interests