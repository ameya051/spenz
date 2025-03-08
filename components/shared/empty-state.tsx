import { LucideIcon } from "lucide-react"
import * as Icons from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  title: string
  description: string
  icon?: keyof typeof Icons
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ title, description, icon = "File", action }: EmptyStateProps) {
  const Icon = Icons[icon] as LucideIcon

  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <Icon className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">{title}</h3>
        <p className="mt-2 mb-4 text-sm text-muted-foreground">
          {description}
        </p>
        {action && (
          <Button onClick={action.onClick}>
            {action.label}
          </Button>
        )}
      </div>
    </div>
  )
}