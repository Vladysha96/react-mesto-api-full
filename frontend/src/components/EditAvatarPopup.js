import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef } from "react";

const EditAvatarPopup = props => {
    const { isOpen, onClose, onUpdateAvatar } = props;

    const avatarRef = useRef();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    useEffect(() => {
        avatarRef.current.value = "";
    }, [isOpen]);

    return (
        <PopupWithForm
            isOpen={isOpen}
            name="edit-avatar"
            title="Обновить аватар"
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText="Сохранить"
        >
            <input
                className={`popup__input popup__input_card_url`}
                name="avatar"
                id="avatar"
                placeholder="Ссылка на картинку"
                type="url"
                ref={avatarRef}
                required
            />
        </PopupWithForm>
    )
}

export default EditAvatarPopup;