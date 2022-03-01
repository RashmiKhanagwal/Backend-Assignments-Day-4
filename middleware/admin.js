const jwtstrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user')
const passport = require('passport')

// Day 4
// Use Passport Js and add authentication to your App
// Create Register and Sign in APIs and on successful signin use Token based authentication

module.exports = function (passport) {
    passport.use(
        new jwtstrategy({
            secretOrKey: process.env.JWT_KEY,
            jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken()
        },
            function (jwt_payload, next) {
                //console.log(jwt_payload)
                const _id = jwt_payload.id

                User.findById(_id).then((userData) => {
                    if (userData.role == "admin") {

                        next(null, userData);
                    } else {
                        return res.status(400).json({ message: "You are not authorized" })
                    }
                })
            })
    )
};

passport.deserializeUser((_id, done)=>{
    User.findById(_id, (err, user)=>{
        if(err) return done(null, false)
        return done(null, user)
    })
});