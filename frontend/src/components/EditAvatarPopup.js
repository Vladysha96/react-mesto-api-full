import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef } from "react";
import useFormAndValidation from '../hooks/useFormAndValidation';

const EditAvatarPopup = props => {
    const { isOpen, onClose, onUpdateAvatar, isLoading } = props;

    const avatarRef = useRef();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    const { values, errors, isValid, handleChange, resetForm } =
        useFormAndValidation({});

    useEffect(() => {
        resetForm();
        avatarRef.current.value = null;
        // eslint-disable-next-line
    }, [isOpen]);

    return (
        <PopupWithForm
            name="edit-avatar"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
            isValid={isValid}
        >
            <label className='popup__container-field'>
                <input
                    className={`popup__input popup__input_card_url`}
                    name="avatar"
                    id="avatar"
                    placeholder="Ссылка на картинку"
                    type="url"
                    ref={avatarRef}
                    onChange={handleChange}
                    value={values.avatar || ''}
                    required
                />
                {errors.avatar && (
                    <span className='avatar-link-error popup__input-error'>
                        {errors.avatar}
                    </span>
                )}
            </label>

        </PopupWithForm>
    )
}

export default EditAvatarPopup;