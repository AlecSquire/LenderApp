import React, { useState, useEffect } from 'react'
import { ArrowRight, CheckCircle, Clock, DollarSign, Facebook, Instagram, Twitter } from 'lucide-react'
import { Link } from '@inertiajs/react'
import { motion } from 'framer-motion'

const LenderLogo = ({ className }) => (
  <svg
    className={className}
    width="120"
    height="36"
    viewBox="0 0 200 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="30" cy="30" r="28" fill="#FFFFFF" />
    <path
      d="M18 30C18 30 22 26 30 26C38 26 42 30 42 30"
      stroke="#000000"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M18 34C18 34 22 38 30 38C38 38 42 34 42 34"
      stroke="#000000"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <text
      x="70"
      y="40"
      fontFamily="Arial, sans-serif"
      fontSize="32"
      fontWeight="bold"
      fill="#FFFFFF"
    >
      Lender
    </text>
  </svg>
)

export default function LenderLandingPage({ laravelVersion, phpVersion }) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const imageUrl = "/Joy.jpeg"

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <LenderLogo className="h-8 w-auto" />
          <div className="flex items-center space-x-4">
            <Link href={route('login')} className="text-sm text-gray-300 hover:text-white transition-colors">Log in</Link>
            <Link
              href={route('register')}
              className="bg-white text-black font-semibold py-2 px-4 rounded-none transition-colors hover:bg-gray-200"
            >
              Register
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      <img
        src={imageUrl}
        alt="Minimalist workspace"
        className="absolute inset-0 h-full w-full object-cover object-center"
        style={{ height: '1080px', width: '1920px' }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative z-10 flex h-full flex-col items-start justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Lending. <br />Made Simple,
          </h1>
          <p className="mb-8 text-xl font-light leading-relaxed">
       We track it so you can forget about it.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link
              href={route('register')}
              className="inline-flex items-center justify-center rounded-none bg-white px-6 py-3 text-base font-medium text-black transition-colors hover:bg-gray-100"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center justify-center rounded-none border border-white bg-transparent px-6 py-3 text-base font-medium text-white transition-colors hover:bg-white hover:text-black"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>

      {/* Features Section */}
      <section className="bg-gray-900 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-16 text-center">Why Choose Lender?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <CheckCircle className="mx-auto h-16 w-16 text-white mb-4" />
              <h3 className="text-xl font-semibold mb-2">Stay Organized</h3>
              <p className="text-gray-400">Track items and money lent or borrowed with just a few clicks.</p>
            </div>
            <div className="text-center">
              <Clock className="mx-auto h-16 w-16 text-white mb-4" />
              <h3 className="text-xl font-semibold mb-2">Friendly Reminders</h3>
              <p className="text-gray-400">Automated notifications ensure no one forgets.</p>
            </div>
            <div className="text-center">
              <DollarSign className="mx-auto h-16 w-16 text-white mb-4" />
              <h3 className="text-xl font-semibold mb-2">Completely Free</h3>
              <p className="text-gray-400">No subscriptions, no fees—just peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="text-3xl font-bold mb-16 text-center">How Does Lender Work?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[1, 2, 3].map((step) => (
            <div key={step} className="border border-gray-800 p-8">
              <div className="text-4xl font-bold mb-4">{step}</div>
              <h3 className="text-xl font-semibold mb-4">
                {step === 1 && "Sign up for free"}
                {step === 2 && "Add items or money"}
                {step === 3 && "Let Lender handle the rest"}
              </h3>
              <p className="text-gray-400">
                {step === 1 && "Create your account in seconds, no credit card required."}
                {step === 2 && "Easily log what you've lent or borrowed with a few taps."}
                {step === 3 && "Sit back as Lender tracks and reminds about your stuff."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-900 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-16 text-center">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                name: "Sarah J.",
                quote: "Lender has made it so easy to keep track of everything I've borrowed. No more awkward conversations!"
              },
              {
                name: "Mike T.",
                quote: "As someone who's always lending books, Lender has been a game-changer. I love the reminder feature!"
              },
              {
                name: "Emily R.",
                quote: "I can't believe this app is free. It's saved me so much hassle with roommates and shared expenses."
              }
            ].map((testimonial, index) => (
              <div key={index} className="border border-gray-800 p-8">
                <p className="text-gray-400 mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="text-3xl font-bold mb-8 text-center">More Features Coming Soon</h2>
        <div className="border border-gray-800 p-8 max-w-2xl mx-auto">
          <ul className="list-disc list-inside space-y-2 text-gray-400">
            <li>Additional contact options for reminders</li>
            <li>Public shaming feature for overdue items (opt-in only!)</li>
            <li>Cash lender feature with built-in interest calculator</li>
          </ul>
        </div>
      </section>

      {/* Laravel Section */}
      <section className="bg-gray-900 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-16 text-center">Powered by Laravel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Documentation",
                description: "Laravel has wonderful documentation covering every aspect of the framework.",
                link: "https://laravel.com/docs"
              },
              {
                title: "Laracasts",
                description: "Laracasts offers thousands of video tutorials on Laravel, PHP, and JavaScript development.",
                link: "https://laracasts.com"
              },
              {
                title: "Laravel News",
                description: "Laravel News is a community driven portal and newsletter aggregating all of the latest Laravel news.",
                link: "https://laravel-news.com"
              },
              {
                title: "Vibrant Ecosystem",
                description: "Laravel's robust library of first-party tools and libraries help you take your projects to the next level.",
                link: "https://laravel.com/docs/ecosystem"
              }
            ].map((item, index) => (
              <div key={index} className="border border-gray-800 p-8">
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-400 mb-4">{item.description}</p>
                <a href={item.link} className="text-white hover:underline">Learn more →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <p className="text-lg font-semibold">Lender – Because Every Borrow Counts</p>
              <p className="text-sm text-gray-400">Laravel v{laravelVersion} (PHP v{phpVersion})</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-8">
              <a href="#" className="text-gray-400 hover:text-white transition-colors mb-4 md:mb-0">About Us</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors mb-4 md:mb-0">Contact</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors mb-4 md:mb-0">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors mb-4 md:mb-0">Terms of Service</a>
            </div>
          </div>
          <div className="flex justify-center space-x-6 mt-8">
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram /></a>
          </div>
        </div>
      </footer>
    </div>
  )
}

