import React from 'react'
import { BellIcon } from '@heroicons/react/24/outline'

const NotificationButton = () => {
  return (
    <button className="relative p-2 text-white hover:text-gray-200 transition-colors">
      <BellIcon className="w-6 h-6" />
      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
    </button>
  )
}

export default NotificationButton