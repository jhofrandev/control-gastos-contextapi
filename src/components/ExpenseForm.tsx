import { useState, ChangeEvent, FormEvent } from "react";
import DatePicker from "react-date-picker";

import { DraftExpense, Value } from "../types";
import { categories } from "../data/categories";

import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import ErrorMessege from "./ErrorMessege";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: "",
    category: "",
    date: new Date(),
  });
  const [error, setError] = useState("");

  const { dispatch } = useBudget();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const isAmount = ["amount"].includes(name);
    setExpense({
      ...expense,
      [name]: isAmount ? +value : value,
    });
  };

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(expense).includes("")) {
      setError("Todos los campos son obligatorios");
      return;
    }

    dispatch({ type: "add-expense", payload: { expense } });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        Nuevo Gasto
      </legend>

      {error && <ErrorMessege>{error}</ErrorMessege>}

      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre Gasto:
        </label>
        <input
          type="text"
          id="expenseName"
          placeholder="Añade el Nombre del gasto"
          className="bg-slate-100 p-2"
          name="expenseName"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Cantidad:
        </label>
        <input
          type="number"
          id="amount"
          placeholder="Añade la cantidad del gasto"
          className="bg-slate-100 p-2"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Categoria:
        </label>
        <select
          id="category"
          className="bg-slate-100 p-2"
          name="category"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="">-- Seleccione --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-xl">
            Fecha Gasto:
          </label>
          <DatePicker
            className="bg-slate-100 p-2 border-0"
            value={expense.date}
            onChange={handleChangeDate}
          />
        </div>

        <input
          type="submit"
          className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
          value={"Registrar Gasto"}
        />
      </div>
    </form>
  );
}
