'use client';

import { UserIcon } from "lucide-react";
import Image from "next/image";
import Typewriter from 'typewriter-effect'
import { Message } from "@/types/Message";

export function ChatMessage({ messages, content, role }: { content: string, role: 'user' | 'assistant', messages: Message[] }) {
    const m = messages.map(m => m.content)

    return (
        <div className={`flex flex-col gap-4 w-full ${role === 'user' ? 'items-end' : 'items-start'}`}>
            <div>
                {role === 'assistant' ? (
                    <Image width={40} height={40} className="max-w-10 max-h-10 rounded-lg border border-zinc-500" src="/images/splash.png" alt="Gaia" />
                ) : (
                    <UserIcon size='' className="p-1 max-w-10 max-h-10 rounded-lg border border-zinc-500" />
                )}
            </div>
            {role === 'user' ? content : !(m.includes(content) && m[m.length - 1] === content) ? content : (
                <Typewriter 
                    options={{
                        autoStart: true,
                        loop: false,
                        delay: 10,
                        strings: content,
                        wrapperClassName: "typewriter-wrapper",
                        cursorClassName: "typewriter-cursor",
                        cursor: "",
                    }}
                />
            )}
        </div>
    )
}