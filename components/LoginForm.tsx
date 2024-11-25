import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ButtonLoading } from './ui/button-loading'
import { useRouter } from 'next/navigation'
import { useLocalStorage } from '@/hooks/local-storage'

type Props = { type: 'signin' | 'singup' }
const formSchema = z.object({
    email: z.string().email({ message: "Endereço de email inválido" }),
    password: z
        .string()
        .min(6, { message: "A senha precisa ter pelo menos 6 caracteres" }),
    // confirmPassword: z.string().optional(),
})
// .superRefine(({ password, confirmPassword }, ctx) => {
//     if (password !== confirmPassword) {
//         ctx.addIssue({
//             code: "custom",
//             message: "As senhas devem ser iguais",
//             path: ["confirmPassword"],
//         })
//     }
// })

export default function LoginForm({ type }: Props) {
    const [isLoading, setIsLoading] = useState(false)
    const [ user, setUser ] = useLocalStorage('user', { email: '', id: '' })
    const router = useRouter()
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            // confirmPassword: ""
        }
    })


    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        let res: { message: string, status: 200 | 401, id?: string }

        if (type === 'signin') {
            res = await fetch('/api/auth', {
                method: 'POST',
                body: JSON.stringify(data)
            }).then(async res => await res.json())
        } else {
            res = await fetch('/api/user', {
                method: 'POST',
                body: JSON.stringify(data)
            }).then(async res => await res.json())
        }

        setIsLoading(false)

        if (res.status === 200) {
            router.push('/app')
            setUser({ email: data.email, id: res.id as unknown as string })
        } else {
            alert(res.message)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type='email' placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                                <Input type='password' placeholder="Senha" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {type === 'singup' && (
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirmar Senha</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder="Confirmar Senha" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                {!isLoading ? (
                    <Button type="submit">Entrar</Button>
                ) : (
                    <ButtonLoading />
                )}
            </form>
        </Form>
    )
}