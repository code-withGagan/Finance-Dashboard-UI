import { v4 as uuidv4 } from 'uuid'; // Note: install uuid if needed, but use simple id for now
import { TRANSACTION_TYPES } from '../types/index.js';

const mockTransactions = [
  {
    id: '1',
    date: '2024-03-15',
    amount: 5000,
    category: 'Salary',
    type: TRANSACTION_TYPES.INCOME,
    description: 'Monthly salary'
  },
  {
    id: '2',
    date: '2024-03-16',
    amount: 250,
    category: 'Food',
    type: TRANSACTION_TYPES.EXPENSE,
    description: 'Dinner out'
  },
  {
    id: '3',
    date: '2024-03-17',
    amount: 1200,
    category: 'Salary',
    type: TRANSACTION_TYPES.INCOME,
    description: 'Freelance work'
  },
  {
    id: '4',
    date: '2024-03-18',
    amount: 450,
    category: 'Transportation',
    type: TRANSACTION_TYPES.EXPENSE,
    description: 'Gas'
  },
  {
    id: '5',
    date: '2024-03-19',
    amount: 89,
    category: 'Food',
    type: TRANSACTION_TYPES.EXPENSE,
    description: 'Groceries'
  },
  {
    id: '6',
    date: '2024-03-20',
    amount: 300,
    category: 'Entertainment',
    type: TRANSACTION_TYPES.EXPENSE,
    description: 'Movie'
  },
  {
    id: '7',
    date: '2024-03-21',
    amount: 750,
    category: 'Investment',
    type: TRANSACTION_TYPES.INCOME,
    description: 'Dividends'
  },
  {
    id: '8',
    date: '2024-03-22',
    amount: 200,
    category: 'Utilities',
    type: TRANSACTION_TYPES.EXPENSE,
    description: 'Electricity'
  },
  {
    id: '9',
    date: '2024-03-23',
    amount: 150,
    category: 'Food',
    type: TRANSACTION_TYPES.EXPENSE,
    description: 'Lunch'
  },
  {
    id: '10',
    date: '2024-03-24',
    amount: 3200,
    category: 'Salary',
    type: TRANSACTION_TYPES.INCOME,
    description: 'Bonus'
  },
  // Add more for better charts (15-20 total)
  {
    id: '11',
    date: '2024-03-10',
    amount: 100,
    category: 'Food',
    type: TRANSACTION_TYPES.EXPENSE,
  },
  {
    id: '12',
    date: '2024-03-11',
    amount: 80,
    category: 'Transportation',
    type: TRANSACTION_TYPES.EXPENSE,
  },
  {
    id: '13',
    date: '2024-03-12',
    amount: 600,
    category: 'Shopping',
    type: TRANSACTION_TYPES.EXPENSE,
  },
  {
    id: '14',
    date: '2024-03-13',
    amount: 900,
    category: 'Rent',
    type: TRANSACTION_TYPES.EXPENSE,
  },
  {
    id: '15',
    date: '2024-03-14',
    amount: 400,
    category: 'Healthcare',
    type: TRANSACTION_TYPES.EXPENSE,
  },
];

export const mockBalanceTrend = [
  { month: 'Jan', balance: 3200 },
  { month: 'Feb', balance: 4500 },
  { month: 'Mar', balance: 5240 },
  { month: 'Apr', balance: 6800 },
];

export const mockExpenseBreakdown = [
  { name: 'Food', value: 789 },
  { name: 'Transportation', value: 650 },
  { name: 'Entertainment', value: 300 },
  { name: 'Utilities', value: 200 },
  { name: 'Shopping', value: 600 },
  { name: 'Rent', value: 900 },
  { name: 'Healthcare', value: 400 },
];

export default mockTransactions;

