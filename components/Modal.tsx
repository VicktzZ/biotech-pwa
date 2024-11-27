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
import { useState } from "react"

type ModalProps = {
  variant?: ButtonProps["variant"]
  btnTitle: string
  title: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
  open?: boolean
  setOpen?: (open: boolean) => void
  noButton?: boolean
}

export function Modal({ variant, btnTitle, title, description, children, footer, className, open, setOpen, noButton }: ModalProps) {
  const [ openModal, setOpenModal ] = useState(false)

  return (
    <Dialog open={open || openModal}>
      {noButton && (
        <DialogTrigger asChild>
          <Button onClick={!setOpen ? (() => setOpenModal(true)) : (() => setOpen(true))} variant={variant || "outline"}>{btnTitle}</Button>
        </DialogTrigger>
      )}
      <DialogContent onCloseAutoFocus={!setOpen ? (() => setOpenModal(false)) : (() => setOpen(false))} className={`sm:max-w-[425px] ${className}`}>
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
