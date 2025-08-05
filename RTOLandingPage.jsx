import React from 'react';
import NavBar from '../components/NavBar.jsx'; 
import { TenantMenuBar } from '../components/tenantDashboard/TenantMenuBar.jsx';
import house1 from '../assets/house1.jpg'
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function RTOLandingPage() {
    const navigate = useNavigate();

const openForm = () => {
    navigate('/gcb-rto-application')
}

  return (
    <div className=" fixed h-screen w-screen max-h-screen max-w-screen flex flex-col" 
    style={{ 
        backgroundImage: `url(${house1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
        }}>        
        <NavBar />    
        <div className='bg-white shadow-md w-1/3   text-black font-sans text-lg rounded-lg m-auto h-auto min-h-1/3 mt-15 p-20 opacity-90'>
           <h1 className='font-bold items-center'> Welcome to GCB REIT Rent To Own</h1>
           <p>
        Early retirement sounds great with a home to retire to, fewer bills to pay, and guaranteed ownership security for you and your family. Otherwise, you can never fully retire in peace. GCB RENT TO OWN Scheme is centered on helping you acquire property over the years at your own pace with your salary in mind. Curated for you, it helps you solve your challenges in acquiring a home. GCB has a team of trusted developers building property suitable for your stay and liking.
      </p>
      <div className='flex flex-col justify-center mt-4  items-center gap-4'>
        <button 
          style={{
            backgroundColor: '#FFD75E',
            borderRadius: '0.375rem',
            padding: '0.5rem 1.5rem',
            color: 'white',
            fontSize: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            
          }}

          className='focus:ring-1 ring-form-header-light'
          onClick={()=>{openForm()}}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#FFC52A';
            e.currentTarget.style.boxShadow = '0px 8px 12px rgba(0, 0, 0, 0.2)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#FFD75E';
            e.currentTarget.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
          }}
        >
          Start <FaArrowRight />
        </button>
        </div>
        </div>
    </div>
  )
}

export default RTOLandingPage