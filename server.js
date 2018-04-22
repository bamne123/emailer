var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser');

var app = express();
var port = 3000;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, function (req, res) {
    console.log('Server is running at port: ', port);
});

app.post('/mail', function (req, res) {
    console.log(req.body);
    let transporter = nodeMailer.createTransport({
        host: 'mail.riderskatta.com',
        port: 25,
        secure: false,
        auth: {
            user: 'support@riderskatta.com',
            pass: '4br5xxz1q7n6'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    let mailOptions = {
        from: '"Support" <support@riderskatta.com>', // sender address
        // to: 'bamne123@gmail.com', // list of receivers
        // subject: 'Hi', // Subject line
        // text: 'Foo', // plain text body
        // html: '<b>Bar</b>' // html body
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.body, // plain text body
        html: `
            <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <title>Riders Katta</title>
            </head>
            <body style="font-family: Calibri, sans-serif; font-size: 16px;">
            <table style="border:1px solid #ccc; padding:25px;"><tr><td>
            <div style="width:600px;">
            <p style="text-align:center;"><img src="http://www.riderskatta.com/logo.png" style="width:150px; height=150px;"><p>
            <p style="text-align:center; font-size:26px; font-weight:bold; color:orange;">Welcome to RidersKatta.</P>
            <p style="line-height:1.5; text-align:justify; font-size:18px; ">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</P>
            <br />
            <p style="line-height:1.5; font-size:15px;">Happy Ride!<br/>RidersKatta Team</p>
            </div>
            </td></tr></table>
            </body>
            </html>
        ` // html body
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
