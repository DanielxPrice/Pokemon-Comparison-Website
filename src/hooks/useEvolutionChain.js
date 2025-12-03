// hooks/useEvolutionChain.js
import { useEffect, useState } from "react";
import {
  fetchPokemonSpecies,
  fetchEvolutionChainByUrl,
} from "../services/pokeApiClient";

export default function useEvolutionChain(pokemonName) {
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pokemonName) {
      setStages([]);
      setLoading(false);
      setError(null);
      return;
    }

    let isCancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const species = await fetchPokemonSpecies(pokemonName);
        if (isCancelled) return;

        const evoUrl = species.evolution_chain?.url;
        if (!evoUrl) {
          setStages([]);
          return;
        }

        const chainData = await fetchEvolutionChainByUrl(evoUrl);
        if (isCancelled) return;

        
        const result = [];
        let node = chainData.chain;
        while (node) {
          result.push({ name: node.species.name });
          if (node.evolves_to && node.evolves_to.length > 0) {
            node = node.evolves_to[0];
          } else {
            node = null;
          }
        }

        setStages(result);
      } catch (err) {
        console.error("useEvolutionChain error", err);
        if (!isCancelled) {
          setError(err.message || "Unknown error");
          setStages([]);
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
  }, [pokemonName]);

  return { stages, loading, error };
}
