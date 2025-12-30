const express = require('express');
const router = express.Router();
const {
    getWatchlist,
    addToWatchlist,
    deleteFromWatchlist,
} = require('../controllers/watchlistController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getWatchlist);
router.post('/', protect, addToWatchlist);
router.delete('/:movieId', protect, deleteFromWatchlist);

module.exports = router;
