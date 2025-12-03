// components/stats/StatsChart.js
import React, { useMemo } from "react";
// https://recharts.github.io/en-US/guide/customize/ 
// Documentation for using recharts ^^^
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./StatsChart.css";

function StatsChart({ leftPokemon, rightPokemon }) {
  // turn the stats into chart format
  const data = useMemo(() => {
    if (!leftPokemon || !rightPokemon) return [];

    const statNames = [
      "hp",
      "attack",
      "defense",
      "specialAttack",
      "specialDefense",
      "speed",
    ];

    return statNames.map((key) => ({
      stat: key,
      left: leftPokemon.stats[key],
      right: rightPokemon.stats[key],
    }));
  }, [leftPokemon, rightPokemon]);

  if (!leftPokemon || !rightPokemon) return null;
  

  return (
    <div className="statsChartRoot">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <BarChart data={data}>
          <XAxis
            dataKey="stat"
            tickFormatter={(value) =>
              value
                .replace("special", "Sp.")
                .replace("Attack", "Atk")
                .replace("Defense", "Def")
            }
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="left"
            name={leftPokemon.name}
            fill="#3b82f6"
          />
          <Bar
            dataKey="right"
            name={rightPokemon.name}
            fill="#ef4444" 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StatsChart;
