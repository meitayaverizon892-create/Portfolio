const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});
const words = ['Innovate.', 'Design.', 'Secure.', 'Create.'];
 
let wordIndex  = 0;     
let charIndex  = 0;     
let deleting   = false; 
const typedEl = document.getElementById('typed');
 
function type() {
  const word = words[wordIndex]; 
 
  if (!deleting) {
    
    charIndex++;
    typedEl.textContent = word.slice(0, charIndex);
 
    if (charIndex === word.length) {
      deleting = true;
      setTimeout(type, 1500); 
      return;
    }
 
  } else {
    charIndex--;
    typedEl.textContent = word.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  setTimeout(type, deleting ? 60 : 100);
}
type();

const reveals = document.querySelectorAll(
  '.section-tag, .section-title, .section-sub, .service-card, .portfolio-card, .about-grid, .contact-grid, .stat'
);
 
reveals.forEach(el => el.classList.add('reveal'));
 
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1 
});
reveals.forEach(el => observer.observe(el));
document.querySelectorAll('.service-card').forEach(card => {
  const color = card.dataset.color; 
  if (color) {
    card.style.setProperty('--card-color', color);
  }
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
 
  e.preventDefault();
 
  let valid = true; 
  const name    = document.getElementById('name');
  const email   = document.getElementById('email');
  const message = document.getElementById('message');
  [name, email, message].forEach(field => {
    field.classList.remove('error');
  });
  ['nameErr', 'emailErr', 'msgErr'].forEach(id => {
    document.getElementById(id).classList.remove('show');
  });
  if (!name.value.trim()) {
    name.classList.add('error');                          
    document.getElementById('nameErr').classList.add('show');
    valid = false;
  }
  if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    email.classList.add('error');
    document.getElementById('emailErr').classList.add('show');
    valid = false;
  }
  if (!message.value.trim()) {
    message.classList.add('error');
    document.getElementById('msgErr').classList.add('show');
    valid = false;
  }
  if (valid) {
    document.getElementById('formSuccess').classList.add('show');
    this.reset();
    setTimeout(() => {
      document.getElementById('formSuccess').classList.remove('show');
    }, 4000);
  }
 
});