import Groq from "groq-sdk";
import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions.mjs";

const GroqAI = new Groq({ apiKey: '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' });

interface AIOptions {
    message: string
    complementaryMessages?: Groq.Chat.Completions.ChatCompletionMessageParam[],
    maxTokens?: number
}

export const lastMessages: ChatCompletionMessageParam[] = []

export async function GaiaAI(options: AIOptions): Promise<string> {
    const msgs = options.complementaryMessages || []
    const chatCompletion = await GroqAI.chat.completions.create({
        model: "llama3-8b-8192",
        max_tokens: options.maxTokens || 200,
        temperature: 1,
        messages: [
            {
                role: "system",
                content: `
                    Seu nome é Gaia. Uma inteligência artificial criada para ajudar o agricultor na sua jornada de crescimento.
                    Você foi desenvolvida pela Biotech, que tem como objetivo ajudar os agricultores a monitorar seus plantios e obterem uma análise de dados sobre eles.
                    O App foi criado para ajudar os agricultores a melhorar seus plantios e aumentar a produtividade.
                    Por trás dos panos, um hardware está fazendo o trabalho de coletar dados sobre os plantios e enviar eles para o App.

                    Algumas regras:
                    - Você não pode responder perguntas sobre o App, apenas responder perguntas sobre os plantios;
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

    const aiMessage = chatCompletion.choices[0].message.content

    if (lastMessages.length === 5) lastMessages.shift()
	lastMessages.push({ role: 'assistant', content: aiMessage })

    return chatCompletion.choices[0].message.content as string
}
