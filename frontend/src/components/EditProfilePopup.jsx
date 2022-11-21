import PopupWithForm from "./PopupWithForm";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState("");
    const [about, setAbout] = useState("");

    function handleChange(e) {
        if (e.target.name === "name") {
            setName(e.target.value);
        } else {
            setAbout(e.target.value);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: about,
        });
    }

    useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm
            name="profile-edit"
            title="Редактировать профиль"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText={"Сохранить"}
        >
            <label className='popup__container-field'>
                <input
                    className={`popup__input popup__input_edit_name`}
                    name="name"
                    id="name"
                    type="text"
                    placeholder="Имя"
                    minLength="2"
                    maxLength="40"
                    required
                    onChange={handleChange}
                    value={name || ""}
                />
                <span className='popup__input-error popup__input-error_visible'></span>
            </label>

            <label className='popup__container-field'>
                <input
                    className={`popup__input popup__input_edit_about`}
                    name="about"
                    id="about"
                    type="text"
                    placeholder="Профессия"
                    minLength="2"
                    maxLength="200"
                    required
                    onChange={handleChange}
                    value={about || ""}
                />
                <span className='popup__input-error popup__input-error_visible'></span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;