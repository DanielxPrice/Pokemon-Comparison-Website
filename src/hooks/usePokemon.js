// hooks/usePokemon.js
import { useEffect, useState } from "react";
import { fetchPokemon, fetchAbilityDetails } from "../services/pokeApiClient";

// small helper to normalize stats into a flat object
function mapStats(statsArray) {
  const mapped = {};
  statsArray.forEach((entry) => {
    const key = entry.stat.name;
    const base = entry.base_stat;
    switch (key) {
      case "hp":
        mapped.hp = base;
        break;
      case "attack":
        mapped.attack = base;
        break;
      case "defense":
        mapped.defense = base;
        break;
      case "special-attack":
        mapped.specialAttack = base;
        break;
      case "special-defense":
        mapped.specialDefense = base;
        break;
      case "speed":
        mapped.speed = base;
        break;
      default:
        break;
    }
  });
  return mapped;
}

export default function usePokemon(nameOrId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!nameOrId) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }
    // protects against state updates after component unmounts
    let isCancelled = false;

    // main async loader
    async function load() {
      try {
        setLoading(true);
        setError(null);

        // fetch base Pokémon data
        const pokemon = await fetchPokemon(nameOrId);
        if (isCancelled) return;

        // grab a few ability descriptions in parallel
        const abilities = await Promise.all(
          pokemon.abilities.map(async (slot) => {
            const details = await fetchAbilityDetails(slot.ability.url);
            return {
              name: slot.ability.name,
              shortEffect: details.shortEffect,
            };
          })
        );

        // build the data object the rest of the UI expects
        const mappedData = {
          id: pokemon.id,
          name: pokemon.name,
          sprite:
            pokemon.sprites.other["official-artwork"].front_default ||
            pokemon.sprites.front_default,
          types: pokemon.types.map((t) => t.type.name),
          abilities,
          stats: mapStats(pokemon.stats),
        };

        setData(mappedData);
      } catch (err) {
        console.error("usePokemon failed", err);
        if (!isCancelled) {
          setError(err.message || "Unknown error");
          setData(null);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      isCancelled = true;
    };
  }, [nameOrId]); // re-run whenever the caller requests a different Pokémon

  return { data, loading, error };
}
