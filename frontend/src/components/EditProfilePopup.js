import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setUserName(currentUser.name);
    setUserDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeUserName(e) {
    setUserName(e.target.value);
  }

  function handleChangeUserDescription(e) {
    setUserDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    onUpdateUser({
      name: userName,
      about: userDescription,
    });
  }
  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      name={"edit"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__input">
        <input
          className="popup__input-text popup__input-title-edit"
          type="text"
          name="name"
          value={userName || ""}
          onChange={handleChangeUserName}
          placeholder="Ваше имя"
          required
          minLength={2}
          maxLength={40}
        />
        <span className="popup__input-error popup__input-error_type_name" />
        <input
          className="popup__input-text popup__input-subtitle-edit"
          type="text"
          name="about"
          value={userDescription || ""}
          onChange={handleChangeUserDescription}
          placeholder="Ваше хобби"
          required
          minLength={2}
          maxLength={200}
        />
        <span className="popup__input-error popup__input-error_type_about" />
      </fieldset>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
