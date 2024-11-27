'use client';

import React from 'react'
import { Button } from './ui/button'
import { ChartNoAxesColumnIcon, LeafIcon, SproutIcon, SunMoonIcon, UserIcon } from "lucide-react"
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  return (
    <div className='flex gap-6 p-4 justify-evenly items-center bg-emerald-500 w-screen h-16 absolute bottom-0'>
      <Button onClick={() => router.push('/app')} variant='outline' className='navbar-btn'>
        <ChartNoAxesColumnIcon className='text-primary' />
      </Button>
      <Button onClick={() =>  router.push('/app/crops')} variant='outline' className='navbar-btn'>
        <SproutIcon className='text-primary' />
      </Button>
      <Button onClick={() =>  router.push('/app/gaia')} variant='outline' className='navbar-btn ai-btn'>
        <div className="flex flex-col justify-center items-center ai-btn-content">
          <LeafIcon className='text-primary' />
          <p className='text-xs text-primary'>AI</p>
        </div>
      </Button>
      <Button variant='outline' className='navbar-btn' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        <SunMoonIcon className='text-primary' />
      </Button>
      <Button onClick={() =>  router.push('/app/user/')} variant='outline' className='navbar-btn'>
        <UserIcon className='text-primary' />
      </Button>
    </div>
  )
}