import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = props => {
    const { card, onCardClick, onCardLike, onCardDelete } = props;
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const cardLikeButtonClassName = isLiked ? "element__like_active" : "";

    const handleClick = () => {
        onCardClick(card);
    }

    const handleLikeClick = () => {
        onCardLike(card);
    }

    const handleDeleteClick = () => {
        onCardDelete(card);
    }

    return (
        <li className="element">
            <img
                src={card.link}
                alt={card.name}
                className="element__photo"
                onClick={handleClick}
            />
            {isOwn && (
                <button
                    className="element__delete"
                    onClick={handleDeleteClick}
                ></button>
            )}
            <div className="element__list">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-container">
                    <button
                        className={`element__like ${cardLikeButtonClassName}`}
                        onClick={handleLikeClick}
                    ></button>
                    <p className="element__like-count">{card.likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;