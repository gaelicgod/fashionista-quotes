import React from 'react'

export default function Favicon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="32"
      height="32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="16" cy="16" r="14" fill="#0A1A2F" />
      <path d="M16 6v20M6 16h20" stroke="#D4AF37" />
      <path d="M12 12l8 8M20 12l-8 8" stroke="#FFD700" />
    </svg>
  )
}