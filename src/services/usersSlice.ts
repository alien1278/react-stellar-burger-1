import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserData, IUserInfo } from "../utils/types";
import { RootState } from "./store";
type UsersState = {
  registrationRequest: boolean;
  registrationFailed: boolean;
  token: string | null;
  forgotPasswordRequest: boolean;
  forgotPasswordFailed: boolean;
  isForgotPassword: boolean;
  resetPasswordRequest: boolean;
  resetPasswordFailed: boolean;
  loginRequest: boolean;
  loginFailed: boolean;
  logoutRequest: boolean;
  logoutFailed: boolean;
  userInfo: IUserInfo | null;
  getUserInfoRequest: boolean;
  getUserInfoFailed: boolean;
  sendUserInfoRequest: boolean;
  sendUserInfoFailed: boolean;
  refreshTokenRequest: boolean;
  refreshTokenFailed: boolean;
};
export const initialState: UsersState = {
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
};
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    //registration
    registrationUser(state) {
      state.registrationRequest = true;
      state.registrationFailed = false;
    },
    registrationUserSuccess(state, action: PayloadAction<IUserData>) {
      state.registrationRequest = false;
      state.token = action.payload.accessToken;
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
    setLoginSuccess(state, action: PayloadAction<IUserData>) {
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
    setRefreshTokenSuccess(state, action: PayloadAction<string>) {
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
    setGetUserInfoSuccess(state, action: PayloadAction<IUserInfo>) {
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
    sendUserInfoSuccess(state, action: PayloadAction<IUserInfo>) {
      state.sendUserInfoRequest = false;
      state.userInfo = action.payload;
    },
    sendUserInfoFailed(state) {
      state.sendUserInfoRequest = false;
      state.sendUserInfoFailed = true;
    },
    setForgotPasswordState(state, action: PayloadAction<boolean>) {
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

export const selectIsForgotPassword = (state: RootState) => {
  return state.users.isForgotPassword;
};

export const selectAccessToken = (state: RootState) => {
  return state.users.token;
};

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
