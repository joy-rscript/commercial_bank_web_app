import React from'react';
import { FaEllipsisV } from 'react-icons/fa';


function TenantList({ tenantData, selectedTenant, setSelectedTenant }) {
  const year  = new Date().getFullYear();
  console.log('Selected Tenant:', tenantData); 

  return (
    <div className="bg-white pt-0 w-full px-4 rounded-xl overflow-auto overflow-y-scroll h-full h-[30rem]">
        
      <div className=" tenant-table-wrapper rounded-lg " style={{ maxHeight: 'calc(100vh - 200px)' }}>
        <table className="min-w-full text-sm text-left bg-white text-gray-500 rounded-lg " >
          <thead className="text-xs text-gray-700 uppercase w-full rounded-md bg-gray-100 sticky top-0 z-10">
            <div className='w-full bg-white'> 
            <tr className='flex justify-between w-full'>
              <div className="pr-2 pt-1 flex justify-between w-full items-center sticky top-0 bg-white bg-opacity-45 backdrop-filter backdrop-blur-sm">
            
                  <th className="text-lg font-thin text-gray-700  ">Tenants</th>
            
              {/* <p className=" max-w-2xl text-sm text-gray-500 ">{year}</p> */}
              {/* <FaEllipsisV className="text-gray-500" /> */}
              </div>
            </tr>
            </div>
           
            <tr>
              <th className="p-2 text-left">ACCOUNT</th>
              <th className="p-2 text-left">DATE ASSIGNED</th>
              <th className="p-2 text-left">MONTHLY RENT</th>
              <th className="p-2 text-left">PROPERTY</th>
              <th className="p-2 text-left">EQUITY RATIO</th>
              <th className="p-2 text-left">FLAG</th>
              <th className="p-2 text-left">CONTACT</th>
            </tr>
          </thead>
          <tbody>
            {tenantData.map((tenant, index) => (
              <tr 
                key={index}
                className={`cursor-pointer ${selectedTenant === tenant ? 'border-blue-gray-100 bg-opacity-5 border-2 rounded-lg ' : ''} hover:border-gray-200`}                
                onClick={() => setSelectedTenant(tenant)}
                onDoubleClick={setSelectedTenant}
              >
                <td className="p-2">{tenant.account}</td>
                <td className="p-2">{tenant.dateAssigned}</td>
                <td className="p-2 text-green-500" style={{ color: tenant.flag === 'Late' ? 'red' : '' }} >{tenant.rent_per_month}</td>
                <td className="p-2">{tenant.property_name}</td>
                <td className="p-2">{tenant.equityRatio}</td>
                <td className="p-2" style={{ color: tenant.flag === 'Late' ? 'red' : 'inherit' }}>{tenant.flag}</td>                
                <td className="p-2">{tenant.mobile_no1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TenantList;