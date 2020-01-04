const { Category } = require('../../../models/category');


module.exports = {
    index: async function(req, res) {
        const { role, fullName, userName, email } = req.user;
        const categoriesForMenu = await Category.find({});
        res.render('pages/bidder/profile/upgrade',
        {
            category : categoriesForMenu,
            isAuthenticated : req.user,
            fullName
        });
    }
}