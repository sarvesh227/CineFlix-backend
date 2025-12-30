const Watched = require('../models/Watched');

// @desc    Get user watched history
// @route   GET /api/watched
// @access  Private
const getWatched = async (req, res) => {
    const watched = await Watched.find({ user: req.user.id }).sort({ watchedAt: -1 });
    res.status(200).json(watched);
};

// @desc    Add movie to watched history
// @route   POST /api/watched
// @access  Private
const addToWatched = async (req, res) => {
    const { movieId, title, poster, year } = req.body;

    if (!movieId || !title) {
        return res.status(400).json({ message: 'Movie ID and Title are required' });
    }

    try {
        const movie = await Watched.create({
            user: req.user.id,
            movieId,
            title,
            poster,
            year,
        });
        res.status(201).json(movie);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Movie already in watched list' });
        }
        res.status(500).json({ message: error.message });
    }
};

// @desc    Remove movie from watched history
// @route   DELETE /api/watched/:movieId
// @access  Private
const removeFromWatched = async (req, res) => {
    const movie = await Watched.findOne({
        user: req.user.id,
        movieId: req.params.movieId,
    });

    if (!movie) {
        return res.status(404).json({ message: 'Movie not found in watched list' });
    }

    await movie.deleteOne();

    res.status(200).json({ id: req.params.movieId });
};

module.exports = {
    getWatched,
    addToWatched,
    removeFromWatched,
};
