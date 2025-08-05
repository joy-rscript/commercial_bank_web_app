import React from 'react';


export default function Header({ heading, paragraph, textSize }) {
  return (
    <div className=''>
      <h2 className='m-5 text-center font-sans text-2xl md:text-3xl font-extrabold text-white'>
        {heading}
      </h2>
      <div className='shadow-sm shadow-blue-gray-700 bg-form-header-light w-full sm:w-3/4 md:w-3/4 lg:w-1/2 p-5 pr-10 pl-10 m-auto rounded-tl-md rounded-tr-md'>
        <p 
          className='mt-8  font-sans font-bold text-black'
          style={{ fontSize: textSize }}
        >
          {paragraph}
        </p>
      </div>
    </div>
  );
}


