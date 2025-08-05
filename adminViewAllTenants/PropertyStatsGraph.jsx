import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TenantBarGraph from './TenantPropertyStatsGraph'; // Adjust the path as necessary

function PropertyStatsGraph() {
    const [tenantData, setTenantData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await axios.get('http://localhost:8000/rto/get_tenants/');
                // setTenantData(response.data);
                setTenantData([
                    {
                        "property_name": "Crester Valley",
                        "total_tenants": 10,
                        "total_properties": 15,
                        "occupied_properties": 10,
                        "vacant_properties": 5,
                        "paid_properties": 6,
                        "outstanding_properties": 4
                    },
                    {
                        "property_name": "Stellar Structures",
                        "total_tenants": 8,
                        "total_properties": 15,
                        "occupied_properties": 8,
                        "vacant_properties": 7,
                        "paid_properties": 5,
                        "outstanding_properties": 3
                    },
                    {
                        "property_name": "Dahwenya Structures",
                        "total_tenants": 1,
                        "total_properties":3,
                        "occupied_properties": 1,
                        "vacant_properties": 2,
                        "paid_properties": 1,
                        "outstanding_properties": 0
                    },{
                        "property_name": "Aseda Properties",
                        "occupied_properties": 2,
                        "vacant_properties": 0,
                        "paid_properties": 1,
                        "outstanding_properties": 1,
                        "total_tenants": 2,
                        "total_properties": 2
                    },{
                        "property_name": "Stellar Structures",
                        "occupied_properties": 0,
                        "vacant_properties": 1,
                        "paid_properties": 0,
                        "outstanding_properties": 0,
                        "total_tenants": 0,
                        "total_properties": 1
                    },
                    
                ]);
            } catch (error) {
                console.error('Error fetching tenant data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2 className='text-lg font-thin text-gray-700 border-b-2 border-gray-100 py-1'>Tenants</h2>
            <TenantBarGraph tenantData={tenantData} />
        </div>
    );
}

export default PropertyStatsGraph;
