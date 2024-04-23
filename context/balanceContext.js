import React, { createContext, useContext, useState } from 'react';

// Create the context
export const BalanceContext = createContext();

// Custom hook to use the context
export const useBalance = () => {
  return useContext(BalanceContext);
};

// Provider component to wrap the application
export const BalanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  // Function to add a random transaction
  const addRandomTransaction = () => {
    const randomValue = Math.floor(Math.abs((Math.random() - 0.5) * 1000));
    const newTransaction = {
      id: transactions.length + 1,
      amount: randomValue,
      date: new Date().toISOString(),
    };
    setTransactions([...transactions, newTransaction]);
  };

  // Function to get the current balance
  const getBalance = () => {
    return transactions.reduce((total, transaction) => total + transaction.amount, 0);
  };

  // Function to clear all transactions
  const clearTransactions = () => {
    setTransactions([]);
  };

  return (
    <BalanceContext.Provider
      value={{
        transactions,
        addRandomTransaction,
        getBalance,
        clearTransactions,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};
