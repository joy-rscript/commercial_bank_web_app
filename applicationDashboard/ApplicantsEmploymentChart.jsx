import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

export default function ApplicantsEmploymentChart() {
  const [applicantsIncomeData, setApplicantsIncomeData] = useState(null);
  const higher_threshold = 7000;
  const lower_threshold = 2000;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/rto/get_applications/');
        if (response.data.length > 0) {
          const applicants = response.data;

          const higher_earners = applicants.filter(applicant => parseFloat(applicant.current_net_income) > higher_threshold);
          const lower_earners = applicants.filter(applicant => parseFloat(applicant.current_net_income) < lower_threshold);
          const average_earners = applicants.filter(applicant => parseFloat(applicant.current_net_income) >= lower_threshold && parseFloat(applicant.current_net_income) <= higher_threshold);
          
          const totalIncome = applicants.reduce((sum, applicant) => sum + parseFloat(applicant.current_net_income), 0);
          const mean_income = totalIncome / applicants.length;

          const data = {
            higher_earners: higher_earners,
            average_earners: average_earners,
            lower_earners: lower_earners,
            higher_threshold: higher_threshold,
            lower_threshold: lower_threshold,
            mean_income: mean_income.toFixed(2),
            num_applications: applicants.length
          };
          setApplicantsIncomeData(data);
        }
      } catch (error) {
        console.error('Error fetching all applicants:', error);
      }
    };

    fetchData();
  }, []);

  if (!applicantsIncomeData) {
    return <div>Loading...</div>;
  }

  const data = {
    labels: [
      `Higher Income Earners (> ${higher_threshold})`,
      `Average Income Earners (${lower_threshold} - ${higher_threshold})`,
      `Lower Income Earners (< ${lower_threshold})`
    ],
    datasets: [
      {
        data: [
          applicantsIncomeData.higher_earners.length,
          applicantsIncomeData.average_earners.length,
          applicantsIncomeData.lower_earners.length
        ],
        backgroundColor: ['#FFC52A', '#404F58', '#D9D9D9'],
        borderWidth: 1,
        hoverBorderColor: ['#FFC52A', '#404F58', '#D9D9D9'],
        hoverBorderWidth: 1,
        hoverBackgroundColor: ['#FFC52A', '#404F58', '#D9D9D9']
      }
    ]
  };

  const options = {
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem) {
            const dataset = tooltipItem.dataset;
            const total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue);
            const currentValue = dataset.data[tooltipItem.dataIndex];
            const percentage = Math.floor(((currentValue / total) * 100) + 0.5);
            return `${tooltipItem.label}: ${percentage}% (${currentValue})`;
          }
        }
      },
      legend: {
        display: true,
        position: 'right',
        align: 'start',
        labels: {
          fontSize: 25,
          usePointStyle: true,
          boxWidth: 7,
          boxHeight: 7,
        }
      },
      doughnutlabel: {
        labels: [
          {
            text: applicantsIncomeData.num_applications,
            font: {
              size: 25
            }
          },
          {
            text: 'Total Applicants'
          }
        ]
      }
    },
    cutout: '50%',
    devicePixelRatio: 2,
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    }
  };

  return (
    <div className="p-2 rounded-sm m-0">
      <div className="">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}
