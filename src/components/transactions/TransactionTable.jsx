import { useState, useEffect } from 'react'
import { useFinance } from '../../hooks/useFinance'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { ChevronUp, ChevronDown, Search, DollarSign } from 'lucide-react'
import { TransactionActions } from './TransactionActions'
import { clsx } from 'clsx'
import { format } from 'date-fns'
import { CATEGORIES } from '../../types/index.js'

export const TransactionTable = () => {
  const { filteredTransactions, role, setFilters } = useFinance()
  const [localFilters, setLocalFilters] = useState({ search: '', sortBy: 'date', sortOrder: 'desc' })

  useEffect(() => {
    setFilters(localFilters)
  }, [localFilters, setFilters])

  const toggleSort = (sortBy) => {
    if (localFilters.sortBy !== sortBy) {
      setLocalFilters({ ...localFilters, sortBy, sortOrder: 'desc' })
    } else {
      setLocalFilters({
        ...localFilters,
        sortOrder: localFilters.sortOrder === 'asc' ? 'desc' : 'asc'
      })
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              Recent Transactions
              <span className="text-sm text-muted-foreground font-normal">
                ({filteredTransactions.length})
              </span>
            </CardTitle>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by category, description or amount..."
                value={localFilters.search}
                onChange={(e) => setLocalFilters({ ...localFilters, search: e.target.value })}
                className="pl-10"
              />
            </div>
            <div className="flex gap-1">
              {(['date', 'amount'].map((key) => (
                <Button
                  key={key}
                  variant="secondary"
                  size="sm"
                  onClick={() => toggleSort(key)}
                  className="px-3 py-1.5 h-auto"
                >
                  {key === 'date' ? 'Date' : 'Amount'}
                  {localFilters.sortBy === key && (
                    localFilters.sortOrder === 'desc' ? <ChevronDown size={16} className="ml-1" /> : <ChevronUp size={16} className="ml-1" />
                  )}
                </Button>
              )))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <DollarSign className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No transactions found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-4 font-medium text-gray-900 dark:text-gray-100">Date</th>
                <th className="text-left py-4 font-medium text-gray-900 dark:text-gray-100 pl-4">Category</th>
                <th className="text-right py-4 font-medium text-gray-900 dark:text-gray-100">Amount</th>
                <th className="text-left py-4 font-medium text-gray-900 dark:text-gray-100 pl-4">Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.slice(0, 10).map((transaction) => (
                <tr key={transaction.id} className="group border-b border-gray-100 dark:border-gray-800 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {format(new Date(transaction.date), 'MMM dd, yyyy')}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {format(new Date(transaction.date), 'HH:mm')}
                    </div>
                  </td>
                  <td className="py-4 pl-4">
                    <span className={clsx(
                      'inline-flex px-3 py-1 rounded-full text-xs font-medium',
                      transaction.type === 'income' 
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200'
                    )}>
                      {transaction.category}
                    </span>
                  </td>
                  <td className="py-4 text-right font-bold text-lg">
                    <span className={clsx(
                      transaction.type === 'income' ? 'text-income' : 'text-expense'
                    )}>
                      {transaction.type === 'income' ? '+' : ''}${transaction.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 pl-4 flex items-center justify-between">
                    <div className="text-sm text-gray-900 dark:text-gray-100 max-w-xs truncate">
                      {transaction.description || '—'}
                    </div>
                    <div className="ml-4">
                      <TransactionActions transaction={transaction} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardContent>
    </Card>
  )
}

