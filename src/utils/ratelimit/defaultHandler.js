const defaultHandler = (req, res, next, options) => {
  if (isProduction) {
    console.warn(`Rate limit exceeded for ${req.ip} on ${req.originalUrl}`);
  }

  res.status(options.statusCode).json({
    success: false,
    error: {
      code: "RATE_LIMIT_EXCEEDED",
      message: options.message,
      retryAfter: Math.ceil(options.windowMs / 1000),
    },
  });
};

module.exports = defaultHandler;
