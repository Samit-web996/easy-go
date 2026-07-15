const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
      const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', 
            port: 587,             
            secure: false,
            connectionTimeout: 10000,
            family: 4,                
            auth : {
                  user : process.env.EMAIL_USER,
                  pass : process.env.EMAIL_PASS,
            },
      });

      const mailOptions = {
            from : `"EasyGo Cars" <${process.env.EMAIL_USER}>`,
            to : options.email,
            subject: options.subject,
            text: options.message,
            html: options.html,
      };

      await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;