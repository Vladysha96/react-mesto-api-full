import React, { useState } from "react";
import { Link } from "react-router-dom";

const initValues = {
    email: "",
    password: "",
};

function Register({ onRegister }) {
    const [state, setState] = useState(initValues);

    function handleChange(e) {
        const { name, value } = e.target;
        setState((old) => ({
            ...old,
            [name]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        const { email, password } = state;

        onRegister(email, password)
            .then(() => {
                setState(initValues);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);

                setState((old) => ({
                    ...old,
                    message: "Что-то пошло не так!",
                }));
            });
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
                    value={state.email}
                    onChange={handleChange}
                />
                <span className='popup__input-error popup__input-error_visible'></span>

                <input
                    className="login__input"
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Пароль"
                    required
                    minLength='6'
                    maxLength='40'
                    value={state.password}
                    onChange={handleChange}
                />
                <span className='popup__input-error popup__input-error_visible'></span>

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