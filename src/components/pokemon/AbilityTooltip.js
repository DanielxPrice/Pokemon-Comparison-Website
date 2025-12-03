// components/pokemon/AbilityTooltip.js
import React from "react";
import "./AbilityTooltip.css";

function AbilityTooltip({ ability }) {
  const { name, shortEffect } = ability;

  return (
    <div className="abilityRoot">
      <span className="abilityName">{name}</span>
      {shortEffect && <span className="abilityEffect"> - {shortEffect}</span>}
    </div>
  );
}

export default AbilityTooltip;
