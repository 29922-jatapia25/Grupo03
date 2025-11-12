$(document).ready(function() {
    
    // Ejemplo de cómo podrían inicializar sus tooltips de Bootstrap 5
    // var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    //   return new bootstrap.Tooltip(tooltipTriggerEl)
    // })

});

//---------------------------------------------------------------
// Código para el recuadro de "Ejecutar código" en la navbar
(function () {
  const pre   = document.getElementById('codeBoxNavbar');
  const run   = document.getElementById('runCodeNavbar');
  const reset = document.getElementById('resetCodeNavbar');
  const frame = document.getElementById('resultFrameNavbar');
  const box   = document.getElementById('resultBoxNavbar');
  if (!pre || !run || !reset || !frame || !box) return;

  // Limpia indentación del <pre>
  const normalizePre = (p) => {
    const raw = p.textContent.split('\n');
    while (raw.length && raw[0].trim() === '') raw.shift();
    while (raw.length && raw[raw.length - 1].trim() === '') raw.pop();
    const ind = Math.min(...raw.filter(l => l.trim()).map(l => l.match(/^(\s*)/)[0].length));
    p.textContent = raw.map(l => l.slice(ind)).join('\n');
  };
  normalizePre(pre);

  // Ejecutar
  run.addEventListener('click', () => {
    box.style.display = 'block'; // mostrar el recuadro

    let html = pre.textContent.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    const base = document.baseURI; // ruta base de tu sitio (por ejemplo http://localhost:5500/)

    // Inserta <base> para que las rutas relativas funcionen dentro del iframe
    if (html.includes('<head>')) {
      html = html.replace('<head>', `<head>\n  <base href="${base}">`);
    } else {
      html = html.replace('<html', `<html data-base="${base}"`);
      html = html.replace('<body', `<head><base href="${base}"></head>\n<body`);
    }

    const doc = frame.contentWindow.document;
    doc.open();
    doc.write(html);
    doc.close();
  });

  // Resetear
  reset.addEventListener('click', () => {
    box.style.display = 'none'; // ocultar el recuadro
    const doc = frame.contentWindow.document;
    doc.open();
    doc.write('<!doctype html><html><head><meta charset="utf-8"></head><body></body></html>');
    doc.close();
  });
})();

//---------------------------------------------------------------
// Código para el recuadro de "Ejecutar código" LIST-GROUP
        
$(document).ready(function () {

    $("#runCode2").click(function () {
        const code = $("#codeBox2").text().replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        $("#resultBox2").html(code);

        // Esperar a que el DOM esté completamente listo
        setTimeout(function () {
            configurarScrollspy();
        }, 300);
    });

    $("#resetCode2").click(function () {
        $("#resultBox2").fadeOut(400, function () {
            $(this).html("").fadeIn();
        });
    });

    function configurarScrollspy() {
        const resultBox = document.getElementById('resultBox2');
        if (!resultBox) return;

        const scrollContainer = resultBox.querySelector('#scrollspy-demo');
        const listGroup = resultBox.querySelector('#list-example-demo');

        if (!scrollContainer || !listGroup) {
            console.error('No se encontraron los elementos necesarios');
            console.log('scrollContainer:', scrollContainer);
            console.log('listGroup:', listGroup);
            return;
        }

        // Obtener todas las referencias de los enlaces
        const links = listGroup.querySelectorAll('a.list-group-item');
        const sections = {};

        links.forEach(link => {
            const href = link.getAttribute('href');
            const id = href.substring(1);
            const element = scrollContainer.querySelector(href);
            if (element) {
                sections[id] = { link: link, element: element };
            }
        });

        console.log('Secciones encontradas:', Object.keys(sections));

        // Función para actualizar el estado activo
        function updateActiveLink() {
            let closestSection = null;
            let closestDistance = Infinity;

            Object.keys(sections).forEach(id => {
                const section = sections[id];
                const rect = section.element.getBoundingClientRect();
                const containerRect = scrollContainer.getBoundingClientRect();

                // Calcular la distancia desde el top del contenedor
                const distance = Math.abs(rect.top - containerRect.top - 50);

                // Verificar si está en el viewport y es el más cercano
                if (rect.top < containerRect.bottom && rect.bottom > containerRect.top) {
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestSection = id;
                    }
                }
            });

            // Remover active de todos
            links.forEach(link => {
                link.classList.remove('active');
                link.style.backgroundColor = '#e9f0f8';
                link.style.color = '#003366';
                link.style.fontWeight = 'normal';
                link.style.borderLeft = 'none';
            });

            // Agregar active al más cercano
            if (closestSection && sections[closestSection]) {
                const activeLink = sections[closestSection].link;
                activeLink.classList.add('active');
                activeLink.style.backgroundColor = '#003366';
                activeLink.style.color = '#ffffff';
                activeLink.style.fontWeight = 'bold';
                activeLink.style.borderLeft = '4px solid #0056b3';
            }
        }

        // Event listener para scroll
        scrollContainer.addEventListener('scroll', updateActiveLink);

        // Llamar una vez al inicio
        updateActiveLink();

        // Event listeners para los clics en los enlaces
        links.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                const target = scrollContainer.querySelector(href);

                if (target) {
                    // Scroll suave hacia el elemento
                    const offsetTop = target.offsetTop - 20;
                    scrollContainer.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    // Actualizar active después del scroll
                    setTimeout(updateActiveLink, 100);
                }
            });
        });
    }
});

//---------------------------------------------------------------
// Código para el recuadro de "Ejecutar código" PARTE4 NAVBAR

(function () {
    const pre = document.getElementById('codeParte4');
    if (!pre) return;

    fetch('parte4.html', { cache: 'no-store' })
        .then(r => r.ok ? r.text() : Promise.reject('No se pudo leer parte4.html'))
        .then(txt => {
            // Mostrar el código TAL CUAL, sin escapar nada
            pre.textContent = txt;
        })
        .catch(err => {
            pre.textContent = 'Error cargando parte4.html: ' + err;
        });
})();

// Botones Ejecutar / Descartar
(function () {
    const btnRun = document.getElementById('btnRunParte4');
    const btnDiscard = document.getElementById('btnDiscardParte4');
    const iframe = document.getElementById('iframeParte4');

    btnRun.addEventListener('click', function () {
        iframe.src = 'parte4.html';
        iframe.style.display = 'block';
    });

    btnDiscard.addEventListener('click', function () {
        iframe.style.display = 'none';
        iframe.src = '';
    });
})();


//---------------------------------------------------------------
// Código para el recuadro de "Ejecutar código" PARTE4 LIST-GROUP
// Cargar el código real de parte4.html
(function () {
    const pre = document.getElementById('codeParte4.2');
    if (!pre) return;

    fetch('Parte4.2.html', { cache: 'no-store' })
        .then(r => r.ok ? r.text() : Promise.reject('No se pudo leer parte4.2.html'))
        .then(txt => {
            // Mostrar el código TAL CUAL, sin escapar nada
            pre.textContent = txt;
        })
        .catch(err => {
            pre.textContent = 'Error cargando Parte4.2.html: ' + err;
        });
})();

// Botones Ejecutar / Descartar
(function () {
    const btnRun = document.getElementById('btnRunParte4.2');
    const btnDiscard = document.getElementById('btnDiscardParte4.2');
    const iframe = document.getElementById('iframeParte4.2');

    btnRun.addEventListener('click', function () {
        iframe.src = 'Parte4.2.html';
        iframe.style.display = 'block';
    });

    btnDiscard.addEventListener('click', function () {
        iframe.style.display = 'none';
        iframe.src = '';
    });
})();