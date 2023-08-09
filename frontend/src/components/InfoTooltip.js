import React from "react";
import image_infosuccess from "../images/image_info-success.svg";
import image_infonotsuccess from "../images/image_info-notsuccess.svg";

function infoTooltip({ isRegistred, isOpen, onClose, textMessage }) {
  return (
    <div className={`popup && ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__tooltip">
        <img
          className="popup__info-image"
          src={isRegistred ? image_infosuccess : image_infonotsuccess}
          alt=""
        />
        <p className="popup__info-title">{textMessage}</p>
        <button
          onClick={onClose}
          className="popup__button-close"
          type="button"
          aria-label="закрыть попап"
        />
      </div>
    </div>
  );
}
export default infoTooltip;
