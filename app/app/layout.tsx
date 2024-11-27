import Navbar from '@/components/Navbar'
import { RequireAuth } from '@/contexts/require-auth'
import React, { ReactNode } from 'react'

export default function layout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth>
      <div className='flex flex-col justify-between h-screen'>
        <div className='flex flex-col p-6 gap-2 overflow-auto w-screen'>{children}</div>
        <div className='mt-16' />
        <Navbar />
      </div>
    </RequireAuth>
  )
}