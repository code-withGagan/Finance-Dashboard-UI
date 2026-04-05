import { useState } from 'react'
import { useFinance } from '../../hooks/useFinance'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { CATEGORIES } from '../../types/index.js'
import { Plus } from 'lucide-react'

export const TransactionForm = () => {
  const { addTransaction, role } = useFinance()
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Salary',
    type: 'income',
    description: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.amount && !isNaN(formData.amount)) {
      addTransaction({
        amount: parseFloat(formData.amount),
        category: formData.category,
        type: formData.type,
        description: formData.description.trim()
      })
      setFormData({ amount: '', category: 'Salary', type: 'income', description: '' })
    }
  }

  if (role !== 'admin') return null

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add New Transaction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount</label>
            <Input
              type="number"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="text-right font-mono"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className="space-y-2 md:col-span-2 lg:col-span-1">
            <label className="text-sm font-medium">Description (optional)</label>
            <Input
              placeholder="What is this transaction for?"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="md:col-span-2 lg:col-span-4 pt-2">
            <Button type="submit" className="w-full md:w-auto">
              Add Transaction
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

