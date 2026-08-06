import { useState, useEffect } from "react";

/**
 * Componente ScrollTopButton
 * Muestra un botón flotante para volver al inicio de la página
 * cuando el header deja de ser visible.
 */
function ScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const headerElement = document.querySelector(".header");

    if (!headerElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
      },
    );

    observer.observe(headerElement);

    return () => {
      if (headerElement) observer.unobserve(headerElement);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      className={`scroll-top-btn ${isVisible ? "scroll-top-btn--visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Volver arriba"
    >
      ↑
    </button>
  );
}

export default ScrollTopButton;
