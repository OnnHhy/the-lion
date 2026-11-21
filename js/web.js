// THE LION — sitio oficial. Lee devlog.json y arma descargas + notas de versión.
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  // ---------- Barra superior sólida al bajar ----------
  var nav = document.getElementById('nav');
  function onScroll() { nav.classList.toggle('solid', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Aparecer al hacer scroll ----------
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (items) {
    items.forEach(function (it) { if (it.isIntersecting) { it.target.classList.add('in'); io.unobserve(it.target); } });
  }, { rootMargin: '0px 0px -8% 0px' }) : null;
  function watch(root) {
    (root || document).querySelectorAll('.reveal:not(.in)').forEach(function (el) {
      if (io) io.observe(el); else el.classList.add('in');
    });
  }
  watch();

  // ---------- Utilidades ----------
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  // ---------- Descargas ----------
  function setDownloads(d) {
    if (!d) return;
    ['exe', 'zip'].forEach(function (k) {
      var info = d[k], a = document.querySelector('[data-dl="' + k + '"]'), meta = document.querySelector('[data-meta="' + k + '"]');
      if (!info || !a) return;
      if (info.disponible) {
        a.href = info.archivo;
        a.classList.remove('is-soon');
        a.removeAttribute('aria-disabled');
        if (/\.(zip|exe)$/i.test(info.archivo)) a.setAttribute('download', ''); else a.removeAttribute('download');
        a.textContent = k === 'exe' ? 'Descargar para Windows' : 'Descargar .zip';
        if (meta) meta.textContent = [window.__ver, info.peso].filter(Boolean).join(' · ');
      } else {
        a.removeAttribute('href');
        a.classList.add('is-soon');
        a.setAttribute('aria-disabled', 'true');
        a.textContent = 'Muy pronto';
        if (meta) meta.textContent = 'Lo estamos terminando';
      }
    });
  }

  // ---------- Devlog ----------
  function renderLog(data) {
    var list = document.getElementById('devlog-list');
    list.textContent = '';
    (data.versiones || []).forEach(function (v, i) {
      var art = el('article', 'entry reveal' + (i === 0 ? ' current' : ''));
      var top = el('div', 'entry-top');
      top.appendChild(el('span', 'entry-ver', v.version));
      if (i === 0) top.appendChild(el('span', 'entry-badge', 'Actual'));
      if (v.fecha) top.appendChild(el('span', 'entry-date', v.fecha));
      art.appendChild(top);
      art.appendChild(el('h3', null, v.titulo));
      if (v.resumen) art.appendChild(el('p', 'sum', v.resumen));
      var ul = el('ul');
      (v.cambios || []).forEach(function (c) { ul.appendChild(el('li', null, c)); });
      art.appendChild(ul);
      // Las 2 más nuevas abiertas; las demás se despliegan
      if (i > 1 && (v.cambios || []).length) {
        art.classList.add('collapsed');
        var b = el('button', 'entry-toggle', 'Ver cambios (' + v.cambios.length + ')');
        b.type = 'button';
        b.setAttribute('aria-expanded', 'false');
        b.addEventListener('click', function () {
          var open = art.classList.toggle('collapsed') === false;
          b.setAttribute('aria-expanded', String(open));
          b.textContent = open ? 'Ocultar cambios' : 'Ver cambios (' + v.cambios.length + ')';
        });
        art.appendChild(b);
      }
      list.appendChild(art);
    });
    var soon = data.proximamente || [];
    if (soon.length) {
      var sl = document.getElementById('soon-list');
      sl.textContent = '';
      soon.forEach(function (s) { sl.appendChild(el('li', null, s)); });
      document.getElementById('soon').hidden = false;
    }
    watch(list.parentNode);
  }

  function apply(data) {
    window.__ver = data.actual || '';
    if (data.actual) document.querySelectorAll('[data-ver]').forEach(function (n) { n.textContent = data.actual; });
    setDownloads(data.descargas);
    renderLog(data);
  }

  function fail() {
    var list = document.getElementById('devlog-list');
    list.textContent = '';
    var p = el('p', 'log-msg');
    p.textContent = location.protocol === 'file:'
      ? 'Abriste la página con doble clic: el devlog solo se ve en la web publicada o con «ver-web.bat».'
      : 'No se pudo cargar el devlog. Recarga la página.';
    list.appendChild(p);
    // Sin datos, los botones de descarga se quedan con los enlaces fijos del HTML.
  }

  fetch('devlog.json', { cache: 'no-cache' })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(apply)
    .catch(fail);
})();
