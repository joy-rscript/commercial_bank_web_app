import React from 'react'
import { Link } from 'react-router-dom'

const Logo = ({ className = "h-10 w-auto" }) => {
  return (
    <Link to="/" className="flex items-center">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
          <span className="text-primary font-bold text-lg">GCB</span>
        </div>
        <span className="text-white font-semibold text-lg hidden sm:block">
          REIT
        </span>
      </div>
    </Link>
  )
}

export default Logo