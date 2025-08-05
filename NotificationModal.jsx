import React from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { AiOutlineClose } from 'react-icons/ai'; // Import the close icon

const NotificationModal = ({ isOpen, onClose, color, hoverColor, msg, icon }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm"></div>
        <DialogPanel className="relative bg-white inline-block align-middle rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          {/* Close button */}
          <button
            type="button"
            className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={onClose}
          >
            <AiOutlineClose className="h-6 w-6" />
          </button>

          {/* Modal content */}
          <div className="p-12 flex flex-col justify-between items-center gap-4">
            <DialogTitle className="font-bold flex items-center gap-2">
              {icon && React.cloneElement(icon, { size: '1.5em' })}
              {msg}
            </DialogTitle>
            </div>
            <div className="flex justify-end m-4 items-end ">
              <button
                type="button"
                className={`inline-flex justify-center px-6 py-2 text-sm font-medium text-white rounded-md border border-transparent focus:outline-none`}
                style={{ backgroundColor: color }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = color)}
                onClick={onClose}
              >
                OK
              </button>
            </div>
        
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default NotificationModal;
