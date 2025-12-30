const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getMe,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Auth routes
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);

// User routes
router.get('/user/profile', protect, getMe);

module.exports = router;
