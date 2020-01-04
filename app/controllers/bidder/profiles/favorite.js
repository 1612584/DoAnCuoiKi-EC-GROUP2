const { Category } = require('../../../models/category');
const { Bidder } = require('../../../models/bidder');


module.exports = {
    index: async function(req, res) {
        const { role, fullName, userName, email } = req.user;
        const categoriesForMenu = await Category.find({});
        const { favoriteList } = await Bidder.findOne({user: req.user._id})
                                    .populate({
                                        path: 'favoriteList.product',
                                        model: 'Product'
                                    })
                                    .exec();
        res.render('pages/bidder/profile/favorite',
        {
            category : categoriesForMenu,
            favoriteList,
            isAuthenticated : req.user,
            fullName
        });
    }

}
