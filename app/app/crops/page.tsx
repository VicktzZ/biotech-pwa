'use client';

import CropCard from "@/components/CropCard";
import { InfoCard } from "@/components/InfoCard";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HOST } from "@/constants";
import { useLocalStorage } from "@/hooks/local-storage";
import { zodResolver } from "@hookform/resolvers/zod";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import random from 'random'
import { User } from "@/types/User";
import { ButtonLoading } from "@/components/ui/button-loading";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/services/firebase";
import { Crop } from "@/types/Crop";

const formSchema = z.object({
  name: z.string().min(2, { message: "O nome da planta precisa ter pelo menos 2 caracteres" }),
  amount: z.string()
})

export default function page() {
  const [isLoading, setIsLoading] = useState(false)
  const [user] = useLocalStorage<User>('user')
  const [ crops, setCrops ] = useLocalStorage<Crop[]>('crops')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: "1",
    }
  })


  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    const res = await fetch(HOST + '/api/crop', {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        iluminosity: random.bool(),
        humidity: random.int(0, 100),
        temperature: random.int(12, 38),
        userId: user.id
      })
    }).then(async res => await res.json())

    console.log(res);

    setIsLoading(false)
  }

  useEffect(() => {
    const fetchCrops = async () => {
      const cropsRef = collection(db, "crops");
      const q = query(cropsRef, where("userId", "==", user.id));
      const querySnapshot = await getDocs(q);

      setCrops(querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      })))

      console.log(querySnapshot.docs.map(doc => doc.data()));
    }

    fetchCrops()
  }, [])

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Modal
          btnTitle="Adicionar uma plantação"
          title="Adicionar plantação"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder="Nome da plantação" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantidade</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder="Quantidade" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!isLoading ? (
                <Button type="submit">Adicionar</Button>
              ) : (
                <ButtonLoading />
              )}
            </form>
          </Form>
        </Modal>
      </div>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
        {crops.map(crop => <CropCard key={crop.id} amount={crop.amount} temperature={crop.temperature as string} cropTitle={crop.name} />)}
        <CropCard amount={20} temperature="43" cropTitle="Cenoura" />
      </div>
    </div>
  )
}