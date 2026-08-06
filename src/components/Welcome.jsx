/**
 * Componente que muestra un saludo dinámico ("¡Buenos días!", "¡Buenas tardes!", "¡Buenas noches!")
 * en función de la hora local del dispositivo.
 */

function Welcome() {
  // ============ Lógica / cálculo de saludo ============
  const currentHour = new Date().getHours();
  let greeting = "¡Buenas noches!";

  if (currentHour >= 6 && currentHour < 12) {
    greeting = "¡Buenos días!";
  } else if (currentHour >= 12 && currentHour < 20) {
    greeting = "¡Buenas tardes!";
  }

  // ============ RENDERIZADO ============
  return (
    <section className="welcome">
      <h2 className="welcome__title">{greeting}</h2>
    </section>
  );
}

export default Welcome;
