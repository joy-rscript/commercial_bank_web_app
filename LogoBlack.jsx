import React from 'react'
import bank_logo from '../assets/bank_logo.png'
import gcb_form_logo from '../assets/gcb_form_logo.png'

export default function Logo({size}) {
  return (
    <div className='flex flex-shrink-0 items-center'>
        <img
        className={`h-18 ${size}  w-auto`}
        src={gcb_form_logo}
        alt='Company Logo'
        />
    </div>
  );
}
