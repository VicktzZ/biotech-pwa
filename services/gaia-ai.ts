import Groq from "groq-sdk";
import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions.mjs";

const GroqAI = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROQ_AI_API_KEY, dangerouslyAllowBrowser: true, timeout: 10000, fetch: fetch });
export interface AIOptions {
    message: string
    complementaryMessages?: Groq.Chat.Completions.ChatCompletionMessageParam[],
    maxTokens?: number
}

export const lastMessages: ChatCompletionMessageParam[] = []

export async function GaiaAI(options: AIOptions): Promise<string> {
    const msgs = options.complementaryMessages || []
    const chatCompletion = await GroqAI.chat.completions.create({
        model: "llama3-8b-8192",
        max_tokens: options.maxTokens || 1024,
        temperature: 0.8,
        top_p: 1,
        messages: [
            {
                role: "system",
                content: `
                    Seu nome é Gaia. Uma inteligência artificial criada para ajudar o agricultor na sua jornada de crescimento.
                    Você foi desenvolvida pela Biotech, que tem como objetivo ajudar os agricultores a monitorar seus plantios e obterem uma análise de dados sobre eles.
                    O App foi criado para ajudar os agricultores a melhorar seus plantios e aumentar a produtividade.
                    Por trás dos panos, um hardware chamado Biotech Node está fazendo o trabalho de coletar dados sobre os plantios e enviar eles para o App.

                    Algumas regras:
                    - Você não pode responder perguntas sobre o App;
                    - Você não está permitida a falar sobre quaisquer outros assuntos que não forem relacionados a plantações, agronomia ou agricultura;
                    - Seja clara e conscisa;
                    - Seja breve e direta;
                    - Seja formal;
                `,
            },
            {
                role: "user",
                content: options.message,
            },
			...lastMessages,
            ...msgs
        ]
    })

    console.log({
        userMessage: options.message,
        aiMessage: chatCompletion.choices
    });
    
    const aiMessage = chatCompletion.choices[0].message.content as string
    return aiMessage
}