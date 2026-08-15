import { useState } from "react";
import { FaCalendarAlt, FaStickyNote, FaEdit, FaTrash } from "react-icons/fa";
import Calendar from "./Calendar";

/**
 * Componente para la gestión completa de Citas Médicas.
 * Permite añadir, editar, eliminar y visualizar citas en lista y calendario.
 */
function Appointments({
  appointments = [],
  setAppointments,
  onOpenModal,
  onBack,
}) {
  // ============ ESTADOS Y UI ============
  const [spec, setSpec] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [editingId, setEditingId] = useState(null);

  // ============ MANEJADORES DE EVENTOS (HANDLERS) ============

  /**
   * Procesa el envío del formulario para crear una nueva cita o guardar cambios en una existente.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setAppointments(
        appointments.map((app) =>
          app.id === editingId ? { ...app, spec, date, time } : app,
        ),
      );
      setEditingId(null);
    } else {
      const newAppointment = {
        id: crypto.randomUUID(),
        spec,
        date,
        time,
        note: "",
      };
      setAppointments([...appointments, newAppointment]);
    }

    setSpec("");
    setDate("");
    setTime("");
  };

  /**
   * Carga los datos de una cita existente en el formulario para editarla.
   */
  const handleEdit = (app) => {
    setSpec(app.spec);
    setDate(app.date);
    setTime(app.time);
    setEditingId(app.id);
  };

  /**
   * Elimina una cita médica por su ID.
   */
  const handleDelete = (id) => {
    setAppointments(appointments.filter((app) => app.id !== id));
  };

  // ============ WHATSAPP LINK ============

  const whatsappMessage = encodeURIComponent(
    `¡Hola. He actualizado la agenda de citas en la app. Echadle un vistazo.`,
  );
  const whatsappUrl = `https://api.whatsapp.com/send?text=${whatsappMessage}`;

  // ============ RENDERIZADO ============
  return (
    <>
      <div className="detail__header">
        <button className="detail__back-btn" type="button" onClick={onBack}>
          &larr; Volver
        </button>

        <div className="detail__title-box">
          <h3 className="detail__title">Próximas Citas</h3>
          <div className="detail__icon-box detail__icon-box--appointments">
            <FaCalendarAlt />
          </div>
        </div>
      </div>

      <form className="detail__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Cita / Especialidad"
          className="detail__input"
          value={spec}
          onChange={(e) => setSpec(e.target.value)}
          required
        />
        <input
          type="date"
          className="detail__input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="time"
          className="detail__input"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />

        {/* BOTONES */}
        <div className="detail__form-actions">
          <button type="submit" className="detail__btn">
            {editingId ? "Guardar Cambios" : "Añadir Cita"}
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

      {/* Calendario interactivo integrado */}
      <Calendar
        appointments={appointments}
        onSelectAppointment={(app) => onOpenModal(app.id)}
      />

      <div className="appointments-summary">
        <h3 className="detail__subtitle">Todas las citas</h3>
        <ul className="detail__list">
          {appointments.length === 0 ? (
            <li className="detail__item">No hay citas programadas.</li>
          ) : (
            [...appointments]
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((app) => {
                const hasNote = Boolean(app.note && app.note.trim() !== "");
                const itemHasNoteClass = hasNote
                  ? "detail__item--has-note"
                  : "";
                const btnHasNoteClass = hasNote
                  ? "detail__action-btn--active"
                  : "";

                // Formatear fecha a formato de lectura DD/MM/YYYY
                let formattedDate = app.date;
                if (
                  app.date &&
                  app.date.includes("-") &&
                  app.date.split("-")[0].length === 4
                ) {
                  const [y, m, d] = app.date.split("-");
                  formattedDate = `${d}/${m}/${y}`;
                }

                return (
                  <li
                    key={app.id}
                    className={`detail__item ${itemHasNoteClass}`}
                  >
                    <div className="detail__item-info">
                      <span className="detail__item-title">{app.spec}</span>

                      <span className="detail__item-date">
                        {formattedDate}{" "}
                        <span className="detail__item-divider">|</span>{" "}
                        {app.time}h
                      </span>
                    </div>

                    <div className="detail__item-actions">
                      <button
                        type="button"
                        className={`detail__action-btn ${btnHasNoteClass}`}
                        onClick={() => onOpenModal(app.id)}
                        title="Ver/Añadir Notas"
                      >
                        <FaStickyNote />
                      </button>
                      <button
                        type="button"
                        className="detail__action-btn detail__action-btn--edit"
                        onClick={() => handleEdit(app)}
                        title="Editar Cita"
                      >
                        <FaEdit />
                      </button>
                      <button
                        type="button"
                        className="detail__action-btn detail__action-btn--delete"
                        onClick={() => handleDelete(app.id)}
                        title="Eliminar Cita"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                );
              })
          )}
        </ul>
      </div>
    </>
  );
}

export default Appointments;
