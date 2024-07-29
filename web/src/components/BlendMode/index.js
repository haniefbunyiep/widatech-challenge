import React from 'react';

const MixBlendExample = () => {
  return (
    <div className='relative w-full h-screen flex items-center justify-center bg-gray-800'>
      <div className='absolute w-1/2 h-1/2 bg-yellow-500 mix-blend-difference'></div>
      <div className='absolute w-1/2 h-1/2 bg-blue-500'></div>
      <div className='absolute text-white text-2xl'>Mix Blend Difference</div>
    </div>
  );
};

export default MixBlendExample;
