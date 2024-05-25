import React from 'react'
import { Carousel } from 'antd';
import CardDetails from './CardDetails';
const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const ScrollData = () => {
  return (
    <Carousel autoplay>
    <div  class="container text-center">
    <div class="row">
    <div class="col">
      <CardDetails />
   </div>
   <div class="col">
      <CardDetails />
      </div>
      <div class="col">
      <CardDetails />
      </div>
    </div>
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>
);
  
}

export default ScrollData