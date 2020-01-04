const { Category } = require('../../../models/category');
const { Bidder } = require('../../../models/bidder');

module.exports = {
    index: async function(req, res) {
        const { role, fullName, userName, email } = req.user;
        const categoriesForMenu = await Category.find({});
        const bidder = await Bidder.findOne({user: req.user._id}).populate('response.seller').exec()
        const { like, dislike, response } = bidder;
    
        console.log(response)
        let point = like / (like+dislike);
        point = (point) ? point *100 : 0
        res.render('pages/bidder/profile/review',
        {
            category : categoriesForMenu,
            isAuthenticated : req.user,
            point,
            response,
            fullName
        });
    }
}