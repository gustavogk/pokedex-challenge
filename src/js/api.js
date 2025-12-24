/**
 * Integração com a PokeAPI
 */

const BASE_URL = 'https://pokeapi.co/api/v2';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

// Cache simples em memória
const cache = new Map();

/**
 * Busca lista de Pokémon com paginação
 */
export async function fetchPokemonList(limit = 18, offset = 0) {
  const cacheKey = `list_${limit}_${offset}`;
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    
    return data;
  } catch (error) {
    console.error('Erro ao buscar lista de Pokémon:', error);
    throw error;
  }
}

/**
 * Busca todos os Pokémon (até um limite razoável)
 */
export async function fetchAllPokemon(limit = 1000) {
  const cacheKey = `all_${limit}`;
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    
    return data;
  } catch (error) {
    console.error('Erro ao buscar todos os Pokémon:', error);
    throw error;
  }
}

/**
 * Busca detalhes de um Pokémon específico
 */
export async function fetchPokemonDetails(url) {
  const cacheKey = `details_${url}`;
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    
    return data;
  } catch (error) {
    console.error('Erro ao buscar detalhes do Pokémon:', error);
    throw error;
  }
}

/**
 * Busca detalhes de múltiplos Pokémon em paralelo
 */
export async function fetchMultiplePokemonDetails(urls) {
  try {
    const promises = urls.map(url => fetchPokemonDetails(url));
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error('Erro ao buscar múltiplos Pokémon:', error);
    throw error;
  }
}

/**
 * Formata os dados do Pokémon para o formato usado na aplicação
 */
export function formatPokemonData(pokemonData) {
  return {
    id: pokemonData.id,
    name: pokemonData.name,
    image: pokemonData.sprites.other['official-artwork']?.front_default || 
           pokemonData.sprites.front_default || 
           pokemonData.sprites.other?.dream_world?.front_default || '',
    types: pokemonData.types.map(t => ({
      name: t.type.name,
      slot: t.slot
    })),
    height: pokemonData.height,
    weight: pokemonData.weight,
  };
}

