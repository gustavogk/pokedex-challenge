/**
 * Gerenciamento de estado da aplicação
 */

class AppState {
  constructor() {
    this.pokemonList = [];
    this.filteredPokemon = [];
    this.currentPage = 1;
    this.itemsPerPage = 18;
    this.totalPages = 1;
    this.searchQuery = '';
    this.selectedType = ''; // Tipo selecionado para filtro
    this.currentScreen = 'home'; // 'home' ou 'pokedex'
    this.loading = false;
    this.listeners = [];
  }

  /**
   * Adiciona um listener para mudanças de estado
   */
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  /**
   * Notifica todos os listeners sobre mudanças
   */
  notify() {
    this.listeners.forEach(listener => listener(this));
  }

  /**
   * Atualiza a lista de Pokémon
   */
  setPokemonList(pokemonList) {
    this.pokemonList = pokemonList;
    this.applyFilters();
    this.notify();
  }

  /**
   * Define a página atual
   */
  setCurrentPage(page) {
    this.currentPage = page;
    this.notify();
  }

  /**
   * Define a query de busca
   */
  setSearchQuery(query) {
    this.searchQuery = query.toLowerCase().trim();
    this.currentPage = 1; // Reset para primeira página ao buscar
    this.applyFilters();
    this.notify();
  }

  /**
   * Define o tipo selecionado para filtro
   */
  setSelectedType(type) {
    this.selectedType = type || '';
    this.currentPage = 1; // Reset para primeira página ao filtrar
    this.applyFilters();
    this.notify();
  }

  /**
   * Limpa todos os filtros
   */
  clearFilters() {
    this.selectedType = '';
    this.searchQuery = '';
    const searchInput = document.getElementById('search-input');
    const typeFilter = document.getElementById('type-filter');
    if (searchInput) {
      searchInput.value = '';
    }
    if (typeFilter) {
      typeFilter.value = '';
    }
    this.currentPage = 1;
    this.applyFilters();
    this.notify();
  }

  /**
   * Aplica filtros (busca e tipos) na lista de Pokémon
   */
  applyFilters() {
    let filtered = [...this.pokemonList];

    // Filtro por nome
    if (this.searchQuery) {
      filtered = filtered.filter(pokemon =>
        pokemon.name.toLowerCase().includes(this.searchQuery)
      );
    }

    // Filtro por tipo
    if (this.selectedType) {
      filtered = filtered.filter(pokemon => {
        const pokemonTypes = pokemon.types.map(t => t.name);
        // Pokémon deve ter o tipo selecionado
        return pokemonTypes.includes(this.selectedType);
      });
    }
    
    this.filteredPokemon = filtered;
    
    // Calcula total de páginas baseado nos Pokémon filtrados
    this.totalPages = Math.ceil(this.filteredPokemon.length / this.itemsPerPage);
    
    // Garante que a página atual não exceda o total
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
  }

  /**
   * Retorna os Pokémon da página atual
   */
  getCurrentPagePokemon() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredPokemon.slice(start, end);
  }

  /**
   * Vai para a próxima página
   */
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.setCurrentPage(this.currentPage + 1);
    }
  }

  /**
   * Vai para a página anterior
   */
  prevPage() {
    if (this.currentPage > 1) {
      this.setCurrentPage(this.currentPage - 1);
    }
  }

  /**
   * Define o estado de loading
   */
  setLoading(loading) {
    this.loading = loading;
    this.notify();
  }

  /**
   * Define a tela atual
   */
  setCurrentScreen(screen) {
    this.currentScreen = screen;
    this.notify();
  }
}

// Exporta uma instância singleton
export const appState = new AppState();

