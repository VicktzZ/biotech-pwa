import { GaiaAI } from "@/services/gaia-ai"
import { Message } from "@/types/Message";
import { User } from "@/types/User";
import { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions.mjs";

export async function POST(req: Request) {
    const body: { message: string, pageUser: User, messages: Message[] } = await req.json();
    const { message, pageUser, messages } = body;

    const aiMessage = await GaiaAI({ 
        message,
        complementaryMessages: [
            ...(messages?.map?.(m => ({ role: m.role, content: m.content })) || []),
            { role: 'system', content: `O usuário está compartilhando algumas informações que ele gostaria que você soubesse: ${pageUser?.settings?.gaiaComplementaryMessages}` }
        ] as ChatCompletionMessageParam[] })
    
    return Response.json(aiMessage)
}