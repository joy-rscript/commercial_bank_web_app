import React, { useState } from 'react';

const IssuesHistory = () => {
  const issues = [
    { date: '01-04-2024', issue: 'Page not reloading...' },
    { date: '07-03-2024', issue: 'Front Gate Keys missing on arrival...' },
    { date: '04-04-2024', issue: 'Made a payment but I cannot see the...' }
  ];


  return (
    <div className="bg-white p-4 shadow-lg rounded-lg h-full text-gray-700">
      <h2 className="text-lg font-light mb-4">History</h2>
      <ul>
        {issues.map((issue, index) => (
            <div className='py-4'>
                <li key={index} className="flex flex-row justify-between items-end pb-1">
                    <span className="block">{issue.issue.substring(0, 20)} ...</span>
                    <span className="block text-gray-500 text-sm">{new Date(issue.date).toLocaleString('default', { month: 'short' })} {new Date(issue.date).getDate()}</span>                           
                </li>
                <hr />
            </div>
        
        ))}
      </ul>
    </div>
  );
};

export default IssuesHistory;
