import { TransactionTable } from '../components/transactions/TransactionTable'
import { TransactionForm } from '../components/transactions/TransactionForm'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'

export const Transactions = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl animate-slide-up">
          Transactions
        </h1>
        <p className="text-xl text-muted-foreground mt-4 max-w-2xl animate-fade-in">
          Track and manage all your financial transactions in one place.
        </p>
      </div>

      <TransactionForm />
      <TransactionTable />
    </div>
  )
}

