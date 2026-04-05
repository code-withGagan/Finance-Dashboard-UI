import { useFinance } from '../hooks/useFinance'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts'
import { mockExpenseBreakdown, mockBalanceTrend } from '../data/transactions'
import { TrendingUp, Award, AlertCircle } from 'lucide-react'
import { clsx } from 'clsx'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

export const Insights = () => {
  const { transactions, income, expenses } = useFinance()

  const highestSpendingCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {})

  const topCategory = Object.entries(highestSpendingCategory).sort(([,a], [,b]) => b - a)[0]
  const savingsRate = ((income - expenses) / income * 100).toFixed(1)

  const insightText = savingsRate > 20 ? 
    "Excellent! You're saving more than 20% of your income. Keep up the great work!" :
    savingsRate > 10 ? 
      "Good job! You're on track with your savings goals." :
      "Consider reviewing your spending. Try to increase your savings rate above 10%."

  const monthlyComparison = [
    { month: 'Jan', income: 4500, expense: 3200 },
    { month: 'Feb', income: 5200, expense: 3800 },
    { month: 'Mar', income: 8500, expense: 3260 },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl animate-slide-up">
          Financial Insights
        </h1>
        <p className="text-xl text-muted-foreground mt-4 max-w-2xl animate-fade-in">
          Actionable insights to help you make better financial decisions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Highest Spending */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-500" />
              Highest Spending Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                ${topCategory ? topCategory[1].toLocaleString() : '0'}
              </div>
              <div className="text-2xl font-semibold text-amber-600 dark:text-amber-400 mb-4">
                {topCategory ? topCategory[0] : 'N/A'}
              </div>
              <div className="text-sm text-muted-foreground">
                Consider reviewing spending in this category
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Savings Rate */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-emerald-500" />
              Monthly Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyComparison}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="income" fill="#3b82f6" name="Income" />
                  <Bar dataKey="expense" fill="#ef4444" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="font-semibold text-emerald-800 dark:text-emerald-200">
                  Savings Rate: {savingsRate}%
                </span>
              </div>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                {insightText}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

