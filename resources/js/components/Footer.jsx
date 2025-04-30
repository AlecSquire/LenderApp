import React from 'react'

export default function Footer() {
  return (
    <div>  {/* Footer */}
      <footer className="bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-400 hover:text-blue-400 transition-colors duration-300">
                About
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-400 hover:text-blue-400 transition-colors duration-300">
                Contact
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-400 hover:text-blue-400 transition-colors duration-300">
                Privacy Policy
              </a>
            </div>
          </nav>
        </div>
      </footer></div>
  )
}
