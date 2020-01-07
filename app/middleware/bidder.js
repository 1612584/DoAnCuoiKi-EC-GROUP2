module.exports = function(req, res, next) {
    if(req.user.role === 0 || req.user.role == 2) {
        return next()
    }
    res.redirect('/')
}