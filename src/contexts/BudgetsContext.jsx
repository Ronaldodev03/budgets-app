import React, { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

// Default-budget
const defaultBudget = [
  { id: 1, name: " budget-default-1", max: 500 },
  { id: 2, name: " budget-default-2", max: 1000 },
];
// default-expense
const defaultExpenseBudget = [
  { id: 1, budgetId: 1, description: " expense-default-1", amount: 250 },
  { id: 2, budgetId: 2, description: " expense-default-2", amount: 400 },
  {
    id: 3,
    budgetId: "Uncategorized",
    description: " expense-default-uncategorized-1",
    amount: 400,
  },
  {
    id: 4,
    budgetId: "Uncategorized",
    description: " expense-default-uncategorized-2",
    amount: 100,
  },
];

const BudgetsContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export function useBudget() {
  return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudget] = useLocalStorage("budgets", defaultBudget);
  const [expenses, setExpenses] = useLocalStorage(
    "expenses",
    defaultExpenseBudget
  );

  const getBudgetExpenses = (budgetId) => {
    return expenses.filter((data) => data.budgetId === budgetId);
  };

  const addExpense = ({ description, amount, budgetId }) => {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { id: uuidv4(), budgetId, description, amount }];
    });
  };
  const addBudget = ({ name, max }) => {
    setBudget((prevBudget) => {
      if (prevBudget.find((data) => data.name === name)) return prevBudget;
      return [...prevBudget, { id: uuidv4(), name, max }];
    });
  };
  const deleteBudget = ({ id }) => {
    setExpenses((ps) => {
      return ps.map((expenseData) => {
        if (expenseData.budgetId !== id) return expenseData;
        return { ...expenseData, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });
    setBudget((ps) => ps.filter((data) => data.id !== id));
  };

  const deleteExpense = ({ id }) => {
    setExpenses((ps) => ps.filter((data) => data.id !== id));
  };

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
