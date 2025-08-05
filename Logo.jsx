import React from 'react'
import bank_logo from '../assets/bank_logo.png'

export default function Logo({size}) {
  return (
    <div className='flex flex-shrink-0 items-center'>
        <img
        className={`h-14 ${size}  w-auto`}
        src={bank_logo}
        alt='Company Logo'
        />
    </div>
  );
}
