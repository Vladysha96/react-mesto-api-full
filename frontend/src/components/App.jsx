import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import SubmitPopup from './SubmitPopup';
import api from '../utils/api';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import PopupWithBurger from './PopupWithBurger';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isSubmitPopupOpen, setIsSubmitPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [currentCard, setCurrentCard] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const history = useHistory();
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!loggedIn) return;
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });

    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, [loggedIn]);

  useEffect(() => {
    function tokenCheck() {
      return auth
        .getContent()
        .then((data) => {
          setEmail(data.email);
          setLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }

    tokenCheck();
    // eslint-disable-next-line
  }, []);

  const handleRegistration = (email, password) => {
    return auth
      .register(email, password)
      .then(() => {
        setStatus(true)
        setInfoTooltipOpen(true)
        history.push('/sign-in');
      })
      .catch((err) => {
        setStatus(false)
        setInfoTooltipOpen(true)
        console.log(err);
      })
  }

  const handleLogin = (email, password) => {
    return auth
      .authorization(email, password)
      .then((token) => {
        if (!token) return;
        setLoggedIn(true);
        history.push("/");
        setEmail(email);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setInfoTooltipOpen(true);
        setStatus(false);
      });
  }

  const handleLogOut = () => {
    auth.logout();
    setLoggedIn(false);
    setEmail("");
    history.push('/sign-in');
    setCards([]);
    setCurrentUser({});
  }

  const handleMenuClick = () => {
    setMenuOpen(!isMenuOpen)
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfileOpen(true);
  }

  const handleAddCardClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleSubmitDeleteClick = (card) => {
    setIsSubmitPopupOpen(true);
    setCurrentCard(card);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfileOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsSubmitPopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard || isInfoTooltipOpen;

  useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  const handleUpdateUser = ({ name, about }) => {
    api
      .setUserInfo({ name, about })
      .then(() => {
        setCurrentUser({
          name,
          about,
          avatar: currentUser.avatar,
          _id: currentUser._id,
        });
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`Ошибка при обновлении name, about: ${err}`)
      )
  }

  const handleUpdateAvatar = ({ avatar }) => {
    api
      .setAvatar({ avatar })
      .then(() => {
        setCurrentUser({
          name: currentUser.name,
          about: currentUser.about,
          avatar,
          _id: currentUser._id,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка при обновлении аватара: ${err}`);
      })
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) =>
        console.log(`Ошибка при добавлении/удалении лайка: ${err}`)
      )
  }

  const handleCardDelete = (card) => {
    api
      .deleteItem(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`Ошибка при удалении карточки: ${err}`)
      )
  }

  const handleAddPlaceSubmit = (newCard) => {
    api
      .addItem(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`Ошибка при создании новой карточки: ${err}`)
      )
  }

  useEffect(() => {
    api
      .getUserInfo()
      .then(({ name, about, avatar, _id }) => {
        setCurrentUser({ name, about, avatar, _id });
      })
      .catch((err) =>
        console.log(`Ошибка при загрузке данных: ${err}`)
      )

    api
      .getInitialCards()
      .then((initialCards) => setCards(initialCards))
      .catch((err) =>
        console.log(
          `Ошибка при создании карточек: ${err}`
        )
      )
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <PopupWithBurger isOpen={isMenuOpen} onClose={closeAllPopups} onLogOut={handleLogOut} email={email} />
      <div className="page" >
        <Header onLogOut={handleLogOut} email={email} loggedIn={loggedIn} onBurger={handleMenuClick} />

        <Switch>
          <ProtectedRoute exact path="/"
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddCardClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleSubmitDeleteClick}
            loggedIn={loggedIn}
          />

          <Route path="/sign-up">
            <Register onRegister={handleRegistration} />
          </Route>

          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>

        </Switch>

        {loggedIn && <Footer />}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <SubmitPopup
          isOpen={isSubmitPopupOpen}
          onClose={closeAllPopups}
          onSubmitDelete={handleCardDelete}
          card={currentCard}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          status={status}
          onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider >
  )
};

export default App;