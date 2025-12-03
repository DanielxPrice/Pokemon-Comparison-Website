// services/pokeApiClient.js

const API_BASE = "https://pokeapi.co/api/v2";

// fetch wrapper
async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`);
  }
  return response.json();
}

// fetch a single pokemon record
export async function fetchPokemon(nameOrId) {
  const clean = String(nameOrId).toLowerCase();
  return fetchJson(`${API_BASE}/pokemon/${clean}`);
}

// list of names to power autocomplete
export async function fetchAllPokemonNames() {
  const data = await fetchJson(`${API_BASE}/pokemon?limit=2000&offset=0`);
  return data.results.map((item) => item.name);
}

// pokemon info for evolution chain url
export async function fetchPokemonSpecies(nameOrId) {
  const clean = String(nameOrId).toLowerCase();
  return fetchJson(`${API_BASE}/pokemon-species/${clean}`);
}

// evolution chain detail from direct url
export async function fetchEvolutionChainByUrl(url) {
  return fetchJson(url);
}

// ability details, to get a short description
export async function fetchAbilityDetails(url) {
  const data = await fetchJson(url);
  const englishEntry = data.effect_entries.find(
    (entry) => entry.language.name === "en"
  );
  return {
    shortEffect: englishEntry ? englishEntry.short_effect : "",
  };
}
