import { api, setAuthToken } from './configurations.jsx';

class PropertyAPI {
  constructor(token) {
    setAuthToken(token);
  }

  async getProperty(propertyId) {
    try {
      console.log('propertyId:', propertyId);

      const response = await api.get('/developer_projects/get_project', {
        params: { id: propertyId }
      });

      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error fetching property:', error);
      throw error;
    }
  }

  async getAllProperties() {
    try {

      const response = await api.get('developer_projects/get_all_projects', {
      });

      console.log("PROP line 30",response);
      return response.data;
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
  }

  async createProperty(propertyData) {
    try {
      const response = await api.post('/developer_projects/create_property', propertyData);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error creating property:', error);
      throw error;
    }
  }
}

export default PropertyAPI;
