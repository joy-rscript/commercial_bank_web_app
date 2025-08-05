import React from 'react';

function DashboardSection({ heading, textStyle, content, width, height = 'auto' }) {
    return (
        <div
            className={` bg-white min-h-full rounded-lg m-1 p-4 ${width}`}
        >
            <h2 className={`${textStyle} font-light font-sans text-gray-900 `}>
                {heading}
            </h2>
            <div className='h-full'>{content}</div>
        </div>
    );
}

export default DashboardSection;
