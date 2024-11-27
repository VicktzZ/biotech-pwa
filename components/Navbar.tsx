'use client';

import React from 'react'
import { Button } from './ui/button'
import { ChartNoAxesColumnIcon, LeafIcon, LogOutIcon, SproutIcon, SunMoonIcon } from "lucide-react"
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { DialogButton } from './ui/dialog-button';
import { useLocalStorage } from '@/hooks/local-storage';

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [ , setUser ] = useLocalStorage<{email: string | null, id: string | null}>('user', { email: '', id: '' })
  const router = useRouter()

  const logout = () => {
    setUser({ email: null, id: null })
    router.push('/')
  }

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
      <DialogButton
          title='Você tem certeza?'
          description='Tem certeza que deseja sair?'
          btnClassName='navbar-btn'
          action={logout}
        >
        <LogOutIcon className='text-primary' />
      </DialogButton>
    </div>
  )
}