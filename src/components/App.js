
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import { useState } from 'react'

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddContentPopupOpen, setIsAddContentPopupOpen] = useState(false)


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

  // Функция закрытия всех попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddContentPopupOpen(false)

  }



  return (
    <>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
      />
      <Footer />

      <PopupWithForm name='edit-profile' title='Редактировать профиль' buttonText='Сохранить' onClose={closeAllPopups} isOpen={isEditProfilePopupOpen}>
        <input type="text" name="name" id="name-input" className="popup__input popup__input_form_usermane" minlength="2" maxlength="40" required />
        <span className="popup__input-error name-input-error"></span>
        <input type="text" name="about" id="description-input" className="popup__input popup__input_form_description" minlength="2" maxlength="200" required />
        <span className="popup__input-error description-input-error"></span>
      </PopupWithForm>

      <PopupWithForm name='edit-avatar' title='Обновить аватар' buttonText='Сохранить' onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen}>
        <input type="url" placeholder="Ссылка на картинку" name="avatar" id="avatar-url-input" class="popup__input popup__input_form_url" required />
        <span class="popup__input-error avatar-url-input-error"></span>
      </PopupWithForm>

      <PopupWithForm name='add-content' title='Новое место' buttonText='Создать' onClose={closeAllPopups} isOpen={isAddContentPopupOpen}>
        <input type="text" placeholder="Название" name="img_name" id="img-name-input" class="popup__input popup__input_form_image-title" minlength="2" maxlength="30" required />
        <span class="popup__input-error img-name-input-error"></span>
        <input type="url" placeholder="Ссылка на картинку" name="img_url" id="img-url-input" class="popup__input popup__input_form_url" required />
        <span class="popup__input-error img-url-input-error"></span>
      </PopupWithForm>

      <PopupWithForm name='delete-img' title='Вы уверены?' buttonText='Да' onClose={closeAllPopups}></PopupWithForm>

    </>
  );
}

export default App;



