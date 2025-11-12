$(document).ready(function() {
    
    // Ejemplo de cómo podrían inicializar sus tooltips de Bootstrap 5
    // var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    //   return new bootstrap.Tooltip(tooltipTriggerEl)
    // })

});
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
