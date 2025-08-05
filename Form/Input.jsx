import React from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

export default function Input({ handleChange, value, labelText, labelFor, id, name, type, isRequired, placeholder, options, customClass }) {
  const commonClass = 'rounded-md appearance-none relative block w-full p-5 py-1.5 focus:border-gray-300 placeholder-gray-300 text-base sm:text-sm md:text-base sm:text-sm md:text-sm sm:text-base lg:text-gray-600 lg:text-sm focus:outline-none focus:inner-shadow-sm focus:z-10 placeholder-xs sm:placeholder-sm md:placeholder-sm lg:placeholder-sm';

  return (
    <div className='form-group'>
      <label htmlFor={labelFor} className='block text-black p-1 text-base sm:text-sm md:text-base lg:text-sm flex-shrink' style={{ whiteSpace: 'nowrap' }}>
        {labelText} {isRequired && <span className='text-red-500'>*</span>}
      </label>
      
      {type === 'select' ? (
        <select
          id={id}
          name={name}
          onChange={handleChange}
          value={value}
          style={{fontSize:'0.9rem'}}
          className={`${customClass ? `${customClass} ${commonClass}` : commonClass} text-gray-900 font-light`}
          required={isRequired}
        >
          <option value='' disabled className='text-gray-700 font-light placeholder-xs sm:placeholder-sm md:placeholder-sm lg:placeholder-sm'>{placeholder}</option>
          {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          onChange={handleChange}
          value={value}
          className={`${customClass ? `${customClass} ${commonClass}` : commonClass}`}
          required={isRequired}
          placeholder={placeholder}
        />
      ) : type === 'phone' ? (
        <div className='flex'>
          <PhoneInput
            onChange={(value, country, e) => handleChange({ target: { id, name, value } })}
            value={value}
            id={id}
            name={name}
            type={type}
            required={isRequired}
            className={`${customClass ? customClass : commonClass} flex-1`}
            placeholder={placeholder}
          />
        </div>
      ) : type === 'checkbox' ? (
        <div className='flex items-center'>
          <input
            onChange={handleChange}
            checked={value}
            id={id}
            name={name}
            type={type}
            required={isRequired}
            className='h-4 w-4 checked:bg-black checked:border-transparent checked:bg-none border-black rounded focus:ring-black'
          />
        </div>
      ) : type === 'date' ? (
        <input
          onChange={handleChange}
          value={value}
          id={id}
          name={name}
          type={type}
          required={isRequired}
          className={`${customClass ? `${customClass} ${commonClass}` : commonClass}`}
          placeholder={placeholder}
        />
      ) : (
        <input
          onChange={handleChange}
          value={value}
          id={id}
          name={name}
          type={type}
          required={isRequired}
          className={`${customClass ? `${customClass} ${commonClass}` : commonClass}`}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

