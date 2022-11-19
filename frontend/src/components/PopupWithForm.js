const PopupWithForm = props => {
    const { name,
        title,
        children,
        isOpen,
        onClose,
        buttonText,
        onSubmit,
        isValid } = props;

    return (
        <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
            <div className="popup__overlay" onClick={onClose}></div>
            <div className="popup__container">
                <form name={name} onSubmit={onSubmit} className="popup__form">
                    <fieldset className="popup__form-set">
                        <h2 className="popup__title">{title}</h2>
                        {children}
                        <button
                            className={`popup__submit`}
                            type="submit">
                            {buttonText}
                        </button>
                    </fieldset>
                </form>
                <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose} disabled={!isValid}></button>
            </div>
        </div>
    );
}

export default PopupWithForm;