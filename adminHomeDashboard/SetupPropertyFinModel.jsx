import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogPanel } from '@headlessui/react';
import { FormControl, InputLabel, OutlinedInput, InputAdornment } from '@mui/material';

function SetupPropertyFinModel({ applicantData, propertyData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [costPerUnit, setCostPerUnit] = useState('');
    const [targetRentalYield, setTargetRentalYield] = useState('');
    const [initDownPayment, setInitDownPayment] = useState('');
    const [annualRentIncrease, setAnnualRentIncrease] = useState('');
    const [annualHomeValueIncrease, setAnnualHomeValueIncrease] = useState('');
    const [yearsToPayInitCost, setYearsToPayInitCost] = useState('');
    const [perUnitMarkupCost, setPerUnitMarkupCost] = useState('');
    const [annualEquityPymtIncrease, setAnnualEquityPymtIncrease] = useState('');
    const [clientApproved, setClientApproved] = useState(false); // State to track client approval

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            applicationId: applicantData['application_id'],
            propertyId: propertyData['property_id'],
            costPerUnit,
            targetRentalYield,
            initDownPayment,
            annualRentIncrease,
            annualHomeValueIncrease,
            yearsToPayInitCost,
            perUnitMarkupCost,
            annualEquityPymtIncrease,
        };
        console.log(data);
        // Any additional logic for form submission
    };

    const assignTenantProperty = () => {
        console.log('assignTenantProperty');
        // Define what should happen when the tenant is assigned
        // For example, trigger an API call, update state, etc.
        // Example:
        // setIsOpen(false);
        // performSomeAction();
    };

    return (
        <>
            <button className="bg-tainted-yellow hover:bg-secondary text-white px-6 py-2 rounded-lg mb-8 mr-16" onClick={() => setIsOpen(true)}>
                Assign Tenant
            </button>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="bg-black/15 backdrop-blur-sm align-middle h-screen fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
                        <DialogTitle className="font-bold">
                            Complete setting up the payment plan for {propertyData.developer_name} {propertyData.location}.
                        </DialogTitle>
                        <p>
                             Under the RTO scheme, payments done by tenant <b>{applicantData.personal_info.first_name + " " + applicantData.personal_info.surname }</b> will be done to fulfill the payment obligations as per the finaincial projections for that period as stated below.
                        </p>
                        <form onSubmit={handleSubmit} className="mt-2 grid grid-cols-2 gap-4">
                        <FormControl
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        height: '3rem',
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#2A6496'
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#2A6496'
                                        }
                                    }
                                }}
                            >
                                <InputLabel htmlFor="cost-per-unit">Cost Per Unit</InputLabel>
                                <OutlinedInput
                                     id="cost-per-unit"
                                     type="text"
                                     value={costPerUnit}
                                     onChange={(e) => setCostPerUnit(e.target.value)}
                                     label="Cost Per Unit"
                                />
                            </FormControl>
                           
                            <FormControl
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        height: '3rem',
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#2A6496'
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#2A6496'
                                        }
                                    }
                                }}
                            >
                                <InputLabel htmlFor="target-rental-yield">Target Rental Yield ₵</InputLabel>
                                <OutlinedInput
                                    id="target-rental-yield"
                                    type="text"
                                    value={targetRentalYield}
                                    onChange={(e) => setTargetRentalYield(e.target.value)}
                                    startAdornment={<InputAdornment position="start">₵</InputAdornment>}
                                    label="Target Rental Yield ₵"
                                />
                            </FormControl>
                            <FormControl
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        height: '3rem',
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#2A6496'
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#2A6496'
                                        }
                                    }
                                }}
                            >
                                <InputLabel htmlFor="initial-down-payment">Initial Down Payment ₵</InputLabel>
                                <OutlinedInput
                                    id="initial-down-payment"
                                    type="text"
                                    value={initDownPayment}
                                    onChange={(e) => setInitDownPayment(e.target.value)}
                                    startAdornment={<InputAdornment position="start">₵</InputAdornment>}
                                    label="Initial Down Payment ₵"
                                />
                            </FormControl>
                            <FormControl
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        height: '3rem',
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#2A6496'
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#2A6496'
                                        }
                                    }
                                }}
                            >
                                <InputLabel htmlFor="annual-rent-increase">Annual Rent Increase</InputLabel>
                                <OutlinedInput
                                    id="annual-rent-increase"
                                    type="text"
                                    value={annualRentIncrease}
                                    onChange={(e) => setAnnualRentIncrease(e.target.value)}
                                    label="Annual Rent Increase"
                                />
                            </FormControl>
                            <FormControl
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        height: '3rem',
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#2A6496'
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#2A6496'
                                        }
                                    }
                                }}
                            >
                                <InputLabel htmlFor="annual-home-value-increase">Annual Home Value Increase</InputLabel>
                                <OutlinedInput
                                    id="annual-home-value-increase"
                                    type="text"
                                    value={annualHomeValueIncrease}
                                    onChange={(e) => setAnnualHomeValueIncrease(e.target.value)}
                                    label="Annual Home Value Increase"
                                />
                            </FormControl>
                            <FormControl
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        height: '3rem',
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#2A6496'
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#2A6496'
                                        }
                                    }
                                }}
                            >
                                <InputLabel htmlFor="years-to-pay-initial-cost">Years to Pay Initial Cost</InputLabel>
                                <OutlinedInput
                                    id="years-to-pay-initial-cost"
                                    type="text"
                                    value={yearsToPayInitCost}
                                    onChange={(e) => setYearsToPayInitCost(e.target.value)}
                                    label="Years to Pay Initial Cost"
                                />
                            </FormControl>
                            <FormControl
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        height: '3rem',
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#2A6496'
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#2A6496'
                                        }
                                    }
                                }}
                            >
                                <InputLabel htmlFor="per-unit-markup-cost">Per Unit Markup Cost</InputLabel>
                                <OutlinedInput
                                    id="per-unit-markup-cost"
                                    type="text"
                                    value={perUnitMarkupCost}
                                    onChange={(e) => setPerUnitMarkupCost(e.target.value)}
                                    label="Per Unit Markup Cost"
                                />
                            </FormControl>
                            <FormControl
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        height: '3rem',
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#2A6496'
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#2A6496'
                                        }
                                    }
                                }}
                            >         <InputLabel htmlFor="annual-equity-payment-increase">Annual Equity Payment Increase</InputLabel>
                                <OutlinedInput
                                    id="annual-equity-payment-increase"
                                    type="text"
                                    value={annualEquityPymtIncrease}
                                    onChange={(e) => setAnnualEquityPymtIncrease(e.target.value)}
                                    label="Annual Equity Payment Increase"
                                />
                            </FormControl>
                            

                            <div className="col-span-2 flex justify-end gap-4 mt-4">
                                <button
                                    type="button"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-black hover:bg-gray-400"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="inline-flex justify-center rounded-md border  border-transparent bg-deep-secondary-contrast px-4 py-2 text-sm font-medium text-white hover:bg-deep-secondary-contrast"
                                    onClick={() => setClientApproved(true)}
                                >
                                    Done
                                </button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>
            {clientApproved && (
                <Dialog open={clientApproved} onClose={() => setClientApproved(false)} className="relative z-50">
                    <div className="bg-black/15 backdrop-blur-sm align-middle h-screen fixed inset-0 flex w-screen items-center justify-center p-4">
                        <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
                            <DialogTitle className="font-bold">
                                Assign {propertyData.developer_name} {propertyData.location} to {applicantData.name}.
                            </DialogTitle>
                            <p>This will initiate a new RTO scheme for the property and applicant number {applicantData.application_number}.</p>
                            <div className="col-span-2 flex justify-end gap-4 mt-4">
                                <button 
                                type='button'
                                className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-black hover:bg-gray-400"
                                onClick={() => setClientApproved(false)}>
                                    Cancel</button>
                                <button 
                                type='button'
                                className="inline-flex justify-center rounded-md border  border-transparent bg-deep-secondary-contrast px-4 py-2 text-sm font-medium text-white hover:bg-deep-secondary-contrast"
                                onClick={assignTenantProperty}
                                >Complete</button>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>
            )}
        </>
    );
}

export default SetupPropertyFinModel;
