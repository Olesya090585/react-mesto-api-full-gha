import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_zoom ${card.link ? "popup_opened" : ""}`}>
      <div className="popup__image-container">
        <img
          className="popup__img popup__img_zoom"
          src={card.link}
          alt={card.name}
        />
        <p className="popup__heading popup__heading_zoom">{card.name}</p>
        <button
          className="popup__button-close popup__button-close_image-zoom"
          type="button"
          aria-label="закрыть попап"
          onClick={onClose}
        />
      </div>
    </div>
  );
}
export default ImagePopup;
