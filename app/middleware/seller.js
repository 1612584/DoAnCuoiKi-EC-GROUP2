module.exports = function(req, res, next) {
    if(req.user.role === 2) {
        return next()
    }
    res.redirect('/')
}