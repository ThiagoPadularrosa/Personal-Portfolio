const noResponseHandler = (req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 404;

    res.status(statusCode).json({
      success: false,
      message: `Route ${req.method} ${req.originalUrl} Not found `,
    });

  next();
};

export default noResponseHandler;