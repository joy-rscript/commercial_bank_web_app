import React, { useState } from 'react';
import { FormControl, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import AccountAPI from '../services/AccountAPI.jsx';
import NavBar from '../components/NavBar.jsx';
import LogoBlack from '../components/LogoBlack.jsx';
import Familyhomeownership from '../assets/Familyhomeownership.webp';
import { validateForm } from '../utils/ValidateFields.jsx';

function PasswordResetPage() {
    const { id } = useParams();  //this is the long tokn from the one time access link
    const [newPassword, setNewPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const accountAPI = new AccountAPI();
    const email = localStorage.getItem('email');
    const handleSubmitNewPassword = async (e) => {
        e.preventDefault();
        const formErrors = validateForm([
            {
                fields: {
                    
                    newPassword: { labelText: 'New Password', type: 'password', isRequired: true },
                    confirmedPassword: { labelText: 'Confirm Password', type: 'password', isRequired: true }
                }
            }
        ], formData);

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setErrors({});
        try {
            const isActivated = await accountAPI.ActivateAccount(newPassword, confirmedPassword, email, id);

            if (isActivated) {
                console.log("activatd");
                const token = await accountAPI.Login(email, newPassword);
                if (token) {
                    navigate('/applicant/dashboard');
                }
            }
        } catch (error) {
            console.error('Error resetting password:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));

        const formErrors = validateForm([
            {
                fields: {
                    newPassword: { labelText: 'New Password', type: 'password', isRequired: true },
                    confirmedPassword: { labelText: 'Confirm Password', type: 'password', isRequired: true }
                }
            }
        ], { ...formData, [name]: value });

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            setErrors({});
        }
    };

    return (
        <div className="bg-gray-100 fixed h-screen w-screen max-h-screen max-w-screen flex flex-col shadow-md border border-gray-700"
            style={{
                backgroundImage: `url(${Familyhomeownership})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
            <NavBar />
            <div className='w-full h-auto flex flex-col items-center justify-center mt-20 '>
                <div className='w-full max-w-lg bg-white shadow-lg p-12 rounded-md flex flex-col items-center '>
                    <LogoBlack className='mb-4' width={100} height={100} />
                    <Typography variant="h5" className="mb-4 text-center">Reset Your Password</Typography>
                    <Typography variant="body2" className="mb-4 text-center text-gray-600">Please enter your new password and confirm it to reset your password.</Typography>
                    <form onSubmit={handleSubmitNewPassword} className="w-full">
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
                                    },
                                    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'red'
                                    }
                                }
                            }}
                        >
                            <InputLabel htmlFor="newPassword">New Password</InputLabel>
                            <OutlinedInput
                                id="newPassword"
                                name="newPassword"
                                type='password'
                                value={newPassword}
                                onChange={(e) => { setNewPassword(e.target.value); handleInputChange(e); }}
                                label="New Password"
                                className={errors.newPassword ? 'border-red-500' : ''}
                                error={!!errors.newPassword}
                            />
                            {errors.newPassword && (
                                <Typography className='text-error mt-1'>{errors.newPassword}</Typography>
                            )}
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
                                    },
                                    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'red'
                                    }
                                }
                            }}
                        >
                            <InputLabel htmlFor="confirmedPassword">Confirm Password</InputLabel>
                            <OutlinedInput
                                id="confirmedPassword"
                                name="confirmedPassword"
                                type="password"
                                value={confirmedPassword}
                                onChange={(e) => { setConfirmedPassword(e.target.value); handleInputChange(e); }}
                                label="Confirm Password"
                                className={errors.confirmedPassword ? 'border-red-500' : ''}
                                error={!!errors.confirmedPassword}
                            />
                            {errors.confirmedPassword && (
                                <Typography className='text-error mt-1'>{errors.confirmedPassword}</Typography>
                            )}
                        </FormControl>

                        <div className='flex justify-center items-center mt-6 gap-4'>
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-6 py-2 text-sm font-medium text-black hover:bg-gray-400"
                                onClick={() => navigate('/applicant/dashboard')}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="inline-flex justify-center rounded-md border border-transparent bg-deep-secondary-contrast px-6 py-2 text-sm font-medium text-white hover:bg-deep-secondary-contrast-dark"
                            >
                                Done
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PasswordResetPage;
