import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useFormAndValidation from '../hooks/useFormAndValidation';

const AddPlacePopup = ({ isLoading, isOpen, onClose, onAddPlace }) => {

    const { values, errors, isValid, handleChange, resetForm } =
        useFormAndValidation({});

    useEffect(() => {
        resetForm();
    // eslint-disable-next-line
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPlace(values);
    }

    return (
        <PopupWithForm
            name="card"
            title="Новое место"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
            isValid={isValid}
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
                    value={values.name || ''}
                    onChange={handleChange}
                    required
                />
                {errors.name && (
                    <span className='card-name-error popup__input-error'>
                        {errors.name}
                    </span>
                )}
            </label>

            <label className='popup__container-field'>
                <input
                    className={`popup__input popup__input_card_url`}
                    name="link"
                    id="link"
                    placeholder="Ссылка на картинку"
                    type="url"
                    value={values.link || ''}
                    onChange={handleChange}
                    required
                />
                {errors.link && (
                    <span className='card-link-error popup__input-error'>
                        {errors.link}
                    </span>
                )}
            </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup;