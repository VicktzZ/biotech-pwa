import { Button, ButtonProps } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type ModalProps = {
  variant?: ButtonProps["variant"]
  btnTitle: string
  title: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

export function Modal({ variant, btnTitle, title, description, children, footer, className }: ModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant || "outline"}>{btnTitle}</Button>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[425px] ${className}`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
        {footer && (
            <DialogFooter>
                {footer}
            </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
