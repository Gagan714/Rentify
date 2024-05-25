import React from 'react'
import { HomeOutlined, FacebookOutlined, InstagramOutlined,YoutubeOutlined,PinterestOutlined } from '@ant-design/icons';

const Footer = () => {
  return (
    <footer>
    <div className='footer text-center'><h6 className='typewrite ml-3 mt-3 pt-3'>    <HomeOutlined />
    {" "}Rentify</h6>
    <p className='typewrite ml-3'>Where Renting Meets Simplicity</p>
</div>
</footer>
)
}

export default Footer