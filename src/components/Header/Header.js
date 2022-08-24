import React from "react";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import logo from "../../assets/Logo/InStock-Logo_1x.png";

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo-container">
          <NavLink to="/warehouses">
            <img className="header__logo" src={logo} alt="Page Logo" />
          </NavLink>
        </div>
        <nav className="header__nav-container">
          <ul className="header__nav-menu">
            <NavLink
              to="/warehouses"
              className={`header__warehouses-link` }
              activeClassName={"header__inventory-link--active"}
              style={{ textDecoration: "none" }}
            >
              <li className="header__warehouses">Warehouses</li>
            </NavLink>
            <NavLink
              className="header__inventory-link"
              activeClassName="header__inventory-link--active"
              to="/inventory"
              style={{ textDecoration: "none" }}
            >
              <li className="header__inventory">Inventory</li>
            </NavLink>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
