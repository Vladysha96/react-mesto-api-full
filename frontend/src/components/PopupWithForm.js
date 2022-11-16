const PopupWithForm = props => {
    const { } = props;

    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__overlay" onClick={props.onClose}></div>
            <div className="popup__container">
                <form name={props.name} onSubmit={props.onSubmit} className="popup__form">
                    <fieldset className="popup__form-set">
                        <h2 className="popup__title">{props.title}</h2>
                        {props.children}
                        <button
                            className={`popup__submit`}
                            type="submit">
                            {props.buttonText}
                        </button>
                    </fieldset>
                </form>
                <button className="popup__close" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
            </div>
        </div>
    );
}

export default PopupWithForm;