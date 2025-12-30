const Watchlist = require('../models/Watchlist');

// @desc    Get user watchlist
// @route   GET /api/watchlist
// @access  Private
const getWatchlist = async (req, res) => {
    const watchlist = await Watchlist.find({ user: req.user.id });
    res.status(200).json(watchlist);
};

// @desc    Add movie to watchlist
// @route   POST /api/watchlist
// @access  Private
const addToWatchlist = async (req, res) => {
    const { movieId, title, poster, year } = req.body;

    if (!movieId || !title) {
        return res.status(400).json({ message: 'Movie ID and Title are required' });
    }

    try {
        const movie = await Watchlist.create({
            user: req.user.id,
            movieId,
            title,
            poster,
            year,
        });
        res.status(201).json(movie);
    } catch (error) {
        // Prevent duplicate entries (handled by unique index too)
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Movie already in watchlist' });
        }
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete movie from watchlist
// @route   DELETE /api/watchlist/:movieId
// @access  Private
const deleteFromWatchlist = async (req, res) => {
    const movie = await Watchlist.findOne({
        user: req.user.id,
        movieId: req.params.movieId,
    });

    if (!movie) {
        return res.status(404).json({ message: 'Movie not found in watchlist' });
    }

    // Check user (redundant since we queried with user id, but good practice)
    if (movie.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    await movie.deleteOne();

    res.status(200).json({ id: req.params.movieId });
};

module.exports = {
    getWatchlist,
    addToWatchlist,
    deleteFromWatchlist,
};
