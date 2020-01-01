const { User } = require('../../models/user')
const { Bidder } = require('../../models/bidder')
const randomstring = require('randomstring')
const mailer = require('../../misc/mailer')
const bcrypt = require('bcryptjs')
const saltRounds = 10;

module.exports = {
    changePass: async (req, res) => {
        const { _id, userFbId, password } = req.user;
        const newPassword = req.body.password;
        const oldPassword = req.body.old_password;

        if(userFbId) {
            return res.send('Xử lý khi user là tài khoản fb')
        }
        const isMatch = await bcrypt.compare(oldPassword, password);
        if(!isMatch) return res.json({message: 'Password cũ không đúng'})

        const user = await User.findOne({_id});
        await user.update({password: newPassword})
        req.logOut();
        res.redirect('/login')
    },
    getVerify: (req, res) => {
        User.findOne(
            { verifyAccToken: req.params.token, verifyAccExpires: { $gt: Date.now() } },
            (err, doc) => {
                if(!doc) {
                    req.flash('error', 'Token sai hoặc hết hạn')
                    return res.redirect('/register')
                }
                doc.verifyAccExpires = undefined;
                doc.verifyAccToken = undefined;
                doc.emailVerified = true;
                doc.save();
                const bidder = new Bidder({
                    user: doc._id,
                })
                bidder.save();
                res.redirect('/login')

            }
        )
        
    },
    getForgot: (req, res) => {
        res.render('pages/guest/forgotPass', { alert: req.flash('alert') })
    },
    postForgot: async (req, res) => {
        await User.findOne({ email: req.body.email }, async (err, doc) => {
            if(err) return res.send('Lỗi gì đó')
            if(!doc) {
                req.flash('alert', 'Không có email này trong hệ thống. Vui lòng nhập lại')
                return res.redirect('/user/forgot')
            }
            
            const tokenReset = randomstring.generate();
            doc.resetPassToken= tokenReset
            doc.resetPassExpires = Date.now() + 3600000; // 1 giờ
            doc.save()
            
            const contentEmail = `
                <div style="display: flex;
                            justify-content: center;
                            margin-left: 300px
                            ">
                    <div style="font-weight: lighter">
                        <img src="https://cdn4.iconfinder.com/data/icons/success-filloutline/64/auction-Verdict-judge-law-gavel-512.png" atl="logo" width="150" height="150" style="margin-left: 77px;"/>
                        <span style="font-size: 18px;
                        font-weight: bold;display: inline-block;margin-left: 30px">Khôi phục mật khẩu</span>
                        <hr style="margin-bottom: 20px; "/>
                        Xin chào
                        <br/>
                        Có phải bạn đã quên mật khẩu tài khoản đã đăng kí tại website <a href="javascript:void(0)">sandaugia.com </a>!
                        <br/><br/>
                        Khôi phục mật khẩu tài khoản của bạn bằng cách click vào link bên dưới:
                        <br/>
                        Link khôi phục:
                        <a href="http://localhost:3006/user/reset/${tokenReset}">Khôi phục mật khẩu<a/>
                        <br/><br/>
                        Good bye !!
                    </div>
                </div>
                    
                `
            await mailer.sendMail(req.body.email, contentEmail)
            
            
        })
        req.flash('alert', 'Vui lòng xác nhận trong email của bạn')
        
        res.redirect('/user/forgot')

    },
    getResetPass: (req, res) => {
        User.findOne(
            { resetPassToken: req.params.token, resetPassExpires: { $gt: Date.now() } },
            (err, doc) => {
                if(!doc) {
                    req.flash('alert', 'Token sai hoặc hết hạn')
                    return res.redirect('/user/forgot')
                }

                res.render('pages/guest/newPass', {
                    alert: req.flash('alert'),
                    token: req.params.token,
                })

            }
        )
    },
    postResetPass: (req, res) => {
        User.findOne(
            {resetPassToken: req.params.token, resetPassExpires: { $gt: Date.now() }},
            (err, doc) => {
                if(!doc) {
                    req.flash('alert', 'Token sai hoặc hết hạn')
                    return res.redirect('/user/forgot')
                }
                // Validate + Check 2 cái pass ở phía front end
                doc.password = req.body.password;
                doc.resetPassToken = undefined;
                doc.resetPassExpires = undefined;
                doc.save();

                res.redirect('/login')
            }
        )
    },
    getProfile: (req, res) => {
        const { role, fullName, userName, email } = req.user;
        res.render('profile', {
            role, fullName, userName, email
        });
    },
    changeName: (req, res) => {
        User.findByIdAndUpdate(
            req.user._id,
            { fullName: req.body.name},
            {new: true},
            (err, doc) => {
                res.json({message: 'success', user: doc})
            }
        )
    },
    changeEmail: (req, res) => {
        res.json({message: 'Chưa phát triển'})
    }
}
