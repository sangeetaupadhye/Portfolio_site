// ---------- PRELOADER (spinner) ----------
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  if(pre) setTimeout(()=> { pre.style.display = 'none'; }, 250);
  // run initial visibility checks
  revealOnScroll();
  setActiveNav();
});

// ---------- SMOOTH SCROLL + MOBILE COLLAPSE ----------
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e){
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // collapse mobile menu if open
    const bsCollapse = document.querySelector('.navbar-collapse');
    if(bsCollapse && bsCollapse.classList.contains('show')){
      new bootstrap.Collapse(bsCollapse).toggle();
    }
  });
});

// ---------- ACTIVE NAV ON SCROLL ----------
const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const sections  = navLinks.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);

function setActiveNav(){
  const pos = window.scrollY + 140;
  for(let i=0;i<sections.length;i++){
    const sec = sections[i];
    if(!sec) continue;
    if(sec.offsetTop <= pos && sec.offsetTop + sec.offsetHeight > pos){
      navLinks.forEach(n => n.classList.remove('active'));
      navLinks[i].classList.add('active');
    }
  }
}
window.addEventListener('scroll', setActiveNav);
setActiveNav();

// ---------- NAVBAR SCROLL STYLE ----------
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if(window.scrollY > 40) navbar.classList.add('nav-scrolled');
  else navbar.classList.remove('nav-scrolled');
});

// ---------- REVEAL ON SCROLL (fade-in) ----------
const fadeTargets = Array.from(document.querySelectorAll('.section, .service-card, .portfolio-card, .hero-section, .contact-box, .story-img'));

function revealOnScroll(){
  const trigger = window.innerHeight - 120;
  fadeTargets.forEach(el => {
    const rect = el.getBoundingClientRect();
    if(rect.top < trigger) el.classList.add('visible', 'fade-in');
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('resize', revealOnScroll);

// ---------- SCROLL TO TOP BUTTON ----------
const topBtn = document.createElement('button');
topBtn.className = 'scroll-top-btn';
topBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(topBtn);

topBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  if(window.scrollY > 420) topBtn.classList.add('show');
  else topBtn.classList.remove('show');
});

// ---------- SEND EMAIL (prefill mailto) ----------
function htmlEscape(s){ return s ? encodeURIComponent(s) : ''; }
window.sendEmail = function(){
  const name = htmlEscape(document.getElementById('name')?.value || '');
  const email = htmlEscape(document.getElementById('email')?.value || '');
  const msg = htmlEscape(document.getElementById('message')?.value || '');
  const subject = `SociSphere enquiry from ${name || email || 'website'}`;
  const body = `Name: ${decodeURIComponent(name)}%0AEmail: ${decodeURIComponent(email)}%0A%0A${decodeURIComponent(msg)}%0A%0A--%0ASent from SociSphere website`;
  const to = 'info@example.com';
  window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

// Expose for debugging if needed
window.soci_reveal = revealOnScroll;
