import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: string
    isPositive: boolean
  }
  className?: string
}

export function StatCard({ title, value, icon: Icon, trend, className }: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
            {trend && (
              <p className="mt-2 text-sm">
                <span
                  className={cn(
                    "font-medium",
                    trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
                  )}
                >
                  {trend.value}
                </span>
                <span className="text-muted-foreground"> vs mois dernier</span>
              </p>
            )}
          </div>
          <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="size-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
