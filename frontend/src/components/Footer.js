const Footer = props => {
    const {} = props;
    const date = new Date().getFullYear();

    return (
        <footer className="footer page__footer">
            <p className="footer__copyright">&copy; {date} Mesto Russia</p>
        </footer>
    )
}

export default Footer;