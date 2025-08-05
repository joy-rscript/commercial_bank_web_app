import { api, setAuthToken } from './configurations.jsx';

class DeveloperAPI {
  constructor(token) {
    setAuthToken(token);
  }

  async getDeveloper(developerId) {
    try {
      console.log('developerId:', developerId);

      const response = await api.get('/developers/get_developer', {
        params: { id: developerId }
      });

      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error fetching developer:', error);
      throw error;
    }
  }

  async getAllDevelopers() {
    try {
      const response = await api.get('developers/get_all_developers', {
      });

      console.log("GET DEVELOPER: ",response);
      return response.data;
    } catch (error) {
      console.error('Error fetching developers:', error);
      throw error;
    }
  }

  async getDeveloperOccupancyStats() {
    try {
      const response = await api.get(`/dashboard/admin/developers`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error fetching developer occupancy data:', error);
      throw error;
    }
  }

  async getDevelopersByLocation() {
    try {
      const response = await api.get('dashboard/admin/home', 
        {});
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error fetching developers by location:', error);
      throw error;
    }
  }

  async createDeveloper(developerData) {
    try {
      const response = await api.post('/developers/create_developer', developerData);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error creating developer:', error);
      throw error;
    }
  }
}

export default DeveloperAPI;
