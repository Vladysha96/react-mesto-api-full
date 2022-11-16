import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = props => {
    const { onEditProfile, onAddPlace, onEditAvatar, onCardClick,
        cards, onCardLike, onCardDelete } = props;

    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content page__content">
            <section className="profile">
                <div className="profile__avatar-container" onClick={onEditAvatar}>
                    <img src={currentUser.avatar}
                        alt="Изображение профиля"
                        className="profile__avatar"
                    />
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{currentUser.name}</h1>
                    <p className="profile__subtitle">{currentUser.about}</p>
                    <button type="button" onClick={onEditProfile} className="profile__button-edit" aria-label="Редактировать"></button>
                </div>
                <button type="button" className="profile__button-add" aria-label="Добавить" onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                <ul className="elements__content">
                    {cards.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );

}

export default Main;