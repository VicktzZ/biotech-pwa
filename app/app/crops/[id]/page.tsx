'use client';

import { Skeleton } from "@/components/ui/skeleton";
import { Crop } from "@/types/Crop";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import random from 'random'

const day = new Date().getDate();
const month = new Date().getMonth() + 1;

const rangeData = (temperature: Crop['temperature']) => [
    {
      "day": `${day-3}-${month}`,
      "temperature": [
          random.int(10, 20) - 1,
          random.int(20, 30) + 1,
      ]
    },
    {
      "day": `${day-2}-${month}`,
      "temperature": [
          random.int(10, 20) - 1,
          random.int(20, 30) + 1,
      ]
    },
    {
      "day": `${day-1}-${month}`,
      "temperature": [
          random.int(10, 20) - 1,
          random.int(20, 30) + 1,
      ]
    },
    {
      "day": `${day}-${month}`,
      "temperature": [
        temperature - 4,
        temperature
      ]
    }
  ]
  

export default function Page() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [crop, setCrop] = useState<Crop>()

    useEffect(() => {
        const fetchCrop = async () => {
            setIsLoading(true)
            const response = await fetch(`/api/crop/${id}`).then(async res => await res.json()) as Crop
            setCrop(response)
            setIsLoading(false)
            console.log(response)
        }

        fetchCrop()
    }, [id])

    return (
        <div>
            {isLoading ? (
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-8 rounded-none w-3/4" />
                        <Skeleton className="h-4 rounded-none w-3/4" />
                    </div>
                    <div className="flex flex-col gap-4 items-center">
                        <Skeleton className="w-[calc(100%-2rem)] md:w-[calc(50%-2rem)] h-44" />
                        <Skeleton className="w-[calc(100%-2rem)] md:w-[calc(50%-2rem)] h-44" />
                        <Skeleton className="w-[calc(100%-2rem)] md:w-[calc(50%-2rem)] h-44" />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <p className="text-3xl">{crop?.name}</p>
                        <div>
                            <p className="text-xl">Quantidade: {crop?.amount}</p>
                            <p className="text-xl">Iluminação: {crop?.luminosity ? 'OK' : 'Sem iluminação'}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-2">
                            <p className="text-xl">Temperatura (°C)</p>
                            <ResponsiveContainer width="100%" height={200} className='relative right-5'>
                                <AreaChart
                                    width={730}
                                    height={250}
                                    data={rangeData(crop?.temperature || 0)}
                                    margin={{
                                        top: 20, right: 20, bottom: 20, left: 20,
                                    }}
                                >
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Area dataKey="temperature" stroke="#d88484" fill="#d88484" />
                                    <Tooltip />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="text-xl">Acidez do solo (pH)</p>
                            <ResponsiveContainer width="100%" height={200} className='relative right-5'>
                                <LineChart
                                    width={730}
                                    height={250}
                                    data={[
                                        { day: `${day-3}-${month}`, ph: random.int(5, 10) },
                                        { day: `${day-2}-${month}`, ph: random.int(5, 10) },
                                        { day: `${day-1}-${month}`, ph: random.int(5, 10) },
                                        { day: `${day}-${month}`, ph: crop?.ph || 0 }
                                    ]}
                                    margin={{
                                        top: 20, right: 20, bottom: 20, left: 20,
                                    }}
                                >
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Line type="monotone" dataKey="ph" stroke="#82ca9d" />
                                    <Tooltip />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="text-xl">Umidade (%)</p>
                            <ResponsiveContainer width="100%" height={200} className='relative right-5'>
                                <BarChart
                                    width={730}
                                    height={250}
                                    data={[
                                        { day: `${day-3}-${month}`, humidity: random.int(20, 80) },
                                        { day: `${day-2}-${month}`, humidity: random.int(20, 80) },
                                        { day: `${day-1}-${month}`, humidity: random.int(20, 80) },
                                        { day: `${day}-${month}`, humidity: crop?.humidity || 0 }
                                    ]}
                                    margin={{
                                        top: 20, right: 20, bottom: 20, left: 20,
                                    }}
                                >
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Bar dataKey="humidity" fill="#84b2d8" />
                                    <Tooltip />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
} 