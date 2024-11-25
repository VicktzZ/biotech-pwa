import Navbar from '@/components/Navbar'
import { RequireAuth } from '@/contexts/require-auth'
import React, { ReactNode } from 'react'

export default function layout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth>
      <div className='flex flex-col justify-between h-screen'>
        <div className='flex flex-col p-4 gap-2 overflow-auto w-screen'>{children}</div>
        <Navbar />
      </div>
    </RequireAuth>
  )
}