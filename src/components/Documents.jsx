import { useState } from "react";
import {
  FaFolderOpen,
  FaEdit,
  FaTrash,
  FaCamera,
  FaFilePdf,
  FaEye,
  FaTimes,
} from "react-icons/fa";

/**
 * Componente para gestionar documentos adjuntos (imágenes o PDF),
 * permitiendo subir archivos mediante cámara o archivo local y visualizarlos.
 */

function Documents({ documents = [], setDocuments, onBack }) {
  const [title, setTitle] = useState("");
  const [fileData, setFileData] = useState(null); // Guardará la imagen/PDF en Base64
  const [fileType, setFileType] = useState(""); // Saber si es imagen o PDF
  const [editingId, setEditingId] = useState(null);

  const [selectedDoc, setSelectedDoc] = useState(null);

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

    if (!title.trim()) return;

    if (editingId) {
      setDocuments(
        documents.map((doc) =>
          doc.id === editingId ? { ...doc, title, fileData, fileType } : doc,
        ),
      );
      setEditingId(null);
    } else {
      const newDocument = {
        id: crypto.randomUUID(),
        title,
        fileData,
        fileType,
        createdAt: new Date().toLocaleDateString("es-ES"),
      };
      setDocuments([...documents, newDocument]);
    }

    setTitle("");
    setFileData(null);
    setFileType("");
  };

  const handleEdit = (doc) => {
    setTitle(doc.title);
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
        <label className="detail__label" htmlFor="doc-title">
          Nombre del documento
        </label>
        <input
          type="text"
          id="doc-title"
          placeholder="Nombre (ej: Recetas, Tarjeta Sanitaria)"
          className="detail__input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

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

      {/* Listado de documentos */}
      <div className="documents__summary">
        <ul className="detail__list">
          {documents.length === 0 ? (
            <li className="detail__item">No hay documentos guardados.</li>
          ) : (
            documents.map((doc) => (
              <li key={doc.id} className="detail__item documents__item">
                <div className="detail__item-info">
                  <span className="detail__item-title">{doc.title}</span>
                  <span className="detail__item-date">📅 {doc.createdAt}</span>

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
