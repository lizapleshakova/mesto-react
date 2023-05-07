
import { useState, useEffect } from "react";
import api from '../untils/Api';

import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

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
    setSelectedCard(null) /////
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

      {/* name: edit-profile, add-content, edit-avatar, delete-img
      title: Редактировать профиль, Новое место, Обновить аватар, Вы уверены? */}

      <PopupWithForm
        name='edit-profile'
        title='Редактировать профиль'
        buttonText='Сохранить'
        onClose={closeAllPopups}
        isOpen={isEditProfilePopupOpen}>
        <input type="text" name="name" id="name-input" className="popup__input popup__input_form_usermane" minLength="2" maxLength="40" required />
        <span className="popup__input-error name-input-error"></span>
        <input type="text" name="about" id="description-input" className="popup__input popup__input_form_description" minLength="2" maxLength="200" required />
        <span className="popup__input-error description-input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name='edit-avatar'
        title='Обновить аватар'
        buttonText='Сохранить'
        onClose={closeAllPopups}
        isOpen={isEditAvatarPopupOpen}>
        <input type="url" placeholder="Ссылка на картинку" name="avatar" id="avatar-url-input" className="popup__input popup__input_form_url" required />
        <span className="popup__input-error avatar-url-input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name='add-content'
        title='Новое место'
        buttonText='Создать'
        onClose={closeAllPopups}
        isOpen={isAddContentPopupOpen}>
        <input type="text" placeholder="Название" name="img_name" id="img-name-input" className="popup__input popup__input_form_image-title" minLength="2" maxLength="30" required />
        <span className="popup__input-error img-name-input-error"></span>
        <input type="url" placeholder="Ссылка на картинку" name="img_url" id="img-url-input" className="popup__input popup__input_form_url" required />
        <span className="popup__input-error img-url-input-error"></span>
      </PopupWithForm>

      {/* <PopupWithForm name='delete-img' title='Вы уверены?' buttonText='Да' onClose={closeAllPopups} ></PopupWithForm> */}

      {selectedCard && (
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      )}
    </CurrentUserContext.Provider>
  );
}

export default App;



