require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const url = process.env.MONGODB_URL;

app.use(cors());

const { signup, login, updateMovieList, deleteUser, listFav } = require('./controllers/user');

const jsonParser = bodyParser.json();

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then((res) => console.log("connected to mongodb!"));

app.get('/', (req,res) => {
    res.send('Hello world');
});

app.post("/signup", jsonParser, signup);
app.post("/login", jsonParser, login);
app.put("/movie", jsonParser, updateMovieList);
app.delete("/deleteUser", jsonParser, deleteUser);
app.get("/listFav", jsonParser, listFav);

app.listen(port, () => {
    console.log(`Listening on ${port}`)
});