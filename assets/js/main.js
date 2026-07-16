/* QUINCE.CINCO — interacciones */

// ---------- Menú móvil ----------
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.addEventListener('click', e => {
  if (e.target.tagName === 'A') navLinks.classList.remove('open');
});

// ---------- Header: al hacer scroll solo queda el nav principal ----------
const alScroll = () => document.body.classList.toggle('scrolled', window.scrollY > 30);
window.addEventListener('scroll', alScroll, { passive: true });
alScroll();

// ---------- Reveal on scroll ----------
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('on');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---------- Lightbox de galerías ----------
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox.querySelector('img');
const lbCaption = lightbox.querySelector('.lightbox-caption');
let galeriaActual = [];
let indiceActual = 0;

function abrirLightbox(links, indice) {
  galeriaActual = links;
  indiceActual = indice;
  mostrarActual();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function mostrarActual() {
  const link = galeriaActual[indiceActual];
  lbImg.src = link.getAttribute('href');
  lbImg.alt = link.querySelector('img').alt;
  lbCaption.textContent = (link.dataset.caption || '') + '  —  ' + (indiceActual + 1) + ' / ' + galeriaActual.length;
}
function cerrarLightbox() {
  lightbox.classList.remove('open');
  lbImg.src = '';
  document.body.style.overflow = '';
}
function mover(paso) {
  indiceActual = (indiceActual + paso + galeriaActual.length) % galeriaActual.length;
  mostrarActual();
}

document.querySelectorAll('.galeria').forEach(galeria => {
  const links = Array.from(galeria.querySelectorAll('a'));
  links.forEach((link, i) => {
    link.addEventListener('click', e => {
      e.preventDefault();
      abrirLightbox(links, i);
    });
  });
});
lightbox.querySelector('.lb-close').addEventListener('click', cerrarLightbox);
lightbox.querySelector('.lb-prev').addEventListener('click', () => mover(-1));
lightbox.querySelector('.lb-next').addEventListener('click', () => mover(1));
lightbox.addEventListener('click', e => { if (e.target === lightbox) cerrarLightbox(); });
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') cerrarLightbox();
  if (e.key === 'ArrowLeft') mover(-1);
  if (e.key === 'ArrowRight') mover(1);
});

// ---------- Formulario → WhatsApp ----------
document.getElementById('form-contacto').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target;
  const texto = 'Hola QUINCE.CINCO, soy ' + f.nombre.value.trim() +
    '. Mi negocio: ' + f.negocio.value.trim() +
    '. ' + f.mensaje.value.trim();
  window.open('https://wa.me/51983531001?text=' + encodeURIComponent(texto), '_blank', 'noopener');
});
