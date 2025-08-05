import React from 'react'

function FormAction({ color, text, action, handleSubmit }) {
  return (
    <button
      type={action}
          style={{
            backgroundColor: color,
            "&:hover": {
              outlineColor: color,
            },
            "&:focus": {
              outlineColor: color,
            }
          }}      className={`m-5 group relative w-full sm:w-1/2 md:w-1/3 lg:w-1/5 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white mt-5`}
      onClick={handleSubmit}
    >
      {text}
    </button>
  );
}

export default FormAction;
