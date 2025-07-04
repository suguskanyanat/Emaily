const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

//middleware
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 days 
        keys: [keys.cookieKey] //encrypt cookie
    })
); //enable cookies
app.use(passport.initialize()); //tell passport to handle cookie
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets like our mail.js file or main.css file
    app.use(express.static('client/build')); 
    // Express will serve up the index.html file if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5001; 
app.listen(PORT); //Express tells node to listen to traffic coming on port 5001

//npm install --save nodemon -> don't have to kill and rerun index everytime index is modified