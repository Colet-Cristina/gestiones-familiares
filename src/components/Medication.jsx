import { useState } from "react";

function Medication({ meds = [], setMeds, onBack }) {
  // Estados para los inputs del formulario
  const [name, setName] = useState("");
  const [dose, setDose] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Añadir o editar medicamento
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setMeds(
        meds.map((med) =>
          med.id === editingId ? { ...med, name, dose } : med,
        ),
      );
      setEditingId(null);
    } else {
      // Si es nuevo, creamos el elemento
      const newMed = {
        id: Date.now().toString(),
        name,
        dose,
      };
      setMeds([...meds, newMed]);
    }

    // Limpiamos los inputs
    setName("");
    setDose("");
  };

  // Cargar datos en el formulario para editar
  const handleEdit = (med) => {
    setName(med.name);
    setDose(med.dose);
    setEditingId(med.id);
  };

  // Eliminar medicamento
  const handleDelete = (id) => {
    setMeds(meds.filter((med) => med.id !== id));
  };

  return (
    <>
      <div className="detail__header">
        <button className="detail__back-btn" type="button" onClick={onBack}>
          ← Volver
        </button>
        <h3 className="detail__title">Medicación</h3>
      </div>

      {/* Formulario principal (Añadir / Editar) */}
      <form className="detail__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del medicamento"
          className="detail__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Dosis (ej: 1 cada 8h)"
          className="detail__input"
          value={dose}
          onChange={(e) => setDose(e.target.value)}
          required
        />
        <button type="submit" className="detail__btn">
          {editingId ? "Guardar Cambios" : "Añadir Medicamento"}
        </button>
      </form>

      <div className="medication-summary">
        <ul className="detail__list">
          {meds.length === 0 ? (
            <li className="detail__item">No hay medicamentos registrados.</li>
          ) : (
            meds.map((med) => (
              <li key={med.id} className="detail__item">
                <div className="detail__item-info">
                  <span className="detail__item-title">{med.name}</span>

                  <span className="detail__item-date">{med.dose}</span>
                </div>

                <div className="detail__item-actions">
                  <button
                    type="button"
                    className="detail__action-btn"
                    onClick={() => handleEdit(med)}
                    title="Editar medicamento"
                  >
                    ✏️
                  </button>
                  <button
                    type="button"
                    className="detail__action-btn"
                    onClick={() => handleDelete(med.id)}
                    title="Eliminar medicamento"
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
}

export default Medication;
