import { api, setAuthToken } from './configurations.jsx';

class SystemLogAPI {
  constructor(token) {
    setAuthToken(token);
  }

  async getAllSystemLogs() {
    try {
      const response = await api.get('system_logs/get_all_logs');
      console.log("System logs response:", response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching system logs:', error);
      throw error;
    }
  }

  async deleteLog(logId) {
    try {
      const response = await api.delete('system_logs/delete_log', {
        params: { id: logId }
      });
      console.log("Log deletion response:", response);
      return response.data;
    } catch (error) {
      console.error('Error deleting log:', error);
      throw error;
    }
  }
}

export default SystemLogAPI;
