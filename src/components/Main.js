import { useState, useEffect } from "react"

import avatarPath from '../images/profile__selfie.jpg';
import api from '../untils/Api'
import Card from './Card'

function Main(props) {
    const [userName, setUserName] = useState('')
    const [userDescription, setUserDescription] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [cards, setCards] = useState([]);


    useEffect(() => {
 // Получение данных о пользователе
        api.getUserInfo()
            .then((data) => {

                setUserName(data.name)
                setUserDescription(data.about)
                setUserAvatar(data.avatar)
            })
            .catch((err) => console.log(`Ошибка получения данных: ${err}`));
// получение карточек
        api.getCards()
            .then((data) => {
                setCards(data);
            })
            .catch((err) => console.log(`Ошибка получения данных: ${err}`));
    }, [])


    return (
        <main className="content">
            <section className="profile">

                <div className="profile__info">
                    <div className="profile__avatar-container" onClick={props.onEditAvatar}>
                        <img src={userAvatar} alt="Аватар"
                            className="profile__image" />
                    </div>

                    <div className="profile__bio">
                        <div className="profile__name-edit">
                            <h1 className="profile__name">{userName}</h1>
                            <button onClick={props.onEditProfile} type="button" aria-label="Редактировать профиль" className="profile__edit-btn button"></button>
                        </div>
                        <p className="profile__description">{userDescription}</p>
                    </div>
                </div>
                <button type="button" aria-label="Добавить изображение" className="profile__add-btn button" onClick={props.onAddPlace}></button>
            </section>

            <section className="elements">

                {cards.map((card) => (
                    <Card key={card.id} data={card} onCardClick={props.onCardClick} onClose={props.onClose}/>
                ))}

            </section>
        </main>
    );
}

export default Main;