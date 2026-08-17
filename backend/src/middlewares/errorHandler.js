import config from "../config/config.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message,
    stack: config.NODE_ENV === 'production' ? null : err.stack
  });
};

export default errorHandler;