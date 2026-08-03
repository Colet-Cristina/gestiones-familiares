import { useState } from "react";

function Expenses({ expenses = [], setExpenses, onBack }) {
  const [concept, setConcept] = useState("");
  const [amount, setAmount] = useState("");
  const [payer, setPayer] = useState("");
  const [customPayer, setCustomPayer] = useState("");
  const [month, setMonth] = useState(() =>
    new Date().toISOString().slice(0, 7),
  );
  const [editingId, setEditingId] = useState(null);

  // Filtros
  const [filterPayer, setFilterPayer] = useState("all");
  const [filterMonth, setFilterMonth] = useState("all");

  // Obtener lista única de pagadores
  const existingPayers = Array.from(
    new Set(expenses.map((exp) => exp.payer).filter(Boolean)),
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalPayer = payer === "NEW" ? customPayer.trim() : payer;
    if (!finalPayer) return;

    if (editingId) {
      setExpenses(
        expenses.map((expense) =>
          expense.id === editingId
            ? { ...expense, concept, amount, payer: finalPayer, month }
            : expense,
        ),
      );
      setEditingId(null);
    } else {
      const newExpense = {
        id: crypto.randomUUID(),
        concept,
        amount,
        payer: finalPayer,
        month,
      };
      setExpenses([...expenses, newExpense]);
    }

    setConcept("");
    setAmount("");
    setCustomPayer("");
    setPayer("");
  };

  const handleEdit = (expense) => {
    setConcept(expense.concept);
    setAmount(expense.amount);
    setPayer(expense.payer || "");
    setMonth(expense.month || new Date().toISOString().slice(0, 7));
    setEditingId(expense.id);
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  // Gastos filtrados
  const filteredExpenses = expenses.filter((exp) => {
    const matchesPayer = filterPayer === "all" || exp.payer === filterPayer;
    const matchesMonth = filterMonth === "all" || exp.month === filterMonth;
    return matchesPayer && matchesMonth;
  });

  // Total acumulado
  const totalAmount = filteredExpenses.reduce(
    (sum, expense) => sum + (parseFloat(expense.amount) || 0),
    0,
  );

  return (
    <>
      <div className="detail__header">
        <button className="detail__back-btn" type="button" onClick={onBack}>
          ← Volver
        </button>
        <h3 className="detail__title">Gastos Familiares</h3>
      </div>

      <form className="detail__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Concepto (ej: Farmacia, Silla de ruedas)"
          className="detail__input"
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Importe (€)"
          className="detail__input"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <select
          className="detail__input"
          value={payer}
          onChange={(e) => setPayer(e.target.value)}
          required
        >
          <option value="">-- Selecciona quién lo gasta --</option>
          {existingPayers.map((member) => (
            <option key={member} value={member}>
              {member}
            </option>
          ))}
          <option value="NEW">➕ Añadir nueva persona...</option>
        </select>

        {payer === "NEW" && (
          <input
            type="text"
            placeholder="Escribe el nombre de la persona"
            className="detail__input"
            value={customPayer}
            onChange={(e) => setCustomPayer(e.target.value)}
            required
          />
        )}

        <input
          type="month"
          className="detail__input"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          required
        />

        <button type="submit" className="detail__btn">
          {editingId ? "Guardar Cambios" : "Añadir Gasto"}
        </button>
      </form>

      {/* FILTROS */}
      <div className="expenses__filters">
        <h4 className="detail__subtitle">Filtrar por:</h4>
        <div className="expenses__filters-row">
          <select
            className="detail__input expenses__filter-item"
            value={filterPayer}
            onChange={(e) => setFilterPayer(e.target.value)}
          >
            <option value="all">Todas las personas</option>
            {existingPayers.map((member) => (
              <option key={member} value={member}>
                {member}
              </option>
            ))}
          </select>

          <input
            type="month"
            className="detail__input expenses__filter-item"
            value={filterMonth === "all" ? "" : filterMonth}
            onChange={(e) => setFilterMonth(e.target.value || "all")}
          />
        </div>
      </div>

      {/* LISTADO DE GASTOS */}
      <div className="expenses__summary">
        <ul className="detail__list">
          {filteredExpenses.length === 0 ? (
            <li className="detail__item">
              No hay gastos registrados para este filtro.
            </li>
          ) : (
            filteredExpenses.map((expense) => (
              <li key={expense.id} className="detail__item">
                <div className="detail__item-info">
                  <span className="detail__item-title">{expense.concept}</span>
                  <span className="detail__item-date">
                    👤{" "}
                    <strong className="expenses__item-payer">
                      {expense.payer}
                    </strong>{" "}
                    | 📅 {expense.month}
                  </span>
                  <span className="detail__item-date expenses__item-amount">
                    {parseFloat(expense.amount).toFixed(2)} €
                  </span>
                </div>

                <div className="detail__item-actions">
                  <button
                    type="button"
                    className="detail__action-btn"
                    onClick={() => handleEdit(expense)}
                    title="Editar gasto"
                  >
                    ✏️
                  </button>
                  <button
                    type="button"
                    className="detail__action-btn"
                    onClick={() => handleDelete(expense.id)}
                    title="Eliminar gasto"
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>

        <div className="expenses__total">
          <span>Total mostrando:</span>
          <span className="expenses__total-amount">
            {totalAmount.toFixed(2)} €
          </span>
        </div>
      </div>
    </>
  );
}

export default Expenses;
