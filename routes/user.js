const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const User = require("../models/user");

router.post('/signup',(req,res)=>{
    // Form validation
    const {errors, isValid} = validateRegisterInput(req.body);

    //check validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email})
    .then(user=>{
        if(user){
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password
            });

            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(newUser.password, salt, (err,hash)=>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
            });
        };
    });
});

router.post('/signup', passport.authenticate('signup', {session:false}),
    async(req,res,next)=>{
        res.json({message:'Signup Successfully', user:req.user});
    }
);

router.post('/login', 
    async(req,res,next)=>{
        passport.authenticate('login', async(err,user,info)=>{
            try{
                if(err || !user){
                    const error = new Error('An error occured.');
                    return next(error);
                }
                req.login(user, {session:false},
                    async(error)=>{
                        if(error) return next(error);

                        const body = { _id:user._id,email:user.email};
                        const token = jwt.sign({user:body},'TOP_SECRET');

                        return res.json({token});
                    }
                );
            } catch(error){
                return next(error);
            }
        })(req,res,next);
    }
);


module.exports = router;