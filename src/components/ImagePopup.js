function ImagePopup() {
    return (
        <div class="popup popup_zoom-content">
            <div class="popup__image-container">
                <button type="button" aria-label="Закрыть модальное окно" class="button popup__close-btn"></button>
                <figure class="popup__figure">
                    <img class="popup__zoom-image" src="#" alt="" />
                    <figcaption class="popup__image-caption"></figcaption>
                </figure>
            </div>
        </div>
    )
}
export default ImagePopup