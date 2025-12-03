// components/pokemon/PokemonCard.js
import React from "react";
import "./PokemonCard.css";
import usePokemon from "../../hooks/usePokemon";
import TypeBadge from "./TypeBadge";
import AbilityTooltip from "./AbilityTooltip";

function PokemonCard({ nameOrId, onClear }) {
  // hook grabs the actual data from the API
  const { data, loading, error } = usePokemon(nameOrId);

  if (!nameOrId) return null;

  if (loading) {
    return (
      <div className="pokemonCardRoot">
        <p>Loading {nameOrId}...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="pokemonCardRoot">
        <p>Could not load {nameOrId}. Maybe check the spelling.</p>
        {onClear && (
          <button
            className="pokemonClearButton"
            type="button"
            onClick={onClear}
          >
            Clear
          </button>
        )}
      </div>
    );
  }

  const { name, id, sprite, types, abilities, stats } = data;
  const totalStats = Object.values(stats).reduce((sum, v) => sum + v, 0);

  return (
    <div className="pokemonCardRoot">
      <div className="pokemonCardHeader">
        <div className="pokemonIdentity">
          <img
            src={sprite}
            alt={name}
            className="pokemonSprite"
          />
          <div>
            <h3 className="pokemonName">
              #{id} {name}
            </h3>
            <div className="pokemonTypesRow">
              {types.map((type) => (
                <TypeBadge
                  key={type}
                  typeName={type}
                />
              ))}
            </div>
          </div>
        </div>
        {onClear && (
          <button
            type="button"
            className="pokemonClearButton"
            onClick={onClear}
          >
            Remove
          </button>
        )}
      </div>

      <div className="pokemonStatsRow">
        <p className="pokemonStatLine">
          <span className="pokemonStatLabel">Total base stats</span>
          <span>{totalStats}</span>
        </p>
        <p className="pokemonStatLine">
          <span className="pokemonStatLabel">Speed</span>
          <span>{stats.speed}</span>
        </p>
        <p className="pokemonStatLine">
          <span className="pokemonStatLabel">Attack</span>
          <span>{stats.attack}</span>
        </p>
        <p className="pokemonStatLine">
          <span className="pokemonStatLabel">Defense</span>
          <span>{stats.defense}</span>
        </p>
      </div>

      <div className="pokemonAbilities">
        <h4>Abilities</h4>
        <ul>
          {abilities.map((ability) => (
            <li key={ability.name}>
              <AbilityTooltip ability={ability} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PokemonCard;
