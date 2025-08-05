import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

export default function RTOGoalDetails({rtoProperty}) {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1); // Initialize to current month
    const [revenueStats, setRevenueStats] = useState({});
    const [monthlyStats, setMonthlyStats] = useState({});
    const [currentStats, setCurrentStats] = useState({});
    const [summary, setSummary] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                setSummary({
                    "cumm_revenue_received": 400000,
                    "init_value": 300000,
                    "terminal_value": 200000,
                    "annual_revenue": 100000,
                    "acquired_interest": 9000,  //how is this of intereets to the client??
                    "acquired_equity": 10000,
                    "equity_ratio": 0.4,
                    "penalty": 0,
          
                  })
                
                const allRevenueStats = { 
                    2023:  {revenue_received: 100000,
                        outstanding_revenue: 50000,
                        expected_revenue: 200000,
                        total_tenants:72,
                        paid_up_tenants:42,
                        outstanding_tenants:30},
                    2024:{revenue_received: 150000,
                        outstanding_revenue: 40000,
                        expected_revenue: 210000,
                        total_tenants:82,
                        paid_up_tenants:52,
                        outstanding_tenants:30}
                }

                const revenueStatsPerMonth= {
                    2023:{
                        1: {
                                revenue_received: 8000,
                                outstanding_revenue: 2000,
                                expected_revenue: 12000,
                                total_tenants: 6,
                                paid_up_tenants: 4,
                                outstanding_tenants: 2
                            },
                        2: {
                            revenue_received: 9000,
                            outstanding_revenue: 3000,
                            expected_revenue: 15000,
                            total_tenants: 7,
                            paid_up_tenants: 5,
                            outstanding_tenants: 2
                        },
                        3: {
                            revenue_received: 10000,
                            outstanding_revenue: 4000,
                            expected_revenue: 18000,
                            total_tenants: 9,
                            paid_up_tenants: 6,
                            outstanding_tenants: 3
                        },
                        4: {
                            revenue_received: 11000,
                            outstanding_revenue: 5000,
                            expected_revenue: 19000,
                            total_tenants: 10,
                            paid_up_tenants: 7,
                            outstanding_tenants: 3
                        },
                        5: {
                            revenue_received: 12000,
                            outstanding_revenue: 6000,
                            expected_revenue: 20000,
                            total_tenants: 11,
                            paid_up_tenants: 8,
                            outstanding_tenants: 3
                        },
                        6: {
                            revenue_received: 13000,
                            outstanding_revenue: 7000,
                            expected_revenue: 21000,
                            total_tenants: 12,
                            paid_up_tenants: 9,
                            outstanding_tenants: 3
                        },
                        7: {
                            revenue_received: 14000,
                            outstanding_revenue: 8000,
                            expected_revenue: 22000,
                            total_tenants: 13,
                            paid_up_tenants: 10,
                            outstanding_tenants: 3
                        },
                        8: {
                            revenue_received: 15000,
                            outstanding_revenue: 9000,
                            expected_revenue: 23000,
                            total_tenants: 14,
                            paid_up_tenants: 11,
                            outstanding_tenants: 3
                        },
                        9: {
                            revenue_received: 16000,
                            outstanding_revenue: 10000,
                            expected_revenue: 24000,
                            total_tenants: 15,
                            paid_up_tenants: 12,
                            outstanding_tenants: 3
                        },
                        10: {
                            revenue_received: 17000,
                            outstanding_revenue: 11000,
                            expected_revenue: 25000,
                            total_tenants: 16,
                            paid_up_tenants: 13,
                            outstanding_tenants: 3
                        },
                        11: {
                            revenue_received: 18000,
                            outstanding_revenue: 12000,
                            expected_revenue: 26000,
                            total_tenants: 17,
                            paid_up_tenants: 14,
                            outstanding_tenants: 3
                        },
                        12: {
                            revenue_received: 19000,
                            outstanding_revenue: 13000,
                            expected_revenue: 27000,
                            total_tenants: 18,
                            paid_up_tenants: 15,
                            outstanding_tenants: 3
                        }
                    }
                    ,
                    2024:{
                        1: {
                                revenue_received: 8000,
                                outstanding_revenue: 2000,
                                expected_revenue: 12000,
                                total_tenants: 6,
                                paid_up_tenants: 4,
                                outstanding_tenants: 2
                            },
                        2: {
                            revenue_received: 9000,
                            outstanding_revenue: 3000,
                            expected_revenue: 15000,
                            total_tenants: 7,
                            paid_up_tenants: 5,
                            outstanding_tenants: 2
                        },
                        3: {
                            revenue_received: 10000,
                            outstanding_revenue: 4000,
                            expected_revenue: 18000,
                            total_tenants: 9,
                            paid_up_tenants: 6,
                            outstanding_tenants: 3
                        },
                        4: {
                            revenue_received: 11000,
                            outstanding_revenue: 5000,
                            expected_revenue: 19000,
                            total_tenants: 10,
                            paid_up_tenants: 7,
                            outstanding_tenants: 3
                        },
                        5: {
                            revenue_received: 12000,
                            outstanding_revenue: 6000,
                            expected_revenue: 20000,
                            total_tenants: 11,
                            paid_up_tenants: 8,
                            outstanding_tenants: 3
                        },
                        6: {
                            revenue_received: 13000,
                            outstanding_revenue: 7000,
                            expected_revenue: 21000,
                            total_tenants: 12,
                            paid_up_tenants: 9,
                            outstanding_tenants: 3
                        },
                        7: {
                            revenue_received: 14000,
                            outstanding_revenue: 8000,
                            expected_revenue: 22000,
                            total_tenants: 13,
                            paid_up_tenants: 10,
                            outstanding_tenants: 3
                        },
                        8: {
                            revenue_received: 15000,
                            outstanding_revenue: 9000,
                            expected_revenue: 23000,
                            total_tenants: 14,
                            paid_up_tenants: 11,
                            outstanding_tenants: 3
                        },
                        9: {
                            revenue_received: 16000,
                            outstanding_revenue: 10000,
                            expected_revenue: 24000,
                            total_tenants: 15,
                            paid_up_tenants: 12,
                            outstanding_tenants: 3
                        },
                        10: {
                            revenue_received: 17000,
                            outstanding_revenue: 11000,
                            expected_revenue: 25000,
                            total_tenants: 16,
                            paid_up_tenants: 13,
                            outstanding_tenants: 3
                        },
                        11: {
                            revenue_received: 18000,
                            outstanding_revenue: 12000,
                            expected_revenue: 26000,
                            total_tenants: 17,
                            paid_up_tenants: 14,
                            outstanding_tenants: 3
                        },
                        12: {
                            revenue_received: 19000,
                            outstanding_revenue: 13000,
                            expected_revenue: 27000,
                            total_tenants: 18,
                            paid_up_tenants: 15,
                            outstanding_tenants: 3
                        }
                    }
                                    
                }

                setMonthlyStats(revenueStatsPerMonth);
                setRevenueStats(allRevenueStats);
            } catch (error) {
                console.error('Error fetching all applicants:', error);
            }
        };
  
      fetchData();
    }, []);

    useEffect(() => {
        const updateCurrentStats = () => {
            if (month !== null) {
                setCurrentStats(monthlyStats[year]?.[month] || {});
            } else {
                setCurrentStats(revenueStats[year] || {});
            }
        };
        updateCurrentStats();
    }, [year, month, monthlyStats, revenueStats]);
    if (revenueStats.length === 0 || monthlyStats.length === 0) {
      return <div>Loading...</div>;
    }


    const handleYearChange = (selectedOption) => {
        setYear(selectedOption.value);
        setMonth(null); // Reset month to null when year is changed
    };
    
    const handleMonthChange = (selectedOption) => {
        setMonth(selectedOption.value);
    };
 

    const data = {
        labels: ['GCB Equity', 'Your Equity Potential'],
        datasets: [
            {
                data: [(1 - summary.equity_ratio) || 0, summary.equity_ratio || 0],
                backgroundColor: ['#FFC52A', '#404F58'],
                borderWidth: 1,
                hoverBorderColor: ['#FFC52A', '#404F58'],
                hoverBorderWidth: 1,
                hoverBackgroundColor: ['#FFC52A', '#404F58']
            }
        ]
    };

    const options = {
        animation: {
            duration: 1000,
            easing: 'easeInOutQuart',
        },
        tooltips: {
            enabled: true,
            mode: 'index',
            intersect: false,
            callbacks: {
                label: function (tooltipItem, data) {
                    const dataset = data.datasets[tooltipItem.datasetIndex];
                    const total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue);
                    const currentValue = dataset.data[tooltipItem.index];
                    const percentage = Math.floor(((currentValue / total) * 100) + 0.5);
                    return `${data.labels[tooltipItem.index]}: ${percentage}% (${currentValue})`;
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                align: 'end',
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
                        text: summary.acquired_equity || 0,
                        font: {
                            size: 25
                        }
                    },
                    {
                        text: 'Acquired Equity',
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
               
            }}
    };

    if (!Object.keys(summary).length) {
        return <div>Loading...</div>;
    }

    const yearOptions = Object.keys(summary).map(year => ({ value: parseInt(year), label: year }));
    const monthOptions = [
        { value: null, label: 'Annual' },
        ...Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: new Date(0, i).toLocaleString('default', { month: 'short' }) }))
    ];

    return (
            <div className="card-body h-full ">
                <h1 className='font-thin text-gray-600 text-lg p-0'>RENT-TO-OWNERSHIP GOAL</h1>
                <div className='grid grid-cols-2 gap-2 mb-0'>
                    <div className="p-0 h-full  doughnut-chart-container align-top  justify-start items-start">            
                    <Doughnut data={data} options={options} />
                    </div>
                    <div className="stats-container grid grid-cols-3 items-center gap-2 align-bottom">
                        <div className="flex flex-col items-center">
                            <h5 className="text-lg font-thin">{(summary.cumm_revenue_received || 0).toLocaleString()}</h5>
                            <p className="text-sm text-gray-600"> Cummulative Rent Paid</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <h5 className="text-lg font-lighter">{(summary.init_value || 0).toLocaleString()}</h5>
                            <p className="text-sm text-gray-600">Initial Property Value</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <h5 className="text-lg font-lighter">{(summary.terminal_value || 0).toLocaleString()}</h5>
                            <p className="text-sm text-gray-600">Terminal Value</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <h5 className="text-lg font-extralight">{(summary.annual_revenue || 0).toLocaleString()}</h5>
                            <p className="text-sm text-gray-600">Annual Rent</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <h5 className="text-lg font-thin">{(currentStats.acquired_interest || 0).toLocaleString()}</h5>
                            <p className="text-sm text-gray-600">Acquired Interest</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <h5 className="text-lg font-thin">{(currentStats.penalty || 0).toLocaleString()}</h5>
                            <p className="text-sm text-gray-600">Penalty Streak</p>
                        </div>
                                </div>

                </div>
                
            </div>
    );
}