const nodemailer = require('nodemailer')
require('dotenv').config()

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ninjaguyyyy@gmail.com',
        pass: 'Tu0den9boso8',
    },
    tls: {
        rejectUnauthorized: false,
    }
})

module.exports = {
    sendMail: function(to, html) {
        return new Promise((resolve, reject) => {

            const  mailOptions = {
                from: 'ninjaguyyyy@gmail.com',
                to: to,
                subject: 'Sending Email using Node.js',
                text: 'That was easy!',
                html: html
            };
            transport.sendMail(mailOptions, (err, info) => {
                if(err) reject(err)
                
                resolve(info)
            })
        }) 
}
}

// thèn này bị gì rồi ???