import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import DeveloperAPI from '../../services/DeveloperAPI.jsx';

export default function TopLocationsChart() {
  const token = localStorage.getItem('token');
  const developerAPI = new DeveloperAPI(token);
  const [developersData, setDevelopersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await developerAPI.getDevelopersByLocation();
        console.log('Fetched Data:', data);
        if (Array.isArray(data)) {
          setDevelopersData(data);
        } else {
          setDevelopersData([data]);
        }
      } catch (error) {
        console.error('Error fetching developers:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log('Developers Data State:', developersData);
  }, [developersData]);

  const totalUnits = developersData.length > 0 ? developersData[0].total_units : 0;
  const avgUnitPrice = developersData.length > 0 ? developersData[0].avg_unit_price : 0;
  const averageRent = developersData.length > 0 ? developersData[0].average_rent : 0;
  const occupancyRate = developersData.length > 0 ? developersData[0].occupancy_rate : 0;

  const developmentsPerLocation = developersData.length > 0 ? developersData[0].developments_per_location : {};
  console.log('Developments Per Location:', developmentsPerLocation);
  const sortedLocations = Object.entries(developmentsPerLocation)
    .sort((a, b) => b[1] - a[1])
    .map(([location, count]) => ({ location, count, percentage: (count / totalUnits) * 100 }));

  console.log('Sorted Locations:', sortedLocations);

  const chartData = {
    labels: sortedLocations.slice(0, 3).map(item => item.location),
    datasets: [
      {
        data: sortedLocations.slice(0, 3).map(item => item.count),
        backgroundColor: ['#404F58', '#FFC52A', '#F0D962'],
        borderWidth: 1,
        borderRadius: {
          topLeft: 5,
          topRight: 5,
          bottomLeft: 5,
          bottomRight: 5,
        },
        barThickness: 18,
        maxBarThickness: 18,
        hoverBorderWidth: 1,
        hoverBorderColor: ['#404F58', '#FFC52A', '#F0D962'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Developments per location',
        align: 'start',
        font: {
          weight: '200',
          size: 10,
          color: '#616161',
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: tooltipItem => {
            const location = tooltipItem.label;
            const count = developmentsPerLocation[location];
            return `${count} properties (${Math.ceil((count / totalUnits) * 100)}%)`;
          },
        },
      },
      datalabels: {
        color: context => {
          const value = context.dataset.data[context.dataIndex];
          const percentage = (value / totalUnits) * 100;
          return percentage > 30 ? '#ffffff' : '#000000';
        },
        anchor: 'end',
        align: context => {
          const value = context.dataset.data[context.dataIndex];
          const percentage = (value / totalUnits) * 100;
          return percentage > 30 ? 'end' : 'start';
        },
        offset: 10,
        formatter: (value, context) => {
          const location = context.chart.data.labels[context.dataIndex];
          const percentage = sortedLocations.find(item => item.location === location).percentage;
          return `${location} (${Math.ceil(percentage)}%)`;
        },
        font: {
          weight: 'bold',
          size: 12,
        },
      },
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="text-faint w-full justify-between rounded-lg pb-2">
      <div className='pl-3'>
        <Bar data={chartData} options={options} plugins={[ChartDataLabels]} />
      </div>
      <div className="flex justify-between p-2 mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12">
        <div className="text-faint flex flex-col justify-start items-start gap-2 text-xs sm:text-sm md:text-sm lg:text-base xl:text-base">
          <span>Total Units</span>
          <span>Average Unit Price</span>
          <span>Average Rent</span>
          <span>Occupancy Rate</span>
        </div>
        <div className="text-faint flex flex-col justify-end items-end gap-2 text-xs sm:text-sm md:text-sm lg:text-base xl:text-base">
          <span>{totalUnits}</span>
          <span className='text-money'>{avgUnitPrice}c</span>
          <span className='text-money'>{averageRent}c</span>
          <span>{occupancyRate} %</span>
        </div>
      </div>
    </div>
  );
}
