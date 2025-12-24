/**
 * Gerenciamento de tema (Dark/Light)
 */

const THEME_STORAGE_KEY = 'pokedex-theme';

/**
 * Obtém o tema atual do localStorage ou usa o padrão do sistema
 */
export function getTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme) {
    return savedTheme;
  }
  
  // Verifica a preferência do sistema
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  return 'light';
}

/**
 * Define o tema
 */
export function setTheme(theme) {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

/**
 * Alterna entre dark e light theme
 */
export function toggleTheme() {
  const currentTheme = getTheme();
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  return newTheme;
}

/**
 * Inicializa o tema na carga da página
 */
export function initTheme() {
  const theme = getTheme();
  setTheme(theme);
}

