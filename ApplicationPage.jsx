import React from 'react'
import NavBar from '../components/NavBar'
import Header  from '../components/Form/Header'
import FormApplication from '../components/Form/FormApplication'
import house1 from '../assets/house1.jpg'

export default function ApplicationPage() {
  return (
    <div className=" fixed h-screen w-screen max-h-screen max-w-screen flex flex-col" 
    style={{ 
        backgroundImage: `url(${house1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
        }}> 
        <NavBar />
       
        <FormApplication/>
    </div>
  )
}
