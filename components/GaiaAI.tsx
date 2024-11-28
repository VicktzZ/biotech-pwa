import { useLocalStorage } from "@/hooks/local-storage";
import { db } from "@/services/firebase";
import { GaiaAI } from "@/services/gaia-ai";
import { User } from "@/types/User";
import { collection, doc, getDoc, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions.mjs";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SendIcon } from "lucide-react";
import { Message } from "@/types/Message";
import { ChatMessage } from "./ChatMessage";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
    message: z.string().min(1, { message: "A mensagem não pode ser vazia" }),
})

export default function GaiaAIChat() {
    const [user] = useLocalStorage<User>('user')
    const [pageUser, setPageUser] = useState<User>({} as User)
    const [messages, setMessages] = useState<Message[]>([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: ''
        }
    })
    
    const sendMessage = async (data: z.infer<typeof formSchema>) => {
        const chatRef = collection(db, "gaia.ai");
        const docRef = doc(chatRef, user.id);

        form.reset()

        const userMessage: Message = {
            content: data.message,
            role: 'user',
            id: Math.random().toString(36)
        }

        const gaiaMessage = await GaiaAI({
            message: data.message,
            complementaryMessages: [
                ...(messages?.map?.(m => ({ role: m.role, content: m.content })) || []),
                { role: 'system', content: `O usuário está compartilhando algumas informações que ele gostaria que você soubesse: ${pageUser?.settings?.gaiaComplementaryMessages}` }
            ] as ChatCompletionMessageParam[]
        })

        const AIMessage: Message = {
            content: gaiaMessage,
            role: 'assistant',
            id: Math.random().toString(36)
        }

        console.log(AIMessage);

        await setDoc(docRef, {
            messages: [...(messages || []), userMessage, AIMessage]
        }, { merge: true })
    }

    useEffect(() => {
        const chatRef = collection(db, "gaia.ai");

        const fetchUser = async () => {
            const u = await getDoc(doc(chatRef, user.id));
            setPageUser(u.data() as User)
        }

        fetchUser()

        const createChat = async () => {
            const userChatRef = doc(chatRef, user.id);
            const document = await getDoc(userChatRef);

            if (!document.exists()) {
                await setDoc(userChatRef, {
                    userId: user.id,
                    messages: []
                });
            }
        }

        createChat()

        const q = query(chatRef, where("userId", "==", user.id));
        const unsubscribe = onSnapshot(q, querySnapshot => {
            const { messages } = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))[0] as unknown as { messages: Message[] };
            setMessages(messages)
        })

        return () => unsubscribe()
    }, [user.id])

    return (
        <div className="flex flex-col overflow-y-scroll gap-6">
            <div className="flex flex-col gap-8 h-[83vh]">
                {!messages ? (
                    <p className="flex items-center justify-center h-full">Chat inicializado. Diga alguma coisa!</p>
                ) : messages?.map?.(m => <ChatMessage key={m.id} content={m.content} role={m.role} messages={messages} />)}
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(sendMessage)} className="flex items-center justify-center gap-4 absolute bottom-20 w-[88%] lg:w-[97%]">
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input type='text' placeholder="Mensagem" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit"><SendIcon /></Button>
                </form>
            </Form>
        </div>
    );
}