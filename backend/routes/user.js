const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const userController = require('../controllers/user');

// Correct route definition (handler must be a function)
router.get('/me', auth, userController.getProfile);
router.put('/me', auth, userController.updateProfile);
router.get('/search', auth, userController.searchUsers);

module.exports = router;