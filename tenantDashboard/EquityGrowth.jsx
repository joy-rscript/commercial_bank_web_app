import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { FaEllipsisV } from 'react-icons/fa';
import TenantDataAPI from '../../services/TenantDataAPI'; // Ensure you have the correct path to your API file

function EquityGrowth({ summary, tenantData }) {
  const propertyId = 38; 
  const [year, setYear] = useState(new Date().getFullYear());
  const token = localStorage.getItem('token');
  const tenantDataAPI = new TenantDataAPI(token);
  const [equityData, setEquityData] = useState(null);

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  useEffect(() => {
    const fetchEquityData = async () => {
      try {
        const fetchedEquityData = await tenantDataAPI.getEquityGrowth(propertyId);
        setEquityData(fetchedEquityData);
      } catch (error) {
        console.error('Error fetching equity growth data:', error);
      }
    };

    fetchEquityData();
  }, [propertyId]);

  const cumulativeEquityData = equityData
    ? monthNames.map((month, index) => {
        return equityData['cumulative_equity'][index + 1] || 0; 
      })
    : [];

  const chartData = {
    labels: monthNames,
    datasets: [
      {
        label: 'Equity Growth',
        data: cumulativeEquityData,
        fill: false,
        borderColor: 'rgba(255,159,64,1)',
        tension: 0.1,
        pointRadius: 2, 
        pointBackgroundColor: 'rgba(255,159,64,1)',
      }
    ]
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          boxWidth: 2,
          boxHeight: 2,
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Months'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Amount'
        }
      }
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 0
      }
    }
  };


  // Handle missing or null data gracefully
  const equityRatio = Number(equityData?.['equity_ratio'] || 0).toFixed(2);
  const totalEquity = Number(equityData?.['total_equity'] || 0).toFixed(2);
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="ml-6 justify-start">
          <div className="flex flex-row justify-start">
            <h2 className="text-xl font-medium text-gray-700">Ownership Status</h2>
          </div>
          <p className="px-1 text-sm font-thin text-gray-600 pt-2">{"HOUSE NUMBER "+ tenantData?.house_number + ", "+tenantData?.project_name|| tenantData?.location}</p>
        </div>
        <div className='flex flex-row justify-end items-center'>
          <h1 className="text-xl px-1 font-bold text-money">{equityRatio * 100}%</h1>
          <FaEllipsisV className="text-gray-500" />
        </div>
      </div>
      <div className="flex row pl-6 justify-start items-end mt-2 gap-2">
        <h1 className='font-bold text-gray-600 text-4xl'>{totalEquity >= 1000 ? `${((totalEquity) / 1000).toFixed(1)}k` : totalEquity}</h1>
        <div className='flex flex-row gap-1 bg-transparent'>
          <h4 className='text-gray-600 text-sm'>, Total Equity</h4>
          <p className="text-sm font-extralight px-1 text-money">{year}</p>
        </div>
      </div>
      <div className="equity-growth-container flex justify-" style={{ width: '100%', height: '40vh' }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default EquityGrowth;
