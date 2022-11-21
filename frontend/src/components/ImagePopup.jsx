const ImagePopup = props => {
    const { card, onClose } = props;
    return (
        <div className={`popup popup_type_image ${card && 'popup_opened'}`}>
            <div className="popup__overlay" onClick={onClose}></div>
            <div className="popup__image-container">
                <img src={card && card.link}
                    alt={card && card.name}
                    className="popup__images" />
                <h2 className="popup__caption">{card && card.name}</h2>
                <button className="popup__close" onClick={onClose} type="button" aria-label="Закрыть"></button>
            </div>
        </div>
    )
}

export default ImagePopup;