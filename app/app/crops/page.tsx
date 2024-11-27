'use client';

import CropCard from "@/components/CropCard";
import { Modal } from "@/components/Modal";
import { useLocalStorage } from "@/hooks/local-storage";
import { useEffect, useState } from "react";
import { User } from "@/types/User";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/services/firebase";
import { Crop } from "@/types/Crop";
import { Skeleton } from "@/components/ui/skeleton";
import { CropForm } from "@/components/CropForm";

export default function Page() {
  const [isFetching, setIsFetching] = useState(true)
  const [user] = useLocalStorage<User>('user')
  const [crops, setCrops] = useState<Crop[]>()

  useEffect(() => {
    setIsFetching(true)
    const cropsRef = collection(db, "crops");
    const q = query(cropsRef, where("userId", "==", user.id));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      const crops = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as Crop[];

      setCrops(crops)
      setIsFetching(false)
    })

    return () => unsubscribe()
  }, [user.id])

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Modal
          btnTitle="Adicionar uma plantação"
          title="Adicionar plantação"
        >
          <CropForm />
        </Modal>
      </div>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
        {isFetching ? (
          <div className="flex flex-col gap-4 items-center justify-center w-full h-full">
            <Skeleton className="w-full h-40" />
            <Skeleton className="w-full h-40" />
            <Skeleton className="w-full h-40" />
            <Skeleton className="w-full h-40" />
          </div>
        ) :
          crops?.length === 0 ? <div className="flex flex-col gap-4 items-center justify-center w-full h-full">Nenhuma plantação cadastrada</div> :
            crops?.map(crop => <CropCard id={crop.id} key={crop.id} amount={crop.amount} temperature={crop.temperature as unknown as string} cropTitle={crop.name} />)
        }
      </div>
    </div>
  )
}