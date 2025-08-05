import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

export default function RentalInfo() {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1); // Initialize to current month
    const [revenueStats, setRevenueStats] = useState({});
    const [monthlyStats, setMonthlyStats] = useState({});
    const [currentStats, setCurrentStats] = useState({});
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Uncomment the axios call if you want to fetch data from the server
                // const response = await axios.get('http://localhost:8000/rto/get_application_stats/');
                // setApplicantsIncomeData(response.data);

                // Setting dummy data for the purpose of this example
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
        labels: ['Revenue Received', 'Outstanding Revenue'],
        datasets: [
            {
                data: [currentStats.revenue_received || 0, currentStats.outstanding_revenue || 0],
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
                position: 'left',
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
                        text: currentStats.expected_revenue || 0,
                        font: {
                            size: 25
                        }
                    },
                    {
                        text: 'Total Revenue'
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
                top: -10, // Adjusted padding to better fit the increased doughnut size
                bottom: -10
            }}
    };

    if (!Object.keys(revenueStats).length || !Object.keys(monthlyStats).length) {
        return <div>Loading...</div>;
    }

    const yearOptions = Object.keys(revenueStats).map(year => ({ value: parseInt(year), label: year }));
    const monthOptions = [
        { value: null, label: 'Annual' },
        ...Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: new Date(0, i).toLocaleString('default', { month: 'short' }) }))
    ];

    return (
        <div className=" w-full  rounded-lg">
            <div className="flex justify-end items-center pr-6">
                <div className="flex space-x-0.5 text-light outline-none">
                    
                    <Select
                        value={monthOptions.find(option => option.value === month)}
                        onChange={handleMonthChange}
                        options={monthOptions}
                        isDisabled={year === null}
                        className="w-24 h-6"
                        styles={{
                            control: (base) => ({
                                ...base,
                                minHeight: '32px',
                                fontSize:9,
                                fontWeight:200,
                                borderRadius: '0',
                                border: 'none',
                                boxShadow: 'none',
                                paddingRight: '0.34rem',
                            }),
                            singleValue: (base) => ({
                                ...base,
                                color: '#616161',
                            }),
                            placeholder: (base) => ({
                                ...base,
                                color: '#616161',
                            }),
                            menu: (base) => ({
                                ...base,
                                borderRadius: '0',
                                border: 'none',
                                boxShadow: 'none',
                            }),
                            option: (base, state) => ({
                                ...base,
                                backgroundColor: state.isSelected ? 'inherit' : state.isFocused ? '#f0f0f0' : 'inherit',
                                color: '#616161',
                                '&:hover': {
                                    backgroundColor: '#f0f0f0',
                                },
                            }),
                            dropdownIndicator: (base) => ({

                                ...base,
                                padding: '0.10rem',
                                color: '#616161',
                                display: 'none'
                            }),
                            indicatorSeparator: (base) => ({
                                display: 'none',
                                padding:'0'
                            }),
                        }}
                    />
                    <Select
                        value={yearOptions.find(option => option.value === year)}
                        onChange={handleYearChange}
                        options={yearOptions}
                        className="w-26 p-0"
                        styles={{
                            control: (base) => ({
                                ...base,
                                minHeight: '30px',
                                fontSize:9,
                                fontWeight:'200',
                                
                                borderRadius: '0',
                                border: 'none',
                                boxShadow: 'none',
                                paddingRight: '0.25rem',
                            }),
                            singleValue: (base) => ({
                                ...base,
                                color: '#616161',
                            }),
                            placeholder: (base) => ({
                                ...base,
                                color: '616161',
                            }),
                            menu: (base) => ({
                                ...base,
                                borderRadius: '0',
                                border: 'none',
                                boxShadow: 'none',
                            }),
                            option: (base, state) => ({
                                ...base,
                                backgroundColor: state.isSelected ? 'inherit' : state.isFocused ? '#f0f0f0' : 'inherit',
                                color: '#616161',
                                '&:hover': {
                                    backgroundColor: '#f0f0f0',
                                },
                            }),
                                dropdownIndicator: (base) => ({
                                    ...base,
                                    fontSize: 8,
                                    tabSize: 0.5,
                                    padding: '0.25rem',
                                    color: '#616161',
                                }),
                            indicatorSeparator: (base) => ({
                                display: 'none',
                                padding: '0',
                            }),
                        }}
                    />
                </div>
            </div>
            <div className="card-body grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 sm:mt-4 md:mt-6 lg:mt-8">
                <div className="w-full doughnut-chart-container flex justify-center items-center">            
                <Doughnut data={data} options={options} />
                </div>
                <div className="stats-container grid grid-cols-3 items-center gap-2">
                    <div className="flex flex-col items-center">
                        <h5 className="text-lg font-thin">{(currentStats.expected_revenue || 0).toLocaleString()}</h5>
                        <p className="text-sm text-gray-600">Expected Revenue</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h5 className="text-lg font-lighter">{(currentStats.revenue_received || 0).toLocaleString()}</h5>
                        <p className="text-sm text-gray-600">Revenue Received</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h5 className="text-lg font-lighter">{(currentStats.outstanding_revenue || 0).toLocaleString()}</h5>
                        <p className="text-sm text-gray-600">Outstanding Revenue</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h5 className="text-lg font-extralight">{(currentStats.total_tenants || 0).toLocaleString()}</h5>
                        <p className="text-sm text-gray-600">Tenants</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h5 className="text-lg font-thin">{(currentStats.paid_up_tenants || 0).toLocaleString()}</h5>
                        <p className="text-sm text-gray-600">Paid Tenants</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h5 className="text-lg font-thin">{(currentStats.outstanding_tenants || 0).toLocaleString()}</h5>
                        <p className="text-sm text-gray-600">Outstanding Tenants</p>
                    </div>
                </div>
            </div>

        </div>
    );
}