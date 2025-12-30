const mongoose = require('mongoose');

const watchlistSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    movieId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    poster: {
        type: String,
    },
    year: {
        type: String,
    },
    addedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

// Composite index to ensure a user can't add the same movie twice
watchlistSchema.index({ user: 1, movieId: 1 }, { unique: true });

const Watchlist = mongoose.model('Watchlist', watchlistSchema);

module.exports = Watchlist;
