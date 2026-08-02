import { useState } from "react";
import Calendar from "./Calendar";

function Appointments({ appointments = [], setAppointments, onOpenModal }) {
  const [spec, setSpec] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Añadir o editar cita
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
        id: Date.now().toString(),
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

  // Preparar edición
  const handleEdit = (app) => {
    setSpec(app.spec);
    setDate(app.date);
    setTime(app.time);
    setEditingId(app.id);
  };

  // Eliminar cita
  const handleDelete = (id) => {
    setAppointments(appointments.filter((app) => app.id !== id));
  };

  return (
    <>
      <h3 className="detail__title">Próximas Citas</h3>

      <form className="detail__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Cita"
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
        <button type="submit" className="detail__btn">
          {editingId ? "Guardar Cambios" : "Añadir Cita"}
        </button>
      </form>

      {/* Le pasamos las citas al Calendario */}
      <Calendar appointments={appointments} />

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

                // Formatear la fecha a DD/MM/YYYY para mostrarla al usuario
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
                        📝
                      </button>
                      <button
                        type="button"
                        className="detail__action-btn"
                        onClick={() => handleEdit(app)}
                        title="Editar Cita"
                      >
                        ✏️
                      </button>
                      <button
                        type="button"
                        className="detail__action-btn"
                        onClick={() => handleDelete(app.id)}
                        title="Eliminar Cita"
                      >
                        🗑️
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
