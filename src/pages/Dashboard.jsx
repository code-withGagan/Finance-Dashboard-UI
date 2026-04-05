import { SummaryCards } from '../components/dashboard/SummaryCards'
import { BalanceTrendChart } from '../components/dashboard/BalanceTrendChart'
import { ExpensePieChart } from '../components/dashboard/ExpensePieChart'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'

export const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl animate-slide-up">
          Welcome to your Finance Dashboard
        </h1>
        <p className="text-xl text-muted-foreground mt-4 max-w-2xl animate-fade-in">
          Track your income, expenses, and get actionable insights about your financial health.
        </p>
      </div>

      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BalanceTrendChart />
        <ExpensePieChart />
      </div>
    </div>
  )
}

