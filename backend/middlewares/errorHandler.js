const errorHandler = (err, req, res, next) => {
  // Centralized error handler for all API errors
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
};

export default errorHandler;
