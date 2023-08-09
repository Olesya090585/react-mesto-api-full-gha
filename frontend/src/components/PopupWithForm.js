import React from "react";

function PopupWithForm({ title, name, isOpen, onClose, onSubmit, buttonText, children }) {
  return (
    <div className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <h3 className="popup__title">{title}</h3>
        <form
          className={`popup__content popup__content-${name} popup__form`}
          name={`form-${name}`}
          onSubmit={onSubmit}
        >
          {children}
          <button className="popup__button-save popup__button-save-add" 
          type="submit">
          {buttonText || "Сохранить"}
          </button>
        </form>
        <button
          className={`popup__button-close popup__button-close-${name}`}
          type="button"
          aria-label="закрыть попап"
          onClick={onClose}
        />
      </div>
    </div>
  );
}
export default PopupWithForm;
