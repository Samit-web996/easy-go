const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
      const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', 
            port: 465,             
            secure: true,
            // 👇 Yeh lines add karni hain IPv4 force karne ke liye
            connectionTimeout: 10000, // 10 seconds timeout
            family: 4,                // Force IPv4 (IPv6 block bypass karne ke liye)
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