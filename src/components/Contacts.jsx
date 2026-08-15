import { useState } from "react";
import { FaPhoneAlt, FaEdit, FaTrash } from "react-icons/fa";

/**
 * Componente para la gestión de la agenda de contactos telefónicos.
 * Permite añadir, editar, eliminar y llamar directamente a los contactos.
 */

function Contacts({ contacts = [], setContacts, onBack }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [editingId, setEditingId] = useState(null);

  // ============ MANEJADORES DE EVENTOS (HANDLERS) ============

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setContacts(
        contacts.map((contact) =>
          contact.id === editingId ? { ...contact, name, phone } : contact,
        ),
      );
      setEditingId(null);
    } else {
      const newContact = {
        id: crypto.randomUUID(),
        name,
        phone,
      };
      setContacts([...contacts, newContact]);
    }

    setName("");
    setPhone("");
  };

  const handleEdit = (contact) => {
    setName(contact.name);
    setPhone(contact.phone);
    setEditingId(contact.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  // ============ WHATSAPP LINK ============
  const whatsappMessage = encodeURIComponent(
    `¡Hola. He actualizado los teléfonos en la app. Echadle un vistazo.`,
  );
  const whatsappUrl = `https://api.whatsapp.com/send?text=${whatsappMessage}`;

  // ============ RENDERIZADO ============

  return (
    <>
      {/* CABECERA CON ICONO */}
      <div className="detail__header">
        <button className="detail__back-btn" type="button" onClick={onBack}>
          &larr; Volver
        </button>

        <div className="detail__title-box">
          <h3 className="detail__title">Teléfonos</h3>
          <div className="detail__icon-box detail__icon-box--contacts">
            <FaPhoneAlt />
          </div>
        </div>
      </div>

      {/* FORMULARIO */}
      <form className="detail__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre (ej: centro dr día)"
          className="detail__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Teléfono"
          className="detail__input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        {/* BOTONES */}
        <div className="detail__form-actions">
          <button type="submit" className="detail__btn">
            {editingId ? "Guardar Cambios" : "Añadir Contacto"}
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

      {/* LISTADO DE CONTACTOS */}
      <div className="contacts-summary">
        <h3 className="detail__subtitle">Lista de contactos</h3>
        <ul className="detail__list">
          {contacts.length === 0 ? (
            <li className="detail__item">No hay contactos guardados.</li>
          ) : (
            contacts.map((contact) => (
              <li key={contact.id} className="detail__item">
                <div className="detail__item-info">
                  <span className="detail__item-title">{contact.name}</span>

                  <a
                    href={`tel:${contact.phone}`}
                    className="detail__item-phone-link"
                  >
                    <FaPhoneAlt className="detail__phone-icon" />{" "}
                    {contact.phone}
                  </a>
                </div>

                <div className="detail__item-actions">
                  <button
                    type="button"
                    className="detail__action-btn detail__action-btn--edit"
                    onClick={() => handleEdit(contact)}
                    title="Editar contacto"
                  >
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    className="detail__action-btn detail__action-btn--delete"
                    onClick={() => handleDelete(contact.id)}
                    title="Eliminar contacto"
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

export default Contacts;
