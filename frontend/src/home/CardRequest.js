import React, { useState } from 'react'
import { PhoneOutlined, IdcardOutlined,MailOutlined,EyeOutlined } from '@ant-design/icons';
import {Button, Card, Modal, Form, Input, Radio, Select  } from 'antd';
import axios from 'axios';
import noImg from '../images/no_img.png'

const { Meta } = Card;

const CardAds = ({ data }) => {
 
  return (
   <>    <Card
   style={{
     width: 350,
     height: 360,

   }}
   
   cover={
    
     <img
       alt="example"
       src={data.imageSrc ? data.imageSrc:noImg}
       style={{ width: '100%', height: '200px', objectFit: 'cover' }}
     />
   }
  //  actions={[
  //     <EyeOutlined />,
     
  //   ]}
   
  
 >
 
   <Meta

     title={data.title+" / "+data.type_of_rent}
   /> 

   <div className='row mt-3'>
   <h5 className='col-md-12 color'>Buyer Details</h5>
   <h6 className='col-md-6 '><IdcardOutlined />{"  "}{data.first_name}</h6>
   <h6 className='col-md-6 '><PhoneOutlined />{"  "}{data.phone_no}</h6>
   <h6 className='col-md-12 '><MailOutlined />{"  "}{data.email}</h6>
  
   </div>
 </Card>
</>
      
      
      )
    }
    
  


export default CardAds