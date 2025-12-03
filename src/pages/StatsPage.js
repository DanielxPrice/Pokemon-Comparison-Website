// pages/StatsPage.js
import React from "react";
import StatsChart from "../components/stats/StatsChart";
import StatSummaryCard from "../components/stats/StatSummaryCard";
import "./StatsPage.css";
import usePokemon from "../hooks/usePokemon";

function StatsPage({ leftPokemonName, rightPokemonName }) {
  // fetch both pokemon based on current selection
  const {
    data: leftData,
    loading: leftLoading,
    error: leftError,
  } = usePokemon(leftPokemonName);

  const {
    data: rightData,
    loading: rightLoading,
    error: rightError,
  } = usePokemon(rightPokemonName);

  const hasBoth = !!leftData && !!rightData;

  return (
    <div className="statsPageRoot">
      <section className="statsIntro">
        <h1>Stats Lab</h1>
        <p>
          This page is about comparing base stats only, so things like
          abilities, types, and other factors are not considered.
        </p>
      </section>

      {/* show some quick state of what is selected */}
      <section className="statsSelectionRow">
        <div className="statsSelectionBox">
          <h2>Left</h2>
          <p>{leftPokemonName || "None selected yet."}</p>
        </div>
        <div className="statsSelectionBox">
          <h2>Right</h2>
          <p>{rightPokemonName || "None selected yet."}</p>
        </div>
      </section>

      {/* loading / error stuff */}
      <section>
        {leftLoading || rightLoading ? <p>Loading stats...</p> : null}
        {leftError && <p className="statsError">Left error: {leftError}</p>}
        {rightError && <p className="statsError">Right error: {rightError}</p>}
      </section>

      {/* if both are ready, show chart and derived cards */}
      {hasBoth ? (
        <>
          <section className="statsChartSection">
            <StatsChart leftPokemon={leftData} rightPokemon={rightData} />
          </section>

          <section className="statsSummaryRow">
            <StatSummaryCard leftPokemon={leftData} rightPokemon={rightData} />
          </section>
        </>
      ) : (
        <section>
          <p className="statsHint">
            You need two valid Pokémon selected before the chart can show
            anything interesting.
          </p>
        </section>
      )}
    </div>
  );
}

export default StatsPage;
