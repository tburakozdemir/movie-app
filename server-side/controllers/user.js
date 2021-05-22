const User = require("../model/userSchema");

exports.signup = (req, res) => {
  const body = req.body;
  const user = new User({
    name: body.name,
    email: body.email,
    password: body.password,
    favoriteMovies: [],
  });

  user.save().then((savedUser) => {
    res.json(savedUser);
  });
};

exports.login = (req, res) => {
  const email = req.body.email;

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(401).send("User not found!");
    }
    const isPasswordMatch = req.body.password === user.password;
    if (!isPasswordMatch) {
      return res.status(401).send("Incorrect Password!");
    }
    res.status(200).json({
      userId: user._id,
    });
  });
};

exports.updateMovieList = (req, res) => {
  const body = req.body;
    console.log(body)
  User.findOne({ _id: body.userId }).then((user) => {
    if (!user) {
      return res.status(401).send("User ID not valid");
    }
    
    const movie = user.favoriteMovies.find((item) => {
      item.movieId === body.movie.id;
    });
    
    if (movie) {
      const index = user.favoriteMovies.findIndex(movie.id);
      user.favoriteMovies.splice(index, 1);
    } else {
      user.favoriteMovies.push(body.movie);
      console.log(body.movie);
    }

    user.save();
  });
};

exports.deleteUser = (req, res) => {
  const id = req.body.userId;

  User.findOneAndRemove({ _id: id }, (err) => {
    if (err) {
      return res.status(500).send();
    }
    return res.status(200).send();
    console.log("User deleted");
  });
};

exports.listFav = (req, res) => {
  const id = req.body.userId;
  User.find({ _id: id }, (err, data) => {
    if (err) {
      return res.status(400).send();
    } else {
      return res.json(data[0].favoriteMovies);
    }
  });
};