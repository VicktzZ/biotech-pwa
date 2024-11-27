'use client';

import { InfoCard } from '@/components/InfoCard'
import { useLocalStorage } from '@/hooks/local-storage';
import { db } from '@/services/firebase';
import { Crop } from '@/types/Crop';
import { User } from '@/types/User';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
import random from 'random'

const day = new Date().getDate();
const month = new Date().getMonth() + 1;


const data = (totalAmount: number) => [
  { name: `${day-4}-${month}`, value: random.int(0, totalAmount) },
  { name: `${day-3}-${month}`, value: random.int(0, totalAmount) },
  { name: `${day-2}-${month}`, value: random.int(0, totalAmount) },
  { name: `${day-1}-${month}`, value: random.int(0, totalAmount) },
  { name: `${day}-${month}`, value: totalAmount },
]

export default function page() {
  const [user] = useLocalStorage<User>('user')
  const [pageUser, setPageUser] = useState<User>({} as User)
  const [userCrops, setUserCrops] = useState<Crop[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    (async () => {
      const fetchUser = async () => {
        setIsLoading(true)
        const res = await fetch(`/api/user/${user?.id}`)
        const data = await res.json()
        setPageUser(data)
        setIsLoading(false)
      }

      const getAllUserCrops = async () => {
        const cropsRef = collection(db, "crops");
        const q = query(cropsRef, where("userId", "==", user.id));

        const unsubscribe = onSnapshot(q, querySnapshot => {
          const crops = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          })) as Crop[];

          setUserCrops(crops)
        })
      }

      setIsLoading(true)
      await fetchUser()
      await getAllUserCrops()
      setIsLoading(false)
    })()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 grid-cols-2 xl:grid-cols-3">
        <InfoCard title="Plantações" description="Total de plantações">{userCrops.length}</InfoCard>
        <InfoCard title="Umidade" description="Umidade volumétrica do solo">Boa</InfoCard>
        <InfoCard title="Plantado" description="Total já plantado">{userCrops.reduce((acc, crop) => Number(acc) + Number(crop.amount), 0)}</InfoCard>
        <InfoCard title="Biotech Nodes" description="Quantidade de dispositivos ativos">{pageUser.biotechNodeAmount}</InfoCard>
      </div>

      <ResponsiveContainer className='relative right-5' width="100%" height={400}>
        <BarChart data={data(userCrops.reduce((acc, crop) => Number(acc) + Number(crop.amount), 0))}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}