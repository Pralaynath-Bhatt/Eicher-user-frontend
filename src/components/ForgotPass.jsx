import { useState } from "react";
import { resetPass, sendOTP, verifyOTP } from "./Auth";

function ForgotPass() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleSendOtp = async () => {
    try {
      const res = await sendOTP(email);
      setMessage(res.data);
      setOtpSent(true);
    } catch (err) {
      setMessage(err.response?.data || "Error sending OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await verifyOTP(email, otp);
      setMessage(res.data);
      setOtpVerified(true);
    } catch (err) {
      setMessage(err.response?.data || "Invalid OTP");
    }
  };

  const handleResetPassword = async () => {
    try {
      const res = await resetPass(email, otp, password);
      setMessage(res.data);
      window.location.href="/login/";
    } catch (err) {
      setMessage(err.response?.data || "Error resetting password");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>

      
      <input
        type="email"
        placeholder="Email"
        value={email}
        disabled={otpSent}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSendOtp} disabled={!email || otpSent}>
        Send OTP
      </button>

      <br /><br />

      
      <input
        type="text"
        placeholder="OTP"
        value={otp}
        disabled={!otpSent || otpVerified}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerifyOtp} disabled={!otpSent || otpVerified}>
        Verify OTP
      </button>

      <br /><br />

      <input
        type="password"
        placeholder="New Password"
        value={password}
        disabled={!otpVerified}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleResetPassword} disabled={!otpVerified}>
        Reset Password
      </button>

      <p>{message}</p>
    </div>
  );
}

export default ForgotPass;
