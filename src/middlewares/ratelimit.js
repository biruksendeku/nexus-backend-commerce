// import packages
const { rateLimit } = require("express-rate-limit");
const defaultHandler = require("../utils/ratelimit/defaultHandler");
const defaultKeyGenerator = require("../utils/ratelimit/defaultKeyGenerator");

// ------------------------------------------------------------------
// Base configuration factory
// ------------------------------------------------------------------
const isProduction = process.env.NODE_ENV === "production";

const createLimiter = (overrides = {}) => {
  const {
    windowMs = 15 * 60 * 1000,
    max = 100,
    message = "Too many requests. Please try again later.",
    statusCode = 429,
    skip = () => false,
    keyGenerator = defaultKeyGenerator,
    handler = defaultHandler,
    ...rest
  } = overrides;

  return rateLimit({
    windowMs,
    max,
    message,
    statusCode,
    standardHeaders: true,
    legacyHeaders: false,
    skip,
    keyGenerator,
    handler,
    ...rest,
  });
};

// skip health checks globally
const skipHealth = (req) => req.path === "/health";

// ------------------------------------------------------------------
// all limiters
// ------------------------------------------------------------------

// API limiter – moderate protection
const apiLimiter = createLimiter({
  windowMs: parseInt(process.env.API_RATE_LIMITER_TIME) * 60 * 1000,
  max: isProduction ? 60 : 100,
  message: "Too many API requests. Please try again later.",
  skip: skipHealth,
});

// Auth limiter – strictest, no skip
const authLimiter = createLimiter({
  windowMs: parseInt(process.env.AUTH_RATE_LIMITER_TIME) * 60 * 1000,
  max: isProduction ? 25 : 50,
  message: "Too many authentication attempts. Please try again later.",
});

// Public limiter – generous
const publicLimiter = createLimiter({
  windowMs: parseInt(process.env.PUBLIC_RATE_LIMITER_TIME) * 60 * 1000,
  max: isProduction ? 100 : 500,
  message: "Too many requests. Please slow down.",
  skip: skipHealth,
});

// export them
module.exports = {
  apiLimiter,
  authLimiter,
  publicLimiter,
};
