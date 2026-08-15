import { useState } from "react";
import { FaNotesMedical, FaEdit, FaTrash } from "react-icons/fa";

/**
 * Componente para la gestión de información médica.
 * Permite agregar, editar y eliminar datos clave como grupo sanguíneo, alergias o condiciones.
 */

function MedicalInfo({ medicalInfo = [], setMedicalInfo, onBack }) {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [editingId, setEditingId] = useState(null);

  // ============ MANEJADORES DE EVENTOS (HANDLERS) ============

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setMedicalInfo(
        medicalInfo.map((info) =>
          info.id === editingId ? { ...info, title, detail } : info,
        ),
      );
      setEditingId(null);
    } else {
      const newInfo = {
        id: crypto.randomUUID(),
        title,
        detail,
      };
      setMedicalInfo([...medicalInfo, newInfo]);
    }

    setTitle("");
    setDetail("");
  };

  const handleEdit = (info) => {
    setTitle(info.title);
    setDetail(info.detail);
    setEditingId(info.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = (id) => {
    setMedicalInfo(medicalInfo.filter((info) => info.id !== id));
  };

  // ============ WHATSAPP LINK ============
  const whatsappMessage = encodeURIComponent(
    `¡Hola. He actualizado la información médica en la app. Echadle un vistazo.`,
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
          <h3 className="detail__title">Información Médica</h3>
          <div className="detail__icon-box detail__icon-box--medical-info">
            <FaNotesMedical />
          </div>
        </div>
      </div>

      {/* Formulario principal */}
      <form className="detail__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Dato clave (ej: Grupo sanguíneo, Alergias)"
          className="detail__input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Detalle (ej: A+, Penicilina)"
          className="detail__input"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          required
        />
        <div className="detail__form-actions">
          <button type="submit" className="detail__btn">
            {editingId ? "Guardar Cambios" : "Añadir Información"}
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

      {/* Listado de información */}
      <div className="info-summary">
        <h3 className="detail__subtitle">Datos guardados</h3>
        <ul className="detail__list">
          {medicalInfo.length === 0 ? (
            <li className="detail__item">No hay información registrada.</li>
          ) : (
            medicalInfo.map((info) => (
              <li key={info.id} className="detail__item">
                <div className="detail__item-info">
                  <span className="detail__item-title">{info.title}</span>
                  <span className="detail__item-date">{info.detail}</span>
                </div>

                <div className="detail__item-actions">
                  <button
                    type="button"
                    className="detail__action-btn detail__action-btn--edit"
                    onClick={() => handleEdit(info)}
                    title="Editar información"
                  >
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    className="detail__action-btn detail__action-btn--delete"
                    onClick={() => handleDelete(info.id)}
                    title="Eliminar información"
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

export default MedicalInfo;
