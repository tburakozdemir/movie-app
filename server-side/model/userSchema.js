const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  favoriteMovies: [
    {
      movie: {
        id: String,
        genreId: Number,
      },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
