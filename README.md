# 📅 # 📅 Family Today | Gestor de Citas y Organización

## 🎯 Objetivo de la aplicación

Crear una aplicación web para la gestión de citas y organización personal/familiar (salud, medicación, contactos, etc.). La aplicación permite:

- **Ver tarjetas/secciones principales:** Citas, Medicación, Gastos, Contactos, Documentos/fotos/pdf, e Información médica.
- **Consultar y añadir citas médicas:** Con fecha, hora y especialidad.
- **Añadir/editar observaciones o notas:** Asociadas a cada cita usando un Modal flotante.
- **Navegar por un calendario interactivo:** Y visualizar las próximas citas mediante una lista detallada.

---

## 🛠️ Tecnologías y Estructura

- **Framework:** React.
- **Estilos:** SCSS organizados por componentes/partials en `src/styles/` (o `src/scss/`), utilizando variables, metodología BEM y medidas en `rem`.
- **Metodología:** Componentes funcionales, uso de estado (`useState`) para controlar modales, formularios y listas, y manejo de arrays (`map`, `filter`).
- **Control de versiones:** Git & GitHub.

---

## 📂 Estructura del proyecto

````text
src/
├── components/
│   ├── Appointments.jsx   # Gestión y listado de citas
│   ├── Calendar.jsx       # Calendario interactivo y leyenda
│   ├── Card.jsx           # Tarjetas de las secciones principales
│   ├── Dashboard.jsx      # Vista principal / Panel de control
│   ├── Detail.jsx         # Vista detallada
│   ├── Footer.jsx         # Pie de página
│   ├── Header.jsx         # Cabecera de la aplicación
│   ├── ModalNote.jsx      # Modal flotante para notas/observaciones
│   └── Welcome.jsx       # Pantalla de bienvenida
├── images/
├── services/              # Servicios y datos (data.js)
├── styles/                # Arquitectura modular de Sass (SCSS)
│   ├── core/              # Estilos base y configuración
│   │   ├── _reset.scss    # Reseteo de estilos globales
│   │   └── _variables.scss# Variables (colores, fuentes, sombras)
│   ├── partials/          # Modulos SCSS por componente
│   │   ├── _appointments.scss
│   │   ├── _calendar.scss
│   │   ├── _card.scss
│   │   ├── _dashboard.scss
│   │   ├── _detail.scss
│   │   ├── _footer.scss
│   │   ├── _header.scss
│   │   ├── _modal.scss
│   │   └── _welcome.scss
│   └── App.scss           # Importación global de partials
├── App.jsx                # Componente principal
└── main.jsx               # Punto de entrada de React

## 🚀 Estado Actual del Proyecto (Características implementadas)

- [x] **Sección de Citas finalizada:**
  - Creación, edición y eliminación de citas.
  - Calendario interactivo con sistema de colores y leyenda.
  - Ordenación automática y cronológica de la lista de citas.
- [ ] Sección de Medicación.
- [ ] Sección de Gastos.
- [ ] Sección de Contactos.
- [ ] Sección de Documentos e Información Médica.

---

## 📦 Instalación y ejecución local

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/tu-usuario/tu-repositorio.git](https://github.com/tu-usuario/tu-repositorio.git)
````
