

// external packages
const router = require('express').Router();

// import custom packages
const adminController = require('../controllers/admin');
const upload = require('../config/storage/multer');
const adminValidator = require('../middlewares/validator/admin');
const handleValidationErrors = require('../middlewares/errors/handleValidationErrors');
const abortSignal = require('../middlewares/abort');
const loadProduct = require('../utils/validator/loadProduct');


router.get('/dashboard',
    abortSignal,
    adminController.dashboard
);

router.post('/create',
    upload.array('images', 5),
    ...adminValidator.createProduct,
    handleValidationErrors,
    adminController.createProduct
);

router.get('/products',
    abortSignal,
    ...adminValidator.getAllProducts,
    handleValidationErrors,
    adminController.getAllProducts
);

router.get('/products/:id',
    ...adminValidator.getOneProduct,
    handleValidationErrors,
    adminController.getOneProduct
);

router.get('/orders',
    abortSignal,
    ...adminValidator.getAllOrders,
    handleValidationErrors,
    adminController.getAllOrders
);

router.get('/orders/:id',
  abortSignal,
  ...adminValidator.getOneOrder,
  handleValidationErrors,
  adminController.getOneOrder
);

router.patch('/orders/:id',
  ...adminValidator.updateOrder,
  handleValidationErrors,
  adminController.updateOrder
);

router.get('/revenue',
    abortSignal,
    adminController.getAllRevenue
);

router.patch('/products/:id',
	loadProduct, // to fetch and attach product to the req object
    upload.array('images', 5),
    ...adminValidator.updateProduct,
    handleValidationErrors,
    adminController.updateProduct
);

router.delete('/products/:id',
    ...adminValidator.deleteProduct,
    handleValidationErrors,
    adminController.deleteProduct
);

router.get('/users',
	abortSignal,
	adminController.getAllUsers
);

router.get('/users/:id',
	...adminValidator.getOneUser,
	handleValidationErrors,
	adminController.getOneUser
);

router.patch('/users/:id',
	...adminValidator.updateUser,
	handleValidationErrors,
	adminController.updateUser
);

router.delete('/users/:id',
	...adminValidator.deleteUser,
	handleValidationErrors,
	adminController.deleteUser
);

router.get('/errors',
    adminController.getCriticalErrors
);


router.get('/errors/:id',
	...adminValidator.getErrorDetail,
	handleValidationErrors,
	adminController.getErrorDetail
);

router.delete('/errors/:id',
	...adminValidator.deleteError,
	handleValidationErrors,
	adminController.deleteError
);



// finally export the configured router
module.exports = router;
