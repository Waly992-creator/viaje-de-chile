/* ============================================================
   main.js — Viajes Chile
   Componentes Bootstrap JS utilizados:
     1. Carousel  (data-bs-ride en HTML, control manual aquí)
     2. Tooltips  (inicialización global)
     3. Collapse  (navbar hamburguesa, Bootstrap lo maneja automáticamente)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ----------------------------------------------------------
     1. NAVBAR: cambiar fondo al hacer scroll
     ---------------------------------------------------------- */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ----------------------------------------------------------
     2. SMOOTH SCROLL para links del navbar
        (ya activado con html { scroll-behavior: smooth } en CSS,
         pero aquí forzamos el offset por el navbar fijo)
     ---------------------------------------------------------- */
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarHeight = navbar.offsetHeight;

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');

      // Solo actuar si es un anchor interno
      if (href && href.startsWith('#')) {
        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }

        // Cerrar navbar en mobile al hacer clic
        const navbarCollapse = document.getElementById('navMenu');
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });

  /* ----------------------------------------------------------
     3. TOOLTIPS Bootstrap (inicialización global)
        Afecta: cards de destacados + botón Enviar
     ---------------------------------------------------------- */
  const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltipElements.forEach(function (el) {
    new bootstrap.Tooltip(el, {
      trigger: 'hover focus'
    });
  });

  /* ----------------------------------------------------------
     4. CAROUSEL: control programático (Bootstrap JS)
        Ya inicializado con data-bs-ride="carousel" en HTML,
        aquí pausamos al hacer hover para mejor UX
     ---------------------------------------------------------- */
  const carouselEl = document.getElementById('carouselViajes');
  const carousel   = new bootstrap.Carousel(carouselEl, {
    interval: 4000,
    ride: 'carousel',
    wrap: true
  });

  carouselEl.addEventListener('mouseenter', function () {
    carousel.pause();
  });

  carouselEl.addEventListener('mouseleave', function () {
    carousel.cycle();
  });

  /* ----------------------------------------------------------
     5. FORMULARIO DE CONTACTO: validación simple + alerta
     ---------------------------------------------------------- */
  const form       = document.getElementById('formContacto');
  const alerta     = document.getElementById('alertaEnvio');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre  = document.getElementById('nombre').value.trim();
    const asunto  = document.getElementById('asunto').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    // Validar que los campos no estén vacíos
    if (!nombre || !asunto || !mensaje) {
      return;
    }

    // Simular envío: mostrar alerta de confirmación
    alerta.classList.remove('d-none');

    // Limpiar el formulario
    form.reset();

    // Ocultar la alerta después de 4 segundos
    setTimeout(function () {
      alerta.classList.add('d-none');
    }, 4000);
  });

});
