import React from 'react';

const Title = ({ text1, text2 }) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3 justify-center'>
      <p className='text-gray-500 text-3xl font-semibold'>
        {text1} <span className='text-gray-700'>{text2}</span>
      </p>
      <div className='w-8 sm:w-12 h-[2px] bg-gray-700 ml-2'></div>
    </div>
  );
};

export default Title;
