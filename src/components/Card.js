function Card({onCardClick, data}) {
    function handleClick() {
        onCardClick(data);
    }

    return (
        <article className="card">
            <img src={data.link} alt={data.name} className="card__image" onClick={handleClick} />
            <div className="card__container">
                <h2 className="card__title">{data.name}</h2>
                <div className="card__like-container">
                    <button type="button" aria-label="Нравится" className="card__like button"></button>
                    <p className="card__like-counter">{data.likes.length}</p>
                </div>
            </div>
            <button type="button" aria-label="Удалить" className="card__delete button" ></button>
        </article >
    )
}

export default Card