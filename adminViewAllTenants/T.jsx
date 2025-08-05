import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const TenantPropertyStatsGraph = ({ propertyStats }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.chartInstance.update();
    }
  }, [propertyStats]);

  const data = {
    labels: propertyStats.map(stat => stat.date),
    datasets: [
      {
        label: 'Rent Progress',
        data: propertyStats.map(stat => stat.rent_progress),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Equity Progress',
        data: propertyStats.map(stat => stat.equity_progress),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Progress',
        },
      },
    },
  };

  return (
    <div className="h-full">
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default TenantPropertyStatsGraph;
