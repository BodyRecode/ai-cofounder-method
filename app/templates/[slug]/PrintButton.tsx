'use client'

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="border border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-800 font-medium px-6 py-3 rounded-lg text-sm transition-colors cursor-pointer"
    >
      Print / Save as PDF
    </button>
  )
}
