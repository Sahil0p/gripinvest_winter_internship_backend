const otpStore = new Map(); // Simple in-memory for demo
const OTP_EXPIRATION = 10 * 60 * 1000;

exports.generateOTP = () => (Math.floor(100000 + Math.random() * 900000)).toString();

exports.saveOTP = (email, otp) => {
  otpStore.set(email, { otp, expiresAt: Date.now() + OTP_EXPIRATION });
};

exports.verifyOTP = (email, otp) => {
  const record = otpStore.get(email);
  if (!record || record.expiresAt < Date.now()) {
    otpStore.delete(email);
    return false;
  }
  if (record.otp !== otp) return false;
  otpStore.delete(email);
  return true;
};
