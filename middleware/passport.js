const jwtstrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user')

module.exports = function(passport){
    passport.use(
        new jwtstrategy({
            secretOrKey : process.env.JWT_KEY,
            jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken()
        },
        function(jwt_payload, next){
            //console.log(jwt_payload)
            User.findOne({}, function(err, user){
                if(err){
                    return next(err, false)
                }
                if(user){
                    next(null, user)
                }else{
                    next(null, false)
                }
            })
        })
    )
};