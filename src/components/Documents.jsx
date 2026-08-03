import { useState } from "react";

function Documents({ documents = [], setDocuments, onBack }) {
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [customOwner, setCustomOwner] = useState("");
  const [fileData, setFileData] = useState(null); // Guardará la imagen en Base64
  const [fileType, setFileType] = useState(""); // Saber si es imagen o PDF
  const [editingId, setEditingId] = useState(null);

  // Filtro por persona
  const [filterOwner, setFilterOwner] = useState("all");

  const existingOwners = Array.from(
    new Set(documents.map((doc) => doc.owner).filter(Boolean)),
  );

  // 📷 Convertir el archivo/foto a Base64 para guardarlo en la app
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileType(file.type);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileData(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalOwner = owner === "NEW" ? customOwner.trim() : owner;
    if (!finalOwner) return;

    if (editingId) {
      setDocuments(
        documents.map((doc) =>
          doc.id === editingId
            ? { ...doc, title, owner: finalOwner, fileData, fileType }
            : doc,
        ),
      );
      setEditingId(null);
    } else {
      const newDocument = {
        id: crypto.randomUUID(),
        title,
        owner: finalOwner,
        fileData,
        fileType,
        createdAt: new Date().toLocaleDateString("es-ES"),
      };
      setDocuments([...documents, newDocument]);
    }

    setTitle("");
    setOwner("");
    setCustomOwner("");
    setFileData(null);
    setFileType("");
  };

  const handleEdit = (doc) => {
    setTitle(doc.title);
    setOwner(doc.owner || "");
    setFileData(doc.fileData || null);
    setFileType(doc.fileType || "");
    setEditingId(doc.id);
  };

  const handleDelete = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  const filteredDocuments = documents.filter(
    (doc) => filterOwner === "all" || doc.owner === filterOwner,
  );

  return (
    <>
      <div className="detail__header">
        <button className="detail__back-btn" type="button" onClick={onBack}>
          ← Volver
        </button>
        <h3 className="detail__title">Documentación</h3>
      </div>

      <form className="detail__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre (ej: Receta Sintrom, Tarjeta Sanitaria)"
          className="detail__input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <select
          className="detail__input"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          required
        >
          <option value="">-- ¿De quién es el documento? --</option>
          {existingOwners.map((person) => (
            <option key={person} value={person}>
              {person}
            </option>
          ))}
          <option value="NEW"> + Añadir...</option>
        </select>

        {owner === "NEW" && (
          <input
            type="text"
            placeholder="Nombre de la persona"
            className="detail__input"
            value={customOwner}
            onChange={(e) => setCustomOwner(e.target.value)}
            required
          />
        )}

        {/* 📸 Input para subir documento o HACER FOTO con la cámara */}
        <div className="documents__file-input-wrapper">
          <label className="documents__file-label" htmlFor="doc-file">
            📸 Hacer foto o subir imagen/PDF
          </label>
          <input
            id="doc-file"
            type="file"
            accept="image/*,application/pdf"
            capture="environment"
            className="documents__file-input"
            onChange={handleFileChange}
          />
        </div>

        {/* Previsualización rápida de la foto elegida */}
        {fileData && (
          <div className="documents__preview">
            {fileType.includes("image") ? (
              <img
                src={fileData}
                alt="Vista previa"
                className="documents__preview-img"
              />
            ) : (
              <span className="documents__preview-pdf">
                📄 PDF adjuntado correctamente
              </span>
            )}
          </div>
        )}

        <button type="submit" className="detail__btn">
          {editingId ? "Guardar Cambios" : "Añadir Documento"}
        </button>
      </form>

      {/* FILTRO */}
      {existingOwners.length > 0 && (
        <div className="documents__filters">
          <select
            className="detail__input"
            value={filterOwner}
            onChange={(e) => setFilterOwner(e.target.value)}
          >
            <option value="all">Ver todos los documentos</option>
            {existingOwners.map((person) => (
              <option key={person} value={person}>
                {person}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* LISTADO DE DOCUMENTOS CON SU FOTO */}
      <div className="documents__summary">
        <ul className="detail__list">
          {filteredDocuments.length === 0 ? (
            <li className="detail__item">
              No hay documentos guardados para este filtro.
            </li>
          ) : (
            filteredDocuments.map((doc) => (
              <li key={doc.id} className="detail__item documents__item">
                <div className="detail__item-info">
                  <span className="detail__item-title">📄 {doc.title}</span>
                  <span className="detail__item-date">
                    👤 <strong>{doc.owner}</strong> | 📅 {doc.createdAt}
                  </span>

                  {/* Mostramos la foto o el botón de abrir PDF directamente */}
                  {doc.fileData && (
                    <div className="documents__file-container">
                      {doc.fileType?.includes("image") ? (
                        <a
                          href={doc.fileData}
                          target="_blank"
                          rel="noreferrer"
                          title="Haz clic para ver foto completa"
                        >
                          <img
                            src={doc.fileData}
                            alt={doc.title}
                            className="documents__thumb"
                          />
                        </a>
                      ) : (
                        <a
                          href={doc.fileData}
                          target="_blank"
                          rel="noreferrer"
                          className="documents__pdf-link"
                        >
                          🔗 Ver documento PDF
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <div className="detail__item-actions">
                  <button
                    type="button"
                    className="detail__action-btn"
                    onClick={() => handleEdit(doc)}
                    title="Editar documento"
                  >
                    ✏️
                  </button>
                  <button
                    type="button"
                    className="detail__action-btn"
                    onClick={() => handleDelete(doc.id)}
                    title="Eliminar documento"
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

export default Documents;
