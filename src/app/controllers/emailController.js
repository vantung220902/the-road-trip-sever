const nodemailer = require("nodemailer");
class EmailController {

    sendEmail(req, res, next) {
        try {
            const { array, content, arrayImg } = req.body;
            const to = array.toString();
            const { subject, text } = content;
            let mailTransporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.MAIL_FROM,
                    pass: process.env.MAIL_PASS,
                }
            });
            let mailDetails = {
                from: process.env.MAIL_FROM,
                to: to,
                subject: subject,
                text: text,
                html:"",
                attachments: arrayImg
            };

            mailTransporter.sendMail(mailDetails, function (err, data) {
                if (err) {
                    console.log('Error Occurs');
                } else {
                    console.log('Email sent successfully');  
                }
               
            });
          
        } catch (error) {
            console.error(error);
        }
        return res.status(200).json({ checked: true });
    }

}
module.exports = new EmailController();
