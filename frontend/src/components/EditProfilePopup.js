import PopupWithForm from "./PopupWithForm";
import { useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useFormAndValidation from '../hooks/useFormAndValidation';

const EditProfilePopup = props => {
    const { isOpen, onClose, onUpdateUser, isLoading } = props;

    const currentUser = useContext(CurrentUserContext);

    const { values, errors, isValid, handleChange, setValues, resetForm, setIsValid } =
        useFormAndValidation({});

    useEffect(() => {
        resetForm();
        setValues(currentUser);
        setIsValid(true);
        // eslint-disable-next-line
    }, [currentUser, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser({
            name: values.name,
            about: values.about,
        });
    }

    return (
        <PopupWithForm
            name="profile-edit"
            title="Редактировать профиль"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
            isValid={isValid && values.name && values.about}
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
                    value={values.name || ''}
                    onChange={handleChange}
                />
                {errors.name && (
                    <span className='profile-name-error popup__input-error'>
                        {errors.name}
                    </span>
                )}
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
                    value={values.about || ''}
                    onChange={handleChange}
                />
                {errors.about && (
                    <span className='profile-about-error popup__input-error'>
                        {errors.about}
                    </span>
                )}
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;