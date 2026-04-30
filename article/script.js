const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const total = document.body.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / total) * 100;
  progressBar.style.width = progress + '%';
});

const sections = document.querySelectorAll('section[id]');
const tocLinks = document.querySelectorAll('.toc-link');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      tocLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.toc-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-20% 0px -70% 0px' });

sections.forEach(s => sectionObserver.observe(s));

const revealEls = document.querySelectorAll(
  'section, .pull-quote, .callout, .skills-grid, .author-box'
);
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

document.querySelectorAll('.toc-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});