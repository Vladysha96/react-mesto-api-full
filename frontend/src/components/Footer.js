import React from "react";
import { useLocation } from "react-router-dom";

const Footer = props => {
    const date = new Date().getFullYear();
    const location = useLocation();
    const isHidden =
        location.pathname === "/sign-in" || location.pathname === "/sign-up";

    return !isHidden ? (
        <footer className="footer page__footer">
            <p className="footer__copyright">&copy; {date} Mesto Russia</p>
        </footer>
    ) : null;
}

export default Footer;