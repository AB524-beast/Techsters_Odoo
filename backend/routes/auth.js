const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const upload = require('../middleware/upload');

router.post('/register', upload.single('profilePhoto'), authController.register);
router.post('/login', authController.login);

module.exports = router;
