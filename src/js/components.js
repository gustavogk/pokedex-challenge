/**
 * Componentes de renderização
 */

import {
  formatPokemonNumber,
  capitalize,
  typeColors,
  typeTranslations,
} from "./utils.js";

/**
 * Renderiza um card de Pokémon
 */
export function renderPokemonCard(pokemon) {
  const primaryType = pokemon.types[0]?.name || "normal";
  const typeColor = typeColors[primaryType] || typeColors.normal;
  const typeName = typeTranslations[primaryType] || capitalize(primaryType);

  return `
    <div class="pokemon-card" data-pokemon-id="${pokemon.id}">
      <div class="pokemon-card-header">
        <span class="pokemon-type" style="color: ${typeColor}">${typeName}</span>
        <span class="pokemon-number">${formatPokemonNumber(pokemon.id)}</span>
      </div>
      <div class="pokemon-image-container">
        <img 
          src="${pokemon.image}" 
          alt="${capitalize(pokemon.name)}" 
          class="pokemon-image"
          loading="lazy"
          onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 200 200\\'%3E%3Ctext x=\\'50%25\\' y=\\'50%25\\' text-anchor=\\'middle\\' dy=\\'.3em\\'%3E?%3C/text%3E%3C/svg%3E'"
        />
      </div>
      <div class="pokemon-name">${capitalize(pokemon.name)}</div>
    </div>
  `;
}

/**
 * Renderiza o grid de Pokémon
 */
export function renderPokemonGrid(pokemonList) {
  const grid = document.getElementById("pokemon-grid");

  if (!grid) return;

  if (pokemonList.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <p>Nenhum Pokémon encontrado.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = pokemonList
    .map((pokemon) => renderPokemonCard(pokemon))
    .join("");
}

/**
 * Renderiza a paginação
 */
export function renderPagination(currentPage, totalPages) {
  const pageNumbersContainer = document.getElementById("page-numbers");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  if (!pageNumbersContainer || !prevBtn || !nextBtn) return;

  // Atualiza estado dos botões
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages || totalPages === 0;

  // Gera números de página
  const pages = [];
  const maxVisible = 5;

  if (totalPages <= maxVisible) {
    // Mostra todas as páginas se houver poucas
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Lógica para mostrar páginas com ellipsis
    if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push("...");
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push("...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages);
    }
  }

  pageNumbersContainer.innerHTML = pages
    .map((page) => {
      if (page === "...") {
        return `<span class="page-ellipsis">...</span>`;
      }
      const isActive = page === currentPage;
      return `
      <button 
        class="page-number ${isActive ? "active" : ""}" 
        data-page="${page}"
      >
        ${page}
      </button>
    `;
    })
    .join("");
}

/**
 * Renderiza estado de loading
 */
export function renderLoading() {
  const grid = document.getElementById("pokemon-grid");
  if (!grid) return;

  grid.innerHTML = `
    <div class="loading-state">
      <div class="spinner"></div>
      <p>Carregando Pokémon...</p>
    </div>
  `;
}

/**
 * Renderiza os filtros de tipo (select)
 */
export function renderTypeFilters(selectedType) {
  const typeFilterSelect = document.getElementById("type-filter");
  if (!typeFilterSelect) return;

  const allTypes = Object.keys(typeTranslations);

  // Limpa todas as opções
  typeFilterSelect.innerHTML = "";

  // Adiciona a opção padrão "Todos os tipos"
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Todos os tipos";
  if (!selectedType) {
    defaultOption.selected = true;
  }
  typeFilterSelect.appendChild(defaultOption);

  // Adiciona as opções de tipos
  allTypes.forEach((type) => {
    const typeName = typeTranslations[type] || capitalize(type);
    const option = document.createElement("option");
    option.value = type;
    option.textContent = typeName;
    if (selectedType === type) {
      option.selected = true;
    }
    typeFilterSelect.appendChild(option);
  });
}

/**
 * Renderiza a navegação (atualiza links ativos)
 */
export function renderNavigation(currentScreen) {
  const homeBtn = document.getElementById("nav-home");
  const pokedexBtn = document.getElementById("nav-pokedex");

  if (homeBtn) {
    if (currentScreen === "home") {
      homeBtn.classList.add("active");
    } else {
      homeBtn.classList.remove("active");
    }
  }

  if (pokedexBtn) {
    if (currentScreen === "pokedex") {
      pokedexBtn.classList.add("active");
    } else {
      pokedexBtn.classList.remove("active");
    }
  }
}

/**
 * Mostra/esconde as telas
 */
export function renderScreen(currentScreen) {
  const homeScreen = document.getElementById("home-screen");
  const pokedexScreen = document.getElementById("pokedex-screen");

  if (homeScreen) {
    if (currentScreen === "home") {
      homeScreen.classList.add("active");
    } else {
      homeScreen.classList.remove("active");
    }
  }

  if (pokedexScreen) {
    if (currentScreen === "pokedex") {
      pokedexScreen.classList.add("active");
    } else {
      pokedexScreen.classList.remove("active");
    }
  }
}
