import React, { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetsContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export function useBudget() {
  return useContext(BudgetsContext);
}

/* {
  id:
  name:
  max:
}

{
  id:
  budget:
  amount:
  description:
}
 */

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudget] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

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
