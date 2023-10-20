import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    registrationRequest: false,
    registrationFailed: false,

    token: null,

    forgotPasswordRequest: false,
    forgotPasswordFailed: false,
    isForgotPassword: false,

    resetPasswordRequest: false,
    resetPasswordFailed: false,

    loginRequest: false,
    loginFailed: false,

    logoutRequest: false,
    logoutFailed: false,

    userInfo: null,
    getUserInfoRequest: false,
    getUserInfoFailed: false,
    sendUserInfoRequest: false,
    sendUserInfoFailed: false,

    refreshTokenRequest: false,
    refreshTokenFailed: false,
  },
  reducers: {
    //registration
    registrationUser(state) {
      state.registrationRequest = true;
      state.registrationFailed = false;
    },
    registrationUserSuccess(state, action) {
      state.registrationRequest = false;
      state.token = action.payload;
    },
    registrationUserFailed(state) {
      state.registrationRequest = false;
      state.registrationFailed = true;
    },
    //Login
    setLogin(state) {
      state.loginRequest = true;
      state.loginFailed = false;
    },
    setLoginSuccess(state, action) {
      state.loginRequest = false;
      state.token = action.payload.accessToken;
      state.userInfo = action.payload.user;
    },
    setLoginFailed(state) {
      state.loginRequest = false;
      state.loginFailed = true;
    },
    //Logout
    setLogout(state) {
      state.logoutRequest = true;
      state.logoutFailed = false;
    },
    setLogoutSuccess(state) {
      state.logoutRequest = false;
      state.token = null;
      state.userInfo = null;
    },
    setLogoutFailed(state) {
      state.logoutRequest = false;
      state.logoutFailed = true;
    },

    setRefreshToken(state) {
      state.refreshTokenRequest = true;
      state.refreshTokenFailed = false;
    },
    setRefreshTokenSuccess(state, action) {
      state.refreshTokenRequest = false;
      state.token = action.payload;
    },
    setRefreshTokenFailed(state) {
      state.refreshTokenRequest = false;
      state.refreshTokenFailed = true;
    },

    setGetUserInfo(state) {
      state.getUserInfoRequest = true;
      state.getUserInfoFailed = false;
    },
    setGetUserInfoSuccess(state, action) {
      state.getUserInfoRequest = false;
      state.userInfo = action.payload;
    },
    setGetUserInfoFailed(state) {
      state.getUserInfoRequest = false;
      state.getUserInfoFailed = true;
    },

    sendUserInfo(state) {
      state.sendUserInfoRequest = true;
      state.sendUserInfoFailed = false;
    },
    sendUserInfoSuccess(state, action) {
      state.state.sendUserInfoRequest = false;
      state.userInfo = action.payload;
    },
    sendUserInfoFailed(state) {
      state.sendUserInfoRequest = false;
      state.sendUserInfoFailed = true;
    },
    setForgotPasswordState(state, action) {
      state.isForgotPassword = action.payload;
    },
    //ForgotPassword
    setForgotPassword(state) {
      state.forgotPasswordRequest = true;
      state.forgotPasswordFailed = false;
    },
    setForgotPasswordSuccess(state) {
      state.forgotPasswordRequest = false;
    },
    setForgotPasswordFailed(state) {
      state.forgotPasswordFailed = true;
      state.forgotPasswordRequest = false;
    },
    //ResetPassword
    setResetPassword(state) {
      state.resetPasswordRequest = true;
      state.resetPasswordFailed = false;
    },
    setResetPasswordSuccess(state) {
      state.resetPasswordRequest = false;
    },
    setResetPasswordFailed(state) {
      state.resetPasswordFailed = true;
      state.resetPasswordRequest = false;
    },
  },
});

export const usersSliceReducer = usersSlice.reducer;

export const {
  setForgotPasswordState,
  setRefreshToken,
  setRefreshTokenSuccess,
  setRefreshTokenFailed,
  setGetUserInfo,
  setGetUserInfoSuccess,
  setGetUserInfoFailed,
  setLogout,
  setLogoutSuccess,
  setLogoutFailed,
  sendUserInfo,
  sendUserInfoSuccess,
  sendUserInfoFailed,
  setLogin,
  setLoginSuccess,
  setLoginFailed,
  registrationUser,
  registrationUserSuccess,
  registrationUserFailed,
  setResetPassword,
  setResetPasswordSuccess,
  setResetPasswordFailed,
  setForgotPassword,
  setForgotPasswordSuccess,
  setForgotPasswordFailed,
} = usersSlice.actions;
