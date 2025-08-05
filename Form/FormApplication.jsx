import React, { useState, useEffect } from 'react';
import Input from './Input';
import FormAction from './FormAction';
import rtoApplication from './formFields';
import Header from './Header';
import ProgressBar from './ProgressBar';
import { validateForm } from '../../utils/ValidateFields';
import axios from 'axios';
import NotificationModal from '../NotificationModal';
import { GiCheckMark, GiCancel } from 'react-icons/gi';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { PiWarningCircleBold } from "react-icons/pi"
import Loading from '../Loading';
import OnboardingAPI from '../../services/OnboardingAPI';

function flattenFields(fields) {
  const flatFields = [];

  function recursiveFlatten(obj) {
    for (const key in obj) {
      if (obj[key].labelText) {
        flatFields.push(obj[key]);
      } else {
        recursiveFlatten(obj[key]);
      }
    }
  }
  recursiveFlatten(fields);

  return flatFields;
}

function FormSection({ section, handleChange, formState, errors }) {
  const { sectionTitle, fields } = section;
  const flatFields = flattenFields(fields);

  const chunkedFields = [];
  let tempRow = [];
  let rowSignificance = 0;

  flatFields.forEach((field) => {
    let fieldSignificance;

    if (field.type === 'textarea') {
      fieldSignificance = 4;
    } else if (field.type === 'select' || field.type === 'date' || field.type === 'number' || field.type === 'checkbox' || field.type === 'email' || field.type === 'phone') {
      fieldSignificance = 1;
    } else {
      fieldSignificance = 2;
    }

    if (rowSignificance + fieldSignificance > 4) {
      chunkedFields.push(tempRow);
      tempRow = [];
      rowSignificance = 0;
    }

    tempRow.push(field);
    rowSignificance += fieldSignificance;
  });

  if (tempRow.length > 0) {
    chunkedFields.push(tempRow);
  }

  return (
    <div className='container mx-auto p-5'>
      <h2 className='text-xl sm:text-xl md:text-xl lg:text-xl font-semibold leading-6 text-black pb-2'>{sectionTitle}</h2>
      {chunkedFields.map((fieldsRow, rowIndex) => (
        <div key={rowIndex}>
          {fieldsRow.some(field => field.name === 'min_num_bedrooms') && (
            <h4 className='col-span-4 pt-5 pl-2 text-base sm:col-span-4 md:col-span-4 lg:col-span-4 sm:text-base md:text-base lg:text-base font-semibold leading-6 text-black'>
              What is your desired number of bedrooms?
            </h4>
          )}
          {fieldsRow.some(field => field.name === 'emergency_contact') && (
            <h4 className='col-span-4 pt-5 pl-2 text-base sm:col-span-4 md:col-span-4 lg:col-span-4 sm:text-base md:text-base lg:text-base font-semibold leading-6 text-black'>
              Enter your emergency contacts here.
            </h4>
          )}
          {fieldsRow.some(field => field.name === 'duration_years') && (
            <h4 className='col-span-4 pt-5 pl-2 text-base sm:col-span-4 md:col-span-4 lg:col-span-4 sm:text-base md:text-base lg:text-base font-semibold leading-6 text-black'>
              How long have you been staying at your previous address?
            </h4>
          )}
          {fieldsRow.some(field => field.name === 'mobile_no1' || field.name === 'landlord_mobile_no') && (
            <>
            <>
            </>
            </>
          )}
          <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 align-bottom items-baseline'>
            {fieldsRow.map((field, fieldIndex) => (
              <div
                key={field.id}
                className={`p-2 
                ${field.name === 'preferred_date' && 'col-span-4 flex justify-start'}
                ${field.name === 'num_children' && 'col-span-2 flex justify-start'}
                ${field.name === 'id_number' && 'col-span-1'}
                ${field.name === 'duration_months' && 'col-span-3 flex'}
                ${field.name === 'smoke' && 'col-span-4 flex'}
                ${field.name === 'years_remaining' && 'col-span-2 flex'}
                ${field.name === 'referee_phone1' && 'col-span-4 flex'}
                ${field.name === 'email' && 'col-span-4 flex'}
                ${field.type === 'textarea' ? 'col-span-4' : field.type === 'phone' ? 'col-span-2 p-0' :
                  field.type === 'select' || field.type === 'date' || field.type === 'number' || field.type === 'checkbox' ? 'col-span-1' : 
                  'col-span-2'}`}
              >
                <Input
                  labelText={field.labelText}
                  labelFor={field.labelFor}
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  options={field.options}
                  placeholder={field.placeholder}
                  isRequired={field.isRequired}
                  value={formState[field.id] || ''}
                  handleChange={handleChange}
                  customClass={errors[field.id] ? 'border-error' : ''}
                />
                   {errors[field.id] && <span className="text-error">{errors[field.id]}</span>}
                   </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FormApplication() {
  const [currentStep, setCurrentStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState('Loading ...');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const initialFormState = rtoApplication.reduce((acc, section) => {
    const fields = flattenFields(section.fields);
    fields.forEach((field) => {
      acc[field.id] = field.type === 'checkbox' ? false : '';
    });
    return acc;
  }, {});

  const [formState, setFormState] = useState(initialFormState);

  useEffect(() => {
    const savedFormState = localStorage.getItem('formState');
    const savedCurrentStep = localStorage.getItem('currentStep');
    if (savedFormState && savedCurrentStep) {
      setFormState(JSON.parse(savedFormState));
      setCurrentStep(parseInt(savedCurrentStep, 10));
    }
  }, []);

  const handleChange = (e) => {
    const { id, name, value } = e.target;
    console.log(`Changing ${id}: ${value}`);
    setFormState(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleNext = () => {
    const currentSectionFields = rtoApplication[currentStep].fields;
    const flatFields = flattenFields(currentSectionFields);
    const missingFields = flatFields.filter(field => field.isRequired && !formState[field.id]);

    if (missingFields.length > 0) {
      console.log("Missing fields");
      setErrorMessage('Please fill out all required fields.');
      return;
    }
    
    const formErrors = validateForm(rtoApplication, formState, currentStep);
    if (Object.keys(formErrors).length > 0) {
      console.log("Errors found");
      console.log(formErrors);
      setErrors(formErrors);
      // return;
    }
    console.log("No errors found");
    setErrorMessage('');
    setErrors({});

    if (currentStep < rtoApplication.length - 1) {
      setCurrentStep(currentStep + 1);
      console.log("big stepper incremented");
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault(); 
    const token = localStorage.getItem('token');
    const formAPI = new OnboardingAPI(token);
  
    setIsLoading(true);
    formState.declaration_text = 'I hereby declare that the information provided is true and accurate to the best of my knowledge and belief. I understand that any false declaration may result in disqualification of the applicant and that I may be liable for any consequences.';
    formState.first_name = 'Ruvimbo Joy';
    formState.email = 'ruejoysithole@gmail.com';
    formState.phone_number = '0133779990';
    formState.id_card_number = '514772870';
  
    const formErrors = validateForm(rtoApplication, formState);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsLoading(false);
    } 
      try {
        const response = await formAPI.createOnboardingSubmission(formState);

        if (response) {
          console.log("submitted");
          if(response.status === 201) {
            setSubmitMessage('Application submitted successfully.                  ');
            localStorage.setItem('email', formState.email)
          }
        
          if (response.data.notification_error) {
            setSubmitMessage(prevMessage => prevMessage + `Account Activation using ${response.data.notification} failed.`);
          } else if (response.data.notification) {
            setSubmitMessage(prevMessage => `${prevMessage}  Please check your email at ${response.data.notification} to activate your account.`);
          }
        
          setIsSuccess(true);
          setIsLoading(false);
          setShowNotification(true);      
        }
      } catch (error) {
        console.log("catch error")
        setSubmitMessage('An error occurred during the application submission');
        setIsLoading(false);
        setIsSuccess(false);
        setShowNotification(true);
      } 
    
  };

  const handleSave = () => {
    localStorage.setItem('formState', JSON.stringify(formState));
    localStorage.setItem('currentStep', currentStep.toString());
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  return (
    <div className="h-full overflow-y-auto">
      {currentStep === 0 ?
        <Header
          heading='GCB Rent to Own Application'
          paragraph="We are delighted at your decision to purchase a home through GCB`s RTO scheme. 
                    Kindly fill out the form to express your interest in the program.
                    Once received, your form will be reviewed and a decision will be communicated to you via email"
          textSize='1rem'
        /> :
        currentStep === rtoApplication.length - 1 ?
          <Header
            heading='GCB Rent to Own Application'
            paragraph="Submitting Your Application!"
            textSize={'1.3rem'}
          /> :
          currentStep == rtoApplication.length - 2?
          <Header
          heading='GCB Rent to Own Application'
          paragraph= 'I hereby declare that the information provided is true and accurate to the best of my knowledge and belief. I understand that any false declaration may result in disqualification of the applicant and that I may be liable for any consequences.'
          textSize={'1.0rem'}
          />:
          <Header
            heading='GCB Rent to Own Application'
            paragraph=""
          />
      }
      <ProgressBar currentStep={currentStep} totalSteps={rtoApplication.length} />

      <form
        className="m-auto p-5 w-full sm:w-3/4 md:w-3/4 lg:w-1/2 bg-gray-100 opacity-98 shadow-lg shadow-blue-gray-700"
        onSubmit={handleSubmit}
      >
        {errorMessage && (
          <h4
            className="text-red-600 text-center font-bold text-sm transition-opacity duration-300"
            style={{ opacity: errorMessage ? 1 : 0 }}
          >
            {errorMessage}
          </h4>
        )}
        <div>
          <FormSection
            section={rtoApplication[currentStep]}
            handleChange={handleChange}
            formState={formState}
            errors={errors}
          />
        </div>
        <div className="navigation-buttons flex justify-center mt-4">
          {currentStep > 0 && (
            <FormAction
              color="#B0BEC5"
              text="Previous"
              action="button"
              handleSubmit={handlePrev}
            />
          )}
          {currentStep < rtoApplication.length - 1 ? (
            <FormAction
              color="#393939"
              text="Next"
              action="button"
              handleSubmit={handleNext}
            />
          ) : (
            <FormAction
              color="#FFC52A"
              text="Submit"
              action="submit"
              handleSubmit={() => {
                setIsLoading(true);
                handleSubmit();
              }}
            />
          )}
          {currentStep === 0 &&
            <FormAction
              color="#2A6496"
              text="Save and Exit"
              action="button"
              handleSubmit={handleSave}
            />}
        </div>
        <div className='flex items-center justify-center mt-4'>
          {currentStep > 0 &&
            <FormAction
              color="#2A6496"
              text="Save and Exit"
              action="button"
              handleSubmit={handleSave}
            />}
        </div>
      </form>
      {showNotification && !isSuccess && (
        <NotificationModal
          isOpen={showNotification}
          onClose={closeNotification}
          color="#FF6347" // Red color for error
          hoverColor="#FF4500" // Darker red for hover effect
          msg={submitMessage}
          icon={<PiWarningCircleBold color="#FF6347" className="w-12 h-12" />} // Red color for warning icon
        />
      )}
      {showNotification && isSuccess && (
        <NotificationModal
          isOpen={showNotification}
          onClose={closeNotification}
          color="#32CD32" // Green color for success
          hoverColor="#228B22" // Darker green for hover effect
          msg={submitMessage}
          icon={<IoMdCheckmarkCircleOutline color="#32CD32" className="w-12 h-12"/>} // Green color for success icon
        />
      )}
      {isLoading &&(
        <Loading/>
      )}
    </div>
  );
}
