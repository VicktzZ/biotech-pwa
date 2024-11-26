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
import { Button } from "@/components/ui/button"

type DialogButtonProps = {
    children: React.ReactNode
    title: string
    description: string
    action: () => void
    cancel?: () => void
    btnClassName?: string
    dialogClassName?: string
}

export function DialogButton({ children, title, description, action, cancel, btnClassName, dialogClassName }: DialogButtonProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className={btnClassName} variant="outline">
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
                        <AlertDialogCancel onClick={cancel}>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={action}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}