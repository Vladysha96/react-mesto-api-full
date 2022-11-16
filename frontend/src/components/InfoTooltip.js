import UnionError from '../images/ERROR.svg';
import UnionOk from '../images/OK.svg';

function InfoTooltip({ isOpen, onClose, status }) {
    return (
        <div className={`popup ${isOpen && 'popup_opened'}`}>
            <div className="popup__overlay" onClick={onClose}></div>
            <div className='popup__container_infotooltip'>
                <img src={`${status ? UnionOk : UnionError}`}
                    alt={status ? "Успешная регистрация" : "Что-то пошло не так"}
                    className='popup__image-infotooltip' />
                <p className='popup__message'>
                    {status ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
                </p>
                <button className="popup__close" type='button' onClick={onClose} aria-label="Закрыть" />
            </div>
        </div>
    )
}

export default InfoTooltip;