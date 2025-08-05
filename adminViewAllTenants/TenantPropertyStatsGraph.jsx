import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TenantPropertyStatsGraph = ({ propertyStats }) => {
    const [view, setView] = useState('occupancy');

    const developers = propertyStats.map(tnt => tnt.property_name);

    const occupancyData = {
        labels: developers,
        datasets: [
            {
                label: 'Occupied Properties',
                data: propertyStats.map(tnt => tnt.occupied_properties),
                backgroundColor: '#FFC423',
                stack: 'Stack 0',
                barPercentage: 0.8, // Increased barPercentage
                barThickness: 18,   // Set barThickness
            },
            {
                label: 'Vacant Properties',
                data: propertyStats.map(tnt => tnt.vacant_properties),
                backgroundColor: '#2A6496',
                stack: 'Stack 0',
                barPercentage: 0.8, // Increased barPercentage
                barThickness: 18,   // Set barThickness
            },
        ]
    };

    const rentalsData = {
        labels: developers,
        datasets: [
            {
                label: 'Paid Properties',
                data: propertyStats.map(tnt => tnt.paid_properties),
                backgroundColor: '#FFC423',
                stack: 'Stack 1',
                barPercentage: 0.8, // Increased barPercentage
                barThickness: 18,   // Set barThickness
            },
            {
                label: 'Outstanding Properties',
                data: propertyStats.map(tnt => tnt.outstanding_properties),
                backgroundColor: '#2A6496',
                stack: 'Stack 1',
                barPercentage: 0.8, // Increased barPercentage
                barThickness: 18,   // Set barThickness
            },
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                align: 'start',
                labels: {
                    usePointStyle: true,
                    boxWidth: 10,
                    boxHeight: 10,
                    padding: 10,
                }
            },
            title: {
                display: false,
            },
        },
        layout: {
            padding: {
                right: 0,
            },
        },
        scales: {
            x: {
                stacked: true,
                grid: {
                    display: false
                },
                ticks: {
                    maxRotation: 15,
                    minRotation: 15,
                }
            },
            y: {
                stacked: true,
                beginAtZero: true,
                grid: {
                    display: true,
                    drawBorder: false
                }
            }
        },
        maintainAspectRatio: false
    };

    const toggleView = () => {
        setView(view === 'occupancy' ? 'rentals' : 'occupancy');
    };

    return (
        <div className="flex flex-col flex-1 h-full">
            <div className="p-2 flex flex-row justify-between items-center">
                <div>
                    {view === 'occupancy' ? (
                        <>
                            <span className="text-2xl font-semibold">
                                {propertyStats.reduce((sum, dev) => sum + dev.total_properties, 0)}
                            </span>
                            <span className="text-md font-medium text-gray-700">
                                , Total Properties
                            </span>
                        </>
                    ) : (
                        <>
                            <span className="text-2xl font-semibold">
                                {propertyStats.reduce((sum, dev) => sum + dev.total_tenants, 0)}
                            </span>
                            <span className="text-md font-medium text-gray-700">
                                , Total Tenants
                            </span>
                        </>
                    )}
                </div>
                <button onClick={toggleView} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md">
                    Toggle to {view === 'occupancy' ? 'Rentals' : 'Occupancy'}
                </button>
            </div>
            <div className="flex-1 text-xs rounded-sm p-0 m-0 h-80 w-full sm:h-80 md:h-96">
                <Bar data={view === 'occupancy' ? occupancyData : rentalsData} options={options} />
            </div>
        </div>
    );
};

export default TenantPropertyStatsGraph;
