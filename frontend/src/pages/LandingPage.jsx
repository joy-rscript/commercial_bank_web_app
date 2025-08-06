import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightIcon, HomeIcon, ShieldCheckIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
import NavBar from '../components/Layout/NavBar'
import Button from '../components/UI/Button'

const LandingPage = () => {
  const features = [
    {
      icon: HomeIcon,
      title: 'Own Your Dream Home',
      description: 'Start renting today and gradually build equity towards full ownership of your property.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Secure Investment',
      description: 'Backed by GCB Bank with transparent terms and guaranteed ownership transfer.'
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Flexible Payments',
      description: 'Monthly payments designed to fit your budget with built-in equity accumulation.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Path to
              <span className="text-primary block">Homeownership</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Early retirement sounds great with a home to retire to, fewer bills to pay, and guaranteed ownership security for you and your family. GCB RENT TO OWN Scheme helps you acquire property at your own pace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/gcb-rto-application">
                <Button size="lg" className="group">
                  Start Your Application
                  <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose GCB Rent-to-Own?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our innovative scheme combines the flexibility of renting with the security of homeownership.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-8 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of Ghanaians who have secured their future through our Rent-to-Own program.
          </p>
          <Link to="/gcb-rto-application">
            <Button variant="secondary" size="lg">
              Apply Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LandingPage