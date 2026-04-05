import { useFinance } from '../../hooks/useFinance'
import { Button } from '../ui/Button'
import { Trash2 } from 'lucide-react'
import { clsx } from 'clsx'

export const TransactionActions = ({ transaction, className }) => {
  const { role, deleteTransaction } = useFinance()

  if (role !== 'admin') return null

  return (
    <div className={clsx('flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200', className)}>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => deleteTransaction(transaction.id)}
        className="h-8 px-3 py-1 shadow-sm hover:shadow-md"
      >
        <Trash2 size={16} />
        <span className="sr-only">Delete transaction</span>
      </Button>
    </div>
  )
}

