import { useState } from "react";

function Calendar({ appointments = [] }) {
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

  // Cambiar al mes anterior
  const handlePrevMonth = () => {
    setDisplayedDate(new Date(year, month - 1, 1));
  };

  // Cambiar al mes siguiente
  const handleNextMonth = () => {
    setDisplayedDate(new Date(year, month + 1, 1));
  };

  // Cálculo de los días del mes
  const firstDayIndex = new Date(year, month, 1).getDay();
  const startingDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1; // Lunes = 0
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

  const daysOfWeek = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  // Comprobar si un día concreto es hoy
  const today = new Date();
  const isToday = (day) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  // 🛡️ Busca la cita en cualquier formato de fecha posible
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

  return (
    <div className="calendar">
      <div className="calendar__header">
        <button
          type="button"
          className="calendar__btn-nav"
          onClick={handlePrevMonth}
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
              <button key={dayNumber} type="button" className={dayClasses}>
                {dayNumber}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
