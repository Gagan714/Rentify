import React, { useContext, useEffect, useState } from 'react';
import { encrypt } from '../cryptoUtils';
import { LikeOutlined, LikeFilled } from '@ant-design/icons';
import { Button, Card } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import noImg from '../images/no_img.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Meta } = Card;

const CardDetails = ({ data }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const userId = user?.user?.id;

  const handleNavigation = () => {
    navigate(`/ad/${encodeURIComponent(encrypt(data.user_id))}/${encodeURIComponent(encrypt(data.id))}`);
  };

  const [liked, setLiked] = useState(false);
  const [interested, setInterested] = useState(false);

  useEffect(() => {
    axios.get(`/api/like-status`, { params: { userId, adId: data.id } })
      .then(response => {
        setLiked(response.data.liked);
      })
      .catch(error => {
        console.error('Error fetching like status:', error);
      });
  }, [data.id, userId]);

  const handleLike = () => {
    const newLikedStatus = !liked;
    setLiked(newLikedStatus);
    if (newLikedStatus) {
      axios.post('https://full-stack-virid.vercel.app/api/like', { userId, adId: data.id, liked: newLikedStatus })
        .catch(error => {
          console.error('Error liking ad:', error);
          setLiked(liked); // revert state in case of error
        });
    } else {
      axios.delete(`https://full-stack-virid.vercel.app/api/like/${data.id}`, { data: { userId, adId: data.id } })
        .catch(error => {
          console.error('Error unliking ad:', error);
          setLiked(liked); // revert state in case of error
        });
    }
  };

  const handleInterest = () => {
    const newInterestedStatus = !interested;
    setInterested(newInterestedStatus);
    if (newInterestedStatus) {
      axios.post('https://full-stack-virid.vercel.app/api/interest', { userId, adId: data.id })
        .then(() => {
          toast.success("Request sent");
        })
        .catch(error => {
          console.error('Error sending request:', error);
          toast.error("Error sending request");
          setInterested(interested); // revert state in case of error
        });
    } else {
      axios.delete(`https://full-stack-virid.vercel.app/api/interest/${data.id}`, { data: { userId, adId: data.id } })
        .catch(error => {
          console.error('Error removing request:', error);
          setInterested(interested); // revert state in case of error
        });
    }
  };

  return (
    <Card
      style={{ width: 360 }}
      cover={
        <img
          alt="example"
          src={data.imageSrc ? data.imageSrc : noImg}
          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
        />
      }
      actions={[
        liked ? <LikeFilled key="like" onClick={handleLike} style={{ color: 'orange' }} /> : <LikeOutlined key="like" onClick={handleLike} />,
        <Button
          disabled={!userId}
          style={{ border: "none", backgroundColor: "#d65e19", color: "#fff" }}
          key="interested"
          onClick={handleInterest}
        >
          {interested ? 'Remove Request' : 'Send Request'}
        </Button>,
        <Button
          style={{ border: "none" }}
          disabled={!userId}
          key="navigate"
          onClick={handleNavigation}
        >
          Interested
        </Button>
      ]}
    >
      <Meta
        title={`${data.title} for ${data.type_of_rent}`}
        description={data.description}
      />
      <div className='row mt-3'>
        <p className='col-md-6'>Price: ₹ {data.price}</p>
        <p className='col-md-6'>Type: {data.type}</p>
        <p className='col-md-6'>Area: {data.area}</p>
        <p className='col-md-6'>Rooms: {data.room_count}</p>
      </div>
    </Card>
  );
};

export default CardDetails;
