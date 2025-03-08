export interface Budget {
  id: string
  name: string
  amount: number
  spent: number
  categoryId: string | null // null means all categories
  period: 'weekly' | 'monthly' | 'yearly'
  createdAt: Date
}