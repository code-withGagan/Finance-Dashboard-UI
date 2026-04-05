import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import mockTransactions from '../data/transactions.js';
import { TRANSACTION_TYPES } from '../types/index.js';

const FinanceContext = createContext();

const initialState = {
  transactions: [],
  filteredTransactions: [],
  role: 'viewer',
  filters: {
    search: '',
    sortBy: 'date',
    sortOrder: 'desc',
  },
  balance: 0,
  income: 0,
  expenses: 0,
};

function financeReducer(state, action) {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return {
        ...state,
        transactions: action.payload,
        filteredTransactions: action.payload,
      };
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      };
    case 'SET_ROLE':
      return { ...state, role: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    case 'UPDATE_SUMMARY':
      const income = state.transactions
        .filter(t => t.type === TRANSACTION_TYPES.INCOME)
        .reduce((sum, t) => sum + t.amount, 0);
      const expenses = state.transactions
        .filter(t => t.type === TRANSACTION_TYPES.EXPENSE)
        .reduce((sum, t) => sum + t.amount, 0);
      return {
        ...state,
        income,
        expenses,
        balance: income - expenses,
        filteredTransactions: applyFilters(state.transactions, state.filters),
      };
    default:
      return state;
  }
}

function applyFilters(transactions, filters) {
  let filtered = [...transactions];

  // Search
  if (filters.search) {
    filtered = filtered.filter(t =>
      t.category.toLowerCase().includes(filters.search.toLowerCase()) ||
      t.description?.toLowerCase().includes(filters.search.toLowerCase()) ||
      t.amount.toString().includes(filters.search)
    );
  }

  // Sort
  filtered.sort((a, b) => {
    let aVal, bVal;
    if (filters.sortBy === 'date') {
      aVal = new Date(a.date).getTime();
      bVal = new Date(b.date).getTime();
    } else {
      aVal = a.amount;
      bVal = b.amount;
    }
    return filters.sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
  });

  return filtered;
}

export function FinanceProvider({ children }) {
  const [state, dispatch] = useReducer(financeReducer, initialState);

  useEffect(() => {
    // Load from localStorage or use mock
    const saved = localStorage.getItem('financeTransactions');
    if (saved) {
      dispatch({ type: 'SET_TRANSACTIONS', payload: JSON.parse(saved) });
    } else {
      dispatch({ type: 'SET_TRANSACTIONS', payload: mockTransactions });
    }
    dispatch({ type: 'UPDATE_SUMMARY' });
  }, []);

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('financeTransactions', JSON.stringify(state.transactions));
    dispatch({ type: 'UPDATE_SUMMARY' });
  }, [state.transactions]);

  const addTransaction = (transaction) => {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: {
        ...transaction,
        id: uuidv4(),
        date: new Date().toISOString().split('T')[0],
      },
    });
  };

  const deleteTransaction = (id) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  const setRole = (role) => {
    dispatch({ type: 'SET_ROLE', payload: role });
  };

  const setFilters = (filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
    dispatch({ type: 'UPDATE_SUMMARY' });
  };

  const value = {
    ...state,
    addTransaction,
    deleteTransaction,
    setRole,
    setFilters,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
}

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within FinanceProvider');
  }
  return context;
};

