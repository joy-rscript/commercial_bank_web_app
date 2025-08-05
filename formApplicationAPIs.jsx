import axios from 'axios';

class FormApplicationAPIs {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:8000/rto', 
      timeout: 100000, 
      headers: {
        'Content-Type': 'application/json',
       
      }
    });
  }

  // const VITE_API_URL = "http://127.0.0.1:8000/api/";
  // const api = axios.create({
  // baseURL: import.meta.env.VITE_API_URL,
// });
  
  async getAllApplications() {
    try {
      const response = await this.api.get('/application/get/');
      return response.data;
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  }


  async getApplication(applicationId) {
    try {
      const response = await this.api.get('/application/get/' + applicationId + '/');
      return response.data;
    } catch (error) {
      console.error('Error fetching application:', error);
      throw error;
    }
  }

 
  async createApplication(applicationData) {
    try {
      const response = await this.api.post('/add_application/', applicationData);

      return response.data;
    } catch (error) {
      console.error('Error creating application:', error);
      throw error;
    }
  }


}

export default new FormApplicationAPIs();
