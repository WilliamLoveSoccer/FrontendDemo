import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

function Select({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <div className="relative w-full">
      <select
        data-slot="select"
        className={cn(
          "flex h-8 w-full appearance-none rounded-lg border border-input bg-background px-3 py-1 pr-8 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
    </div>
  )
}

export { Select }
