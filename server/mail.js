//引入nodemailer
var nodemailer  = require('nodemailer');
//创建传输方式
var mailTransport = nodemailer.createTransport({
    host : 'smtp.sina.com',
    secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
    auth : {
        user : 'lovepetcommunity@sina.com',
        pass : 'lovepet123456'
    },
});

module.exports = mailTransport;
