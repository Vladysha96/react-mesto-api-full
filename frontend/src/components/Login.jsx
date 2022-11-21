import React, { useState } from "react";

const initValues = {
    email: "",
    password: "",
};

function Login({ onLogin }) {
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
        if (!email || !password) return;

        onLogin(email, password)
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
                <h2 className="login__title">Вход</h2>
                <input
                    className="login__input"
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Email"
                    minLength='6'
                    maxLength='40'
                    value={state.email}
                    onChange={handleChange}
                    required
                    
                />
                <span className='popup__input-error popup__input-error_visible'></span>

                <input
                    className="login__input"
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Пароль"
                    minLength='6'
                    maxLength='40'
                    value={state.password}
                    onChange={handleChange}
                    required
                />
                <span className='popup__input-error popup__input-error_visible'></span>
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