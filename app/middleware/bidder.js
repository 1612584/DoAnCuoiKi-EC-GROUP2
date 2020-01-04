module.exports = function(req, res, next) {
    if(req.user.role === 0) {
        return next()
    }
    res.redirect('/')
}