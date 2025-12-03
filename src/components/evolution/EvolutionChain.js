// components/evolution/EvolutionChain.js
import React from "react";
import "./EvolutionChain.css";
import useEvolutionChain from "../../hooks/useEvolutionChain";
import EvolutionNode from "./EvolutionNode";

function EvolutionChain({ pokemonName, onSelectEvolution }) {
  const { stages, loading, error } = useEvolutionChain(pokemonName);

  if (!pokemonName) return null;

  if (loading) {
    return <p>Loading evolution chain...</p>;
  }

  if (error) {
    return <p>Could not load evolution chain.</p>;
  }

  if (!stages || stages.length === 0) {
    return <p>No evolution data for this Pokémon.</p>;
  }

  return (
    <div className="evolutionChainRoot">
      {stages.map((stage, index) => (
        <React.Fragment key={stage.name}>
          <EvolutionNode
            stage={stage}
            onClick={() => onSelectEvolution(stage.name)}
          />
          {index < stages.length - 1 && <span className="evolutionArrow">→</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

export default EvolutionChain;
