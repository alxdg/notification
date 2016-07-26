var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    host: 'traverse.websitewelcome.com',
    secure: true,
    auth: {
        user: 'mail@dev2.webtekconsulting.net',
        pass: 'Supercool123!!!'
    }
});

//module.exports = function sendNotification(to, msg) {
    var mailOptions = {
        from: 'info@webtekconsulting.net',
        to: 'alxdg@hotmail.com',
        subject: 'Hello World',
        text: 'Test Alex',
        html: '<b>Hello world</b>' // html body
    };

    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log('Server is ready to take our messages');
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            });
        }
    });
//};
