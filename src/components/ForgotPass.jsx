import { useState } from "react";
import { resetPass, sendOTP, verifyOTP } from "./Auth";
import { useNavigate } from "react-router-dom";

function ForgotPass() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

 

  const handleError = (err, fallback) => {

    if (!err.response.data.success) {
      if(err.response.data.data!=null&& typeof err.response.data.data==="object"){
        return Object.values(err.response.data.data)[0]
      }
      else {
          return err.response.data.message;
      }
  }
  else return "Something went wrong try again later"
}

  const handleSendOtp = async () => {
   

    setLoading(true);
    setMessage("");

    try {
      const res = await sendOTP(email);
      if(res.data.success){
        setMessage(res.data.message);
        setOtpSent(true);
      }
    } catch (err) {
      setMessage(handleError(err, "Error sending OTP"));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      setMessage("OTP is required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await verifyOTP(email, otp);
      setMessage(res.data.message);
      setOtpVerified(true);
    } catch (err) {
      setMessage(handleError(err, "Invalid OTP"));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!password.trim() || password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await resetPass(email, otp, password);
      setMessage(res.data.message);

      setTimeout(() => window.location.href="/login/", 1000);

    } catch (err) {
      setMessage(handleError(err, "Error resetting password"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <h2>Forgot Password</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        disabled={otpSent || loading}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSendOtp} disabled={loading || otpSent}>
        {loading ? "Sending..." : "Send OTP"}
      </button>

      <br /><br />

      <input
        type="text"
        placeholder="OTP"
        value={otp}
        disabled={!otpSent || otpVerified || loading}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerifyOtp} disabled={!otpSent || otpVerified || loading}>
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

      <br /><br />

      <input
        type="password"
        placeholder="New Password"
        value={password}
        disabled={!otpVerified || loading}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleResetPassword} disabled={!otpVerified || loading}>
        {loading ? "Resetting..." : "Reset Password"}
      </button>

      {message && <p className="feedback">{message}</p>}
    </div>
  );
}

export default ForgotPass;
