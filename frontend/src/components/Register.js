import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = (props) => {
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
        props.handleRegistration(email, password);
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
                    minLength={2}
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
                    value={password || ''}
                    onChange={handlePasswordChange}
                    required
                />
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