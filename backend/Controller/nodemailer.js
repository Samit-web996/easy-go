const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");

const sendEmail = async (options) => {
  const transport = Nodemailer.createTransport(
    MailtrapTransport({
      token: process.env.MAILTRAP_API_TOKEN, 
    })
  );

  const sender = {
    address: "hello@demomailtrap.co", 
    name: "EasyGo Rentals",
  };

  await transport.sendMail({
    from: sender,
    to: [options.email], 
    subject: options.subject, 
    text: options.message, 
    html: options.html, 
    category: "Car Booking Confirmation",
  });
};

module.exports = sendEmail;