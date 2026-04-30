const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
reveals.forEach(el => revealObserver.observe(el));

const navLinks = document.querySelectorAll('.pnav');
const sections = document.querySelectorAll('.project-section[id]');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const a = document.querySelector(`.pnav[href="#${entry.target.id}"]`);
      if (a) a.classList.add('active');
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' });
sections.forEach(s => sectionObserver.observe(s));

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

const pwdInput  = document.getElementById('pwdInput');
const pwdToggle = document.getElementById('pwdToggle');
const psbFill   = document.getElementById('psbFill');
const psbLabel  = document.getElementById('psbLabel');
const scoreNum  = document.getElementById('scoreNum');
const scoreBox  = document.getElementById('scoreBox');
const pwdTip    = document.getElementById('pwdTip');

const checks = {
  chkLen:    pwd => pwd.length >= 8,
  chkUpper:  pwd => /[A-Z]/.test(pwd),
  chkLower:  pwd => /[a-z]/.test(pwd),
  chkNum:    pwd => /[0-9]/.test(pwd),
  chkSymbol: pwd => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
  chkLen12:  pwd => pwd.length >= 12
};

const weights = { chkLen: 15, chkUpper: 15, chkLower: 15, chkNum: 20, chkSymbol: 20, chkLen12: 15 };

const commonPasswords = ['password','123456','password1','qwerty','abc123','111111','iloveyou','admin','letmein','welcome'];

const labels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
const colors = ['#ff3860', '#ff6b35', '#ffd93d', '#00d4ff', '#00ff8c'];

pwdToggle.addEventListener('click', () => {
  pwdInput.type = pwdInput.type === 'password' ? 'text' : 'password';
});

pwdInput.addEventListener('input', () => {
  const pwd = pwdInput.value;

  if (!pwd) {
    psbFill.style.width = '0%';
    psbLabel.textContent = '—';
    scoreNum.textContent = '0';
    scoreBox.style.borderColor = 'rgba(255,255,255,0.06)';
    pwdTip.textContent = 'Start typing to analyse your password.';
    pwdTip.style.color = 'var(--cyan)';
    Object.keys(checks).forEach(id => {
      const el = document.getElementById(id);
      el.classList.remove('pass');
      el.textContent = '✗ ' + el.textContent.replace('✓ ', '').replace('✗ ', '');
    });
    return;
  }

  let score = 0;
  Object.entries(checks).forEach(([id, fn]) => {
    const el = document.getElementById(id);
    const label = el.textContent.replace('✓ ', '').replace('✗ ', '');
    if (fn(pwd)) {
      score += weights[id];
      el.classList.add('pass');
      el.textContent = '✓ ' + label;
    } else {
      el.classList.remove('pass');
      el.textContent = '✗ ' + label;
    }
  });

  const isCommon = commonPasswords.includes(pwd.toLowerCase());
  if (isCommon) {
    score = Math.min(score, 15);
    pwdTip.textContent = '⚠ This is a commonly used password. It can be cracked instantly.';
    pwdTip.style.color = 'var(--red)';
  } else if (score >= 85) {
    pwdTip.textContent = '✓ Excellent password! This would take centuries to crack.';
    pwdTip.style.color = 'var(--green)';
  } else if (score >= 65) {
    pwdTip.textContent = '↑ Good password. Add a symbol or make it longer to strengthen it.';
    pwdTip.style.color = 'var(--cyan)';
  } else if (score >= 40) {
    pwdTip.textContent = '⚡ Moderate strength. Add uppercase, numbers, and symbols.';
    pwdTip.style.color = 'var(--yellow)';
  } else {
    pwdTip.textContent = '✗ Very weak. This password can be cracked in seconds.';
    pwdTip.style.color = 'var(--red)';
  }

  const level = Math.min(Math.floor(score / 20), 4);
  const color = colors[level];
  scoreNum.textContent = score;
  psbFill.style.width = score + '%';
  psbFill.style.background = color;
  psbLabel.textContent = labels[level];
  psbLabel.style.color = color;
  scoreNum.style.color = color;
  scoreBox.style.borderColor = color + '55';
});