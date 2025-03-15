import { useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw Error("useBudget must be used inside a BudgetContextProvider");
  }
  return context;
};
