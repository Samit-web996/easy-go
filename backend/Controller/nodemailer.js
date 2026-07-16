const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
      const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525, 
            auth: {
                  user: process.env.MAILTRAP_USER, 
                  pass: process.env.MAILTRAP_PASS  
            }
      });

      const mailOptions = {
            from: `"EasyGo Rentals" <test@easygorentals.com>`, 
            to: options.email, 
            subject: options.subject,
            text: options.message,
            html: options.html,
      };

      await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;