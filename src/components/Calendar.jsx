import { useState } from "react";

/**
 * Componente de Calendario interactivo para el marcado mensual de citas.
 */

function Calendar({ appointments = [], onSelectAppointment }) {
  // ============ ESTADOS Y CONFIGURACIÓN ============
  const [displayedDate, setDisplayedDate] = useState(new Date());
  const year = displayedDate.getFullYear();
  const month = displayedDate.getMonth();
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const daysOfWeek = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  // ============ LÓGICA DE NAVEGACIÓN Y CÁLCULOS ============

  /**
   * Cambia la vista al mes anterior.
   */

  const handlePrevMonth = () => {
    setDisplayedDate(new Date(year, month - 1, 1));
  };

  /**
   * Cambia la vista al mes siguiente.
   */

  const handleNextMonth = () => {
    setDisplayedDate(new Date(year, month + 1, 1));
  };

  // Cálculos para la maquetación de la cuadrícula mensual

  const firstDayIndex = new Date(year, month, 1).getDay();
  const startingDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1; // Ajuste para iniciar en Lunes (0)
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  /**
   * Comprueba si un número de día corresponde a la fecha actual de hoy.
   */

  const isToday = (day) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  /**
   * Busca si existe una cita asociada a un día específico del mes desplegado.
   */

  const getAppointmentForDay = (day) => {
    if (!Array.isArray(appointments)) return null;
    const formattedMonth = String(month + 1).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
    const isoDate = `${year}-${formattedMonth}-${formattedDay}`;
    const esDateSlash = `${formattedDay}/${formattedMonth}/${year}`;
    const esDateDash = `${formattedDay}-${formattedMonth}-${year}`;

    return appointments.find((app) => {
      if (!app.date) return false;

      return (
        app.date === isoDate ||
        app.date === esDateSlash ||
        app.date === esDateDash
      );
    });
  };

  // ============ MANEJADOR DE CLIC EN EL DÍA ============
  const handleDayClick = (app) => {
    if (app && onSelectAppointment) {
      onSelectAppointment(app);
    }
  };

  // ============ RENDERIZADO ============

  return (
    <div className="calendar">
      <div className="calendar__header">
        <button
          type="button"
          className="calendar__btn-nav"
          onClick={handlePrevMonth}
          aria-label="Mes anterior"
        >
          &lt;
        </button>

        <span className="calendar__month">
          {monthNames[month]} {year}
        </span>

        <button
          type="button"
          className="calendar__btn-nav"
          onClick={handleNextMonth}
          aria-label="Mes siguiente"
        >
          &gt;
        </button>
      </div>

      <div className="calendar__grid">
        <div className="calendar__weekdays">
          {daysOfWeek.map((day) => (
            <span key={day} className="calendar__weekday">
              {day}
            </span>
          ))}
        </div>

        <div className="calendar__days">
          {/* Espacios vacíos al inicio del mes */}

          {Array.from({ length: startingDay }).map((_, index) => (
            <span
              key={`empty-${index}`}
              className="calendar__day calendar__day--empty"
            ></span>
          ))}

          {/* Días del mes */}

          {Array.from({ length: totalDaysInMonth }).map((_, index) => {
            const dayNumber = index + 1;
            const app = getAppointmentForDay(dayNumber);
            const hasApp = Boolean(app);
            const hasNote = Boolean(app?.note && app.note.trim() !== "");
            let dayClasses = "calendar__day";
            if (isToday(dayNumber)) dayClasses += " calendar__day--today";
            if (hasApp) dayClasses += " calendar__day--has-appointment";
            if (hasNote) dayClasses += " calendar__day--has-note";

            return (
              <button
                key={dayNumber}
                type="button"
                className={dayClasses}
                onClick={() => handleDayClick(app)}
              >
                {dayNumber}
              </button>
            );
          })}
        </div>

        {/* Leyenda de colores del calendario */}

        <div className="calendar__legend">
          <div className="calendar__legend-item">
            <span className="calendar__legend-color calendar__legend-color--today"></span>

            <span className="calendar__legend-label">Hoy</span>
          </div>

          <div className="calendar__legend-item">
            <span className="calendar__legend-color calendar__legend-color--appointment"></span>

            <span className="calendar__legend-label">Cita</span>
          </div>

          <div className="calendar__legend-item">
            <span className="calendar__legend-color calendar__legend-color--note"></span>

            <span className="calendar__legend-label">Cita con nota</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
