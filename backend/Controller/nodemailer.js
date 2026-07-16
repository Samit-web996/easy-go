const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
      // Brevo (Sendinblue) production SMTP over SSL (Port 465)
      const transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 465,
            secure: true, // Port 465 ke liye true hona mandatory hai
            auth: {
                  user: process.env.BREVO_USER,
                  pass: process.env.BREVO_PASS
            }
      });

      const mailOptions = {
            from: `"EasyGo Rentals" <${process.env.BREVO_USER}>`,
            to: options.email,
            subject: options.subject,
            text: options.message,
            html: options.html
      };

      await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;