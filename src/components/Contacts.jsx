import { useState } from "react";

function Contacts({ contacts = [], setContacts, onBack }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [editingId, setEditingId] = useState(null);

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
        id: Date.now().toString(),
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
  };

  const handleDelete = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <>
      <div className="detail__header">
        <button className="detail__back-btn" type="button" onClick={onBack}>
          ← Volver
        </button>
        <h3 className="detail__title">Teléfonos</h3>
      </div>

      <form className="detail__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre o Centro (ej: Urgencias, Doctor Robles)"
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
        <button type="submit" className="detail__btn">
          {editingId ? "Guardar Cambios" : "Añadir Contacto"}
        </button>
      </form>

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

                  {/*desde un teléfono móvil si se toca el número abre la app de llamadas del móvil*/}
                  <a
                    href={`tel:${contact.phone}`}
                    className="detail__item-date"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    📞 {contact.phone}
                  </a>
                </div>

                <div className="detail__item-actions">
                  <button
                    type="button"
                    className="detail__action-btn"
                    onClick={() => handleEdit(contact)}
                    title="Editar contacto"
                  >
                    ✏️
                  </button>
                  <button
                    type="button"
                    className="detail__action-btn"
                    onClick={() => handleDelete(contact.id)}
                    title="Eliminar contacto"
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

export default Contacts;
