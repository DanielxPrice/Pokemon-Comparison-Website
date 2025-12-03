// components/search/SearchBox.js
import React, { useEffect, useMemo, useState } from "react";
import { fetchAllPokemonNames } from "../../services/pokeApiClient";
import "./SearchBox.css";

function SearchBox({ label, selectedName, onSelectPokemon }) {
  // basic text input state
  const [query, setQuery] = useState("");
  const [allNames, setAllNames] = useState([]);
  const [isLoadingNames, setIsLoadingNames] = useState(false);

  // fetch the name list once
  useEffect(() => {
    let isCancelled = false;

    async function loadNames() {
      try {
        setIsLoadingNames(true);
        const names = await fetchAllPokemonNames();
        if (!isCancelled) {
          setAllNames(names);
        }
      } catch (err) {
        console.error("Failed to load name list", err);
      } finally {
        if (!isCancelled) {
          setIsLoadingNames(false);
        }
      }
    }

    loadNames();
    return () => {
      isCancelled = true;
    };
  }, []);

  // update textbox when selection comes from outside
  useEffect(() => {
    if (selectedName) {
      setQuery(selectedName);
    }
  }, [selectedName]);

  // simple filtered list of suggestions
  const suggestions = useMemo(() => {
    if (!query) return [];
    const lower = query.toLowerCase();
    return allNames
      .filter((name) => name.startsWith(lower))
      .slice(0, 8);
  }, [query, allNames]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!query) return;
    onSelectPokemon(query);
  }

  function handleClear() {
    setQuery("");
    onSelectPokemon(null);
  }

  return (
    <div className="searchBoxRoot">
      {label && <label className="searchLabel">{label}</label>}

      {/* main input + buttons row */}
      <form
        className="searchForm"
        onSubmit={handleSubmit}
      >
        <input
          className="searchInput"
          placeholder="Type a name like pikachu"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="searchButton"
        >
          Go
        </button>
        <button
          type="button"
          className="searchClearButton"
          onClick={handleClear}
        >
          X
        </button>
      </form>

      {/* little suggestions list under the box */}
      {isLoadingNames && (
        <p className="searchHint">Loading name list, hang on...</p>
      )}

      {!isLoadingNames && suggestions.length > 0 && (
        <ul className="searchSuggestions">
          {suggestions.map((name) => (
            <li
              key={name}
              className="searchSuggestionItem"
              onClick={() => {
                setQuery(name);
                onSelectPokemon(name);
              }}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBox;
