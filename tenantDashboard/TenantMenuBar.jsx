import React, { useState, useEffect } from "react";
import { Navbar, Collapse, Typography, IconButton } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";

export function TenantMenuBar() {
  const [openNav, setOpenNav] = useState(false);
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Extract the last segment from the path
    const currentPath = location.pathname.split('/').pop() || "/";
    const pathToItem = {
      "dashboard": "Dashboard",
      "payments": "Payments",
      "contact-us": "Contact Us",
      "": "Dashboard", // Default to "Dashboard" for the root path
    };
    
    setActiveItem(pathToItem[currentPath] || "Dashboard");
  }, [location.pathname]);

  const menuItems = [
    { heading: 'Dashboard', link: '/tenant/dashboard' },
    { heading: 'Payments', link: '/tenant/payments' },
    { heading: 'Contact Us', link: '/tenant/contact-us' }
  ];

  const menuItemsList = menuItems.map((item) => (
    <Typography
      key={item.heading}
      as="li"
      variant="small"
      color="gray-700"
      className="p-1 font-normal"
    >
      <a
        href={item.link}
        onClick={() => setActiveItem(item.heading)}
        className={`flex items-center font-sans text-sm transition rounded-xl px-2 py-1.5 ${
          activeItem === item.heading
            ? "bg-white text-gray-900 shadow-md"
            : "text-gray-600 hover:bg-white hover:text-gray-900 focus:bg-white focus:text-gray-900 focus:outline-none focus:shadow-md"
        }`}
      >
        {item.heading}
      </a>
    </Typography>
  ));

  return (
    <div className="flex flex-col bg-white grid-cols-6 items-center p-2">
      <Navbar className="sticky top-0 z-10 h-max px-2 md:px-0 py-0.5 space-y-1 md:space-y-0 md:space-x-5 md:my-1 text-sm bg-heading-bgcolor rounded-2xl shadow-none">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">
              <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                {menuItemsList}
              </ul>
            </div>
            <div className="flex items-center gap-x-1"></div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            {menuItemsList}
          </ul>
        </Collapse>
      </Navbar>
    </div>
  );
}
