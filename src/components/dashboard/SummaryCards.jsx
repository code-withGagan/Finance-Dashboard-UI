import { useFinance } from '../../hooks/useFinance'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { DollarSign, TrendingUp, ArrowDown } from 'lucide-react'
import { clsx } from 'clsx'

export const SummaryCards = () => {
  const { balance, income, expenses } = useFinance()

  const cards = [
    {
      title: 'Total Balance',
      value: `$${balance.toLocaleString()}`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/20',
    },
    {
      title: 'Income',
      value: `$${income.toLocaleString()}`,
      change: '+8.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20',
    },
    {
      title: 'Expenses',
      value: `$${expenses.toLocaleString()}`,
      change: '-3.1%',
      trend: 'down',
      icon: ArrowDown,
      color: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <Card key={card.title} className="group hover:shadow-2xl transition-all duration-500 animate-fade-in">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={clsx('p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300', card.color)}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl leading-tight">{card.value}</CardTitle>
                  <p className="text-3xl font-bold text-balance">{card.title}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1 text-sm font-medium">
                <span className={clsx(card.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400')}>
                  {card.change}
                </span>
                <span className="text-muted-foreground">
                  from last month
                </span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

