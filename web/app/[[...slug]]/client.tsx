'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const App = dynamic(() => import('../../src/App'), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
    </div>
  )
})

export function ClientOnly() {
  return <App />
} 