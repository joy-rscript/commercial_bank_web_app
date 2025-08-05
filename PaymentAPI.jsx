import axios from 'axios';

class PaymentAPI {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async createPayment(paymentData) {
    try {
      const response = await this.client.post('/create_payment', paymentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getPayments() {
    try {
      const response = await this.client.get('/payments');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getSchedule(propId){
    try {
   
      const response = await this.client.get(`dashboard/model/getUserModel`, {
        params: { property_id: propId }
      });

      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error fetching property:', error);
      throw error;
    }
  }


  async assignTenant(propId){

    try {
   
      const response = await this.client.get(`property/assign_property`, {
        params: {
          "project_id" : 2,
          "tenant_id" : 37,
          "cost_per_unit" : 304000  ,
          "target_rental_yield" :0.10,
          "init_down_payment" : 0.10,
          "annual_rent_increase" : 0.10,
          "annual_home_value_increase" : 20,
          "years_to_pay_init_cost" : 20,
          "per_unit_markup_cost" : 0.0,
          "annual_equity_pymt_increase" :0.0
      }
      });

      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error fetching property:', error);
      throw error;
    }
  }

  async updatePayment(paymentId, paymentData) {
    try {
      const response = await this.client.patch(`/payments/${paymentId}`, paymentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new PaymentAPI('http://localhost:8000/rto');
