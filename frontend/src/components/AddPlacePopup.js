import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [nameNewCard, setNameNewCard] = React.useState("");
  const [linkNewCard, setLinkNewCard] = React.useState("");

  React.useEffect(() => {
    setNameNewCard("");
    setLinkNewCard("");
  }, [isOpen]);

  function handleChangeCardName(e) {
    setNameNewCard(e.target.value);
  }

  function handleChangeCardLink(e) {
    setLinkNewCard(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: nameNewCard,
      link: linkNewCard,
    });
  }
  
  return (
    <PopupWithForm
      title={"Новое место"}
      name={"edit"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Создать"
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__input">
        <input
          className="popup__input-text popup__input-title-add"
          type="text"
          name="name"
          placeholder="Название"
          onChange={handleChangeCardName}
          required
          minLength={2}
          maxLength={30}
          value={nameNewCard || ""}
        />
        <span className="popup__input-error popup__input-error_type_name" />
        <input
          className="popup__input-text popup__input-image-add"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required
          onChange={handleChangeCardLink}
          value={linkNewCard || ""}
        />
        <span className="popup__input-error popup__input-error_type_link" />
      </fieldset>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
