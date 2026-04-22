'use client'

import { useState } from 'react'

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copy}
      className="text-xs bg-indigo-700 hover:bg-indigo-600 text-indigo-200 hover:text-white px-3 py-1.5 rounded transition-colors cursor-pointer font-medium"
    >
      {copied ? 'Copied!' : 'Copy prompt'}
    </button>
  )
}
