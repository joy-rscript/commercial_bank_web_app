import { api, setAuthToken } from './configurations.jsx';

class OnboardingAPI {
  constructor(token) {
    setAuthToken(token);
  }


  async getApplicationBySection(appDetails) {
    try {

       let response;
       if (appDetails['id']) {
         response = await api.get(`http://localhost:8000/rto/get_application_sections`, {
           params: {
             "id": appDetails['id']
           }
         })

       } else {
         response = await api.get(`http://localhost:8000/rto/get_application_sections`, {
           params: {
             "email": appDetails['email']
           }
         })
       }
       console.log("222222222222", response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching form data:', error);
      throw error;
    }
  }

  async getOnboardingApps() {
    try {

      const response = await api.get('get_applications/', {
      });

      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error fetching forms :', error);
      throw error;
    }
  }

  
  async updateOnboardingApp(form) {
    try {
      const response = await api.put(`update_application`, {
            "id": form.id,
            "approved": form.approved,
            "approval_reason":form.approval_reason,
      });

      return response.data;
    } catch (error) {
      console.error('Error updating form :', error);
      throw error;
    }}


  async createOnboardingSubmission(formData) {
    try {
      const response = await api.post('add_application', formData);
      console.log("!!!!!!1",response);
      return response;
    } catch (error) {
      console.error('Error creating form:', error);
      throw error;
    }
  }
}

export default OnboardingAPI;
