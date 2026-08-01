function Welcome() {
  const currentHour = new Date().getHours();
  let greeting = "¡Buenas noches!";

  if (currentHour >= 6 && currentHour < 12) {
    greeting = "¡Buenos días!";
  } else if (currentHour >= 12 && currentHour < 20) {
    greeting = "¡Buenas tardes!";
  }

  return (
    <section className="welcome">
      <h2 className="welcome__title">{greeting}</h2>
    </section>
  );
}

export default Welcome;
