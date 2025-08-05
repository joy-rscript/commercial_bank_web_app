import React from 'react';
import { Dialog, DialogTitle, DialogPanel } from '@headlessui/react';

function PropertyDetailsModal({ isOpen = false, onClose, propertyData, developerName }) {
    if (!propertyData) return null;

    // Ensure amenities is an array and map over it
    const amenitiesList = Array.isArray(propertyData.amenities) ? propertyData.amenities : [];

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="bg-black/10 align-middle h-screen fixed inset-0 flex w-screen items-center justify-center p-4 font-thin text-gray-800">
                <DialogPanel className="max-w-3xl w-full space-y-4 border bg-white p-12 shadow-md">
                    <DialogTitle className="">
                        <p className='font-bold text-2xl text-gray-800'></p>
                        {developerName} - 
                        <p className='font-medium text-gray-800 text-xl'></p>
                        {propertyData.project_name.toUpperCase()}
                    </DialogTitle>
                    <div className="grid grid-cols-2 gap-4">
                        <div >
                            <p className='font-bold text-gray-800'>Location:</p> {propertyData.location}
                            <br />
                            {propertyData.location_gps || '5°45′33″N 0°13′12″W'}
                        </div>
                        <div >
                            <p className='font-bold text-gray-800'>Start Date:</p> {propertyData.project_start_date}
                        </div>
                        <div >
                            <p className='font-bold text-gray-800'>Assigned Units:</p> {propertyData.no_assigned_units}
                        </div>
                    </div>
                    <div >
                    {propertyData.unit_type} unit type. {propertyData.project_description}
                        .{"\n"} Project size {propertyData.project_size} sqft.
                        <br />
                     Other Amenities provided : 
                       
                            {amenitiesList.map((amenity, index) => (
                                <span key={index}>
                                    {amenity}
                                    {index < amenitiesList.length - 1 && ", "}
                                </span>
                            ))}
                       
                    </div>
                    <br />
                    <div >
                        Total Units: {propertyData.project_no_of_units}
                    </div>
                    <div >
                        Bedroom Price: {propertyData.bedroom_price}
                    </div>
                    <div >
                        Bedroom Size: {propertyData.bedroom_size} sqft
                    </div>
                    <div >
                        Number of Bedrooms: {propertyData.no_of_bedrooms}
                    </div>
                    <div >
                        Status: {propertyData.complete || 'complete'}
                    </div>

                    <div className="flex justify-end gap-4 mt-4">
                        <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-black hover:bg-gray-400"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}

export default PropertyDetailsModal;
