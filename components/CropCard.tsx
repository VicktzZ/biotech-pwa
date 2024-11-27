import React from 'react'
import { InfoCard } from './InfoCard'
import { SproutIcon } from 'lucide-react'

type CropCardProps = {
  amount: number
  className?: string
  average: 'Bom' | 'Regular' | 'Ruim'
  cropTitle: string
}

export default function CropCard({ amount, className, average, cropTitle }: CropCardProps) {
  return (
    <InfoCard title={cropTitle} description={average} className={className}>
      <div className="flex gap-4 items-center">
        <SproutIcon className="w-10 h-10" />
        <p className="text-2xl">{amount} Sendo monitoradas</p>
      </div>
    </InfoCard>
  )
}