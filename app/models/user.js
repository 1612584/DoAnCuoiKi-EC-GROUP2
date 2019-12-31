const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
const saltRounds = 10;

const userSchema = new Schema({
    userName: {
        type: String,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
    },
    email: String,
    fullName: {
        type: String,
        maxlength: 100,
    },
    firstName: {
        type: String,
        maxlength: 50,
    },
    lastName: {
        type: String,
        maxlength: 50,
    },
    role: {
        type: Number,
        default: 0,
    },
    userFbId: {
        type: String
    },
    verifyAccToken: {
        type: String,
    },
    verifyAccExpires: {
        type: String,
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    resetPassToken: String,
    resetPassExpires: Date,
    
})

userSchema.methods.validPassword = function(password) {
    return this.password === password
}

userSchema.pre(['save'], function(next) {
    var that = this

    
    if(that.isModified('password')) {
        
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            bcrypt.hash(that.password, salt, function(err, hash) {
                
                if(err) return next(err);
                
                that.password = hash;
                next(); 
            })
        }) 
    }
    else {
        next()
    }
})
userSchema.pre('update', function(next) {
    var that = this;
    const password= this.getUpdate().password;
    
    if(password) {
        
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            
            bcrypt.hash(password, salt, function(err, hash) {
                
                if(err) return next(err);
                
                
                that.update({password: hash})
                next(); 
            })
        }) 
    }
    else {
        next()
    }

}) 


    


const User = mongoose.model('User', userSchema);
module.exports = { User }



/*
    role:
        - 2: seller
        - 0: bidder
        - 1: admin
    userFbId: lưu id tài khoản fb
*/