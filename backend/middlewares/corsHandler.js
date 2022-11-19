const allowedCors = [
  'https://vladysha96.frontend.nomoredomains.icu',
  'http://vladysha96.frontend.nomoredomains.icu',
  'https://vladysha96.backend.nomoredomains.icu',
  'http://vladysha96.backend.nomoredomains.icu',
  'localhost:3000',
  'localhost:3001',
  'http://localhost:',
];

// eslint-disable-next-line consistent-return
const corsHandler = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.status(200).send();
  }

  next();
};

module.exports = corsHandler;
