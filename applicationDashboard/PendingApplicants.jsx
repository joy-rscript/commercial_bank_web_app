import React from 'react'
import DetailedListCard from '../DetailedListCard'
import DashboardSection from '../DashboardSection'
import axios from 'axios';
import { useState, useEffect } from'react';

function PendingApplicants() {
    const tableHeadings = ['Account', 'contact','employment', 'chosen location', 'application type', 'date',  'status' ]
    
    // fetch the data from pending applicants
    const [applicants, setPendingApplicants] = useState([]);
    // const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        const fetchData = async () => {
         try {
                const response = await axios.get('http://localhost:8000/rto/get_applications/', {});
                setPendingApplicants(response.data.filter(applicant => applicant.approved === false));

            } catch (error) {
                console.error('Error fetching pending applicants:', error);
            }
           
        };

        fetchData();
    });

    
    console.log(applicants)
    const pendingApplicants = [
                {
                    first_name: 'Akua Naa Norley Maame-afria',
                    last_name: 'Mensimah',
                    id_number: '123456789',
                    mobile_1: '1234567890',
                    email: 'john.doe@example.com',id:'2',
                    current_net_income: 50000,
                    current_employer_name: 'ABC Company',
                    employment_title: 'Software Engineer',
                    preferred_location1: 'New York',
                    appType: 'single',
                    approved: 'No',
                    date_received: '2023-05-01',
                    
                },
                {
                    first_name: 'Jane',
                    last_name: 'Smith',
                    id_number: '987654321',
                    mobile_1: '0987654321',
                    email: 'jane.smith@example.com',id:'3',
                    current_net_income: 75000,
                    current_employer_name: 'XYZ Corporation',
                    employment_title: 'Marketing Manager',
                    preferred_location1: 'Los Angeles',
                    appType: 'Purchase',
                    approved: 'No',
                    date_received: '2023-04-15',
                    
                },
                {
                    first_name: 'Michael',
                    last_name: 'Johnson',
                    id_number: '456789012',
                    mobile_1: '6789012345',
                    email: 'michael.johnson@example.com',id:'1',
                    current_net_income: 60000,
                    current_employer_name: 'Acme Inc.',
                    employment_title: 'Financial Analyst',
                    preferred_location1: 'Chicago',
                    appType: 'single',
                    approved: 'No',
                    date_received: '2023-04-25',
                    
                },
                {
                    first_name: 'Emily',
                    last_name: 'Davis',
                    id_number: '789012345',
                    mobile_1: '2345678901',
                    email: 'emily.davis@example.com',id:'8',
                    current_net_income: 80000,
                    current_employer_name: 'Globex Corp',
                    employment_title: 'Project Manager',
                    preferred_location1: 'San Francisco',
                    appType: 'single',
                    approved: 'No',
                    date_received: '2023-05-10',
                    
                },
                {
                    first_name: 'David',
                    last_name: 'Wilson',
                    id_number: '345678901',
                    mobile_1: '9012345678',
                    email: 'david.wilson@example.com',id:'1',
                    current_net_income: 65000,
                    current_employer_name: 'Stark Industries',
                    employment_title: 'Sales Representative',
                    preferred_location1: 'Boston',
                    appType: 'single',
                    approved: 'No',
                    date_received: '2023-04-20',
                    
                },
                {
                    first_name: 'Sophia',
                    last_name: 'Martinez',
                    id_number: '678901234',
                    mobile_1: '5678901234',
                    email: 'sophia.martinez@example.com',id:'6',
                    current_net_income: 70000,
                    current_employer_name: 'Umbrella Corp',
                    employment_title: 'Human Resources Specialist',
                    preferred_location1: 'Miami',
                    appType: 'single',
                    approved: 'No',
                    date_received: '2023-05-05',
                    
                }
                , {
                    first_name: 'Sophia',
                    last_name: 'Martinez',
                    id_number: '678901234',
                    mobile_1: '5678901234',
                    email: 'sophia.martinez@example.com',id:'88',
                    current_net_income: 70000,
                    current_employer_name: 'Umbrella Corp',
                    employment_title: 'Human Resources Specialist',
                    preferred_location1: 'Miami',
                    appType: 'single',
                    approved: 'No',
                    date_received: '2023-05-05',
                    
                }, {
                    first_name: 'Sophia',
                    last_name: 'Martinez',
                    id_number: '678901234',
                    mobile_1: '5678901234',
                    email: 'sophia.martinez@example.com',id:'445',
                    current_net_income: 70000,
                    current_employer_name: 'Umbrella Corp',
                    employment_title: 'Human Resources Specialist',
                    preferred_location1: 'Miami',
                    appType: 'single',
                    approved: 'No',
                    date_received: '2023-05-05',
                    
                }, {
                    first_name: 'Sophia',
                    last_name: 'Martinez',
                    id_number: '678901234',
                    mobile_1: '5678901234',
                    email: 'sophia.martinez@example.com',id:'90',
                    current_net_income: 70000,
                    current_employer_name: 'Umbrella Corp',
                    employment_title: 'Human Resources Specialist',
                    preferred_location1: 'Miami',
                    appType: 'single',
                    approved: 'No',
                    date_received: '2023-05-05',
                    
                }, {
                    first_name: 'Sophia',
                    last_name: 'Martinez',
                    id_number: '678901234',
                    mobile_1: '5678901234',
                    email: 'sophia.martinez@example.com',id:'67',
                    current_net_income: 70000,
                    current_employer_name: 'Umbrella Corp',
                    employment_title: 'Human Resources Specialist',
                    preferred_location1: 'Miami',
                    appType: 'single',
                    approved: 'No',
                    date_received: '2023-05-05',
                    
                }, {
                    first_name: 'Sophia',
                    last_name: 'Martinez',
                    id_number: '678901234',
                    mobile_1: '5678901234',
                    email: 'sophia.martinez@example.com',id:'87',
                    current_net_income: 70000,
                    current_employer_name: 'Umbrella Corp',
                    employment_title: 'Human Resources Specialist',
                    preferred_location1: 'Miami',
                    appType: 'single',
                    approved: 'No',
                    date_received: '2023-05-05',
                    
                }
            ]

    const pendingApplicantsxContent = applicants.map(applicant => {
        return(
       {
        data: [
            [applicant['first_name'] + " " + applicant['surname'],  applicant['id_number']],
            [applicant['mobile_no1'], applicant['email']],
            [applicant['current_net_income'], applicant['current_employer_name']],
            [applicant['preferred_location1']],
            ['Single'],
            [applicant['approved'] == false? 'Pending' : 'Approved'],
            [applicant['date_received']],
          
        
    ],
    id: applicant['id'],

       } )
        })

    return (
        
           <DetailedListCard 
                headings={tableHeadings}
                collection={pendingApplicantsxContent}
            />
            
        )
    }

export default PendingApplicants