import * as React from "react"
import { Dialog } from "radix-ui"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const DialogRoot = Dialog.Root
const DialogTrigger = Dialog.Trigger
const DialogClose = Dialog.Close

function DialogPortal(props: React.ComponentProps<typeof Dialog.Portal>) {
  return <Dialog.Portal {...props} />
}

function DialogOverlay({ className, ...props }: React.ComponentProps<typeof Dialog.Overlay>) {
  return (
    <Dialog.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({ className, children, ...props }: React.ComponentProps<typeof Dialog.Content>) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <Dialog.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-card p-6 shadow-lg ring-1 ring-foreground/10 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className
        )}
        {...props}
      >
        {children}
        <Dialog.Close className="absolute right-4 top-4 rounded-md p-0.5 text-muted-foreground opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <X className="size-4" />
          <span className="sr-only">Close</span>
        </Dialog.Close>
      </Dialog.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mb-4 flex flex-col gap-1", className)} {...props} />
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof Dialog.Title>) {
  return (
    <Dialog.Title
      className={cn("font-heading text-base font-medium leading-snug", className)}
      {...props}
    />
  )
}

function DialogDescription({ className, ...props }: React.ComponentProps<typeof Dialog.Description>) {
  return (
    <Dialog.Description
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  DialogRoot as Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
}
