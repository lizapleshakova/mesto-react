import React from 'react';
import { useState, useEffect } from 'react';
import api from '../untils/Api';

import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddContentPopupOpen, setIsAddContentPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(`Ошибка получения данных: ${err}`));
    api
      .getCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.log(`Ошибка получения данных: ${err}`));
  }, []);

  // Функции-сеттеры
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddContentPopupOpen(true)
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  // Функция закрытия всех попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddContentPopupOpen(false)
    setSelectedCard(null)
  }

  // Лайки
  function handleLike(data) {
    const isLiked = data.likes.some(user => user._id === currentUser._id);
    api
      .toggleLike(data._id, !isLiked)
      .then(newCard => setCards((
        state) => state.map(
          item => item._id === data._id ? newCard : item)))

      .catch((err) => console.log(`Ошибка получения данных: ${err}`));
  }

  // удалить карточку
  function handleDeleteClick(data) {
    api
      .removeCard(data._id)
      .then(() => setCards(
        state => state.filter(
          item => item._id !== data._id)))
      .catch((err) => console.log(`Ошибка получения данных: ${err}`));
  }

  function handleUpdateUser(newUserData) {
    api
      .setProfile(newUserData)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка получения данных: ${err}`));
  }

  function handleUpdateAvatar(newAvatar) {
    api
      .setAvatar(newAvatar)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка получения данных: ${err}`));
  }

  function handleAddPlaceSubmit(data) {
    api
      .setCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка получения данных: ${err}`));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        cards={cards}
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onClose={closeAllPopups}
        onCardLike={handleLike}
        onDeleteLike={handleDeleteClick}
      />
      <Footer />

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

      <AddPlacePopup isOpen={isAddContentPopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

      {/* <PopupWithForm name='delete-img' title='Вы уверены?' buttonText='Да' onClose={closeAllPopups} ></PopupWithForm> */}

      {selectedCard && (
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      )}
    </CurrentUserContext.Provider>
  );
}

export default App;



