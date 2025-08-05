import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import DeveloperAPI from '../../services/DeveloperAPI';
import {
  isValidEmail,
  isValidPhoneNumber,
  isValidDate,
  isNotEmpty,
  isValidPassword,
  validateField,
  validateForm,
} from '../../utils/ValidateFields';
import NotificationModal from '../NotificationModal';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { PiWarningCircleBold } from "react-icons/pi";
import Loading from '../Loading';
// import MapPicker from 'react-google-map-picker';

const DefaultLocation = { lat: 10, lng: 106 };
const DefaultZoom = 10;

function CreateDeveloper() {
  const [errors, setErrors] = useState({});
  const [developer, setDeveloper] = useState({
    developer_name: '',
    location: '',
    location_of_first_project_gps: '',
    phone_number: '',
    email_address: '',
    website: '',
    year_of_incorporation: '',
    year_of_first_project: '',
    location_of_first_project: '',
    key_contact_person: '',
    contact_person_position: '',
    contact_person_number: '',
    contact_person_email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const token = localStorage.getItem('token');
  const developerAPI = new DeveloperAPI(token);

  const formFields = [
    {
      fields: {
        developer_name: { labelText: 'Developer Name', isRequired: true, type: 'text' },
        location: { labelText: 'Location', isRequired: true, type: 'text' },
        phone_number: { labelText: 'Phone Number', isRequired: true, type: 'phone' },
        email_address: { labelText: 'Email Address', isRequired: true, type: 'email' },
        website: { labelText: 'Website', isRequired: false, type: 'text' },
        year_of_incorporation: { labelText: 'Year of Incorporation', isRequired: true, type: 'number' },
        year_of_first_project: { labelText: 'Year of First Project', isRequired: true, type: 'number' },
        location_of_first_project: { labelText: 'Location of First Project', isRequired: false, type: 'text' },
        key_contact_person: { labelText: 'Key Contact Person', isRequired: false, type: 'text' },
        contact_person_position: { labelText: 'Contact Person Position', isRequired: false, type: 'text' },
        contact_person_number: { labelText: 'Contact Person Number', isRequired: false, type: 'phone' },
        contact_person_email: { labelText: 'Contact Person Email', isRequired: false, type: 'email' },
      },
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeveloper({ ...developer, [name]: value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let field;
    formFields.forEach((section) => {
      if (section.fields[name]) {
        field = section.fields[name];
      }
    });

    if (field) {
      const errors = validateForm([{ fields: { [name]: field } }], { [name]: value });
      if (Object.keys(errors).length > 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          ...errors,
        }));
      } else {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  const handlePhoneNumberChange = (value) => {
    setDeveloper({ ...developer, phone_number: value });
  };

  const handleContactPersonNumberChange = (value) => {
    setDeveloper({ ...developer, contact_person_number: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formFields, developer);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      console.log(errors);
    } else {
      setErrors({});
      setIsLoading(true);
      try {
        const response = await developerAPI.createDeveloper(developer);
        setSubmitMessage('Developer created successfully');
        setIsSuccess(true);
        console.log(response.data);
      } catch (error) {
        setSubmitMessage('An error occurred during the creation of the developer');
        setIsSuccess(false);
        localStorage.setItem('developer', JSON.stringify(developer));
        console.error(error);
      } finally {
        setIsLoading(false);
        setShowNotification(true);
        console.log(submitMessage);
      }
    }
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  const handleSave = () => {
    localStorage.setItem('developer', JSON.stringify(developer));
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleSave);
    return () => {
      window.removeEventListener('beforeunload', handleSave);
    };
  }, [developer]);

  const handleMapChange = (lat, lng) => {
    setDeveloper({ ...developer, location_of_first_project_gps: `${lat}, ${lng}` });
  };

  return (
    <div className="flex-1 bg-none px-8 py-2 rounded-lg text-gray-700 w-full h-full">
      <div className="overflow-y-auto h-[75vh] m-4">        
        <h2 className="text-lg font-light mb-4">Fill the form below to create a new developer.</h2>
        <form onSubmit={handleSubmit} className="flex flex-wrap mx-2 ">
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="developer_name">Developer Name</label>
            <input
              type="text"
              id="developer_name"
              name="developer_name"
              value={developer.developer_name}
              onChange={handleChange}
              className={`w-1/2 px-4 py-2 border rounded-lg focus:border-gray-500 focus:text-gray-900 ${errors?.developer_name && 'border-red-500'}`}
            />
            {errors?.developer_name && <p className="text-red-500 text-xs mt-1">{errors?.developer_name}</p>}
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={developer.location}
              onChange={handleChange}
              className={`w-1/2 px-4 py-2 border rounded-lg focus:border-gray-500 focus:text-gray-900 ${errors?.location && 'border-red-500'}`}
            />
            {errors?.location && <p className="text-red-500 text-xs mt-1">{errors?.location}</p>}
          </div>
          <div className="w-full md:w-2/5 px-6  mb-4">
          <label htmlFor="mobile">Phone Number</label>
          <PhoneInput
            id="phone_number"
            name="phone_number"
            defaultCountry='gh'
            value={developer.phone_number}
            onChange={handlePhoneNumberChange}
            onBlur={(e) => handleBlur({ target: { name: 'phone_number', value: developer.phone_number } })}
            className={` py-2 border rounded-lg focus:border-gray-500 focus:text-gray-900 ${errors?.phone_number && 'border-red-500'}`}
          />
          </div>

          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email_address">Email Address</label>
            <input
              type="email"
              id="email_address"
              name="email_address"
              value={developer.email_address}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-1/2 px-4 py-2 border rounded-lg focus:border-gray-500 focus:text-gray-900 ${errors?.email_address && 'border-red-500'}`}
            />
            {errors?.email_address && <p className="text-red-500 text-xs mt-1">{errors?.email_address}</p>}
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              value={developer.website}
              onChange={handleChange}
              className={`w-1/2 px-4 py-2 border rounded-lg focus:border-gray-500 focus:text-gray-900 ${errors?.website && 'border-red-500'}`}
            />
            {errors?.website && <p className="text-red-500 text-xs mt-1">{errors?.website}</p>}
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="year_of_incorporation">Year of Incorporation</label>
            <input
              type="number"
              id="year_of_incorporation"
              name="year_of_incorporation"
              value={developer.year_of_incorporation}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-1/2 px-4 py-2 border rounded-lg focus:border-gray-500 focus:text-gray-900 ${errors?.year_of_incorporation && 'border-red-500'}`}
            />
            {errors?.year_of_incorporation && <p className="text-red-500 text-xs mt-1">{errors?.year_of_incorporation}</p>}
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="year_of_first_project">Year of First Project</label>
            <input
              type="number"
              id="year_of_first_project"
              name="year_of_first_project"
              value={developer.year_of_first_project}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-1/2 px-4 py-2 border rounded-lg focus:border-gray-500 focus:text-gray-900 ${errors?.year_of_first_project && 'border-red-500'}`}
            />
            {errors?.year_of_first_project && <p className="text-red-500 text-xs mt-1">{errors?.year_of_first_project}</p>}
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="location_of_first_project">Location of First Project</label>
            <input
              type="text"
              id="location_of_first_project"
              name="location_of_first_project"
              value={developer.location_of_first_project}
              onChange={handleChange}
              className={`w-1/2 px-4 py-2 border rounded-lg focus:border-gray-500 focus:text-gray-900 ${errors?.location_of_first_project && 'border-red-500'}`}
            />
            {errors?.location_of_first_project && <p className="text-red-500 text-xs mt-1">{errors?.location_of_first_project}</p>}
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="key_contact_person">Key Contact Person</label>
            <input
              type="text"
              id="key_contact_person"
              name="key_contact_person"
              value={developer.key_contact_person}
              onChange={handleChange}
              className={`w-1/2 px-4 py-2 border rounded-lg focus:border-gray-500 focus:text-gray-900 ${errors?.key_contact_person && 'border-red-500'}`}
            />
            {errors?.key_contact_person && <p className="text-red-500 text-xs mt-1">{errors?.key_contact_person}</p>}
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="contact_person_position">Contact Person Position</label>
            <input
              type="text"
              id="contact_person_position"
              name="contact_person_position"
              value={developer.contact_person_position}
              onChange={handleChange}
              className={`w-1/2 px-4 py-2 border rounded-lg focus:border-gray-500 focus:text-gray-900 ${errors?.contact_person_position && 'border-red-500'}`}
            />
            {errors?.contact_person_position && <p className="text-red-500 text-xs mt-1">{errors?.contact_person_position}</p>}
          </div>
          <div className="w-full md:w-2/5 mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="contact_person_number">Contact Person Number</label>
            <PhoneInput
              id="contact_person_number"
              name="contact_person_number"
              defaultCountry='gh'
              value={developer.contact_person_number}
              onChange={handleContactPersonNumberChange}
              onBlur={(e) => handleBlur({ target: { name: 'contact_person_number', value: developer.contact_person_number } })}
              />
            {errors?.contact_person_number && <p className="text-red-500 text-xs mt-1">{errors?.contact_person_number}</p>}
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="contact_person_email">Contact Person Email</label>
            <input
              type="email"
              id="contact_person_email"
              name="contact_person_email"
              value={developer.contact_person_email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-1/2 px-4 py-2 border rounded-lg focus:border-gray-500 focus:text-gray-900 ${errors?.contact_person_email && 'border-red-500'}`}
            />
            {errors?.contact_person_email && <p className="text-red-500 text-xs mt-1">{errors?.contact_person_email}</p>}
          </div>
          <div className="w-full px-2 mb-4">
            <label className="block text-gray-700 mb-2">Location of First Project (GPS Coordinates)</label>
            {/* <MapPicker
              defaultLocation={DefaultLocation}
              zoom={DefaultZoom}
              style={{ height: '300px' }}
              onChangeLocation={handleMapChange}
            /> */}
            <p>{developer.location_of_first_project_gps}</p>
          </div>
          <div className="w-full px-2 mb-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-800"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
        {showNotification && (
          <NotificationModal
            isOpen={showNotification}
            onClose={closeNotification}
            icon={isSuccess ? <IoMdCheckmarkCircleOutline size={50} className="text-green-500" /> : <PiWarningCircleBold size={50} className="text-red-500" />}
            title={isSuccess ? 'Successful' : 'Error'}
            message={submitMessage}
          />
        )}
      </div>
    </div>
  );
}

export default CreateDeveloper;
