import React, {useState, useEffect} from 'react';
import PopupWithForm from './PopupWithForm';


function EditAvatarPopup({ onClose, isOpen, onUpdateAvatar }) {
      const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
          avatar:  avatarRef.current.value,
        });
      } 

    return (
        <PopupWithForm
        name='edit-avatar'
        title='Обновить аватар'
        buttonText='Сохранить'
        onClose={onClose}
        isOpen={isOpen}
        onSubmit={handleSubmit}>
        <input 
        type="url" 
        placeholder="Ссылка на картинку" 
        name="avatar" 
        id="avatar-url-input" 
        className="popup__input popup__input_form_url"
        ref={avatarRef}  
        required />
        <span className="popup__input-error avatar-url-input-error"></span>
      </PopupWithForm>
    )
}

export default EditAvatarPopup;

