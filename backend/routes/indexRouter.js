const router = require('express').Router();
const usersRouter = require('./usersRouter');
const cardsRouter = require('./cardsRouter');
const NotFoundError = require('../utils/errors/NotFoundError');
const { auth } = require('../middlewares/auth');
const { login, logout, postUser } = require('../controllers/userController');
const { loginValid, userValid } = require('../middlewares/validation');

router.post('/signin', loginValid, login);
router.post('/signup', userValid, postUser);
router.post('/logout', logout);

router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

router.use(auth);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден. '));
});

module.exports = router;
