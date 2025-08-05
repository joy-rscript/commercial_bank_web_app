import NavBar from '../components/NavBar.jsx'; 
import { MenuBar } from '../components/NavBar/MenuBar.jsx';
import SuccessfulApplicantsSection from '../components/applicationDashboard/SuccessfulApplicantsSection.jsx';
import AvaialableProperty from '../components/applicationDashboard/AvaialableProperty.jsx';
import React from 'react'
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { IoMailOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { HiMiniArrowsUpDown } from "react-icons/hi2";
import { FaUser, FaEye } from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'js-cookie';
import ApplicationDecisionButtons from '../components/applicationDashboard/ApplicationDecisionButtons.jsx';
import { GiConsoleController } from 'react-icons/gi';
import OnboardingAPI from '../services/OnboardingAPI.jsx';

function SingleAppViewPage() {

  const {id} = useParams();
  const token = localStorage.getItem('token') ;
  const formAPI = new OnboardingAPI(token);
  const [applicantData, setApplicantData] = useState({
    "personal_info": {},
    "previous_address_info": {},
    "preferred_address_info": {},
    "employment_details": {},
    "bank_details": {},
    "references": {},
    "declaration_info": {},
    "official_use": {}
  });
  const application_number = "APP1234555789";
  const [data, setData] = useState([]);
  const [propertyData, setPropertyData] = useState([]);
  // const [token, setToken] = useState(localStorage.getItem('token'));
  const headings = ['Account', 'contact','employment', 'chosen location', 'application type', 'date',  'status' ]
  const [displaySections, setDisplaySections] = useState(true);
  const [sectionOrder, setSectionOrder] = useState(Object.keys(applicantData));
   const [visibleItems, setVisibleItems] = useState(() => {
    // Initialize each section with 4 visible items
    const initialState = {};
    sectionOrder.forEach(sectionKey => {
      initialState[sectionKey] = 4;
    });
    return initialState;
  });
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const appDetails = {'id':id};
        const response =await formAPI.getApplicationBySection(appDetails) ;
        if (response) {
          console.log("!!!!!!!!!!daata here ", response)
          setApplicantData(response);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  // Update data whenever applicantData changes
  useEffect(() => {
    setData([
      [
        applicantData.personal_info.first_name + " " + applicantData.personal_info.surname,
        applicantData.personal_info.id_card_number
      ],
      [
        applicantData.personal_info.mobile_no1,
        applicantData.personal_info.email
      ],
      [
        applicantData.employment_details.current_net_income,
        applicantData.employment_details.current_employer_name
      ],
      [
        applicantData.preferred_address_info.preferred_location1
      ],
      [
        'Single'
      ],
      [
        applicantData.official_use.date_received
      ],
      [
        applicantData.official_use.approved == true ? 'Approved' : 'Pending'
      ]
    ]);
  }, [applicantData]);

  const handleViewAllClick = (sectionKey) => {
    setVisibleItems(prevVisibleItems => ({
      ...prevVisibleItems,
      [sectionKey]: Object.keys(applicantData[sectionKey]).length
    }));
  };
    

  const handleSectionOrderChange = (selectedSection) => {
    setSectionOrder((prevOrder) => {
      const newOrder = [...prevOrder];
      const index = newOrder.indexOf(selectedSection);
      if (index > 0) {
        // Move the selected section to the top
        newOrder.splice(index, 1);
        newOrder.unshift(selectedSection);
      }
      return newOrder;
    });
  };
  
  const handleInputChange = (e, sectionKey, key) => {
    const newValue = e.target.value;
  
    const isDateField = key === 'date received' || key === 'date verification_completed';
    const processedValue = isDateField ? new Date(newValue).toISOString() : newValue;
  
    setApplicantData((prevData) => ({
      ...prevData,
      [sectionKey]: {
        ...prevData[sectionKey],
        [key]: processedValue,
      },
    }));
  };

  return (
<div className="bg-gray-100 fixed top-0 left-0 w-full h-full z-50 overflow-hidden">
  <NavBar />
  <MenuBar />
  <div className="mx-2 mt-4 grid grid-cols-5 grid-rows-4 gap-1 h-full bg-none">
    <div className="col-span-1 row-span-4 bg-white rounded-lg shadow-sm mx-1 p-3">
      <SuccessfulApplicantsSection />
    </div>

    <div className="col-span-4 row-span-4 rounded-lg mx-1 p-4 bg-none h-full flex flex-col">
      <div className="bg-white rounded-md p-4  pb-0 mb-0 sticky top-0">
        <div className="flex justify-between items-center px-2 py-2">
          <h1 className="text-xl font-bold text-gray-900">
            RTO Applicant Number - {application_number}
          </h1>
         <ApplicationDecisionButtons application_id={applicantData['id']} id={id} />

        </div>

        <table className="bg-white w-full rounded-md text-sm font-light sticky top-0 text-left text-gray-900 dark:text-gray-400">
          <thead className="text-xs w-full rounded-md text-gray-900 uppercase font-light bg-gray-300 sticky">
            <tr>
              {headings.map((headingName, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 cursor-pointer"
                  style={{ fontWeight: '300' }}
                >
                  {headingName}
                </th>
              ))}
              <th scope="col" className="px-6 py-3" style={{ fontWeight: '300' }}>
                Hide
              </th>
            </tr>
          </thead>
          <tbody>
            <tr key={applicantData['id']} className='border-b border-1 cursor-pointer'>
              {data.map((item, index) => (
                <td key={index} className="px-6 py-3" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.length === 2 ? (
                    <div className='flex items-center'>
                      {index === 0 && <div className='bg-gray-400 rounded-full h-8 w-8 flex items-center justify-center mr-3'><FaUser className="text-white" /></div>}
                      <div className='ml-1 flex flex-col justify-between'>
                        <span className='py-1'>{item[0]}</span>
                        <span className='text-xs py-1'>{item[1]}</span>
                      </div>
                    </div>
                  ) : (
                    item
                  )}
                </td>
              ))}
              <td className="px-6 py-3 cursor-pointer" onClick={() => toggleVisibility(applicantData['id'])}>
                <FaEye />
              </td>
            </tr>
          </tbody>
        </table>
          <div className='flex justify-start mt-2 mb-0 pb-0'>
              <div className="mb-0 items-end  mx-2 ">
              <label htmlFor="sectionOrder" className="font-bold mb-0">
                <HiMiniArrowsUpDown style={{ display: 'inline-block', verticalAlign: 'middle' }} />
              </label>
              <select
                id="sectionOrder"
                onChange={(e) => handleSectionOrderChange(e.target.value)}
                className="ml-2"
                style={{
                  color: '#4a5568',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  border: 'none',
                  paddingBottom: '0rem',
                  padding: '0.25rem 0.45rem',
                  transition: 'box-shadow 0.2s ease-in-out',
                  borderRadius: '5px',
                  marginBottom: '0px',
                }}
                onMouseOver={(e) => {
                  e.target.style.boxShadow = 'inset 0px 2px 4px rgba(0, 0, 0, 0.2)';
                  e.target.style.border = 'none';
                }}
                onFocus={(e) => {
                  e.target.style.outline = 'none'; // Remove outline on focus
                }}
                onMouseOut={(e) => {
                  e.target.style.boxShadow = 'inset 0px 2px 4px rgba(0, 0, 0, 0.2)';
                  e.target.style.border = 'none';
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = 'inset 0px 2px 4px rgba(0, 0, 0, 0.2)';
                  e.target.style.border = 'none';
                }}
              >
                {sectionOrder.map((sectionKey, index) => (
                  <option key={index} value={sectionKey} style={{paddingBottom: '0px', marginBottom: '0px'}}>{index + 1}</option>
                ))}
              </select>
            </div>
              <div className='gap-2 flex justify-start mt-2'>
              <span className={`cursor-pointer flex items-center px-4 py-2 rounded-t-lg ${displaySections ? 'bg-gray-100 text-gray-600' : 'bg-white text-gray-600'}`} onClick={() => setDisplaySections(!displaySections)}>
                <h1 className="font-thin text-sm">DISPLAY SECTIONS</h1>
              </span>
              <span className={`cursor-pointer flex items-center px-4 py-2 rounded-t-lg ${displaySections ? 'bg-white text-gray-600' : 'bg-gray-100 text-gray-600'}`} onClick={() => setDisplaySections(!displaySections)}>
                <h1 className="font-thin text-sm">DISPLAY PROPERTIES</h1>
              </span>
            </div>
          </div>
        
      </div>
      {/* Application data goes here */}
      <div className="overflow-auto rounded-lg flex-grow mt-1 pt-1">
            {displaySections && sectionOrder?.map((sectionKey, sectionIndex) => (
        <div key={sectionIndex} className="mb-4 rounded-xl p-4 px-6 shadow border border-b-4 border-t-2 border-r-2 border-l-4 w-auto">
          <h2 className="text-sm text-gray-600 py-1 px-2 font-small">{sectionKey?.replace('_', ' ').toUpperCase()}</h2>
          <div className="grid gap-2 mt-2">
            {Object.entries(applicantData[sectionKey]).slice(0, visibleItems[sectionKey])?.map(([key, value], itemIndex) => (
              <div key={itemIndex} className="flex flex-row items-start py-1">
                <span className="font-bold align-middle justify-start py-1 px-3" style={{ minWidth: '10vh', maxWidth: '45vh', width: 'auto' }}>{key.replace('_', ' ')} :</span>
                {sectionIndex === 7 ? (
                  <input
                    className={`rounded-md py-1 px-10 text-center ${typeof value !== 'number' ? 'bg-white' : ''}`}
                    defaultValue={value}
                    onChange={(e) => handleInputChange(e, sectionKey, key)}
                  />
                ) : (
                  <span className={`rounded-md py-1 px-10 text-center ${typeof value !== 'number' ? 'bg-white' : ''}`}>
                    {value}
                  </span>
                )}
              </div>
          ))}
    </div>
    <div className='flex justify-center items-end'>
      {visibleItems[sectionKey] < Object.keys(applicantData[sectionKey]).length && (
        <button onClick={() => handleViewAllClick(sectionKey)} className="align-end justify-end items-end text-deep-secondary-contrast mt-4 px-4 border-b border-dark-secondary-contrast bg-gray-50 rounded-b-md text-md hover:bg-gray-100">
          View All
        </button>
      )}
    </div>
  </div>
      ))}
      {!displaySections && <AvaialableProperty applicantData={applicantData} />}
    </div>
    </div>
  </div>
</div>


  )
}

export default SingleAppViewPage

// Dummy data 
// {
//   "personal_information": {
//     "title": "Mr",
//     "surname": "Smith",
//     "first_name": "John",
//     "other_names": "William",
//     "dob": "1990-05-15",
//     "marital_status": "Married",
//     "num_children": 2,
//     "id_type": "Ghana Card",
//     "id_card_number": "GC123456",
//     "issue_date": "2023-01-01",
//     "expiry_date": "2028-01-01",
//     "email": "john.smith@example.com",
//     "mobile_no1": "1234567890",
//     "mobile_no2": ""
//   },
//   "previous_address": {
//     "residential_address": "123 Main St",
//     "ghanapost_gps_code": "AB-1234-5678",
//     "num_bedrooms": 3,
//     "duration_at_address_years": 5,
//     "duration_at_address_months": 2,
//     "rent_monthly": 1200.50,
//     "reason_for_moving": "Relocating for work",
//     "landlord_name": "James Brown",
//     "landlord_mobile_no": "9876543210",
//     "any_pets": false,
//     "pet_description": "",
//     "smoke": true,
//     "evicted": false,
//     "eviction_reason": ""
//   },
//   "employment_details": {
//     "current_employer_name": "ABC Corporation",
//     "employer_email": "hr@abccorp.com",
//     "employer_contact_no": "555-1234",
//     "staff_id": "E12345",
//     "employment_date": "2018-07-15",
//     "supervisor_contact": "555-4321",
//     "supervisor_name": "Jane Doe",
//     "current_net_income": 4500.75,
//     "other_income_sources": null
//   },
//   "bank_details": {
//     "bank_name": "XYZ Bank",
//     "checking_account": "123-456",
//     "checking_account_controller_details": "John Smith",
//     "branch": "Main Branch",
//     "savings_account": "789-012"
//   },
//   "preferred_location": {
//     "preferred_location1": "Downtown",
//     "preferred_location2": "Suburbs",
//     "preferred_location3": "",
//     "min_num_bedrooms": 2,
//     "max_num_bedrooms": 3,
//     "preferred_move_in_date": "2024-08-01"
//   },
//   "references": {
//     "professional_referee_name1": "Sarah Johnson",
//     "professional_referee_address1": "456 Oak St",
//     "professional_referee_phone1": "555-9876",
//     "professional_referee_name2": "Michael Brown",
//     "professional_referee_address2": "789 Pine Ave",
//     "professional_referee_phone2": "555-5432",
//     "emergency_contact_name": "Alice Green",
//     "emergency_contact_address": "321 Elm St",
//     "emergency_contact_phone": "555-1234"
//   },
//   "declaration": {
//     "declaration_text": "I certify that all information provided is accurate.",
//     "declaration_name": "John Smith",
//     "declaration_date": "2024-06-30",
//     "declaration_signature": "John Smith"
//   },
//   "official_use": {
//     "date_received": "2024-06-30",
//     "time_received": "10:00:00",
//     "date_verification_completed": "2024-07-01",
//     "approved": true,
//     "approval_reason": "Good credit history",
//     "application_number": "APP123456789"
//   }
// }
