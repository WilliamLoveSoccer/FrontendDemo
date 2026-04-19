import * as React from "react"
import { cn } from "@/lib/utils"

type BadgeVariant = "default" | "success" | "destructive" | "warning" | "muted"

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-primary/10 text-primary",
  success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  destructive: "bg-destructive/10 text-destructive",
  warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  muted: "bg-muted text-muted-foreground",
}

function Badge({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"span"> & { variant?: BadgeVariant }) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium tabular-nums",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
