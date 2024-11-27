'use client';

import { InfoCard } from '@/components/InfoCard';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DialogButton } from '@/components/ui/dialog-button'
import { Textarea } from '@/components/ui/textarea';
import { useLocalStorage } from '@/hooks/local-storage'
import { CheckIcon, CircleIcon, LogOutIcon, XIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Page() {
    const [user, setUser] = useLocalStorage<{ email: string | null, id: string | null }>('user', { email: '', id: '' })
    const router = useRouter()

    const logout = () => {
        setUser({ email: null, id: null })
        router.push('/')
    }

    const deleteAccount = () => { }

    return (
        <div className='flex flex-col gap-8'>
            <p className='text-3xl'>Olá, Vitor. 👋</p>

            <div className='flex flex-col gap-4'>
                <p className='text-xl'>Configurações</p>
                <div className='flex flex-col gap-2'>
                    <div className='flex gap-3 items-center'>
                        <Checkbox id='notifications' />
                        <label htmlFor='notifications'>Desativar notificações</label>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <Checkbox id='energy' />
                        <label htmlFor='energy'>Ativar economia de energia do Biotech Node</label>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <Checkbox id='energy' />
                        <label htmlFor='energy'>Ativar modo desenvolvedor</label>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-4'>
                <p className='text-xl'>Gaia AI</p>
                <div className='flex flex-col gap-6'>
                    <div className='flex gap-3 items-center'>
                        <Checkbox id='notifications' />
                        <label htmlFor='notifications'>Permitir compartilhamento de dados</label>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className='flex flex-col gap-1'>
                            <p>Informações complementares</p>
                            <p className='text-xs text-zinc-500'>Informações que a Gaia AI talvez precise saber</p>
                        </div>
                        <Textarea />
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-4'>
                <p className='text-xl'>Plano</p>
                <div className='flex flex-col gap-2'>
                    <div className='flex gap-3 items-center'>
                        <div className='flex gap-4 items-center'>
                            <p>Atual:</p>
                            <Modal className='h-screen min-w-max' btnTitle='Premium' title='Plano' description='Premium'>
                                <div className='grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 overflow-y-scroll max-h-screen'>
                                    <InfoCard title='Freemium'>
                                        <div className='mb-4'>
                                            <p className='text-4xl font-bold'>FREE</p>
                                        </div>
                                        <div className='flex flex-col gap-2 text-sm'>
                                            <div className="flex gap-2 items-center">
                                                <CircleIcon size={15} />
                                                <p>Custo do Biotech Node: R$0,10/h</p>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <CheckIcon className='text-green-500' size={15} />
                                                <p>Cadastro de até 3 plantações</p>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <XIcon className='text-red-500' size={15} />
                                                <p className='text-zinc-500'>Biotech Node Gratuito</p>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <XIcon className='text-red-500' size={15} />
                                                <p className='text-zinc-500'>Gaia AI</p>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <XIcon className='text-red-500' size={15} />
                                                <p className='text-zinc-500'>Cadastro ilimitado de plantações</p>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <XIcon className='text-red-500' size={15} />
                                                <p className='text-zinc-500'>Métricas avançadas</p>
                                            </div>
                                        </div>
                                    </InfoCard>
                                    <InfoCard title='Premium'>
                                        <div className='mb-4'>
                                            <p className='text-4xl font-bold'>R$59,90/mês</p>
                                        </div>
                                        <div className='flex flex-col gap-2 text-sm'>
                                            <div className="flex gap-2 items-center">
                                                <CircleIcon size={15} />
                                                <p>Custo do Biotech Node: R$0,05/h</p>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <CheckIcon className='text-green-500' size={15} />
                                                <p>Até 5 Biotech Nodes Gratuitos</p>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <CheckIcon className='text-green-500' size={15} />
                                                <p>Gaia AI</p>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <CheckIcon className='text-green-500' size={15} />
                                                <p>Cadastro ilimitado de plantações</p>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <CheckIcon className='text-green-500' size={15} />
                                                <p>Métricas avançadas</p>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <XIcon className='text-red-500' size={15} />
                                                <p className='text-zinc-500'>Conta empresarial</p>
                                            </div>
                                        </div>
                                    </InfoCard>
                                    <InfoCard title='Enterprise'>
                                        <div className='mb-4'>
                                            <p className='text-4xl font-bold'>{'>'}R$499,90/mês</p>
                                        </div>
                                        <div className='flex flex-col gap-2 text-sm'>
                                            <div className="flex gap-2 items-center">
                                                <CircleIcon size={15} />
                                                <p>Custo do Biotech Node: R$0,02/h</p>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <CheckIcon className='text-green-500' size={15} />
                                                <p>Até 50 Biotech Nodes Gratuitos</p>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <CheckIcon className='text-green-500' size={15} />
                                                <p>Gaia AI Premium</p>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <CheckIcon className='text-green-500' size={15} />
                                                <p>Cadastro ilimitado de plantações</p>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <CheckIcon className='text-green-500' size={15} />
                                                <p>Conta empresarial</p>
                                            </div>
                                        </div>
                                    </InfoCard>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-4'>
                <p className='text-xl'>Conta</p>
                <div className='flex flex-col gap-2'>
                    <Button>Trocar Email</Button>
                    <Button>Trocar Senha</Button>
                    <DialogButton
                        variant='destructive'
                        title='Excluir conta'
                        description='Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.'
                        action={deleteAccount}
                    >
                        Excluir Conta
                    </DialogButton>
                </div>
            </div>

            <div className='flex gap-4 items-center'>
                <p className='text-xl'>Logout</p>
                <Button onClick={logout} variant='outline' className='navbar-btn'>
                    <LogOutIcon className='text-primary' />
                </Button>
            </div>
        </div>
    )
}