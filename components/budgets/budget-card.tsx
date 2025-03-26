import { Budget } from "@/types/budget"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { calculatePercentage, formatCurrency } from "@/lib/utils"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"

interface BudgetCardProps {
  budget: Budget
}

export default function BudgetCard({ budget }: BudgetCardProps) {
  const percentage = calculatePercentage(budget.spent, budget.amount)
  const remaining = budget.amount - budget.spent
  
  // Determine the color of the progress bar based on percentage
  let progressColor = "bg-green-500"
  if (percentage > 85) {
    progressColor = "bg-red-500"
  } else if (percentage > 65) {
    progressColor = "bg-amber-500"
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="flex items-center">
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center text-red-500">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">{formatCurrency(budget.amount)}</span>
          <span 
            className={`text-sm font-medium ${percentage >= 100 ? 'text-red-500' : 'text-muted-foreground'}`}
          >
            {formatCurrency(budget.spent)} spent
          </span>
        </div>
        <div className="space-y-1">
          <Progress 
            value={percentage > 100 ? 100 : percentage} 
            className={`h-2 ${progressColor}`}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{percentage}% used</span>
            <span>{formatCurrency(remaining)} remaining</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-1">
        <div className="text-xs text-muted-foreground">
          {budget.categoryId ? 'Category budget' : 'All categories'} • {budget.period}
        </div>
      </CardFooter>
    </Card>
  )
}