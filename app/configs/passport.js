const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const { User } = require('../models/user')
const { Bidder } = require('../models/bidder')
const bcrypt = require('bcryptjs')

require('dotenv').config()

module.exports = function(passport) {
    passport.use(new LocalStrategy(
        { usernameField: 'userName', passwordField: 'password', passReqToCallback: true, },
        function(req, username, password, done) {
            User.findOne({ userName: username }, function(err, user) {
                
                if (err) { return done(err); }
                if (!user) {
                    console.log('here')
                    return done(null, false, req.flash('alert', 'Tên tài khoản không đúng. Vui lòng nhập lại. '));
                }

                bcrypt.compare(password, user.password, function(err, isMatch) {
                    if(err) return done(err);

                    if(!isMatch) {
                        return done(null, false, req.flash('alert', 'Mật khẩu không đúng. Vui lòng nhập lại.'));
                    }
                    if(!user.emailVerified) {
                        return done(null, false,req.flash('alert', 'Tài khoản của bạn chưa xác thực. Vui lòng kiểm tra email.')) 
                    }
                    return done(null, user);
                })
                
                
            });
        }
        
    ))

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOne({userFbId: profile.id}, function(err, user) {
                if(err) return done(err)
                if(user) return done(null, user)
                const userFb = new User({
                    // tạo user lưu vào db 
                    userFbId: profile.id,
                    fullName: profile.displayName,
                    emailVerified: true
                })
                
                userFb.save((err, user) => {
                    const bidder = new Bidder({ user: user._id})
                    bidder.save();
                    return done(null, userFb)
                })
            })
        }
    ))


    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });   
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);  
        });
    });
}

