'use client';

import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { ButtonLoading } from "./ui/button-loading";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import random from 'random'
import { useLocalStorage } from "@/hooks/local-storage";
import { User } from "@/types/User";

type CropFormProps = {
    submit?: (data: z.infer<typeof formSchema>) => void
    defaultValues?: z.infer<typeof formSchema>
    btnTitle?: string
    loading?: boolean
    closeModal?: () => void
}

const formSchema = z.object({
    name: z.string().min(2, { message: "O nome da planta precisa ter pelo menos 2 caracteres" }),
    amount: z.string()
})

export function CropForm({ defaultValues, submit, btnTitle, loading, closeModal }: CropFormProps) {
    const [isFormLoading, setIsFormLoading] = useState(false)
    const [user] = useLocalStorage<User>('user')

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues || {
            name: "",
            amount: "1",
        }
    })

    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsFormLoading(true)

        await fetch('/api/crop', {
            method: 'POST',
            body: JSON.stringify({
                ...data,
                iluminosity: random.bool(),
                humidity: random.int(0, 100),
                temperature: random.int(12, 38),
                ph: random.int(0, 14),
                userId: user.id
            })
        }).then(async res => await res.json())

        closeModal?.()
        setIsFormLoading(false)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submit || handleSubmit)} 
                className="space-y-8">
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
                {(loading || isFormLoading) ? (
                    <ButtonLoading />
                ) : (
                    <Button type="submit">{btnTitle || 'Adicionar'}</Button>
                )}
            </form>
        </Form>
    )
}