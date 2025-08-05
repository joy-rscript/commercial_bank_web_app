import React from 'react';
import MenuButton from './MenuButton';

const DashboardMenuBar = () => {

  const menuItems = [
    { heading: 'Dashboard', link: '#' },
    { heading: 'Developers', link: '#' },
    { heading: 'Properties', link: '#' },
    { heading: 'Applications', link: '/admin/all-apps' },
    { heading: 'Tenants', link: '#' },
    { heading: 'AI Query', link: '#' }
  ];
  
  return( 
  <div className="flex flex-col bg-white"> 
    <div className=" px-2 md:px-0 py-1.5 space-y-2 md:space-y-0 md:space-x-5 md:mx-6 md:my-3 text-sm bg-heading-bgcolor rounded-2xl ">
   
   {menuItems.map((item, index) => (
     <MenuButton
       key={index}
       color={"white"}
       link={item.link}
       text={item.heading}
       px={'px-4'}
       py={'py-1.5'}
       toggleFocus={true}
     />
   ))}
 </div>
    </div>
  )
}

export default DashboardMenuBar;