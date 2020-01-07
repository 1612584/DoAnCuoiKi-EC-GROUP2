const { User } = require('../../../models/user')
const passport = require('passport');
const request = require('request')
const randomstring  = require('randomstring')
const mailer = require('../../../misc/mailer')
const { Category } = require('../../../models/category');
const host = process.env.host;
function requestCaptcha(url) {
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if(!error && response.statusCode == 200) {
                resolve(body)
            }
            else {
                reject(error)
            }
        })
    })
}

module.exports = {
    login: async (req, res) => {
        const categoriesForMenu = await Category.find({});
        if(req.user) {
            return res.redirect('/')
        }
        res.render('pages/guest/authentication/login', {
            category : categoriesForMenu,
            alert: req.flash('alert'),
            message: req.flash('message'),
            isAuthenticated : req.user
        })
    },

    loginPost: (req, res) => {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true,
        })(req, res)

    },

    register: async (req, res) => {
        if(req.user) {
            req.logOut();
        }
        const categoriesForMenu = await Category.find({});
        res.render('pages/guest/authentication/register', {
            category : categoriesForMenu,
            alert: req.flash('alert'),
            isAuthenticated : req.user
        })
    },

    registerPost: async (req, res) => {
        if(!req.body.captcha){
            return res.json({"success": false, "msg":"Capctha is not checked"});
        }
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${req.body.captcha}`;

        let resultCaptcha = await requestCaptcha(verifyUrl);
        resultCaptcha = JSON.parse(resultCaptcha);
        if(!resultCaptcha.success && resultCaptcha.success === undefined){
            return res.json({"success":false, "error":"Lỗi xác nhận captcha"});
        }
        if(resultCaptcha.score < 0.5){
            return res.json({"success":false, "error": "Có thể bạn là con bot. Xin lỗi!"});
        }
        const { fullName, userName, email, password } = req.body;
        const isExistEmail = await User.findOne({ email });
        if(isExistEmail) return res.json({
            'success': false,
            'error': 'Email đã tồn tại trong hệ thống. Vui lòng nhập lại'
        })
        const isExistUsername = await User.findOne({ userName });
        if(isExistUsername) return res.json({
            'success': false,
            'error': 'Username đã tồn tại trong hệ thống. Vui lòng nhập lại'
        })
            
        // Tạo srting token xác thực email
        const verifyAccToken = randomstring.generate();;
        const verifyAccExpires = Date.now() + 3600000;
        const user = new User({fullName, userName, email, password, verifyAccExpires, verifyAccToken})
        const newUser = await user.save()
        console.log(user);
        //
        const contentEmail = `
            <div style="display: flex;
                        justify-content: center;
                        margin-left: 300px
                        ">
                <div style="font-weight: lighter">
                    <img src="https://cdn4.iconfinder.com/data/icons/success-filloutline/64/auction-Verdict-judge-law-gavel-512.png" atl="logo" width="150" height="150" style="margin-left: 77px;"/>
                    <span style="font-size: 18px;
                    font-weight: bold;display: inline-block;margin-left: 30px">Đăng kí tài khoản</span>
                    <hr style="margin-bottom: 20px; "/>
                    Xin chào
                    <br/>
                    Cảm ơn bạn đã đăng kí tài khoản tại website <a href="javascript:void(0)">sandaugia.com </a>!
                    <br/><br/>
                    Xác nhận tài khoản bằng cách click vào link bên dưới:
                    <br/>
                    Link xác nhận:
                    <a href="${host}/user/verify/${verifyAccToken}">Xác nhận tài khoản<a/>
                    <br/><br/>
                    Good bye !!
                </div>
            </div>

            `
            await mailer.sendMail(newUser.email, contentEmail)
            
            res.json({'success': true, 'msg': 'Vui lòng kiểm tra mail để xác nhận tài khoản'})
        // })
    }

}