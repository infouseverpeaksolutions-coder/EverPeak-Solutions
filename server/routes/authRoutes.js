const express = require('express');
const router = express.Router();
const { loginAdmin, getMe, updateProfile } = require('../controllers/authController');
const { authenticateAdmin } = require('../middleware/authMiddleware');
const { authLimiter } = require('../middleware/rateLimiter');

router.post('/login', authLimiter, loginAdmin);
router.get('/me', authenticateAdmin, getMe);
router.put('/profile', authenticateAdmin, updateProfile);

module.exports = router;
