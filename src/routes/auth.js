

// import external packages
const passport = require('passport');
const router = require('express').Router();

// import custom packages
const authController = require('../controllers/auth');
const authValidator = require('../middlewares/validator/auth');
const handleValidationErrors = require('../middlewares/errors/handleValidationErrors');
const { authLimiter } = require('../middlewares/ratelimit');


// routes
router.post('/register',
	authLimiter,
	...authValidator.register,
	handleValidationErrors,
	authController.register
);

router.post('/login',
	authLimiter,
	...authValidator.login,
	handleValidationErrors,
	authController.login(passport)
);

router.get('/google',
    authController.google(passport)
);

router.get('/google/callback',
    authController.googleCallback(passport)
);

router.get('/logout',
	authController.logout
);


// export the configured router
module.exports = router;
