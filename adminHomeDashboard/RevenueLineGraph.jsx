import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { FaEllipsisV } from 'react-icons/fa';

export default function RevenueLineGraph() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [revenueStats, setRevenueStats] = useState({});
  const [monthlyStats, setMonthlyStats] = useState({});
  const [currentStats, setCurrentStats] = useState({});
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allRevenueStats = {
          2023: {
            revenue_received: 100000,
            outstanding_revenue: 50000,
            expected_revenue: 200000,
            total_tenants: 72,
            paid_up_tenants: 42,
            outstanding_tenants: 30
          },
          2024: {
            revenue_received: 150000,
            outstanding_revenue: 40000,
            expected_revenue: 210000,
            total_tenants: 82,
            paid_up_tenants: 52,
            outstanding_tenants: 30
          }
        };

        const revenueStatsPerMonth = {
          2023: {
            1: { revenue_received: 8000, outstanding_revenue: 2000, expected_revenue: 12000, total_tenants: 6, paid_up_tenants: 4, outstanding_tenants: 2 },
            2: { revenue_received: 9000, outstanding_revenue: 3000, expected_revenue: 15000, total_tenants: 7, paid_up_tenants: 5, outstanding_tenants: 2 },
            3: { revenue_received: 10000, outstanding_revenue: 4000, expected_revenue: 18000, total_tenants: 9, paid_up_tenants: 6, outstanding_tenants: 3 },
            4: { revenue_received: 11000, outstanding_revenue: 5000, expected_revenue: 19000, total_tenants: 10, paid_up_tenants: 7, outstanding_tenants: 3 },
            5: { revenue_received: 12000, outstanding_revenue: 6000, expected_revenue: 20000, total_tenants: 11, paid_up_tenants: 8, outstanding_tenants: 3 },
            6: { revenue_received: 13000, outstanding_revenue: 7000, expected_revenue: 21000, total_tenants: 12, paid_up_tenants: 9, outstanding_tenants: 3 },
            7: { revenue_received: 14000, outstanding_revenue: 8000, expected_revenue: 22000, total_tenants: 13, paid_up_tenants: 10, outstanding_tenants: 3 },
            8: { revenue_received: 15000, outstanding_revenue: 9000, expected_revenue: 23000, total_tenants: 14, paid_up_tenants: 11, outstanding_tenants: 3 },
            9: { revenue_received: 16000, outstanding_revenue: 10000, expected_revenue: 24000, total_tenants: 15, paid_up_tenants: 12, outstanding_tenants: 3 },
            10: { revenue_received: 17000, outstanding_revenue: 11000, expected_revenue: 25000, total_tenants: 16, paid_up_tenants: 13, outstanding_tenants: 3 },
            11: { revenue_received: 18000, outstanding_revenue: 12000, expected_revenue: 26000, total_tenants: 17, paid_up_tenants: 14, outstanding_tenants: 3 },
            12: { revenue_received: 19000, outstanding_revenue: 13000, expected_revenue: 27000, total_tenants: 18, paid_up_tenants: 15, outstanding_tenants: 3 }
          },
          2024: {
            1: { revenue_received: 8000, outstanding_revenue: 2000, expected_revenue: 12000, total_tenants: 6, paid_up_tenants: 4, outstanding_tenants: 2 },
            2: { revenue_received: 9000, outstanding_revenue: 3000, expected_revenue: 15000, total_tenants: 7, paid_up_tenants: 5, outstanding_tenants: 2 },
            3: { revenue_received: 10000, outstanding_revenue: 4000, expected_revenue: 18000, total_tenants: 9, paid_up_tenants: 6, outstanding_tenants: 3 },
            4: { revenue_received: 11000, outstanding_revenue: 5000, expected_revenue: 19000, total_tenants: 10, paid_up_tenants: 7, outstanding_tenants: 3 },
            5: { revenue_received: 12000, outstanding_revenue: 6000, expected_revenue: 20000, total_tenants: 11, paid_up_tenants: 8, outstanding_tenants: 3 },
            6: { revenue_received: 13000, outstanding_revenue: 7000, expected_revenue: 21000, total_tenants: 12, paid_up_tenants: 9, outstanding_tenants: 3 },
            7: { revenue_received: 14000, outstanding_revenue: 8000, expected_revenue: 22000, total_tenants: 13, paid_up_tenants: 10, outstanding_tenants: 3 },
            8: { revenue_received: 15000, outstanding_revenue: 9000, expected_revenue: 23000, total_tenants: 14, paid_up_tenants: 11, outstanding_tenants: 3 },
            9: { revenue_received: 16000, outstanding_revenue: 10000, expected_revenue: 24000, total_tenants: 15, paid_up_tenants: 12, outstanding_tenants: 3 },
            10: { revenue_received: 17000, outstanding_revenue: 11000, expected_revenue: 25000, total_tenants: 16, paid_up_tenants: 13, outstanding_tenants: 3 },
            11: { revenue_received: 18000, outstanding_revenue: 12000, expected_revenue: 26000, total_tenants: 17, paid_up_tenants: 14, outstanding_tenants: 3 },
            12: { revenue_received: 19000, outstanding_revenue: 13000, expected_revenue: 27000, total_tenants: 18, paid_up_tenants: 15, outstanding_tenants: 3 }
          }
        };

        setMonthlyStats(revenueStatsPerMonth);
        setRevenueStats(allRevenueStats);
      } catch (error) {
        console.error('Error fetching all applicants:', error);
      }
    };

    fetchData();
  }, []);

  const currentYearStats = monthlyStats[year] || {};

  const data = {
    // X axis
    labels: monthNames,
    // line labeling & graph data
    datasets: [
        {
          label: 'Revenue Received',
          data: Object.keys(currentYearStats).map(month => currentYearStats[month]?.revenue_received || 0),
          borderColor: '#199653', // Yellow
          backgroundColor: '#199653', 
          fill: false,
          tension: 1
        },
        {
          label: 'Outstanding Revenue',
          data: Object.keys(currentYearStats).map(month => currentYearStats[month]?.outstanding_revenue || 0),
          borderWidth: 1,
          borderColor: '#EB3223', 
          backgroundColor: '#EB3223',
          fill: false,
          tension: 1
        }
      ]
  };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                 display: false
            },
            title: {
                display: false,
                text: `${monthNames[month - 1]} ${year}`,
                position: 'left'
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: false
                }
            }
        }
    };

  return (
    <div className="bg-white pr-0 p-4 pt-0 w-full h-3/5 rounded-xl ">
<div className="px-2 py-1 sm:px-4 flex justify-between items-center sticky top-0 ">
                <div>
                  <h1 className="text-xl font-thin text-gray-900 py-4 ">Revenue Growth</h1>
                    <p className=" max-w-2xl text-sm text-gray-500 "> {monthNames[month - 1]} {year}</p>
                </div>
                <FaEllipsisV className="text-gray-500" />
            </div>
      <Line className='m-0 w-full pr-0' data={data} options={options} />
    </div>
  );
}
