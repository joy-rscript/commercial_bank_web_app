import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, UserIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const UserMenu = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors">
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <UserIcon className="w-5 h-5" />
        </div>
        <span className="hidden sm:block text-sm font-medium">
          {user?.f_name} {user?.l_name}
        </span>
        <ChevronDownIcon className="w-4 h-4" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-gray-50' : ''
                  } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                >
                  <UserIcon className="w-4 h-4 mr-3" />
                  Profile
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-gray-50' : ''
                  } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                >
                  <Cog6ToothIcon className="w-4 h-4 mr-3" />
                  Settings
                </button>
              )}
            </Menu.Item>
            <hr className="my-1" />
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={`${
                    active ? 'bg-gray-50' : ''
                  } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                >
                  <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3" />
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default UserMenu