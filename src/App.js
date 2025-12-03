// App.js
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/layout/Header";
import ComparePage from "./pages/ComparePage";
import StatsPage from "./pages/StatsPage";

function App() {
  // keep track of what pokemon is selected on each side
  const [leftPokemonName, setLeftPokemonName] = useState(null);
  const [rightPokemonName, setRightPokemonName] = useState(null);

  return (
    // theme provider will handle light/dark state
    <ThemeProvider>
      <div className="appRoot">
        {/* header is always visible, pages swap below it */}
        <Header />
        <main className="appMain">
          <Routes>
            {/* default to compare page */}
            <Route
              path="/"
              element={
                <Navigate
                  to="/compare"
                  replace
                />
              }
            />

            {/* main compare screen */}
            <Route
              path="/compare"
              element={
                <ComparePage
                  leftPokemonName={leftPokemonName}
                  rightPokemonName={rightPokemonName}
                  setLeftPokemonName={setLeftPokemonName}
                  setRightPokemonName={setRightPokemonName}
                />
              }
            />

            {/* stats screen, uses current selection */}
            <Route
              path="/stats"
              element={
                <StatsPage
                  leftPokemonName={leftPokemonName}
                  rightPokemonName={rightPokemonName}
                />
              }
            />

            {/* anything else gets put to compare */}
            <Route
              path="*"
              element={<Navigate to="/compare" replace />}
            />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
