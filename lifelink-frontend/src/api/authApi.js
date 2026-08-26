import api from "./axios";

export const loginUser = (data) =>
    api.post("accounts/login/", data);

export const registerUser = (data) =>
    api.post("accounts/register/", data);

export const getProfile = () =>
    api.get("accounts/profile/");

export const logoutUser = (data) =>
    api.post("accounts/logout/", data);

export const forgotPassword = (data) =>
    api.post("accounts/forgot-password/", data);

export const verifyOTP = (data) =>
    api.post("accounts/verify-otp/", data);

export const resetPassword = (data) =>
    api.post("accounts/reset-password/", data);