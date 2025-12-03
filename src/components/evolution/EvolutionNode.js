// components/evolution/EvolutionNode.js
import React from "react";
import "./EvolutionNode.css";

function EvolutionNode({ stage, onClick }) {
  return (
    <button
      type="button"
      className="evolutionNodeRoot"
      onClick={onClick}
    >
      <span className="evolutionNodeName">{stage.name}</span>
    </button>
  );
}

export default EvolutionNode;
