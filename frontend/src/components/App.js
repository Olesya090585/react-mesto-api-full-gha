import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import Register from "./Register";
import Login from "./Login";
import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import api from "../utils/api";
import * as auth from "../utils/auth.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRouteElement from "./ProtectedRoute";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isRegistred, setIsRegistred] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [textMessage, setTextMessage] = React.useState("");
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setLoggedIn] = React.useState(null);
  const [userEmail, setUserEmail] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  function checkToken() {
    const jwt = localStorage.getItem('token');
    auth
      .getContent(jwt)
      .then((data) => {
        if (!data) {
          return;
        }
        setLoggedIn(true);
        navigate(location.pathname);
      })
      .catch((err) => {
        setLoggedIn(false);
        setUserEmail(null);
        console.error(`Ошибка: ${err}`);
      });
  }

  React.useEffect(() => {
    checkToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    const jwt = localStorage.getItem('token');
    if(isLoggedIn) {
        api
          .getUserData(jwt)
          .then((data) => {
            setCurrentUser(data);
            setUserEmail(data.email);
          })
          .catch((err) => {
            console.error(`Ошибка: ${err}`);
          });
        api
          .getInitialCards(jwt)
          .then((cards) => {
            setCards(cards.reverse());
          })
          .catch((err) => {
            console.error(`Ошибка: ${err}`);
          });
    }
  }, [isLoggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  function handleCardDelete(card) {
    const jwt = localStorage.getItem('token');
    api
      .deleteCard(card._id, jwt)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  function handleCardLike(card) {
    const jwt = localStorage.getItem('token');
    const isLiked = card.likes.some((user) => user === currentUser._id);

    (!isLiked ? api.addLikeCard(card._id, jwt) : api.deleteLikeCard(card._id, jwt))
      .then((newCard) => {
        setCards((state) => {
          return state.map((i) => (i._id === card._id ? newCard : i));
        });
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  function handleUpdateUser(newUser) {
    const jwt = localStorage.getItem('token');
    api
      .editUserInfo(newUser, jwt)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  function handleUpdateAvatar(newAvatar) {
    const jwt = localStorage.getItem('token');
    api
      .updateAvatar(newAvatar, jwt)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  function handleAddPlaceSubmit(data) {
    const jwt = localStorage.getItem('token');
    api
      .addNewCard(data, jwt)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  function handleLoggedIn() {
    setLoggedIn(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header setCurrentUser={setCurrentUser} userEmail={userEmail} />
          <div className="container">
            <Routes>
              <Route
                path="/sign-up"
                element={
                  <Register
                    handleLoggedIn={handleLoggedIn}
                    setIsRegistred={setIsRegistred}
                    setIsInfoTooltipOpen={setIsInfoTooltipOpen}
                    setTextMessage={setTextMessage}
                  />
                }
              />
              <Route
                path="/sign-in"
                element={<Login handleLoggedIn={handleLoggedIn} setCurrentUser={setCurrentUser} setUserEmail={setUserEmail} />}
              />        
              <Route
                exact
                path="/"
                element={
                  <ProtectedRouteElement
                    element={Main}
                    isLoggedIn={isLoggedIn}
                    onEditProfile={handleEditProfileClick}
                    onEditAvatar={handleEditAvatarClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={setSelectedCard}
                    onCardDelete={handleCardDelete}
                    onCardLike={handleCardLike}
                    cards={cards}
                  />
                }
              />
                   <Route
                path="*"
                element={
                  isLoggedIn ? (
                    <Navigate to="/" replace />
                  ) : (
                    <Navigate to="/sign-in" replace />
                  )
                }
              />
             {/* <Route
                path="*"
                element={(!isLoggedIn) && <Login handleLoggedIn={handleLoggedIn} />}
              /> */}
            </Routes>
            <Footer />
          </div>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <PopupWithForm title="Вы уверены?" name="confirmation">
            <button
              className="popup__button-save popup__button-save_confirmation"
              type="submit"
              aria-label="подтвердить удаление"
            >
              Да
            </button>
          </PopupWithForm>
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            isRegistred={isRegistred}
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            textMessage={textMessage}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
