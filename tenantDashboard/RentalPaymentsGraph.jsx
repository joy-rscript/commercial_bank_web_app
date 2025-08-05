import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { FaEllipsisV } from 'react-icons/fa';
import { BsFillHouseCheckFill, BsFillHouseExclamationFill } from "react-icons/bs";

function RentalPaymentsGraph() {
  const [viewOption, setViewOption] = useState('revenue'); // Changed to lowercase 'revenue'
  const [year, setYear] = useState(new Date().getFullYear());
  const [propertyData, setPropertyData] = useState([
    {
      "developer_name": "Crestview Developers",
      "house_number": "07 CAMERON STREET",
      "property_id": "12345",
      "location": "Downtown"
    }
  ]);
  const [revenueStats, setRevenueStats] = useState({
    "2023": {
      "revenue": {
        "Jan": 1500,
        "Feb": 1400,
        "Mar": 1550,
        "Apr": 1600,
        "May": 1700,
        "Jun": 1650,
        "Jul": 1800,
        "Aug": 1750,
        "Sep": 1600,
        "Oct": 1550,
        "Nov": 1700,
        "Dec": 1800
      },
      "expected": {
        "Jan": 2000,
        "Feb": 2000,
        "Mar": 2000,
        "Apr": 2000,
        "May": 2000,
        "Jun": 2000,
        "Jul": 2000,
        "Aug": 2000,
        "Sep": 2000,
        "Oct": 2000,
        "Nov": 2000,
        "Dec": 2000
      },
      "outstanding": {
        "Jan": 500,
        "Feb": 600,
        "Mar": 450,
        "Apr": 400,
        "May": 300,
        "Jun": 350,
        "Jul": 200,
        "Aug": 250,
        "Sep": 400,
        "Oct": 450,
        "Nov": 300,
        "Dec": 200
      },
      "equity_ratio": {
        "Jan": 0.25,
        "Feb": 0.26,
        "Mar": 0.27,
        "Apr": 0.28,
        "May": 0.29,
        "Jun": 0.30,
        "Jul": 0.31,
        "Aug": 0.32,
        "Sep": 0.33,
        "Oct": 0.34,
        "Nov": 0.35,
        "Dec": 0.36
      }
    }
  });

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating fetched data
        const fetchedData = {
          "2023": {
            "revenue": {
              "Jan": 1500,
              "Feb": 1400,
              "Mar": 1550,
              "Apr": 1600,
              "May": 1700,
              "Jun": 1650,
              "Jul": 1800,
              "Aug": 1750,
              "Sep": 1600,
              "Oct": 1550,
              "Nov": 1700,
              "Dec": 1800
            },
            "expected": {
              "Jan": 2000,
              "Feb": 2000,
              "Mar": 2000,
              "Apr": 2000,
              "May": 2000,
              "Jun": 2000,
              "Jul": 2000,
              "Aug": 2000,
              "Sep": 2000,
              "Oct": 2000,
              "Nov": 2000,
              "Dec": 2000
            },
            "outstanding": {
              "Jan": 500,
              "Feb": 600,
              "Mar": 450,
              "Apr": 400,
              "May": 300,
              "Jun": 350,
              "Jul": 200,
              "Aug": 250,
              "Sep": 400,
              "Oct": 450,
              "Nov": 300,
              "Dec": 200
            },
            "equity_ratio": {
              "Jan": 0.25,
              "Feb": 0.26,
              "Mar": 0.27,
              "Apr": 0.28,
              "May": 0.29,
              "Jun": 0.30,
              "Jul": 0.31,
              "Aug": 0.32,
              "Sep": 0.33,
              "Oct": 0.34,
              "Nov": 0.35,
              "Dec": 0.36
            }
          }
        };

        setRevenueStats(fetchedData);
        setYear(Object.keys(fetchedData).sort().pop()); // Set the most recent year

      } catch (error) {
        console.error('Error fetching revenue stats:', error);
      }
    };

    fetchData();
  }, []);

  const currentYearStats = revenueStats[year] || { revenue: {}, equity_ratio: {} };

  const currentMonth = new Date().toLocaleString('default', { month: 'short' });

  const paymentStatus = currentYearStats.outstanding?.[currentMonth] === 0 ? 'PAID' : 'DUE';
  const statusColor = paymentStatus === 'PAID' ? 'text-green-600' : 'text-light-error';
  const statusIcon = paymentStatus === 'PAID' ? <BsFillHouseCheckFill className="text-green-600" /> : <BsFillHouseExclamationFill className="text-light-error" />;

  const data = {
    labels: monthNames.map(month => month.substring(0, 1)),
    datasets: [
      {
        label: viewOption === 'equity' ? 'Equity Ratio' : 'Rentals Paid',
        data: monthNames.map(month => viewOption === 'equity' 
          ? (currentYearStats['equity_ratio']?.[month] ?? 0) 
          : (currentYearStats['revenue']?.[month] ?? 0)
        ),
        borderColor: viewOption === 'equity' ? '#FF6384' : '#FFC52A',
        backgroundColor: viewOption === 'equity' ? 'rgba(255, 99, 132, 0.2)' : 'rgba(255, 197, 42, 0.2)',
        fill: false,
        tension: 0.1,
        pointRadius: 0 // smooth graph
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        display: true,
        labels: {
          font: {
            size: 9
          }
        }
        
      },
      title: {
        display: false,
        text: `${year}`,
        position: 'left'
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        title: {
          display: true,
          text: 'Period (month)',
          font: {
            size: 9
          }
        },
        ticks: {
          font: {
            size: 9
          }
        }
      },
      y: {
        grid: {
          display: false
        },
        min: 0,
        ticks: {
          font: {
            size: 9
          },
          stepSize: viewOption === 'equity' ? 0.05 : 500, // Adjust step size based on viewOption
          maxTicksLimit: viewOption === 'equity' ? 10 : 10, // Adjust max ticks limit based on viewOption
          callback: function(value) {
            return viewOption === 'equity' ? value.toFixed(2) : `${value / 1000}k`;
          }},
        title: {
          display: false,
          text: viewOption === 'equity' ? 'Equity Ratio' : 'Revenue (k)',
          font: {
            size: 9
          }
        }
      }
    }
  };

  return (
  <div >
   <div className="flex justify-between items-center mb-4">
      <div className="">
        <div className="flex flex-row justify-between items-center p-0 ">
          {statusIcon}
          <h2 className="text-lg px-1 font-medium text-gray-700">{propertyData[0].developer_name}</h2>
        </div>
            <p className="ml-8 text-sm font-thin text-gray-600">{propertyData[0]?.house_number || propertyData[0]?.location}</p>
          
        </div>
        <div className='flex flex-row justify-end items-center'>
          <div className={`text-md font-bold px-1 ${statusColor}`}>{paymentStatus}</div>
          <FaEllipsisV className="text-gray-500" />
        </div>
        
      </div>
      <div className="flex flex-row justify-start items-center mt-2">
      <select value={viewOption} onChange={(e) => setViewOption(e.target.value)} className="text-sm font-thin text-gray-600 px-1 hover:bg-transparent focus:bg-transparent focus:outline-none">
          <option value="revenue">Rental Payments</option>
          <option value="equity">Equity Growth</option>
        </select>
        <p className="text-sm font-thin  text-gray-600">{year}</p>
       
      </div>
      <div >
        <Line data={data} options={options}/>
      </div>
  </div>
  );
}

export default RentalPaymentsGraph;


      
   
    
