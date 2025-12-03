// components/stats/StatSummaryCard.js
import React from "react";
import "./StatSummaryCard.css";

function StatSummaryCard({ leftPokemon, rightPokemon }) {
  if (!leftPokemon || !rightPokemon) return null;

  // Take all the numbers inside the stats object and add them together.
  const sumStats = (stats) =>
    Object.values(stats).reduce((sum, v) => sum + v, 0);

  const leftTotal = sumStats(leftPokemon.stats);
  const rightTotal = sumStats(rightPokemon.stats);

  const leftOffense =
    leftPokemon.stats.attack + leftPokemon.stats.specialAttack;
  const rightOffense =
    rightPokemon.stats.attack + rightPokemon.stats.specialAttack;

  const leftDefense =
    leftPokemon.stats.defense + leftPokemon.stats.specialDefense;
  const rightDefense =
    rightPokemon.stats.defense + rightPokemon.stats.specialDefense;

  return (
    <div className="statSummaryRoot">
      <h2>Quick Breakdown</h2>
      <div className="statSummaryGrid">
        <div className="statSummaryItem">
          <h3>Total Base Stats</h3>
          <p>
            {leftPokemon.name}: <strong>{leftTotal}</strong>
          </p>
          <p>
            {rightPokemon.name}: <strong>{rightTotal}</strong>
          </p>
        </div>

        <div className="statSummaryItem">
          <h3>Offense (Atk + Sp.Atk)</h3>
          <p>
            {leftPokemon.name}: <strong>{leftOffense}</strong>
          </p>
          <p>
            {rightPokemon.name}: <strong>{rightOffense}</strong>
          </p>
        </div>

        <div className="statSummaryItem">
          <h3>Defense (Def + Sp.Def)</h3>
          <p>
            {leftPokemon.name}: <strong>{leftDefense}</strong>
          </p>
          <p>
            {rightPokemon.name}: <strong>{rightDefense}</strong>
          </p>
        </div>

        <div className="statSummaryItem">
          <h3>Speed</h3>
          <p>
            {leftPokemon.name}: <strong>{leftPokemon.stats.speed}</strong>
          </p>
          <p>
            {rightPokemon.name}: <strong>{rightPokemon.stats.speed}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default StatSummaryCard;
