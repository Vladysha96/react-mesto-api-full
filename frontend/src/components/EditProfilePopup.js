import PopupWithForm from "./PopupWithForm";
import { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfilePopup = props => {
    const { isOpen, onClose, onUpdateUser } = props;

    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleChangeName = (evt) => {
        setName(evt.target.value);
    }

    const handleChangeDescription = (evt) => {
        setDescription(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm
            isOpen={isOpen}
            name="profile-edit"
            title="Редактировать профиль"
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText="Сохранить"
        >
            <input
                className={`popup__input popup__input_edit_name`}
                name="name"
                id="name"
                type="text"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                value={name || ""}
                onChange={handleChangeName}
                required
            />
            <input
                className={`popup__input popup__input_edit_about`}
                name="about"
                id="about"
                type="text"
                placeholder="Профессия"
                minLength="2"
                maxLength="200"
                value={description || ""}
                onChange={handleChangeDescription}
                required
            />
        </PopupWithForm>
    )
}

export default EditProfilePopup;