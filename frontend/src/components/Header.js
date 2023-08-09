import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo_header from "../images/logo/logo_header.svg";

function Header({ setCurrentUser, userEmail }) {
  const location = useLocation();
  function exitProfile() {
    localStorage.removeItem("token");
    setCurrentUser({});
  }

  return (
    <div className="Header">
      <header className="header">
        <img
          className="header__logo"
          src={logo_header}
          alt="логотип на котором написано место россия"
        />
        {location.pathname === "/" && (
          <div className="header__user-page">
            <p className="header__username header__text">
              {userEmail}
            </p>
            <Link to="/sign-in" onClick={exitProfile} className="header__text">
              Выйти
            </Link>
          </div>
        )}
        {location.pathname === "/sign-up" && (
          <Link to="/sign-in" className="header__text">
            Войти
          </Link>
        )}
        {location.pathname === "/sign-in" && (
          <Link to="/sign-up" className="header__text">
            Регистрация
          </Link>
        )}
      </header>
    </div>
  );
}
export default Header;
