import React, { useEffect, useState } from 'react';
import SystemLogAPI from '../../services/SystemLogAPI';

function SystemLogsPage() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('token');
  const systemLogAPI = new SystemLogAPI(token);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const logData = await systemLogAPI.getAllSystemLogs();
        setLogs(logData);
      } catch (error) {
        console.error('Error fetching system logs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, [systemLogAPI]);

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <h1 className="text-2xl mb-5 font-semibold text-gray-800">System Logs</h1>
      {isLoading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <div className="flex flex-col space-y-4">
          {logs.map((log, index) => (
            <div key={index} className="flex p-4 bg-white rounded-lg shadow-md space-x-4">
              <span className="w-48 font-bold text-gray-700">{new Date(log.timestamp).toLocaleString()}</span>
              <span className="w-64 italic text-gray-600">
                {log.user.l_name} ({log.user.id} - {log.user.role_type})
              </span>
              <span className="w-40 text-gray-700">{log.action_type}</span>
              <span className="flex-1 text-gray-600">{log.description}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SystemLogsPage;
