import PopupWithForm from "./PopupWithForm";
import { useEffect, useState } from "react";

const AddPlacePopup = props => {
    const { isOpen, onClose, onAddPlace } = props;

    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    const handleChangeCardName = (evt) => {
        setName(evt.target.value);
    }

    const handleChangeCardUrl = (evt) => {
        setLink(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onAddPlace({ name, link });
    }

    useEffect(() => {
        setName("");
        setLink("");
    }, [isOpen]);

    return (
        <PopupWithForm
            isOpen={isOpen}
            name="card"
            title="Новое место"
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText="Создать"
        >
            <input
                className={`popup__input popup__input_card_name`}
                name="name"
                id="title"
                type="text"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                value={name}
                onChange={handleChangeCardName}
                required
            />
            <input
                className={`popup__input popup__input_card_url`}
                name="link"
                id="link"
                placeholder="Ссылка на картинку"
                type="url"
                value={link}
                onChange={handleChangeCardUrl}
                required
            />
        </PopupWithForm>
    );
}

export default AddPlacePopup;