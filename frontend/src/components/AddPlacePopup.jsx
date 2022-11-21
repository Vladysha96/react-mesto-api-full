import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";

const AddPlacePopup = props => {

    const { isOpen, onClose, onAddPlace } = props;
    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    function handleChange(e) {
        if (e.target.name === "name") {
            setName(e.target.value);
        } else {
            setLink(e.target.value);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: name,
            link: link,
        });
    }

    useEffect(() => {
        setName("");
        setLink("");
    }, [isOpen]);

    return (
        <PopupWithForm
            name="card"
            title="Новое место"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText={"Создать"}
        >
            <label className='popup__container-field'>
                <input
                    className={`popup__input popup__input_card_name`}
                    name="name"
                    id="title"
                    type="text"
                    placeholder="Название"
                    minLength="2"
                    maxLength="30"
                    onChange={handleChange}
                    value={name}
                    required
                />
                <span id="title-error" className="popup__input-error popup__input-error_visible"></span>
            </label>

            <label className='popup__container-field'>
                <input
                    className={`popup__input popup__input_card_url`}
                    name="link"
                    id="link"
                    placeholder="Ссылка на картинку"
                    type="url"
                    onChange={handleChange}
                    value={link}
                    required
                />
                <span id="link-error" className="popup__input-error popup__input-error_visible"></span>
            </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup;