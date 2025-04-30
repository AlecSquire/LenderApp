import React from 'react'

// interface LenderLogoProps {
//   width?: number
//   height?: number
// }

const LenderLogo = ({ width = 200, height = 60 }) => {
  const primaryColor = "#3B82F6" // Calming blue
  const secondaryColor = "#6B7280" // Subtle gray

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Circle background */}
      <circle cx="30" cy="30" r="28" fill={primaryColor} />

      {/* Stylized handshake icon */}
      <path
        d="M18 30C18 30 22 26 30 26C38 26 42 30 42 30"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M18 34C18 34 22 38 30 38C38 38 42 34 42 34"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Arrows representing lending and returning */}
      <path
        d="M15 22L10 27L15 32"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M45 22L50 27L45 32"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Lender text */}
      <text
        x="70"
        y="40"
        fontFamily="Arial, sans-serif"
        fontSize="32"
        fontWeight="bold"
        fill={secondaryColor}
      >
        Lender
      </text>
    </svg>
  )
}

export default LenderLogo

// Usage example
export const LogoExample = () => {
  return (
    <div className="p-4 bg-gray-100 flex items-center justify-center">
      <LenderLogo width={200} height={60} />
    </div>
  )
}

