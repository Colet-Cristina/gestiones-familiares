import { useState } from "react";
import { FaWallet, FaEdit, FaTrash, FaFilter } from "react-icons/fa";

/**
 * Componente para la gestión de gastos compartidos o individuales,
 * agrupados por pagador con desplegables (acordeón) y total acumulado.
 */

function Expenses({ expenses = [], setExpenses, onBack }) {
  const [concept, setConcept] = useState("");
  const [amount, setAmount] = useState("");
  const [payer, setPayer] = useState("");
  const [customPayer, setCustomPayer] = useState("");
  const [month, setMonth] = useState(() =>
    new Date().toISOString().slice(0, 7),
  );
  const [editingId, setEditingId] = useState(null);

  // Filtro por mes
  const [filterMonth, setFilterMonth] = useState("all");

  // Lista de personas guardadas
  const existingPayers = Array.from(
    new Set(expenses.map((exp) => exp.payer).filter(Boolean)),
  );

  // ============ MANEJADORES DE EVENTOS (HANDLERS) ============

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

  // ============ CÁLCULOS Y FILTROS ============

  // Filtrado de gastos por el mes seleccionado
  const filteredExpenses = expenses.filter(
    (exp) => filterMonth === "all" || exp.month === filterMonth,
  );

  // Agrupar por persona
  const groupedExpenses = filteredExpenses.reduce((groups, expense) => {
    const person = expense.payer || "Sin asignar";
    if (!groups[person]) {
      groups[person] = [];
    }
    groups[person].push(expense);
    return groups;
  }, {});

  // Total conjunto de la app
  const grandTotal = filteredExpenses.reduce(
    (sum, expense) => sum + (parseFloat(expense.amount) || 0),
    0,
  );

  // ============ RENDERIZADO ============

  return (
    <>
      {/* Cabecera con icono */}
      <div className="detail__header">
        <button className="detail__back-btn" type="button" onClick={onBack}>
          &larr; Volver
        </button>

        <div className="detail__title-box">
          <h3 className="detail__title">Gastos</h3>
          <div className="detail__icon-box detail__icon-box--expenses">
            <FaWallet />
          </div>
        </div>
      </div>

      {/* Formulario */}
      <form className="detail__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Concepto (ej: Farmacia)"
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
          <option value="">-- Persona --</option>
          {existingPayers.map((member) => (
            <option key={member} value={member}>
              {member}
            </option>
          ))}
          <option value="NEW"> + Añadir nueva persona...</option>
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

      {/* Filtro por mes */}
      <div className="expenses__filters">
        <div className="expenses__filters-row">
          <input
            type="month"
            className="detail__input expenses__filter-item"
            value={filterMonth === "all" ? "" : filterMonth}
            onChange={(e) => setFilterMonth(e.target.value || "all")}
          />
          {filterMonth !== "all" && (
            <button
              type="button"
              className="detail__action-btn"
              onClick={() => setFilterMonth("all")}
            >
              <FaFilter /> Ver todos
            </button>
          )}
        </div>
      </div>

      {/* Lista de pestañas (acordeón por persona) */}
      <div className="expenses__summary">
        {Object.keys(groupedExpenses).length === 0 ? (
          <p className="detail__item">No hay gastos registrados.</p>
        ) : (
          Object.entries(groupedExpenses).map(([person, items]) => {
            const personSubtotal = items.reduce(
              (sum, item) => sum + (parseFloat(item.amount) || 0),
              0,
            );

            return (
              <div key={person} className="expenses__group">
                <details>
                  <summary className="expenses__group-summary">
                    <span className="expenses__summary-info">
                      👤 <strong>{person}</strong> ({items.length})
                    </span>
                    <span className="expenses__summary-total">
                      {personSubtotal.toFixed(2)} €
                      <span className="expenses__summary-icon">▼</span>
                    </span>
                  </summary>

                  <div className="expenses__group-content">
                    <ul className="detail__list">
                      {items.map((expense) => (
                        <li key={expense.id} className="detail__item">
                          <div className="detail__item-info">
                            <span className="detail__item-title">
                              {expense.concept}
                            </span>
                            <span className="detail__item-date">
                              📅 {expense.month}
                            </span>
                            <span className="detail__item-date expenses__item-amount">
                              {parseFloat(expense.amount).toFixed(2)} €
                            </span>
                          </div>

                          <div className="detail__item-actions">
                            <button
                              type="button"
                              className="detail__action-btn detail__action-btn--edit"
                              onClick={() => handleEdit(expense)}
                              title="Editar gasto"
                            >
                              <FaEdit />
                            </button>
                            <button
                              type="button"
                              className="detail__action-btn detail__action-btn--delete"
                              onClick={() => handleDelete(expense.id)}
                              title="Eliminar gasto"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              </div>
            );
          })
        )}

        {/* Total conjunto destacado */}
        {filteredExpenses.length > 0 && (
          <div className="expenses__total">
            <span>Total Conjunto:</span>
            <span className="expenses__total-amount">
              {grandTotal.toFixed(2)} €
            </span>
          </div>
        )}
      </div>
    </>
  );
}

export default Expenses;
