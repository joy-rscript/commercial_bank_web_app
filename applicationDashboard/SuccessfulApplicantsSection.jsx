import React from 'react'
import DashboardSection from '../DashboardSection'
import ListCard from '../ListCard'
import { Typography } from '@material-tailwind/react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import OnboardingAPI from '../../services/OnboardingAPI'
import { useNavigate } from 'react-router-dom'

export default function SuccessfulApplicantsSection({selectedApplicant, setSelectedApplicant}) {
    const [approvedApplicants, setApprovedApplicants] = useState([]);
    const token = localStorage.getItem('token');
    const formAPI = new OnboardingAPI(token);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            console.log("runing now!!!")
         try {
            const responseData = await formAPI.getOnboardingApps();
            console.log("responseData");
            if (Array.isArray(responseData)) {
              setApprovedApplicants(responseData);
            } else {
              setApprovedApplicants([responseData]);
            }
            } catch (error) {
                console.error('Error fetching pending approvedApplicants:', error);
            }
        };
        if(approvedApplicants.length == 0)
        {fetchData();}
    },[]);

    const handleSelectedApplicant = async () => {
        console.log("!!!!!!!!!!!", selectedApplicant);
        
        if (selectedApplicant) {
            navigate(`/admin/app-submissions/${selectedApplicant.id}`);
        }
    }

    const ApplicantNameCards = approvedApplicants
    .filter(applicant => applicant.approved === true)
    .map((applicant, index) => {        
        return (
                <ListCard key={index} item={
                                <div className={` flex flex-row space-x-2 cursor-pointer ${selectedApplicant && applicant === selectedApplicant ? 'bg-gray-100' : ''}`} 
                                      onClick={() => {
                                        setSelectedApplicant(applicant);
                                        handleSelectedApplicant();
                                    }}
                                >                                    
                                <Typography color="gray" variant="h7">
                                        {index + 1}{"."}
                                    </Typography>
                                    <Typography color="gray" variant="h7">
                                        {}  {applicant.first_name} {applicant.surname}
                                    </Typography>
                                </div>
                            } />

           
        )
    })
    
    return (
        <div>
            <div>
                <h2 className='text-lg font-thin text-gray-700 border-b-2 border-gray-100 py-1'>Successful Applicants</h2>
            </div>
            {ApplicantNameCards}
        </div>
    )
}


