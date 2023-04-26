function PopupWithForm({ name, title, buttonText, children, isOpen, onClose }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? `popup_opened` : ""}`}>
            <div className="popup__container">
                <button onClick={onClose} type="button" aria-label="Закрыть модальное окно" className="button popup__close-btn"></button>
                <h2 className="popup__title">{title}</h2>
                <form name={`${name}`} className={`popup__input-container popup__input-container-${name}`} novalidate>
                    {children}
                    <button type="submit" aria-label="Сохранить изменения и закрыть" className="button popup__submit-btn">{buttonText}</button>
                </form>
            </div>
        </div>
    )
}
export default PopupWithForm

// name: edit-profile, add-content, edit-avatar, delete-img
// title: Редактировать профиль, Новое место, Обновить аватар,Вы уверены?


