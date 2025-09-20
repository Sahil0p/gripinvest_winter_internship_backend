// const User = require('../models/user.model');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const jwtConfig = require('../config/jwt');
// const sendMail = require('../config/mail');
// const otpGenerator = require('../utils/otp');
// const passwordStrengthAI = require('../utils/passwordStrengthAI');

// exports.signup = async (req, res) => {
//   try {
//     const { first_name, last_name, email, password, risk_appetite } = req.body;

//     // Suggest password strength
//     const strengthResponse = passwordStrengthAI.check(password);
//     if (!strengthResponse.strong) {
//       return res.status(400).json({ message: 'Password is weak', suggestions: strengthResponse.suggestions });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(409).json({ message: 'Email already registered' });

//     const password_hash = await bcrypt.hash(password, 10);

//     const user = new User({ first_name, last_name, email, password_hash, risk_appetite });
//     await user.save();
//     res.status(201).json({ message: 'User signed up successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).json({ message: 'Invalid credentials' });

//     const validPassword = await bcrypt.compare(password, user.password_hash);
//     if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id, email: user.email }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
//     res.json({ token });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Password Reset - sends OTP email
// exports.sendPasswordResetOTP = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(404).json({ message: 'User Not Found' });

//     const otp = otpGenerator.generateOTP();
//     // Save OTP somewhere, for demo we'll store in-memory (should be DB or cache)
//     req.app.locals.otpStore = req.app.locals.otpStore || {};
//     req.app.locals.otpStore[email] = otp;

//     await sendMail(email, 'Your OTP for password reset', `Your OTP is: ${otp}`);

//     res.json({ message: 'OTP sent to your email' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.resetPassword = async (req, res) => {
//   try {
//     const { email, otp, newPassword } = req.body;
//     if (!req.app.locals.otpStore || req.app.locals.otpStore[email] !== otp) {
//       return res.status(400).json({ message: 'Invalid OTP' });
//     }

//     const strengthResponse = passwordStrengthAI.check(newPassword);
//     if (!strengthResponse.strong) {
//       return res.status(400).json({ message: 'New password is weak', suggestions: strengthResponse.suggestions });
//     }

//     const password_hash = await bcrypt.hash(newPassword, 10);
//     const user = await User.findOneAndUpdate({ email }, { password_hash }, { new: true });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     delete req.app.locals.otpStore[email];

//     res.json({ message: 'Password reset successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const jwtConfig = require('../config/jwt');

exports.signup = async (req, res) => {
  try {
    const { first_name, last_name, email, password, risk_appetite } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(409).json({ message: 'Email already registered' });

    const password_hash = await bcrypt.hash(password, 10);
    const user = await User.create({ first_name, last_name, email, password_hash, risk_appetite });

    res.status(201).json({ message: 'User signed up', userId: user.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const validPass = await bcrypt.compare(password, user.password_hash);
    if (!validPass) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
