'use client';

import LoginForm from "@/components/LoginForm";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/local-storage";
import { useTheme } from "next-themes";

export default function Home() {
  const { systemTheme, theme } = useTheme()
  const [formType, setFormType] = useState<'signin' | 'singup'>('signin')
  const [ user ] = useLocalStorage('user', { email: '', id: '' })
  const router = useRouter()

  useEffect(() => {
    if (user?.email) {
      router.push('/app')
    }
  }, [])

  return (
    <div className="h-screen w-screen flex flex-col gap-8">
      <div className="flex h-1/3 bg-gradient-to-r from-cyan-500 to-emerald-500 items-center justify-center">
        <Image alt="Logo" height={200} width={200} className="relative bottom-10 md:bottom-0" src={"/images/white-logo.png"} />
        <Image alt="Wave" height={30} width={30} className="absolute md:z-[-1] top-[4vh] w-screen" src={`/svg/${ theme || systemTheme || 'light'}-wave.svg`} />
      </div>
      <div className="flex flex-col gap-20">
        <div className="flex flex-col items-center justify-center gap-12">
          <div className="flex flex-col items-center justify-center">
            <LoginForm type={formType} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          {formType === 'signin' && (
            <>
              <p>Não possui uma conta?</p>
              <Button onClick={() => setFormType('singup')}>Sign up</Button>
            </>
          )}
          {formType === 'singup' && (
            <>
              <p>Já possui uma conta?</p>
              <Button onClick={() => setFormType('signin')}>Sign in</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
