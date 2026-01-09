import api from "./api";

const API_URL = "/auth";

export const sendOTP = (email) => {
  return api.post(`${API_URL}/login/forgotPassword`, { email });
};

export const verifyOTP = (email, otp) => {
  return api.post(`${API_URL}/login/verifyOtp`, { email, otp });
};

export const resetPass = (email, otp, password) => {
  return api.post(`${API_URL}/login/resetPass`, { email, otp, password });
};

export const login = (username, password) => {
  return api.post(`${API_URL}/login`, { username, password });
};

export const register = (username, email, password) => {
  return api.post(`${API_URL}/register`, {
    username,
    email,
    password,
  });
};
