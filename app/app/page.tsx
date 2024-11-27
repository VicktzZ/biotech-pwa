'use client';

import { InfoCard } from '@/components/InfoCard'
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Crops', value: 100 },
  { name: 'Planted', value: 500 },
  { name: 'Harvested', value: 200 },
  { name: 'Revenue', value: 1000 },
  { name: 'Expenses', value: 500 },
]

export default function page() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 grid-cols-2 xl:grid-cols-3">
        <InfoCard title="Plantações" description="Total de plantações">4</InfoCard>
        <InfoCard title="Umidade" description="Umidade volumétrica do solo">Boa</InfoCard>
        <InfoCard title="Plantado" description="Total já plantado">10000</InfoCard>
        <InfoCard title="Biotech Nodes" description="Quantidade de dispositivos ativos">5</InfoCard>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}