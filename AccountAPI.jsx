import { api, setAuthToken } from './configurations.jsx';
import axios from 'axios';

class AccountAPI {
    async Login(username, password) {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', 
                {
                "email": username,
                "password": password,
            },
           { headers: {
                'Content-Type': 'application/json',
              },
              timeout: 30000, }
        );
        console.log("!!!!!!LOGIN LOGIN!!!!!!!!!", response)

            const token = response.data.access;
            localStorage.setItem('token', token);
            localStorage.setItem('refresh', response.data.access);
            return token;
        } catch (error) {
            console.error('Login error', error);
        }
    }

    async ActivateAccount(password, re_enter,email, id) {
        try {
            const response = await api.patch(`accounts/complete_setup/${id}`, {
                "email":email,
                "password_1": password,
                "password_2": re_enter,
            });

            if (response.status === 200) {
                return true;
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export default AccountAPI;
