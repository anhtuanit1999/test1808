const express = require('express');
const parser = require('body-parser').urlencoded({ extended: false });
const mongoose = require('mongoose');

const User = require('./src/User');
const app = express();
const PORT = 3000;

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.post('/post', parser, async (req, res) => {
    //co 1 post trong db
    const { userID, title, content } = req.body;
    User.addPostById(userID, title, content)
    .then(() => res.send({ message: 'OK'}))
    .catch(err => res.send({ error: err.message}));
    // res.send(userID + title + content);
});

app.post('/user', parser, async (req, res) => {
    const { name } = req.body;
    // const user = new User(req.body);
    const user = new User({ name });
    await user.save();
    res.send({ message: 'OK'});
});

app.get('/', (req, res) => res.render('home'));
mongoose.connect('mongodb://localhost:27017/shop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.once('open', () => {
    app.listen(PORT, () => console.log(`Server listen at port ${PORT}`));
});