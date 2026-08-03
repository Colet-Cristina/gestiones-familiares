import { useState } from "react";

function MedicalInfo({ medicalInfo = [], setMedicalInfo, onBack }) {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [editingId, setEditingId] = useState(null);

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
        id: Date.now().toString(),
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
  };

  const handleDelete = (id) => {
    setMedicalInfo(medicalInfo.filter((info) => info.id !== id));
  };

  return (
    <>
      <div className="detail__header">
        <button className="detail__back-btn" type="button" onClick={onBack}>
          ← Volver
        </button>
        <h3 className="detail__title">Información Médica</h3>
      </div>

      <form className="detail__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Dato clave (ej: Grupo sanguíneo,  Alergias)"
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
        <button type="submit" className="detail__btn">
          {editingId ? "Guardar Cambios" : "Añadir Información"}
        </button>
      </form>

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
                    className="detail__action-btn"
                    onClick={() => handleEdit(info)}
                    title="Editar información"
                  >
                    ✏️
                  </button>
                  <button
                    type="button"
                    className="detail__action-btn"
                    onClick={() => handleDelete(info.id)}
                    title="Eliminar información"
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

export default MedicalInfo;
