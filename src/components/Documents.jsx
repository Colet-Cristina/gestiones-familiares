import { useState } from "react";
import {
  FaFolderOpen,
  FaEdit,
  FaTrash,
  FaCamera,
  FaFilePdf,
  FaFilter,
  FaEye,
  FaTimes,
} from "react-icons/fa";

/**
 * Componente para gestionar documentos adjuntos (imágenes o PDF),
 * permitiendo subir archivos mediante cámara o archivo local, visualizarlos y filtrarlos.
 */

function Documents({ documents = [], setDocuments, onBack }) {
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [customOwner, setCustomOwner] = useState("");
  const [fileData, setFileData] = useState(null); // Guardará la imagen en Base64
  const [fileType, setFileType] = useState(""); // Saber si es imagen o PDF
  const [editingId, setEditingId] = useState(null);

  const [selectedDoc, setSelectedDoc] = useState(null);

  // Filtro por persona
  const [filterOwner, setFilterOwner] = useState("all");

  const existingOwners = Array.from(
    new Set(documents.map((doc) => doc.owner).filter(Boolean)),
  );

  // ============ MANEJADORES DE EVENTOS (HANDLERS) ============

  // Convertir el archivo/foto a Base64 para guardarlo en la app
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

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  const filteredDocuments = documents.filter(
    (doc) => filterOwner === "all" || doc.owner === filterOwner,
  );

  // ============ WHATSAPP LINK ============
  const whatsappMessage = encodeURIComponent(
    `¡Hola. He actualizado la documentación en la app. Echadle un vistazo.`,
  );
  const whatsappUrl = `https://api.whatsapp.com/send?text=${whatsappMessage}`;

  // ============ RENDERIZADO ============
  return (
    <>
      {/* Cabecera con icono */}
      <div className="detail__header">
        <button className="detail__back-btn" type="button" onClick={onBack}>
          &larr; Volver
        </button>

        <div className="detail__title-box">
          <h3 className="detail__title">Documentación</h3>

          <div className="detail__icon-box detail__icon-box--documents">
            <FaFolderOpen />
          </div>
        </div>
      </div>

      {/* Formulario */}
      <form className="detail__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre (ej: Recetas, Tarjeta Sanitaria)"
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

        {/* Input de archivos */}
        <div className="documents__file-input-wrapper">
          <label className="documents__file-label" htmlFor="doc-file">
            <FaCamera className="documents__camera-icon" /> Hacer foto o subir
            imagen/PDF
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

        {/* Previsualización */}
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
                <FaFilePdf /> PDF adjuntado correctamente
              </span>
            )}
          </div>
        )}

        {/* BOTONES */}
        <div className="detail__form-actions">
          <button type="submit" className="detail__btn">
            {editingId ? "Guardar Cambios" : "Añadir Documento"}
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

      {existingOwners.length > 0 && (
        <div className="documents__filters">
          <div className="documents__filters-row">
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
            {filterOwner !== "all" && (
              <button
                type="button"
                className="detail__action-btn"
                onClick={() => setFilterOwner("all")}
              >
                <FaFilter /> Ver todos
              </button>
            )}
          </div>
        </div>
      )}

      {/* Listado de documentos */}
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
                  <span className="detail__item-title">{doc.title}</span>
                  <span className="detail__item-date">
                    👤 {doc.owner} | 📅 {doc.createdAt}
                  </span>

                  {doc.fileData && (
                    <div className="documents__file-container">
                      <button
                        type="button"
                        className="documents__view-btn"
                        onClick={() => setSelectedDoc(doc)}
                      >
                        {doc.fileType?.includes("image") ? (
                          <img
                            src={doc.fileData}
                            alt={doc.title}
                            className="documents__thumb"
                          />
                        ) : (
                          <span className="documents__pdf-link">
                            <FaFilePdf /> Ver documento PDF
                          </span>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                <div className="detail__item-actions">
                  {doc.fileData && (
                    <button
                      type="button"
                      className="detail__action-btn detail__action-btn--purple"
                      onClick={() => setSelectedDoc(doc)}
                      title="Ver documento"
                    >
                      <FaEye />
                    </button>
                  )}
                  <button
                    type="button"
                    className="detail__action-btn detail__action-btn--edit detail__action-btn--purple"
                    onClick={() => handleEdit(doc)}
                    title="Editar documento"
                  >
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    className="detail__action-btn detail__action-btn--delete"
                    onClick={() => handleDelete(doc.id)}
                    title="Eliminar documento"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* ================= MODAL VISTA PREVIA ================= */}
      {selectedDoc && (
        <div className="modal modal--doc" onClick={() => setSelectedDoc(null)}>
          <div className="modal__content" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h4 className="modal__title">{selectedDoc.title}</h4>
              <button
                type="button"
                className="modal__close"
                onClick={() => setSelectedDoc(null)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="modal__body">
              {selectedDoc.fileType?.includes("image") ? (
                <img
                  src={selectedDoc.fileData}
                  alt={selectedDoc.title}
                  className="modal__img"
                />
              ) : (
                <iframe
                  src={selectedDoc.fileData}
                  title={selectedDoc.title}
                  className="modal__iframe"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Documents;
