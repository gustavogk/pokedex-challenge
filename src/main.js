/**
 * Entry point da aplicação
 */

import './css/style.css';
import { appState } from './js/state.js';
import { fetchAllPokemon, fetchMultiplePokemonDetails, formatPokemonData } from './js/api.js';
import { renderPokemonGrid, renderPagination, renderLoading, renderTypeFilters, renderNavigation, renderScreen } from './js/components.js';
import { debounce } from './js/utils.js';
import { initTheme, toggleTheme } from './js/theme.js';

/**
 * Inicializa a aplicação
 */
async function init() {
  // Inicializa o tema
  initTheme();
  
  // Renderiza os filtros inicialmente (vazios)
  renderTypeFilters('');
  
  // Configura event listeners
  setupEventListeners();
  
  // Carrega os Pokémon iniciais
  await loadPokemon();
}

/**
 * Carrega os Pokémon da API
 */
async function loadPokemon() {
  try {
    appState.setLoading(true);
    renderLoading();
    
    // Busca todos os Pokémon (até 1000 para ter uma boa base)
    const response = await fetchAllPokemon(1000);
    
    // Busca detalhes dos primeiros 1000 Pokémon em lotes
    const pokemonUrls = response.results.map(p => p.url);
    const pokemonDetails = await fetchMultiplePokemonDetails(pokemonUrls);
    
    // Formata os dados
    const formattedPokemon = pokemonDetails.map(formatPokemonData);
    
    // Atualiza o estado
    appState.setPokemonList(formattedPokemon);
    
  } catch (error) {
    console.error('Erro ao carregar Pokémon:', error);
    const grid = document.getElementById('pokemon-grid');
    if (grid) {
      grid.innerHTML = `
        <div class="error-state">
          <p>Erro ao carregar Pokémon. Tente novamente mais tarde.</p>
        </div>
      `;
    }
  } finally {
    appState.setLoading(false);
  }
}

/**
 * Configura todos os event listeners
 */
function setupEventListeners() {
  // Busca
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    const debouncedSearch = debounce((e) => {
      appState.setSearchQuery(e.target.value);
    }, 300);
    
    searchInput.addEventListener('input', debouncedSearch);
  }
  
  // Paginação - Anterior
  const prevBtn = document.getElementById('prev-btn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      appState.prevPage();
    });
  }
  
  // Paginação - Próximo
  const nextBtn = document.getElementById('next-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      appState.nextPage();
    });
  }
  
  // Paginação - Números de página (delegation)
  const pageNumbersContainer = document.getElementById('page-numbers');
  if (pageNumbersContainer) {
    pageNumbersContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('page-number')) {
        const page = parseInt(e.target.dataset.page);
        if (!isNaN(page)) {
          appState.setCurrentPage(page);
        }
      }
    });
  }
  
  // Filtro de tipo (select)
  const typeFilterSelect = document.getElementById('type-filter');
  if (typeFilterSelect) {
    typeFilterSelect.addEventListener('change', (e) => {
      appState.setSelectedType(e.target.value);
    });
  }
  
  // Toggle de tema
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      toggleTheme();
    });
  }
  
  // Navegação
  const homeBtn = document.getElementById('nav-home');
  const pokedexBtn = document.getElementById('nav-pokedex');
  const goToPokedexBtn = document.getElementById('go-to-pokedex');
  
  if (homeBtn) {
    homeBtn.addEventListener('click', () => {
      appState.setCurrentScreen('home');
    });
  }
  
  if (pokedexBtn) {
    pokedexBtn.addEventListener('click', () => {
      appState.setCurrentScreen('pokedex');
    });
  }
  
  if (goToPokedexBtn) {
    goToPokedexBtn.addEventListener('click', () => {
      appState.setCurrentScreen('pokedex');
    });
  }
  
  // Subscribe às mudanças de estado
  appState.subscribe((state) => {
    updateUI(state);
  });
}

/**
 * Atualiza a UI baseado no estado
 */
function updateUI(state) {
  // Renderiza navegação e telas
  renderNavigation(state.currentScreen);
  renderScreen(state.currentScreen);
  
  // Se estiver na tela de Pokédex, renderiza o conteúdo
  if (state.currentScreen === 'pokedex') {
    if (state.loading) {
      renderLoading();
      return;
    }
    
    // Renderiza os filtros de tipo
    renderTypeFilters(state.selectedType);
    
    // Renderiza os Pokémon da página atual
    const currentPagePokemon = state.getCurrentPagePokemon();
    renderPokemonGrid(currentPagePokemon);
    
    // Renderiza a paginação
    renderPagination(state.currentPage, state.totalPages);
    
    // Scroll para o topo ao mudar de página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Inicializa a aplicação quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
