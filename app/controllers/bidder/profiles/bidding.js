const { Category } = require('../../../models/category');
const { Bidder } = require('../../../models/bidder');
const { Product } = require('../../../models/product');


module.exports = {
    index: async function(req, res) {
        const { role, fullName, userName, email } = req.user;
        const categoriesForMenu = await Category.find({});
        const bidder = await Bidder.findOne({user: req.user._id});
        const products = await Product.find(
            {"bidders.bidder": bidder._id, "bidders.isWaitingSeller": false}      // false moi dung, test thoi
        )
        res.render('pages/bidder/profile/bidding',
        {
            category : categoriesForMenu,
            products,
            isAuthenticated : req.user,
            fullName
        });
    }

}
