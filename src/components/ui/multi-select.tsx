import * as React from "react"
import { cn } from "@/lib/utils"
import { X, ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export interface MultiSelectOption {
  value: string
  label: string
}

interface MultiSelectProps {
  options: MultiSelectOption[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  disabled?: boolean
  id?: string
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select options",
  disabled = false,
  id,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  function toggle(optionValue: string) {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue))
    } else {
      onChange([...value, optionValue])
    }
  }

  function remove(optionValue: string, e: React.MouseEvent) {
    e.stopPropagation()
    onChange(value.filter((v) => v !== optionValue))
  }

  const selectedLabels = options.filter((o) => value.includes(o.value))

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        id={id}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        disabled={disabled}
        onClick={() => !disabled && setOpen((o) => !o)}
        className={cn(
          "flex min-h-8 w-full flex-wrap items-center gap-1 rounded-lg border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors",
          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "pr-8 text-left"
        )}
      >
        {selectedLabels.length === 0 ? (
          <span className="text-muted-foreground">{placeholder}</span>
        ) : (
          selectedLabels.map((o) => (
            <Badge
              key={o.value}
              variant="muted"
              className="flex items-center gap-1 py-0"
            >
              {o.label}
              <span
                role="button"
                aria-label={`Remove ${o.label}`}
                onClick={(e) => remove(o.value, e)}
                className="cursor-pointer rounded-sm hover:bg-foreground/10"
              >
                <X className="size-3" />
              </span>
            </Badge>
          ))
        )}
      </button>

      <ChevronDown
        className={cn(
          "pointer-events-none absolute top-3 right-2.5 size-3.5 text-muted-foreground transition-transform",
          open && "rotate-180"
        )}
      />

      {open && (
        <ul
          role="listbox"
          aria-multiselectable="true"
          className="absolute z-50 mt-1 max-h-48 w-full overflow-auto rounded-lg border border-input bg-background py-1 shadow-md"
        >
          {options.length === 0 ? (
            <li className="px-3 py-2 text-sm text-muted-foreground">
              No options available
            </li>
          ) : (
            options.map((o) => {
              const selected = value.includes(o.value)
              return (
                <li
                  key={o.value}
                  role="option"
                  aria-selected={selected}
                  onClick={() => toggle(o.value)}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 px-3 py-1.5 text-sm",
                    "hover:bg-accent hover:text-accent-foreground",
                    selected && "font-medium text-primary"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-4 items-center justify-center rounded border border-input",
                      selected &&
                        "border-primary bg-primary text-primary-foreground"
                    )}
                  >
                    {selected && (
                      <svg viewBox="0 0 10 8" className="size-2.5 fill-current">
                        <path
                          d="M1 4l3 3 5-6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  {o.label}
                </li>
              )
            })
          )}
        </ul>
      )}
    </div>
  )
}
