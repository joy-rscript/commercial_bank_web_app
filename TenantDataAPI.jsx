import { api, setAuthToken } from './configurations.jsx';

class TenantDataAPI {
  constructor(token) {
    setAuthToken(token);
  }


  async getTenantInfo(property) {
    
    try {
      if (property['property_id']){
      const response = await api.get('property/get_tenant_info', {
        params: { property_id: property['property_id'] }
      });
      return response.data;
    }
      else{
        const response = await api.get('property/get_tenant_info', {
          params: { tenant_id: property['tenant_id'] }
        });
        return response.data;
      }
     
    } catch (error) {
      console.error('Error fetching tenant info:', error);
      throw error;
    }
  }

  async getMonthlySummary(propertyId) {
    try {
      console.log('propertyId:', propertyId);

      const response = await api.get('property/monthly_summary', {
        params: { property_id: propertyId }
      });

      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error fetching monthly summary:', error);
      throw error;
    }
  }

  
  async getPropertyPaymentHistory(propertyId) {
    const current_date = new Date();
    try {
      const response = await api.get('property/get_receipts', {
        params: { property: propertyId, year: current_date.getFullYear() }
      });

      console.log("",response);
      return response.data;
    } catch (error) {
      console.error('Error fetching property payment history:', error);
      throw error;
    }}


  async getEquityGrowth(propertyId) {
    try {
      console.log('propertyId:', propertyId);

      const response = await api.get('property/equity_growth', {
        params: { property_id: propertyId }
      });

      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error fetching equity growth summary:', error);
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

  async createNewIssue(propertyData) {
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

export default TenantDataAPI;
