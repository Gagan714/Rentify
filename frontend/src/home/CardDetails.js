import React, { useContext, useEffect, useState } from 'react'
import { LikeOutlined,LikeFilled,EyeOutlined } from '@ant-design/icons';
import { Avatar, Button, Card } from 'antd';
import axios from 'axios';
import { UserContext } from '../UserContext';
import noImg from '../images/no_img.png'
import { useNavigate } from 'react-router-dom';
import { encrypt } from '../cryptoUtils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { Meta } = Card;

const CardDetails = ({data }) => {
  const navigate = useNavigate();
  const { user} = useContext(UserContext);
let userId = user?.user?.id;


const handleNavigation = () => {
  navigate(`/ad/${encodeURIComponent(encrypt(data.user_id))}/${encodeURIComponent( encrypt(data.id) ) }`);
};

  const [liked, setLiked] = useState(false);
  const [interested, setInterested] = useState(false);
  useEffect(() => {
    axios.get(`/api/like-status`, { params: { userId, adId: data.id } })
      .then(response => {
        setLiked(response?.data?.liked);
      })
      .catch(error => {
      });
  }, [data.id, userId]);

  const handleLike = () => {
    setLiked(!liked);
    if(liked===true) {
    axios.post('https://full-stack-virid.vercel.app/api/like', { userId, adId: data?.id, liked: !liked })
      .then(response => {
      })
      .catch(error => {
      });}
    if(liked===false){
      axios.delete(`https://full-stack-virid.vercel.app/api/like/${data?.id}`, { userId, adId: data?.id, liked: !liked })
      .then(response => {
      })
      .catch(error => {
      });
    }
  };

  const handleInterest = () => {
    setInterested(!interested);
    if(interested ===true) {
    axios.post('https://full-stack-virid.vercel.app/api/interest', { userId, adId: data?.id, liked: !liked })
      .then(response => {
        toast.success("Request sent")
      })
      .catch(error => {
        toast.error("Error sending request")
      });}
    if(interested===false){
      axios.delete(`https://full-stack-virid.vercel.app/api/interest/${data?.id}`, { userId, adId: data?.id, liked: !liked })
      .then(response => {
      })
      .catch(error => {
      });
    }
  };

  return (
    <Card
    
    style={{
      width: 360,
    }}
    cover={
      <img
       alt="example"
       src={data.imageSrc ? data.imageSrc:noImg}
       style={{ width: '100%', height: '200px', objectFit: 'cover' }}
     />
    }
    actions={[
      liked ? <LikeFilled key="like" onClick={handleLike} style={{ color: 'orange' }} /> : <LikeOutlined key="like" onClick={handleLike} />,
      <Button disabled={!userId} style={{border:"none",backgroundColor:"#d65e19",color:"#fff"}} key="interested" onClick={handleInterest } >Send Request</Button>,
        <Button style={{border:"none"}} disabled={!userId} key="interested" onClick={handleNavigation } >Interested</Button>
    ]}
   
  >
    <Meta
     title={data.title+" for "+data.type_of_rent}
      description={data?.description}
    />
    <div className='row mt-3'>
   <p className='col-md-6 '>Price: ₹ {data.price}</p>
   <p className='col-md-6'>Type: {data.type}</p>
   <p className='col-md-6'>Area: {data.area}</p>
   <p className='col-md-6'>Rooms: {data.room_count}</p>

   </div>
  </Card>
  )
}

export default CardDetails