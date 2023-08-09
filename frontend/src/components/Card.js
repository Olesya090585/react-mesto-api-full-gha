import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Card({card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext); 
  const isOwn = card.owner === currentUser._id
  const isLiked = card.likes.some(i => i === currentUser._id);
  
  const cardLikeButtonClassName = `element__like element__like_button ${
    isLiked ? "element__like_active" : ""
  }`


    function handleCardClick() {
        onCardClick(card)
      }
      
      function handleLikeClick() {
        onCardLike(card)
  
      }
    
      function handleCardDelete(){
        onCardDelete(card)
      }
  return (
    <article className="element">
         {isOwn && (<button className="element__delete element__delete_button" onClick={handleCardDelete} type="button" aria-label="удалить элемент"></button>)}
          <img className="element__img element__img_zoom" src={card.link} alt={card.name} onClick={handleCardClick}
/>
          <div className="element__description">
            <h2 className="element__text">{card.name}</h2>
            <div className="element__section-likes">
              <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" aria-label="поставить лайк"></button>
              <span className="element__counter-like">{card.likes.length}</span>
            </div>
          </div>
        </article>
  );
}
export default Card;