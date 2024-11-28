'use client';

import GaiaAIChat from "@/components/GaiaAI";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { ButtonLoading } from "@/components/ui/button-loading";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocalStorage } from "@/hooks/local-storage"
import { User } from "@/types/User";
import { useEffect, useState } from "react";

export default function Page() {
  const [user] = useLocalStorage('user', { email: '', id: '', firstTimeInGaia: true })
  const [modalTermsOpen] = useState(true)
  const [ termsCheckbox, setTermsCheckbox ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ pageUser, setPageUser ] = useState<User>({} as User)
  const [ accepted, setAccepted ] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true)
      const res = await fetch(`/api/user/${user?.id}`)
      const data = await res.json()
      setPageUser(data)
      setIsLoading(false)
    }

    fetchUser()
  }, [])

  const handleAccept = async () => {
    setAccepted(true)

    await fetch(`/api/user/${user?.id}`, {
      method: 'PATCH',
      body: JSON.stringify({settings: {
        ...pageUser.settings,
        firstTimeInGaiaAI: false
      }})
    })

    window.location.reload()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (pageUser.settings?.firstTimeInGaiaAI === undefined || pageUser.settings?.firstTimeInGaiaAI === true) {
    return (
      <Modal className='h-screen min-w-max' title='Gaia AI' description='Termos de uso' open={modalTermsOpen} btnTitle="">
        <div className='flex p-3 flex-col overflow-y-scroll min-h-screen h-full w-96'>
          <p className="font-bold">Termos e Condições da Biotech - GAIA</p>
          <br />
          <div className="flex flex-col gap-4 mb-8">

            <p className="font-black">1. Introdução</p>
            <p>
              Os presentes Termos e Condições {'("Termos")'} estabelecem o acordo legal entre você {'("Usuário")'} e a Biotech {'("Empresa")'} em relação ao uso do aplicativo GAIA {'("Aplicativo")'} e dos serviços nele contidos. Ao acessar ou utilizar o Aplicativo, você concorda em cumprir integralmente estes Termos.
            </p>

            <p className="font-black">2. Descrição do Aplicativo</p>
            <p>
              O Aplicativo GAIA é uma ferramenta tecnológica desenvolvida pela Biotech para auxiliar agricultores na gestão de suas plantações. Através da coleta de dados do solo por meio de sensores conectados à plataforma, o Aplicativo utiliza inteligência artificial para analisar as informações e fornecer insights personalizados sobre as condições do solo e as necessidades das culturas.
            </p>

            <p className="font-black">3. Utilização do Aplicativo</p>
            <p>
              3.1. O Aplicativo é destinado exclusivamente a fins agrícolas e deve ser utilizado de acordo com as instruções fornecidas pela Biotech.<br />
              3.2. O Usuário é responsável por garantir a correta instalação e configuração dos sensores, bem como pela coleta e transmissão dos dados para a plataforma.<br />
              3.3. A Biotech se reserva o direito de modificar ou descontinuar o Aplicativo a qualquer momento, sem aviso prévio.
            </p>

            <p className="font-black">4. Propriedade Intelectual</p>
            <p>
              Todos os direitos de propriedade intelectual sobre o Aplicativo, incluindo, mas não se limitando a, marcas registradas, logotipos, códigos-fonte, interfaces e conteúdos, são de propriedade exclusiva da Biotech.
            </p>

            <p className="font-black">5. Responsabilidade da Biotech</p>
            <p>
              A Biotech se esforça para garantir a precisão e a confiabilidade das informações fornecidas pelo Aplicativo. No entanto, a Biotech não se responsabiliza por quaisquer danos diretos, indiretos, incidentais, consequenciais ou punitivos decorrentes do uso ou da incapacidade de usar o Aplicativo.
            </p>

            <p className="font-black">6. Responsabilidade do Usuário</p>
            <p>
              O Usuário é responsável por:<br /> <br />

              - Fornecer informações precisas e completas durante o cadastro.<br />
              - Utilizar o Aplicativo de forma ética e legal.<br />
              - Manter a confidencialidade de suas credenciais de acesso.<br />
              - Cumprir todas as leis e regulamentos aplicáveis.
            </p>

            <p className="font-black">7. Privacidade</p>
            <p>
              A Biotech se compromete a proteger a privacidade dos dados dos Usuários. Para mais informações sobre nossa política de privacidade, consulte o documento específico disponível no Aplicativo.
            </p>

            <p className="font-black">8. Resolução de Disputas</p>
            <p>
              Qualquer disputa decorrente destes Termos será submetida à jurisdição exclusiva dos tribunais da cidade de São Paulo, Estado de São Paulo.
            </p>

            <p className="font-black">9. Alterações destes Termos</p>
            <p>
              A Biotech se reserva o direito de modificar estes Termos a qualquer momento. As alterações serão eficazes a partir de sua publicação no Aplicativo.
            </p>

            <p className="font-black">10. Aceitação dos Termos</p>
            <p>
              Ao utilizar o Aplicativo, você declara ter lido, compreendido e concordado com todos os termos e condições aqui estabelecidos.
            </p>
          </div>
          
          <div className="flex flex-col mb-24 gap-4">
            <div className="flex gap-2">
              <Checkbox onCheckedChange={setTermsCheckbox as () => void} defaultChecked={termsCheckbox} id="checkbox" />
              <label htmlFor="checkbox" className="text-sm">Li e concordo com os termos e condições</label>
            </div>
            <div>
              {!accepted ? (
                <Button disabled={!termsCheckbox} onClick={handleAccept}>Aceitar</Button>
              ) : (
                <ButtonLoading />
              )}
            </div>
          </div>

        </div>
      </Modal>
    )
  }

  return (
    <div>
      <GaiaAIChat />
    </div>
  )
}