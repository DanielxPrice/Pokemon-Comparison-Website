// components/layout/Header.js
import React from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "./Header.css";
import myLogo from "../../assets/pokeball.png";


function Header() {
  return (
    <header className="headerRoot">
      {/* app title area */}
      <div className="headerTitle">
        <img src={myLogo} alt="App logo" className="headerLogoImg" />
        <span>MyPokéHelper</span>
      </div>


      {/* navigation between pages */}
      <nav className="headerNav">
        <NavLink
          to="/compare"
          className={({ isActive }) =>
            isActive ? "navLink navLinkActive" : "navLink"
          }
        >
          Compare
        </NavLink>
        <NavLink
          to="/stats"
          className={({ isActive }) =>
            isActive ? "navLink navLinkActive" : "navLink"
          }
        >
          Stats
        </NavLink>
      </nav>

      {/* theme switch on the right */}
      <div className="headerRight">
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;
