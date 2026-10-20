# 📅 Family Today | Gestor de Citas y Organización Familiar

Una aplicación web modular, moderna y accesible orientada a la organización de tareas, documentos, contactos, medicación y gastos del hogar. Diseñada con una arquitectura limpia de componentes en **React**, organizada bajo estándares profesionales de **SCSS (BEM)** y conectada a la nube mediante **Firebase**.

---

## 🚀 Características Principales

- **🔐 Autenticación y Seguridad:** Sistema de inicio de sesión y registro integrado con **Firebase Authentication**, garantizando un acceso seguro y privado para la familia.
- **☁️ Sincronización en la Nube:** Persistencia de datos en tiempo real mediante **Cloud Firestore**, permitiendo que la información se mantenga sincronizada entre diferentes dispositivos.
- **📅 Control de Citas y Calendario:** Visualización interactiva para el seguimiento de eventos y citas médicas.
- **💳 Gastos Compartidos:** Vista tipo acordeón agrupada por persona con desglose de subtotales y cálculo automático del total conjunto.
- **📄 Gestión de Documentación:** Registro de documentos con opción para adjuntar archivos en PDF o utilizar la cámara del dispositivo (`capture="environment"`) para fotografías instantáneas con previsualización.
- **💊 Medicación y Ficha Médica:** Control de dosis, horarios y notas médicas importantes.
- **📞 Contactos:** Directorio con acceso directo a llamadas.
- **🏠 Navegación Intuitiva:** **🏠 Navegación Intuitiva y Accesibilidad:** Botón de retorno rápido al panel principal integrado en la cabecera (Header) y botón flotante de desplazamiento hacia arriba (**Scroll Top**).

---

## 🛠️ Tecnologías Utilizadas

- **React (Vite):** Gestión del estado inmutable (`useState`, `useEffect`).
- **Firebase (Auth & Firestore):** Autenticación de usuarios y base de datos en la nube para sincronización multi-dispositivo.
- **Sass / SCSS:** Arquitectura modular basada en el patrón `core/` y `partials/` empleando la metodología de nombres **BEM** (medidas en `rem`).
- **JavaScript (ES6+):** Métodos inmutables de array (`map`, `filter`, `reduce`), `FileReader API` y manejo seguro del DOM.
- **HTML5 Semántico:** Formularios accesibles, soporte de cámara y etiquetas nativas estructuradas.

---

## 🗂️ Estructura del Proyecto

El código fuente sigue un patrón modular en el que los componentes globales y específicos están desacoplados de la capa de estilos de manera escalable:

```text
src/
├── components/         # Componentes independientes de React
│   ├── Appointments.jsx
│   ├── Calendar.jsx
│   ├── Card.jsx
│   ├── Contacts.jsx
│   ├── Dashboard.jsx
│   ├── Detail.jsx
│   ├── Documents.jsx
│   ├── Expenses.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── MedicalInfo.jsx
│   ├── Medication.jsx
│   ├── ModalNote.jsx
│   └── Welcome.jsx
services/
│   ├── data.jsx        # Configuración de las tarjetas del Dashboard (iconos y títulos)
│   └── firebase.js     # Configuración e inicialización de Firebase (Auth y Firestore)
└── styles/
    ├── core/           # Configuración global
    │   ├── _reset.scss
    │   └── _variables.scss
    ├── partials/       # Estilos específicos por módulo
    │   ├── _appointments.scss
    │   ├── _calendar.scss
    │   ├── _card.scss
    │   ├── _dashboard.scss
    │   ├── _detail.scss   # Estilos base compartidos
    │   ├── _documents.scss
    │   ├── _expenses.scss
    │   ├── _footer.scss
    │   ├── _header.scss
    │   ├── _modal.scss
    │   └── _welcome.scss
    └── App.scss    # Importación centralizada

```

## 📦 Instalación y Uso Local

Clonar el repositorio:

```Bash
git clone https://github.com/Colet-Cristina/gestiones-familiares.git

cd gestor-familiar
```

Instalar dependencias:

```Bash
npm install
```

Iniciar el servidor de desarrollo:

```Bash
npm run dev
```

Compilar para producción:

```Bash
npm run build
```

## 📝 Próximos Pasos (Roadmap)

[ ] Vincular varios correos independientes a la misma cuenta familiar introduciéndolos desde la app.
