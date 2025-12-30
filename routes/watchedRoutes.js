const express = require('express');
const router = express.Router();
const {
    getWatched,
    addToWatched,
    removeFromWatched,
} = require('../controllers/watchedController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getWatched);
router.post('/', protect, addToWatched);
router.delete('/:movieId', protect, removeFromWatched);

module.exports = router;
