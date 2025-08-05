import React from 'react';

function ProgressBar({ currentStep, totalSteps }) {
  const progressPercentage = (currentStep / (totalSteps - 1)) * 100;

  return (
    <div className="m-auto w-full sm:w-3/4 md:w-3/4 lg:w-1/2 bg-gray-200 ">
      <div
        className="bg-gray-600 h-1.5 "
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;