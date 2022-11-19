import React, { useEffect } from 'react';
import useFormAndValidation from '../hooks/useFormAndValidation';

const initValues = {
    email: '',
    password: '',
};

const Login = ({ onLogin }) => {
    const { values, errors, isValid, handleChange, setIsValid, resetForm } =
        useFormAndValidation(initValues);

    useEffect(() => {
        setIsValid(false);
        // eslint-disable-next-line
    }, []);

    const handleSubmit = (evt) => {
        evt.preventDefault();

        const { email, password } = values;

        if (!email || !password) return;

        onLogin(email, password).then(() => resetForm());
    }

    return (
        <div className="login__container">
            <form onSubmit={handleSubmit} className="login__form">
                <h2 className="login__title">Вход</h2>
                <input
                    className="login__input"
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Email"
                    minLength='6'
                    maxLength='40'
                    onChange={handleChange}
                    value={values.email || ""}
                    required
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
                    minLength='6'
                    maxLength='40'
                    onChange={handleChange}
                    value={values.password || ""}
                    required
                    isValid={isValid}
                />
                {errors.password && (
                    <span className='popup__input-error popup__input-error_visible'>{errors.password}</span>
                )}
                <button
                    className="login__button"
                    type="submit"
                >
                    Войти
                </button>
            </form>
        </div>
    );
}

export default Login;