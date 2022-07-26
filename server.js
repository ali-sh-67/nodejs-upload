const express = require('express');
const config = require('./config');
const app = express();
const methodOverride = require('method-override');
global.config = require('./config');

const userRouter = require('./routes/user')
const flash = require('connect-flash-plus');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/nodeuser')
    .then(() => console.log('connect to mongodb'))
    .catch(() => console.log('unable connect to mongodb'))

app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(methodOverride('method'));

app.use(cookieParser('sdfdf4dg8vb4gf86b7fg7b8jkl45h'));
app.use(session({
    secret: 'hj7h4jh867k',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.use(flash());

app.get('/', (req, res) => {
    res.render('index')
})
app.use('/user', userRouter);




app.listen(config.port, () => console.log(`server run on port ${config.port}`));