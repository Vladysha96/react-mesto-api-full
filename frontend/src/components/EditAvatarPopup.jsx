import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = useRef(""); // записываем объект, возвращаемый хуком, в переменную

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({ avatar: avatarRef.current.value });
    }

    return (
        <PopupWithForm
            name="edit-avatar"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={onClose}
            buttonText={"Сохранить"}
            onSubmit={handleSubmit}
        >
            <label className='popup__container-field'>
                <input
                    className={`popup__input popup__input_card_url`}
                    name="avatar"
                    id="avatar"
                    placeholder="Ссылка на картинку"
                    type="url"
                    ref={avatarRef}
                    required
                />
                <span className='popup__input-error popup__input-error_visible'></span>
            </label>

        </PopupWithForm>
    )
}

export default EditAvatarPopup;