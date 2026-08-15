import { useState } from "react";
import { FaPills, FaEdit, FaTrash } from "react-icons/fa";

/**
 * Componente para la gestión de medicamentos.
 * Permite agregar, editar y eliminar medicamentos y sus dosis.
 */

function Medication({ meds = [], setMeds, onBack }) {
  // Estados para los inputs del formulario
  const [name, setName] = useState("");
  const [dose, setDose] = useState("");
  const [editingId, setEditingId] = useState(null);

  // ============ MANEJADORES DE EVENTOS (HANDLERS) ============

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
        id: crypto.randomUUID(),
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

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Eliminar medicamento
  const handleDelete = (id) => {
    setMeds(meds.filter((med) => med.id !== id));
  };

  // ============ WHATSAPP LINK ============
  const whatsappMessage = encodeURIComponent(
    `¡Hola. He actualizado la medicación en la app. Echadle un vistazo.`,
  );
  const whatsappUrl = `https://api.whatsapp.com/send?text=${whatsappMessage}`;

  // ============ RENDERIZADO ============
  return (
    <>
      {/* Cabecera temática */}
      <div className="detail__header">
        <button className="detail__back-btn" type="button" onClick={onBack}>
          &larr; Volver
        </button>

        <div className="detail__title-box">
          <h3 className="detail__title">Medicación</h3>
          <div className="detail__icon-box detail__icon-box--medication">
            <FaPills />
          </div>
        </div>
      </div>

      {/* Formulario principal (añadir / editar) */}
      <form className="detail__form" onSubmit={handleSubmit}>
        <label className="detail__label" htmlFor="med-name">
          Nombre del medicamento
        </label>
        <input
          type="text"
          id="med-name"
          placeholder="Nombre del medicamento"
          className="detail__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label className="detail__label" htmlFor="med-dose">
          Dosis
        </label>
        <input
          type="text"
          id="med-dose"
          placeholder="Dosis (ej: 1 cada 8h)"
          className="detail__input"
          value={dose}
          onChange={(e) => setDose(e.target.value)}
          required
        />

        {/* BOTONES */}
        <div className="detail__form-actions">
          <button type="submit" className="detail__btn">
            {editingId ? "Guardar Cambios" : "Añadir Medicamento"}
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="detail__btn"
          >
            Avisar por WhatsApp
          </a>
        </div>
      </form>

      {/* Listado de medicamentos */}
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
                    className="detail__action-btn detail__action-btn--edit"
                    onClick={() => handleEdit(med)}
                    title="Editar medicamento"
                  >
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    className="detail__action-btn detail__action-btn--delete"
                    onClick={() => handleDelete(med.id)}
                    title="Eliminar medicamento"
                  >
                    <FaTrash />
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
