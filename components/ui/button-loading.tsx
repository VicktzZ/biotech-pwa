import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ButtonLoading({ message }: { message?: string }) {
    return (
        <Button disabled>
            <Loader2 className="animate-spin" />
            {message || 'Aguarde...'}
        </Button>
    )
}
