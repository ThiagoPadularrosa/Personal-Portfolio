import config from '../config/config.js';

const noResponseHandler = (req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 404;

  res.status(statusCode).json({
    message: error.message || 'Not found',
    stack: config.NODE_ENV === 'production' ? null : error.stack
  });
};

export default noResponseHandler;