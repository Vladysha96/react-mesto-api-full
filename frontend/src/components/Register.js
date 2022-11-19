import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFormAndValidation from '../hooks/useFormAndValidation';

const initValues = {
    email: '',
    password: '',
};

function Register({ onRegister }) {

    const { values, errors, isValid, handleChange, setIsValid, resetForm } =
        useFormAndValidation(initValues);

    useEffect(() => {
        setIsValid(false);
        // eslint-disable-next-line
    }, []);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const { email, password } = values;
        onRegister(email, password).then(() => resetForm());
    }

    return (
        <div className="login__container">
            <form onSubmit={handleSubmit} className="login__form">
                <h2 className="login__title">Регистрация</h2>
                <input
                    className="login__input"
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Email"
                    required
                    minLength='6'
                    maxLength='40'
                    value={values.email || ""}
                    onChange={handleChange}
                    isValid={isValid}
                />
                {errors.email && (
                    <span className='popup__input-error popup__input-error_visible'>{errors.email}</span>
                )}

                <input
                    className="login__input"
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Пароль"
                    required
                    minLength='6'
                    maxLength='40'
                    value={values.password || ""}
                    onChange={handleChange}
                    isValid={isValid}
                />
                {errors.password && (
                    <span className='popup__input-error popup__input-error_visible'>{errors.password}</span>
                )}

                <button
                    className="login__button"
                    type="submit"
                >
                    Зарегистрироваться
                </button>
                <div className="login__caption">
                    <p className='login__text'>
                        Уже зарегистрированы? <Link to="/sign-in" className="login__link">Войти</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Register;