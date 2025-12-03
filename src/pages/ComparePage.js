// pages/ComparePage.js
import React from "react";
import SearchBox from "../components/search/SearchBox";
import PokemonCard from "../components/pokemon/PokemonCard";
import EvolutionChain from "../components/evolution/EvolutionChain";
import "./ComparePage.css";

function ComparePage({
  leftPokemonName,
  rightPokemonName,
  setLeftPokemonName,
  setRightPokemonName,
}) {
  // helper to normalize names to lower case and trim
  function handleSelectLeft(name) {
    setLeftPokemonName(name ? name.trim().toLowerCase() : null);
  }

  function handleSelectRight(name) {
    setRightPokemonName(name ? name.trim().toLowerCase() : null);
  }

  return (
    <div className="comparePageRoot">
      {/* top section for picking pokemon */}
      <section className="compareSearchRow">
        <div className="compareSearchColumn">
          <h2>Left Pokémon</h2>
          <SearchBox
            label="Search left side"
            selectedName={leftPokemonName}
            onSelectPokemon={handleSelectLeft}
          />
        </div>

        <div className="compareSearchColumn">
          <h2>Right Pokémon</h2>
          <SearchBox
            label="Search right side"
            selectedName={rightPokemonName}
            onSelectPokemon={handleSelectRight}
          />
        </div>
      </section>

      {/* cards section, only show when something selected */}
      <section className="compareCardsRow">
        <div className="compareCardSlot">
          {leftPokemonName ? (
            <PokemonCard
              nameOrId={leftPokemonName}
              onClear={() => handleSelectLeft(null)}
            />
          ) : (
            <p className="compareEmptySlot">Pick a Pokémon on the left.</p>
          )}
        </div>

        <div className="compareCardSlot">
          {rightPokemonName ? (
            <PokemonCard
              nameOrId={rightPokemonName}
              onClear={() => handleSelectRight(null)}
            />
          ) : (
            <p className="compareEmptySlot">Pick a Pokémon on the right.</p>
          )}
        </div>
      </section>

      {/* evolution chain for whichever side is picked */}
      <section className="compareEvolutionRow">
        <h2>Evolution Chains</h2>
        <div className="compareEvolutionColumns">
          <div className="compareEvolutionColumn">
            {leftPokemonName ? (
              <EvolutionChain
                pokemonName={leftPokemonName}
                onSelectEvolution={handleSelectLeft}
              />
            ) : (
              <p className="compareEmptySlot">Left side has no Pokémon yet.</p>
            )}
          </div>
          <div className="compareEvolutionColumn">
            {rightPokemonName ? (
              <EvolutionChain
                pokemonName={rightPokemonName}
                onSelectEvolution={handleSelectRight}
              />
            ) : (
              <p className="compareEmptySlot">Right side has no Pokémon yet.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ComparePage;
