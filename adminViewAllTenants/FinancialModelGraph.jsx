import { Container } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables);

const FinancialModelGraph = ({ financialData }) => {
  const [graphData, setGraphData] = useState(null);
  const [yAxisStepSize, setYAxisStepSize] = useState(5000);
  const containerRef = useRef(null);

  useEffect(() => {
    const calculateStepSize = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.clientHeight;
        const newStepSize = Math.max(1000, Math.floor(containerHeight / 10));
        setYAxisStepSize(newStepSize);
      }
    };

    calculateStepSize();
    window.addEventListener('resize', calculateStepSize);

    return () => {
      window.removeEventListener('resize', calculateStepSize);
    };
  }, []);

  useEffect(() => {
    const monthlyRentAmount = Array.from({ length: 240 }, (_, i) => 2500 + (i % 12) * 100);
    const totalMonthlyPayment = Array.from({ length: 240 }, (_, i) => 3800 + (i % 12) * 100);
    const totalAnnualAmountPaid = Array.from({ length: 240 }, (_, i) => (3800 + (i % 12) * 100) * ((i % 12) + 1));

    const labels = [];
    for (let year = 2024; year <= 2040; year++) {
      for (let month = 0; month < 12; month++) {
        labels.push(new Date(year, month, 1));
      }
    }

    const dummyGraphData = {
      labels: labels,
      datasets: [
        {
          label: 'Monthly Rent Amount',
          data: monthlyRentAmount,
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false,
          yAxisID: 'y1',
        },
        {
          label: 'Total Monthly Payment',
          data: totalMonthlyPayment,
          borderColor: 'rgba(255, 99, 132, 1)',
          fill: false,
          yAxisID: 'y1',
        },
        {
          label: 'Total Annual Amount Paid',
          data: totalAnnualAmountPaid,
          borderColor: 'rgba(54, 162, 235, 1)',
          fill: false,
          yAxisID: 'y2',
        },
        {
          label: 'Equity',
          data: Array.from({ length: 240 }, (_, i) => (i % 12) * 1000),
          borderColor: 'rgba(255, 159, 64, 1)',
          fill: false,
          yAxisID: 'y2',
        },
      ],
    };

    setGraphData(dummyGraphData);
  }, [financialData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
          displayFormats: {
            month: 'mmm yyyy',  // Show month and year format
          },
        },
        ticks: {
          autoSkip: false,    // Show all ticks
          maxRotation: 0,
          minRotation: 45,
          maxTicksLimit: 30,  // Increase max ticks limit to display more months
        },
      },
      y1: {
        type: 'linear',
        position: 'left',
        ticks: {
          stepSize: yAxisStepSize,
        },
        title: {
          display: true,
          text: 'Large Values (e.g., Total Annual Amount Paid)',
        },
      },
      y2: {
        type: 'linear',
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          stepSize: 5000,
        },
        title: {
          display: true,
          text: 'Smaller Values (e.g., Equity)',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <Container className='w-full h-full'>
      <div ref={containerRef} className='w-full h-[86vh] overflow-x-auto'>
        {graphData ? (
          <Line data={graphData} options={options} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </Container>
  );
};

export default FinancialModelGraph;