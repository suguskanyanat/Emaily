const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 days 
        keys: [keys.cookieKey] //encrypt cookie
    })
); //enable cookies
app.use(passport.initialize()); //tell passport to handle cookie
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5001; 
app.listen(PORT); //Express tells node to listen to traffic coming on port 5001

//npm install --save nodemon -> don't have to kill and rerun index everytime index is modified