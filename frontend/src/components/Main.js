import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  cards,
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile-info">
          <button
            type="button"
            className="profile-info__pencil"
            aria-label="смена аватара"
            onClick={() => {
              onEditAvatar(true);
            }}
          >
            <img
              className="profile-info__avatar"
              src={currentUser.avatar}
              alt="аватар"
            />
          </button>
          <div className="profile-info__text">
            <div className="profile-info__text-edit">
              <h1 className="profile-info__title">{currentUser.name}</h1>
              <button
                className="profile-info__edit-button"
                type="button"
                aria-label="редактировать профиль"
                onClick={() => {
                  onEditProfile(true);
                }}
              />
            </div>
            <p className="profile-info__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={() => {
            onAddPlace(true);
          }}
        />
      </section>
      <section className="elements" aria-label="галерея новых мест">
        <ul className="elements__list">
          {
            cards.map((card) => (
              <Card
              key={card._id}
              card={card}
              link={card.link}
              likes={card.likes}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              />
            ))
          }
        </ul>
      </section>
      {/* <section className="elements" aria-label="галерея новых мест">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            link={card.link}
            likes={card.likes}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section> */}
    </main>
  );
}
export default Main;
