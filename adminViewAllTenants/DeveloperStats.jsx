import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { FaEllipsisV } from 'react-icons/fa';

function DeveloperStats({ revenueStats }) {
    const [showKebabMenu, setShowKebabMenu] = React.useState(false);
    const [tenantPropertyStats, setTenantPropertyStats] = React.useState([
        {
            "property_name": "Crester Valley",
            "total_tenants": 10,
            "total_properties": 15,
            "occupied_properties": 10,
            "vacant_properties": 5,
            "paid_properties": 6,
            "outstanding_properties": 4,
            "total_rent_collected": 50100,
            "total_rent_owing": 15000,
        },
        {
            "property_name": "Stellar Structures",
            "total_tenants": 8,
            "total_properties": 15,
            "occupied_properties": 8,
            "vacant_properties": 7,
            "paid_properties": 5,
            "outstanding_properties": 3,
            "total_rent_collected": 30000,
            "total_rent_owing": 10900,
        },
        {
            "property_name": "Dahwenya Structures",
            "total_tenants": 1,
            "total_properties": 3,
            "occupied_properties": 1,
            "vacant_properties": 2,
            "paid_properties": 1,
            "outstanding_properties": 0,
            "total_rent_collected": 2000,
            "total_rent_owing": 1300,
        },
        {
            "property_name": "Aseda Properties",
            "occupied_properties": 2,
            "vacant_properties": 0,
            "paid_properties": 1,
            "outstanding_properties": 1,
            "total_tenants": 2,
            "total_properties": 2,
            "total_rent_collected": 7000,
            "total_rent_owing": 5000,
        },
        {
            "property_name": "Stellar Structures",
            "occupied_properties": 0,
            "vacant_properties": 1,
            "paid_properties": 0,
            "outstanding_properties": 0,
            "total_tenants": 0,
            "total_properties": 1,
            "total_rent_collected": 0,
            "total_rent_owing": 0,
        },
        {
            "property_name": "Aseda Properties",
            "occupied_properties": 2,
            "vacant_properties": 0,
            "paid_properties": 1,
            "outstanding_properties": 1,
            "total_tenants": 2,
            "total_properties": 2,
            "total_rent_collected": 7000,
            "total_rent_owing": 5000,
        },
        {
            "property_name": "Stellar Structures",
            "occupied_properties": 0,
            "vacant_properties": 1,
            "paid_properties": 0,
            "outstanding_properties": 0,
            "total_tenants": 0,
            "total_properties": 1,
            "total_rent_collected": 0,
            "total_rent_owing": 0,
        }
    ]);

    // Sorting the tenantPropertyStats data in descending order of total_rent_collected
    const sortedStats = tenantPropertyStats.sort((a, b) => b.total_rent_collected - a.total_rent_collected);

    const formatRent = (rent) => {
        if (rent >= 1000) {
            return `$${(rent / 1000).toFixed(1)}K`;
        }
        return `$${rent}`;
    };

    // Calculate dynamic bar thickness and spacing
    const numBars = sortedStats.length;
    const maxBarHeight = 18;
    const containerHeight = 200; 
    const totalPadding = containerHeight * 0.2; // 20% of container height for padding
    const availableHeight = containerHeight - totalPadding;
    const barThickness = Math.min(maxBarHeight, availableHeight / numBars);
    const barSpacing = totalPadding / (numBars - 1);

    const chartData = {
        labels: sortedStats.map(stat => stat.property_name),
        datasets: [
            {
                data: sortedStats.map(stat => stat.total_rent_collected),
                backgroundColor: ['#FFC423', '#FFAA00', '#FF8800', '#FF6600', '#FF4400'],
                borderWidth: 1,
                barThickness: barThickness,
                maxBarThickness: maxBarHeight,
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
            datalabels: {
                color: '#616161',
                align: 'end',
                anchor: 'end',
                formatter: (value, context) => formatRent(value),
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (tooltipItem) => {
                        const propertyName = sortedStats[tooltipItem.dataIndex].property_name;
                        return `${propertyName}: ${formatRent(tooltipItem.raw)}`;
                    },
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
                display: true,
                grid: {
                    display: false,
                },
                ticks: {
                    padding: 10,
                    align: 'start',
                },
            },
        },
        layout: {
            padding: {
                top: barSpacing / 2,
                bottom: barSpacing / 2,
            },
        },
    };

    return (
        <div className="text-faint w-full h-full justify-between rounded-lg">
            <div className='flex justify-between'>
                <h4 className='text-gray-700 text-lg'>Revenue Statistics</h4>
                <div className='bg-white sticky' style={{ zIndex: 2000 }}>
                    <FaEllipsisV className="text-gray-500 cursor-pointer" onClick={() => setShowKebabMenu(!showKebabMenu)} />
                    {showKebabMenu && (
                        <div className='sticky' style={{ position: 'absolute', opacity: 100, right: '0', marginTop: '0.5rem', width: '12rem', backgroundColor: 'white', borderRadius: '0.375rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', padding: '0.25rem 0', zIndex: 2001 }}>
                            <p className="block px-4 py-2 text-sm text-gray-700 cursor-pointer" onClick={() => { setShowKebabMenu(false); /* Add filter functionality */ }}>
                                This Month
                            </p>
                            <p className="block px-4 py-2 text-sm text-gray-700 cursor-pointer" onClick={() => { setShowKebabMenu(false); /* Add filter functionality */ }}>
                                This Year
                            </p>
                            <p className="block px-4 py-2 text-sm text-gray-700 cursor-pointer" onClick={() => { setShowKebabMenu(false); /* Add filter functionality */ }}>
                                Show All
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <div className='pl-3' style={{ height: `${containerHeight}px` }}>
                <Bar data={chartData} options={options} plugins={[ChartDataLabels]} />
            </div>
        </div>
    );
}

export default DeveloperStats;
