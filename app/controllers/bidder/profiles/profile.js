const { Category } = require('../../../models/category');
const { User } = require('../../../models/user')

module.exports = {
    index: async function(req, res) {
        //danh muc
        const categoriesForMenu = await Category.find({});
        //bidder profile 
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