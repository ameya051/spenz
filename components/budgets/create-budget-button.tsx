"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import BudgetDialog from "./budget-dialog"

export default function CreateBudgetButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <PlusCircle className="mr-2 h-4 w-4" />
        New Budget
      </Button>
      <BudgetDialog 
        open={open} 
        onOpenChange={setOpen} 
        onSubmit={(data) => {
          console.log(data)
          // In a real app, you would save the budget to your backend
          setOpen(false)
        }} 
      />
    </>
  )
}