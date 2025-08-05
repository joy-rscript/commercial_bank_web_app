import React from 'react';

function MenuButton({ link, text, px, py , color, toggleFocus  }) {
    const toggleCustomClass = `hover:bg-white hover:shadow-md hover:text-gray-900 hover:font-medium focus:bg-white focus:outline-none focus:shadow-md focus:text-gray-900 focus:font-medium`;
    const noToggleCustomClass = ` text-white bg-${color}`;
    return (
        <a
            href={link}
            className={`block md:inline-block  ${px} ${py} text-gray-500 font-sans rounded-xl ${toggleFocus ?
                toggleCustomClass : 
                noToggleCustomClass} `
            }
        >

            {text}
            
        </a>
    );
}

export default MenuButton;
