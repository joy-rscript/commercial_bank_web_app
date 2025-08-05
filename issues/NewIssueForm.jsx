import React, { useState } from 'react';

const NewIssueForm = ({property}) => {
  const [issue, setIssue] = useState({
    property: property, // Corrected to use the property directly
    date: new Date(),    
    issueType: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIssue({ ...issue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(issue);
  };

  return (
    <div className="flex-1 bg-none px-8 py-2 rounded-lg text-gray-700">
      <h2 className="text-lg font-light mb-4">Fill the form below to submit a complaint concerning your Apartment. The GCB REIT Team will contact you within 3 working days.</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4 flex flex-row justify-start items-center gap-6'>
          <div className="mx-2">
            <label className="block text-gray-700 mb-2" htmlFor="property">Property</label>
            <input 
              type="text" 
              id="property" 
              name="property" 
              readOnly={true}
              value={issue.property} 
              onChange={handleChange} 
              className="w-full px-6 py-2 border rounded-lg focus:border-gray-500 focus:text-gray-900" 
            />
          </div>
          <div className="mx-4">
            <label className="block text-gray-700 mb-2" htmlFor="date">Date</label>
            <input 
              type="text"  // Changed to text to display the formatted date
              id="date" 
              name="date"
              readOnly={true} 
              value={issue.date.toLocaleDateString()} 
              onChange={handleChange} 
              className="w-full px-6 py-2 border rounded-lg focus:border-gray-500 focus:text-gray-900" 
            />
          </div>  
        </div>
       
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="issueType">Issue Type</label>
          <select 
            id="issueType" 
            name="issueType" 
            value={issue.issueType} 
            onChange={handleChange} 
            className="w-full px-6 py-2 border rounded-lg focus:border-gray-500 focus:text-gray-900"
          >
            <option value="">Select an issue type</option>
            <option value="payment">Payment Issue</option>
            <option value="maintenance">Maintenance Issue</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className='flex flex-col justify-end items-end w-2/3'>
          <div className="mb-4 w-full">
            <label className="block text-gray-700 mb-2" htmlFor="description">Issue Description</label>
            <textarea 
              id="description" 
              name="description" 
              value={issue.description} 
              onChange={handleChange} 
              
              className="w-full px-3 py-3 border rounded-lg focus:border-gray-500 focus:text-gray-900"
            />
          </div>
          <div>
            <button type="submit" className="bg-secondary text-white px-6 py-2 rounded-lg">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewIssueForm;
