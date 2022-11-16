import { useState } from "react";

const Login = (props) => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleEmailChange = (evt) => {
        setEmail(evt.target.value);
    }
    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.handleLogin(email, password);
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
                    minLength="2"
                    maxLength="40"
                    value={email || ''}
                    onChange={handleEmailChange}
                    required
                />
                <input
                    className="login__input"
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Пароль"
                    minLength="2"
                    maxLength="40"
                    value={password || ''}
                    onChange={handlePasswordChange}
                    required
                />
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