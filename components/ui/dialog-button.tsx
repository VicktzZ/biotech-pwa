import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button, ButtonProps } from "@/components/ui/button"
import { ButtonLoading } from "./button-loading"

type DialogButtonProps = {
    children: React.ReactNode
    title: string
    description: string
    action: () => void
    cancel?: () => void
    btnClassName?: string
    dialogClassName?: string
    variant?: ButtonProps["variant"]
    open: boolean
    setOpen: (open: boolean) => void
    loading?: boolean
}

export function DialogButton({ children, title, description, action, cancel, btnClassName, dialogClassName, variant, open, setOpen, loading }: DialogButtonProps) {
    return (
        <AlertDialog open={open}>
            <AlertDialogTrigger asChild>
                <Button onClick={() => setOpen(true)} className={btnClassName} variant={variant || "outline"}>
                    {children}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className={dialogClassName}>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={cancel || (() => setOpen(false))}>Cancelar</AlertDialogCancel>
                    {loading ?
                        <ButtonLoading />
                        : <AlertDialogAction onClick={action}>Continuar</AlertDialogAction>
                    }
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}