require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { login, postUser, logout } = require('./controllers/userController');
const { loginValid, userValid } = require('./middlewares/validation');
const auth = require('./middlewares/auth');
const errorsHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./utils/errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://vladysha96.frontend.nomoredomains.icu/',
    'http://vladysha96.frontend.nomoredomains.icu/',
    'https://vladysha96.backend.nomoredomains.icu/',
    'http://vladysha96.backend.nomoredomains.icu/',
  ],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Access-Control-Allow-Methods',
    'Access-Control-Request-Headers',
    'Access-Control-Allow-Origin',
  ],
  credentials: true,
  enablePreflight: true,
}));

const allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://vladysha96.frontend.nomoredomains.icu/',
  'http://vladysha96.frontend.nomoredomains.icu/',
  'https://vladysha96.backend.nomoredomains.icu/',
  'http://vladysha96.backend.nomoredomains.icu/',
];

app.use((req, res, next) => {
  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  res.header('Access-Control-Allow-Credentials', true);

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
});

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', loginValid, login);
app.post('/signup', userValid, postUser);
app.post('/logout', logout);
app.use(auth);
app.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});
app.use('/users', require('./routes/usersRouter'));
app.use('/cards', require('./routes/cardsRouter'));

app.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден. '));
});

app.use(errorsHandler);
app.use(errorLogger);
app.use(errors());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
