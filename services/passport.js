const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users'); //User = model class (mongoose)

passport.serializeUser((user, done) => { //user -> user that we just created/pulled from db
    done(null, user.id); //use user.id assigned by mongo bc some might not sign up with google
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });    
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback', //send user back to app
            proxy: true
        }, 
        async (accessToken, refreshToken, profile, done) => { //access token -> tell google that we are allowed from user to modified/etc with their info/smth
            const existingUser = await User.findOne({ googleID: profile.id })
            if (existingUser) {    
                // already have the account -> don't create a new user    
                return done(null, existingUser);
            }
            
            // no record of account -> create a new user    
            const user = await new User({ googleID: profile.id }).save();
            done(null, user); //null -> no error, user -> user that we just created
        }
    )
); // () pass some configuration options to GoogleStrategy