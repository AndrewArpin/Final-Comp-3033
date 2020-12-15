const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user.id);
    });   
});

passport.use(
    new GoogleStrategy({
        callbackURL:'/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret

    }, (accessToken, refreshToken, profile, done) => {
        //check for existing user 
        User.findOne({googleid: profile.id}).then((existingUser) => {
            if(existingUser){
                //no user
                console.log('existing user');
                done(null, existingUser);
            }
            else{
                //user
                new User({
                    username: profile.displayName,
                    googleId: profile.id
                }).save().then((newUser) => {
                    console.log('new user ' + newUser);
                    done(null, newUser);
                });
            }
        });      
    })
)