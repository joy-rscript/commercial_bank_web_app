
import { useState,useEffect } from 'react';
import { IoMailOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Dialog, DialogTitle, DialogPanel } from '@headlessui/react';
import { FormControl, InputLabel, OutlinedInput, InputAdornment } from '@mui/material';
import axios from "axios";
import Cookies from "js-cookie";
import OnboardingAPI from '../../services/OnboardingAPI';

function ApplicationDecisionButtons({application_id, id}) {
  
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isDenyModalOpen, setIsDenyModalOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [approved, setApproved] = useState(false);
  const handleInputChange = (e) => {
   setInputText(e.target.value);
  }; 

  const updateApplicationStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const formAPI = new OnboardingAPI(token);
      if (token) {
        const formData = {
            'approved': approved,
            'approval_reason': inputText,
            'id': id,
        }
        const response = formAPI.updateOnboardingApp(formData)

        if (response.status === 200) {
          console.log('Application update made successfully');
          setIsApproveModalOpen(false); 
          // TODO: expect webpush notification in 3 seconds
        } else {
          console.error('Failed to update application');
        }
      } else {
        handleTokenRefresh(); // Handle token refresh logic if access token is not available
      }
    } catch (error) {
      console.error('Error updating application', error);
    }
  };

  const sendApplicantMessage = async () =>{
    try {
      const accessToken = Cookies.get('access');
      if (true) {
        const url = `http://localhost:8000/rto/send_applicant_notification/${application_id}`;
        const response = await axios.post(
          url,
          {
           title : inputText,
            message: inputText
          },
          {
            // headers: {
            //   'Content-Type': 'application/json',
            //   Authorization: `Bearer ${accessToken}`
            // }
          }
        );

        if (response.status === 200) {
          console.log('sending message done successfully');
          setIsEmailModalOpen(false); 
          // TODO: expect webpush notification in 3 seconds
        } else {
          console.error('Failed to send meessage ');
        }
      } else {
        handleTokenRefresh(); 
      }
    } catch (error) {
      console.error('Error sending meessage application', error);
    }
  };

  const handleTokenRefresh = async () => {
    try {
      // Make a request to your backend to refresh the access token using the refresh token
      const refreshResponse = await axios.post(
        "http://127.0.0.1:5173/api/account/refresh/",
        {
          refresh: Cookies.get("refresh"),
        }
      );

      const newAccessToken = refreshResponse.data.access;

      // Update the access token in cookies
      Cookies.set("access", newAccessToken);

      // Retry the original API request with the new access token
      await fetchData();
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
  className="icon-container"
  onClick={() => setIsEmailModalOpen(true)}
  style={{ position: 'relative', zIndex: 1000 }}
>
  <IoMailOutline
    className="text-light-secondary-contrast text-2xl cursor-pointer"
    style={{ zIndex: 1, transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
    onMouseEnter={(e) => { 
      e.currentTarget.style.boxShadow = '0px 10px 20px rgba(0, 0, 0, 0.2)';
      e.currentTarget.style.transform = 'scale(1.1)';
      e.currentTarget.style.borderRadius = '50%';
    }}
    onMouseLeave={(e) => { 
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.transform = 'scale(1)';
    }}
  />
</button>

<button
  className="icon-container"
  onClick={() => setIsApproveModalOpen(true)}
  style={{ position: 'relative' }}
>
  <IoMdCheckmarkCircleOutline
    className="text-money text-2xl cursor-pointer"
    style={{ zIndex: 1, transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
    onMouseEnter={(e) => { 
      e.currentTarget.style.boxShadow = '0px 10px 20px rgba(0, 0, 0, 0.2)';
      e.currentTarget.style.transform = 'scale(1.1)';
      e.currentTarget.style.borderRadius = '50%';
    }}
    onMouseLeave={(e) => { 
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.transform = 'scale(1)';
    }}
  />
</button>

<button
  className="icon-container bg-transparent bg-opacity-100"
  onClick={() => setIsDenyModalOpen(true)}
  style={{ position: 'relative' }}
>
  <RxCrossCircled
    className="text-error text-2xl cursor-pointer"
    style={{ zIndex: 1, transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
    onMouseEnter={(e) => { 
      e.currentTarget.style.boxShadow = '0px 10px 20px rgba(0, 0, 0, 0.2)';
      e.currentTarget.style.transform = 'scale(1.1)';
      e.currentTarget.style.borderRadius = '50%';
    }}
    onMouseLeave={(e) => { 
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.transform = 'scale(1)';
      
    }}
  />
</button>


      {/* Email Modal */}
      <Dialog open={isEmailModalOpen} onClose={() => setIsEmailModalOpen(false)} className="relative z-50">
        <div className="bg-black/15 backdrop-blur-sm align-middle h-screen fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className=" max-w-1/3 w-1/3 h-1/3 space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">Send User an Email</DialogTitle>
            <FormControl fullWidth variant="outlined" className="mb-2">
              <InputLabel htmlFor="email-message">Enter your email message</InputLabel>
              <OutlinedInput id="email-message" multiline label="Email Message"  onChange={handleInputChange}/>
            </FormControl>
            <div className="flex justify-end gap-4 mt-2">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-black hover:bg-gray-400"
                onClick={() => setIsEmailModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-deep-secondary-contrast px-4 py-2 text-sm font-medium text-white hover:bg-deep-secondary-contrast"
                onClick={() => {
                  // Handle send email logic here
                  sendApplicantMessage();
                  setIsEmailModalOpen(false);
                }}
              >
                Send
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Approve Modal */}
      <Dialog open={isApproveModalOpen} onClose={() => setIsApproveModalOpen(false)} className="relative z-50">
        <div className="bg-black/15 backdrop-blur-sm align-middle h-screen fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="w-1/3 h-1/3 space-y-4 border bg-white p-12">            <DialogTitle className="font-bold">Approve Modal</DialogTitle>
            <FormControl fullWidth variant="outlined" className="mb-4">
              <InputLabel htmlFor="approval-reason">Approve Application {application_id}</InputLabel>
              <OutlinedInput id="approval-reason" label="Reason for Approval" onChange={handleInputChange} />
            </FormControl>
            <div className="flex justify-end gap-4 mt-2 mb-1">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-black hover:bg-gray-400"
                onClick={() => setIsApproveModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-deep-secondary-contrast px-4 py-2 text-sm font-medium text-white hover:bg-deep-secondary-contrast"
                onClick={() => {
                  setApproved(true);
                  updateApplicationStatus(); 
                  setIsApproveModalOpen(false);
                }}
              >
                Approve
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Deny Modal */}
      <Dialog open={isDenyModalOpen} onClose={() => setIsDenyModalOpen(false)} className="relative z-50">
        <div className="bg-black/15 backdrop-blur-sm align-middle h-screen fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="w-1/3 h-1/3 space-y-4 border bg-white p-12">            
        <DialogTitle className="font-bold">Deny Modal</DialogTitle>
            <FormControl fullWidth variant="outlined" className="mb-4">
              <InputLabel htmlFor="denial-reason">Deny Application {application_id}</InputLabel>
              <OutlinedInput id="denial-reason" label="Reason for Denial" onChange={handleInputChange}/>
            </FormControl>
            <div className="flex justify-end gap-4 mt-2">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-black hover:bg-gray-400"
                onClick={() => setIsDenyModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-deep-secondary-contrast px-4 py-2 text-sm font-medium text-white hover:bg-deep-secondary-contrast"
                onClick={() => {
                  setApproved(false);
                  updateApplicationStatus();
                  setIsDenyModalOpen(false);
                }}
              >
                Deny
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}

export default ApplicationDecisionButtons;
