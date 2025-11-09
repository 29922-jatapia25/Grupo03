$(document).ready(function() {
    
    // Ejemplo de cómo podrían inicializar sus tooltips de Bootstrap 5
    // var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    //   return new bootstrap.Tooltip(tooltipTriggerEl)
    // })

});

document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('btn-ejecutar-scrollspy');
  if (!btn) return;

  btn.addEventListener('click', function () {
    // 1) Verificar secciones existentes
    const targets = ['#parte1', '#parte2', '#parte3', '#parte4'];
    const missing = targets.filter(sel => !document.querySelector(sel));
    if (missing.length) {
      alert('No se encontraron las secciones: ' + missing.join(', '));
      return;
    }

    // 2) Ubicar topbar y dropdown PARTES
    const topbar = document.querySelector('.navbar.topbar, nav.navbar.topbar, .topbar.navbar');
    if (!topbar) {
      alert('No se encontró el topbar (.navbar.topbar).');
      return;
    }

    const partesDropdown = topbar.querySelector('.nav-item.dropdown.no-arrow');
    if (partesDropdown) partesDropdown.classList.add('d-none');

    // 3) Si ya existe un menú temporal previo, reutilizar
    let spyMenu = document.getElementById('scrollspy-topbar-menu');
    if (!spyMenu) {
      spyMenu = document.createElement('ul');
      spyMenu.id = 'scrollspy-topbar-menu';
      spyMenu.className = 'navbar-nav ms-auto scrollspy-topbar';
      spyMenu.innerHTML = `
        <li class="nav-item"><a class="nav-link" href="#parte1">1) Teoría</a></li>
        <li class="nav-item"><a class="nav-link" href="#parte2">2) Ejemplo</a></li>
        <li class="nav-item"><a class="nav-link" href="#parte3">3) Ejecución</a></li>
        <li class="nav-item"><a class="nav-link" href="#parte4">4) Ejercicio</a></li>
      `;
      // Insertarlo al final del contenedor derecho del topbar
      topbar.appendChild(spyMenu);
    } else {
      spyMenu.classList.remove('d-none');
    }

    // 4) Activar Scrollspy sobre el <body> (Bootstrap 5 o 4)
    const OFFSET = 90; // compensa la altura de tu topbar
    document.body.setAttribute('data-bs-spy', 'scroll');
    document.body.setAttribute('data-bs-target', '#scrollspy-topbar-menu');
    document.body.setAttribute('data-bs-offset', String(OFFSET));
    document.body.setAttribute('tabindex', '0'); // necesario si fuera contenedor scrolleable

    // Limpia instancias previas (v5)
    if (window.bootstrap && window.bootstrap.ScrollSpy) {
      const prev = window.bootstrap.ScrollSpy.getInstance(document.body);
      if (prev) prev.dispose();
      new window.bootstrap.ScrollSpy(document.body, {
        target: '#scrollspy-topbar-menu',
        offset: OFFSET
      });
    } else if (window.jQuery && typeof jQuery.fn.scrollspy === 'function') {
      // Bootstrap 4 (jQuery)
      jQuery('body').scrollspy('dispose');
      jQuery('body').scrollspy({ target: '#scrollspy-topbar-menu', offset: OFFSET });
    } else {
      console.warn('Bootstrap ScrollSpy no está disponible.');
    }

    // 5) Scroll amable hacia el inicio de la parte 3 para que se note
    const p3 = document.getElementById('parte3');
    if (p3) {
      const y = p3.getBoundingClientRect().top + window.scrollY - (OFFSET + 10);
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});
