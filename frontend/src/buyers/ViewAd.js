import React, { useEffect, useState } from 'react'
import NavbarBuyer from './NavBarBuyer'
import axios from 'axios';
import {MailOutlined, PhoneOutlined } from '@ant-design/icons';

import noImg from '../images/no_img.png'

import { useParams } from 'react-router-dom';
import CardAds from '../home/CardAds';
import { Button,Spin } from 'antd';
import Footer from '../Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CardDetails from '../home/CardDetails';

const ViewAd = () => {
    const [ads, setAds] = useState({});
    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(true);
    const [similarData, setSimilarData] = useState([]);
    const adId = useParams();
    
    console.log(adId)

  useEffect(() => {
    fetchData();
    fetchSimilarData();
  }, []);

  const fetchSimilarData = async() => {
    try {
      const response = await axios.get(`https://rentify-rsmv.vercel.app/ads/${encodeURIComponent(adId.user_id)}`);
      const simData = response.data.map(ad => {
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
      setSimilarData(simData);
      setLoading1(false)

    }catch (error) {
        setLoading1(false)
        console.error('Error fetching ads:', error);
      }
    };

     const handleInterest = () => {
    
    axios.post('https://rentify-rsmv.vercel.app/api/interest', { userId:adId.user_id, adId: adId.id })
      .then(response => {
       
        toast.success("Request sent")
        console.log('status updated:', response.data);
      })
      .catch(error => {
       

        toast.error("Error sending request")
        console.error('Error updating like status:', error);
      });
   
  };
  

    const fetchData = async() => {
        try {
          console.log(`https://rentify-rsmv.vercel.app/ads/${adId.user_id}/${adId.id}`)
          const response = await axios.get(`https://rentify-rsmv.vercel.app/ads/${encodeURIComponent(adId.user_id)}/${encodeURIComponent(adId.id)}`);
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
setLoading(false);
          setAds(adsWithImages);
        }catch (error) {
            setLoading(false);
            console.error('Error fetching ads:', error);
          }
        };
  return (
    <div>
        <NavbarBuyer />
        <h2 className='ml-3'>Property Details </h2>
        {loading ? (
        <div className='center-align-mt0 mb-5'>
  <Spin className='mb-5' size="large"><p className='mt-6'>Please wait..</p></Spin>
  </div>
) : (
        <div className='row center-align ad-area'>

        <div className='col-md-6'>
        <div className=''>
            <img
       alt="example"
       src={ads[0]?.imageSrc ? ads[0]?.imageSrc : noImg}
       style={{ borderRadius:'10px',width: '100%', height: '300px', objectFit: 'cover' }}
     />
     </div>
       
        </div>
        <div className='col-md-6'>
        <div className='row mb-3'>
        <div className='col-md-6'>
        <h3>{ads[0]?.title}</h3> <p>Description: {ads[0]?.description}</p>

        <p>Type of rent: {ads[0]?.type_of_rent}</p>Address: {ads[0]?.street}
        <p>{ads[0]?.city},{ads[0]?.state}</p>
        <p>Bedrooms: {ads[0]?.bed_count}       </p><p>Total Rooms: {ads[0]?.room_count}</p> 
        <p>Amenities: {ads[0]?.amenities}</p>
        </div>
        <div className='col-md-6'>
            <h3>Owner Details</h3>
            <div ><p>Name: {ads[0]?.first_name}  {ads[0]?.last_name}</p></div>
            <div><MailOutlined /> {ads[0]?.email}  <p></p><PhoneOutlined />{" "}{ads[0]?.phone_no}</div>
            <Button className='btn btn-primary mt-3' onClick={handleInterest}>Show Interest</Button>
        </div> 
    
        </div>
        </div>
        </div>
    )}
        <div className='row mb-5 '>
    <div><h3 className='ml-3 mb-3'>Similar Ads of the Owner</h3></div>
    
    {similarData.map((d) => (
        <div className='col-md-3 ml-6 mb-5'>
    <CardDetails key={d.id} data={d} />
    </div>
))}
        </div>
        <Footer />
    </div>
  )
}

export default ViewAd