const { Category } = require('../../../models/category');
const { User } = require('../../../models/user')

module.exports = {
    index: async function(req, res) {
        const categoriesForMenu = await Category.find({});
        const { role, fullName, userName, email } = req.user;
        res.render('pages/bidder/profile/profile',
        {
            category : categoriesForMenu,
            fullName,
            email,
            isAuthenticated : req.user
        });
    }
}