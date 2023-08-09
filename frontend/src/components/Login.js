import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import * as auth from "../utils/auth.js";

function Login({ handleLoggedIn, setCurrentUser, setUserEmail }) {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  function handleChange(e) {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = formValue;
    auth
      .authorizate(email, password)
      .then((data) => {
        navigate("/");
        setCurrentUser(data.user)
        setUserEmail(data.user.email)
        handleLoggedIn();
        localStorage.setItem("token", data.token);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  return (
    <div className="register">
      <p className="register__title">Вход</p>
      <form onSubmit={handleSubmit} className="register__form">
        <input
          className="register__input"
          name="email"
          placeholder="Email"
          type="email"
          minLength={2}
          maxLength={40}
          required
          onChange={handleChange}
          value={formValue.email}
        />
        <input
          className="register__input"
          name="password"
          placeholder="Пароль"
          type="password"
          minLength={2}
          maxLength={200}
          required
          onChange={handleChange}
          value={formValue.password}
        />

        <button type="submit" className="register__button">
          Вход
        </button>
      </form>
    </div>
  );
}
export default Login;
