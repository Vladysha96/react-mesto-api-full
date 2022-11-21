import logo from '../images/Logo.svg';
import React from "react";
import burger from '../images/BurgerMenu.svg';
import { useLocation, Link } from "react-router-dom";

const Header = props => {
    const { pathname } = useLocation();
    const textTitle = `${pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`;
    const path = `${pathname === '/sign-in' ? '/sign-up' : '/sign-in'}`;

    return (
        <header className="header page__header">
            <img src={logo} alt="Логотип" className="header__logo" />
            <div>
                {props.loggedIn ?
                    (<div className="header__container">
                        <p className="header__user-email">{props.email}</p>
                        <Link className="header__exit" to="" onClick={props.logout}>Выйти</Link>
                    </div>) : (<Link to={path} className="header__link">{textTitle}</Link>)
                }
            </div>
            {props.loggedIn ?
                (<img className="header__burg-menu" alt='Меню' src={burger} onClick={props.onBurger} />) : ('')}
        </header>
    )
}

export default Header;