import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import * as auth from "../utils/auth.js";

function Register({
  handleLoggedIn,
  setIsRegistred,
  setIsInfoTooltipOpen,
  setTextMessage,
}) {
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
    console.log(formValue);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = formValue;
    console.log(email);
    auth
      .register(email, password)
      .then((data) => {
        navigate("/sign-in");
        handleLoggedIn();
        setIsRegistred(true);
        setIsInfoTooltipOpen(true);
        setTextMessage("Вы успешно зарегистрировались!");
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
        setIsRegistred(false);
        setIsInfoTooltipOpen(true);
        setTextMessage("Что-то пошло не так! Попробуйте еще раз!");
      });
  }

  return (
    <div className="register">
      <p className="register__title">Регистрация</p>
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
          Зарегистрироваться
        </button>
      </form>
      <div className="register__signin">
        <p>Уже зарегистрированы?</p>
        <Link to="/sign-in" className="register__login-link">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;


