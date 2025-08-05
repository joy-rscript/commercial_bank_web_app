import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar.jsx';
import { IoRadioButtonOff, IoRadioButtonOn } from "react-icons/io5";
import { TenantMenuBar } from '../components/tenantDashboard/TenantMenuBar.jsx';
import OnboardingAPI from '../services/OnboardingAPI.jsx';
import PropertyAPI from '../services/PropertyAPI.jsx'; // Import PropertyAPI
import { useNavigate } from 'react-router-dom';

function ApplicantHomePage() {
    const id = localStorage.getItem('applicant_id');
    const [applicantData, setApplicantData] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(true);
    const [isApproved, setIsApproved] = useState(false);
    const [housingInfo, setHousingInfo] = useState({});
    const [expandedSections, setExpandedSections] = useState({});
    const [displaySections, setDisplaySections] = useState(true);
    const [sectionOrder, setSectionOrder] = useState([]);
    const [visibleItems, setVisibleItems] = useState({});
    const token = localStorage.getItem('token');
    const formAPI = new OnboardingAPI(token);
    const propertyAPI = new PropertyAPI(token); // Initialize PropertyAPI
    const email = localStorage.getItem('email');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const appDetails = {
                    email,
                    id
                };
                const response = await formAPI.getApplicationBySection(appDetails);
                console.log(response);
                setApplicantData(response);
                setSectionOrder(Object.keys(response));

                // Initialize visibleItems with 5 for all sections
                const initialVisibleItems = Object.keys(response).reduce((acc, key) => {
                    acc[key] = 5;
                    return acc;
                }, {});
                setVisibleItems(initialVisibleItems);

                if (response.official_use.approved) {
                    setIsApproved(true);
                }

                // Fetch property data
                const propertyResponse = await propertyAPI.getProperty(response.tenant_id);
                if (propertyResponse && propertyResponse) {
                    setHousingInfo({
                        handingOver: true,
                        match: true
                    });

                    // Set local storage and navigate to tenant dashboard
                    localStorage.setItem('tenant_id', response.id);
                    localStorage.setItem('property_id', propertyResponse.id);

                    // Call rerouteTenant function
                    rerouteTenant();
                } else {
                    setHousingInfo({
                        handingOver: false,
                        match: false
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id, email, token]);

    const rerouteTenant = () => {
        navigate('/tenant/dashboard');
    };

    const handleViewAllClick = (sectionKey) => {
        setVisibleItems((prevVisibleItems) => ({
            ...prevVisibleItems,
            [sectionKey]: Object.keys(applicantData[sectionKey]).length
        }));
    };

    const handleInputChange = (e, sectionKey, key) => {
        // Handle input change logic here if needed
    };

    const capitalizeAndReplace = (str) => {
        return str.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const toggleExpandSection = (sectionKey) => {
        setExpandedSections((prevExpandedSections) => ({
            ...prevExpandedSections,
            [sectionKey]: !prevExpandedSections[sectionKey],
        }));
    };

    return (
        <div className="bg-gray-100 fixed h-screen w-screen max-h-screen max-w-screen flex flex-col">
            <NavBar />
            <TenantMenuBar />
            <div className="grid grid-cols-5 h-full mt-4">
                {/* Rent-to-own Application Progress */}
                <div className="bg-white rounded-lg p-4 mx-2 col-span-1 h-full">
                    <h1 className="text-xl font-bold text-gray-900">
                        Rent-to-own Application Progress
                    </h1>
                    <div className="flex flex-col p-6">
                        <div className="flex items-center mt-2">
                            {isSubmitted ? (
                                <>
                                    <IoRadioButtonOn className="w-6 h-6 text-gray-700" />
                                    <span className="ml-2 font-medium text-gray-700">Application Submission</span>
                                </>
                            ) : (
                                <>
                                    <IoRadioButtonOff className="w-6 h-6 text-gray-300" />
                                    <span className="ml-2 font-medium text-gray-300">Application Submission</span>
                                </>
                            )}
                        </div>

                        <div className="flex items-center mt-2">
                            {isApproved ? (
                                <>
                                    <IoRadioButtonOn className="w-6 h-6 text-gray-700" />
                                    <span className="ml-2 font-medium text-gray-700">Application Approval</span>
                                </>
                            ) : (
                                <>
                                    <IoRadioButtonOff className="w-6 h-6 text-gray-300" />
                                    <span className="ml-2 font-medium text-gray-300">Application Approval</span>
                                </>
                            )}
                        </div>

                        <div className="flex items-center mt-2">
                            {housingInfo.match ? (
                                <>
                                    <IoRadioButtonOn className="w-6 h-6 text-gray-700" />
                                    <span className="ml-2 font-medium text-gray-700">House Match Found</span>
                                </>
                            ) : (
                                <>
                                    <IoRadioButtonOff className="w-6 h-6 text-gray-300" />
                                    <span className="ml-2 font-medium text-gray-300">House Match Found</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Application Details */}
                {/* TODO: Suggested property here*/}
                <div className="bg-white col-span-4 rounded-lg mx-2 p-2 h-full flex flex-col overflow-auto shadow-sm ">
                    <div className="bg-white rounded-md pb-0 mb-2 sticky top-0">
                        <div className="px-2 py-2 my-2 rounded-md">
                            <h1 className="text-xl font-bold text-gray-900">
                                RTO Applicant Number - {applicantData.id}
                            </h1>
                        </div>
                    </div>

                    {/* Application data goes here */}
                    <div className="overflow-auto rounded-lg flex-grow mt-1 pt-1 ">
                        {displaySections && sectionOrder.map((sectionKey, sectionIndex) => (
                            <div key={sectionIndex} className="mb-4 rounded-xl p-4 px-6 shadow border border-b-4 border-t-2 border-r-2 border-l-4 w-auto">
                                <h2 className="text-sm text-gray-600 py-1 px-2 font-small">{capitalizeAndReplace(sectionKey)}</h2>
                                <div className="grid gap-2 mt-2">
                                    {Object.entries(applicantData[sectionKey]).slice(0, visibleItems[sectionKey]).map(([key, value], itemIndex) => (
                                        <div key={itemIndex} className="flex flex-row items-start py-1">
                                            <span className="font-bold align-middle justify-start py-1 px-3" style={{ minWidth: '10vh', maxWidth: '45vh', width: 'auto' }}>{capitalizeAndReplace(key)} :</span>
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
                        {!displaySections && <div>No Data Available</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ApplicantHomePage;
