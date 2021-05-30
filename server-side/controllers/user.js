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
      user.favoriteMovies.push(body);
    }

    user.save().then(updatedUser=>{
      let count = 0;
      let genreArr = []
      
      for (let i = 0; i < updatedUser.favoriteMovies.length; i++) {
        let genreId = updatedUser.favoriteMovies[i].movie.genreId
        genreArr.push(genreId);  
        count++;
      }
      let countsGenre = {};
      genreArr.map(x => { countsGenre[x] = (countsGenre[x] || 0)+1; });
      const sorted = Object.entries(countsGenre).sort((prev, next) => prev[1] - next[1]);
      const maxGenreId =sorted[sorted.length-1][0];
      console.log(maxGenreId);
      res.send(maxGenreId)
    });
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