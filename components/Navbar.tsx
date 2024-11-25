'use client';

import React from 'react'
import { Button } from './ui/button'
import { HomeIcon } from "lucide-react"

export default function Navbar() {
  return (
    <div className='flex gap-6 justify-evenly items-center bg-emerald-500 w-screen h-16'>
        <div>
            <Button>
                <HomeIcon className="h-6 w-6" />
            </Button>
        </div>
    </div>
  )
}