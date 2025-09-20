const nodemailer = require('nodemailer');
const mailConfig = require('../config/mail');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: mailConfig.user,
    pass: mailConfig.pass,
  },
});

exports.sendOTPEmail = async (email, otp) => {
  await transporter.sendMail({
    from: mailConfig.user,
    to: email,
    subject: 'Your Password Reset OTP',
    text: `Your OTP is: ${otp} (expires in 10 minutes)`,
  });
};
