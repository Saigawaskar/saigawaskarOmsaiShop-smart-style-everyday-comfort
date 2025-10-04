const THEME_KEY = 'shoplite_theme';

export function initTheme() {
  const toggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem(THEME_KEY) || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(saved);
  toggle.addEventListener('click', () => {
    const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    setTheme(next);
  });
}

function setTheme(mode) {
  document.documentElement.classList.toggle('dark', mode === 'dark');
  localStorage.setItem(THEME_KEY, mode);
}


