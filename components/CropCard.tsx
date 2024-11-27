import React, { useState } from 'react'
import { InfoCard } from './InfoCard'
import { ArrowRight, SproutIcon } from 'lucide-react'
import { Modal } from './Modal'
import { CropForm } from './CropForm'
import { DialogButton } from './ui/dialog-button'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'

type CropCardProps = {
  amount: number
  className?: string
  temperature: string
  cropTitle: string
  id: string
}

export default function CropCard({ id, amount, className, temperature, cropTitle }: CropCardProps) {
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const router = useRouter()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const formSchema = z.object({
    name: z.string().min(2, { message: "O nome da planta precisa ter pelo menos 2 caracteres" }),
    amount: z.string()
  })

  const updateCrop = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    
    await fetch(`/api/crop/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    })

    setIsLoading(false)
    setOpenModal(false)
  }


  const deleteCrop = async () => {
    setIsLoading(true)
    await fetch(`/api/crop/${id}`, { method: 'DELETE' })
    setOpen(false)
    setIsLoading(false)
  }

  return (
    <InfoCard title={cropTitle} description={temperature + ' °C'} className={`${className} cursor-pointer`}>
      <div className="flex flex-col gap-8 w-full">
        <div className='flex gap-4 items-center'>
          <SproutIcon className="w-10 h-10" />
          <p className="text-2xl">Monitorando: {Number(amount)}</p>
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex gap-4'>
            <Modal
              variant='default'
              btnTitle="Editar"
              title="Editar plantação"
              open={openModal}
              setOpen={setOpenModal}
            >
              <CropForm
                defaultValues={{ name: cropTitle, amount: String(amount) }}
                submit={updateCrop}
                btnTitle='Salvar'
                loading={isLoading}
              />
            </Modal>
            <DialogButton
              variant='destructive'
              title='Excluir plantação'
              description='Tem certeza que deseja excluir esta plantação? Essa ação não pode ser desfeita.'
              action={async () => await deleteCrop()}
              open={open}
              setOpen={setOpen}
              loading={isLoading}
            >
              Excluir
            </DialogButton>
          </div>
          <div>
            <Button onClick={() => router.push(`/app/crops/${id}`)} className='rounded-full' variant='outline'><ArrowRight /></Button>
          </div>
        </div>
      </div>
    </InfoCard>
  )
}