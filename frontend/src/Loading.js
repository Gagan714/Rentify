import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

function Loading() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <ClipLoader color="#94061B" size={80}/>
    </div>
  );
};

export default Loading;