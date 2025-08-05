import React from 'react'
  import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
  import { useState } from 'react'
  
  function ConfirmApplicantApproval({applicantData, propertyData}) {
    let [isOpen, setIsOpen] = useState(false)

    const assignTenantProperty =() => {
      console.log('assignTenantProperty')
      // if success open no backdrop modal with success tick
      // else open modal with error message
    }

    return (
      <>
       <button  className=" bg-deep-secondary-contrast text-white px-6 py-2 rounded-lg mb-8 mr-16" onClick={() => setIsOpen(true)}>Done</button>
        
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">

          <div className="bg-black/15 backdrop-blur-sm align-middle h-screen fixed inset-0 flex w-screen items-center justify-center p-4">            <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
              <DialogTitle className="font-bold">Assign  {propertyData['developer_name']}{propertyData['location']} to {applicantData['name']}. </DialogTitle>
              <Description>This will initiate a new RTO scheme for the property and applicant number {applicantData['application_number']}.</Description>
              <p>Are you sure you want to assign this tenant?</p>
              <div className="flex gap-4">
                <button onClick={() => setIsOpen(false)}>Cancel</button>
                <button onClick={() =>{ setIsOpen(false);
                               assignTenantProperty()}}>Complete</button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </>
       
    )
  }
export default ConfirmApplicantApproval