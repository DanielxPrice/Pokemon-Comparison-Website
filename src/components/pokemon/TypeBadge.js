// components/pokemon/TypeBadge.js
import React from "react";
import "./TypeBadge.css";

function TypeBadge({ typeName }) {
  return (
    <span className={`typeBadge type-${typeName.toLowerCase()}`}>
      {typeName}
    </span>
  );
}

export default TypeBadge;
