/**
 * Componente modal para escribir y editar observaciones o notas sobre una cita médica.
 */

function ModalNote({
  isOpen,
  appointment,
  noteText,
  setNoteText,
  onSave,
  onClose,
}) {
  // Guardas de seguridad para evitar renderizar si está cerrado o falta la cita
  if (!isOpen || !appointment) return null;

  // ============ RENDERIZADO ============

  return (
    <div className="modal" onClick={onClose}>
      {/* stopPropagation evita cerrar el modal al pulsar dentro de la tarjeta blanca */}
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={onClose}>
          &times;
        </button>
        <h3 className="modal__title">Notas: {appointment.spec}</h3>

        <textarea
          className="modal__textarea"
          placeholder="Escribe aquí cualquier observación, indicación previa o recordatorio..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        ></textarea>

        <div className="modal__actions">
          <button type="button" className="modal__btn" onClick={onSave}>
            Guardar Nota
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalNote;
