import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const newAvatar = React.useRef(null);
  React.useEffect(() => {
    newAvatar.current.value = "";
  }, [isOpen]);

  function handleSubmitAvatar(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    onUpdateAvatar({
      avatar: newAvatar.current.value,
    });
  }

  function handleChangeAvatar() {
    return newAvatar.current.value;
  }

  return (
    <PopupWithForm
      title={"Обновить аватар"}
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmitAvatar}
    >
      <fieldset className="popup__input">
        <input
          className="popup__input-text popup__input-image-avatar"
          type="url"
          name="avatar"
          defaultValue
          placeholder="Введите ссылку"
          required
          ref={newAvatar}
          onChange={handleChangeAvatar}
        />
        <span className="popup__input-error popup__input-error_type_avatar" />
      </fieldset>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
