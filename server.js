var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser');

var app = express();
var port = 8080;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, function (req, res) {
    console.log('Server is running at port: ', port);
});

app.get('/', function (req, res) {
    return res.status(200).json({
        status: 200,
        message: 'This API uses post method to send mails.'
    });
});

app.post('/', function (req, res) {
    console.log(req.body);
    let transporter = nodeMailer.createTransport({
        // host: 'mail.riderskatta.com',
        // port: 25,
        // secure: false,
        // auth: {
        //     user: 'support@riderskatta.com',
        //     pass: '4br5xxz1q7n6'
        // },
        host: 'advisorsadda.com',
        port: 465,
        secure: true,
        auth: {
            user: 'test@advisorsadda.com',
            pass: '4br5xxz1q7n6'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    let mailOptions = {
        from: '"Riderskatta Support" <test@advisorsadda.com>', // sender address
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line
        // text: req.body.body, // plain text body
        html: `
        <html xmlns="http://www.w3.org/1999/xhtml">

        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <title>Riders Katta</title>
        </head>
        
        <body style="font-family: Calibri, sans-serif; font-size: 16px;">
            <table style="border:1px solid #ccc; padding:25px;">
                <tr>
                    <td>
                        <div style="width:600px;">
                            <p style="text-align:center;">
                                <img src="http://www.riderskatta.com/logo.png" style="width:150px; height=150px;">
                                <p>
                                    <p style="text-align:center; font-size:26px; font-weight:bold; color:orange;">Welcome to RidersKatta.</P>
                                    <p style="line-height:1.5; text-align:justify; font-size:24px; ">
                                        <b>Thank you for signing up</b>
                                    </P>
                                    <p style="line-height:1.5; text-align:justify; font-size:18px; ">I'm absolutely thrilled that you've decided to give RidersKatta a try and
                                        <br/> just want to you to know that if you want to contact the team,
                                        <br/> feel free to do so anytime at
                                        <a href="mailto:support@riderskatta.com">support@riderskatta.com</a>
                                    </P>
                                    <p style="line-height:1.5; text-align:justify; font-size:18px; ">The best way to experience RidersKatta is to create lots of rides with your friends.So if you haven't done that already
                                        you can get started now:</P>
                                    <br/>
                                    <p style="line-height:1.5; font-size:15px;">
                                        <strong>Enjoy the Ride!</strong>
                                        <br/>RidersKatta Team
                                        <br/>
                                        <i>Feel the Throttle...</i>
                                    </p>
                        </div>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.json({
                message: error
            });
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        return res.status(200).json({
            status: 200,
            message: 'Message sent'
        });

    });
});
