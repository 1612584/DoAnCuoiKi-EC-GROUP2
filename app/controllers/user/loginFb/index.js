const passport = require('passport');

module.exports = {
    authFb: passport.authenticate('facebook', {
        display: 'page'
    }),
    authFbCallback: passport.authenticate('facebook', {
        successRedirect: '/admin/users/manageUser',
        failureRedirect: '/login'
    }),
}
