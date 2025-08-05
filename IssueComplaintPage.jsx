import React, { useState,useEffect } from 'react'
import NavBar from '../components/NavBar'
import { TenantMenuBar } from '../components/tenantDashboard/TenantMenuBar'
import NewIssueForm from '../components/issues/NewIssueForm'
import IssuesHistory from '../components/issues/IssuesHistory'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function IssueComplaintPage() {

    const [property, setProperty] = useState([])
    const {id} = useParams();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/rto/get_property/${id}/`);
                console.log(response.data);
                setProperty(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    };
    
    fetchData();
    }, [id]);

    return (
    <div className="bg-gray-100 fixed max-h-screen h-screen w-screen flex flex-col  min-h-full">
      <NavBar />
      <TenantMenuBar />
      <div className='grid grid-cols-5 min-h-full mt-4'>
        <div className='col-span-1 mt-4 h-full'>
            <IssuesHistory/> 
        </div>
        <div className=' m-4 col-span-4 bg-none rounded-lg h-full'>
            <NewIssueForm property={property}/>
        </div>
       
       
      </div>
        

    </div>
  )
}

export default IssueComplaintPage