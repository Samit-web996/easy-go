const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
      const transporter = nodemailer.createTransport({
            service: 'gmail', // 👇 Gmail ka native service handler use kiya (Sabse stable)
            auth : {
                  user : process.env.EMAIL_USER,
                  pass : process.env.EMAIL_PASS,
            },
            tls: {
                  // 👇 Cloud platforms par certificate validation errors ko bypass karne ke liye
                  rejectUnauthorized: false
            }
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