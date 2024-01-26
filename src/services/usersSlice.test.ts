import {
  usersSliceReducer,
  registrationUser,
  registrationUserSuccess,
  registrationUserFailed,
  setLogin,
  setLoginSuccess,
  setLoginFailed,
  setLogout,
  setLogoutSuccess,
  setLogoutFailed,
  setRefreshToken,
  setRefreshTokenSuccess,
  setRefreshTokenFailed,
  setGetUserInfo,
  setGetUserInfoSuccess,
  setGetUserInfoFailed,
  sendUserInfo,
  sendUserInfoSuccess,
  sendUserInfoFailed,
  setForgotPasswordState,
  setForgotPassword,
  setForgotPasswordSuccess,
  setForgotPasswordFailed,
  setResetPassword,
  setResetPasswordSuccess,
} from "./usersSlice";
import { IUserData, IUserInfo } from "../utils/types";

describe("usersSlice reducer", () => {
  const initialState = {
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

  it("должен обрабатывать начальное состояние", () => {
    expect(usersSliceReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("должен обрабатывать registrationUser", () => {
    expect(usersSliceReducer(initialState, registrationUser())).toEqual({
      ...initialState,
      registrationRequest: true,
      registrationFailed: false,
    });
  });

  it("должен обрабатывать registrationUserSuccess", () => {
    const userData: IUserData = {
      accessToken: "token123",
      refreshToken: "refreshToken123",
      success: true,
      user: { email: "ivan@example.com", name: "Иван" },
    };
    expect(
      usersSliceReducer(initialState, registrationUserSuccess(userData))
    ).toEqual({
      ...initialState,
      registrationRequest: false,
      token: userData.accessToken,
    });
  });

  it("должен обрабатывать registrationUserFailed", () => {
    expect(usersSliceReducer(initialState, registrationUserFailed())).toEqual({
      ...initialState,
      registrationRequest: false,
      registrationFailed: true,
    });
  });

  it("должен обрабатывать setLogin", () => {
    expect(usersSliceReducer(initialState, setLogin())).toEqual({
      ...initialState,
      loginRequest: true,
      loginFailed: false,
    });
  });

  it("должен обрабатывать setLoginSuccess", () => {
    const userData: IUserData = {
      accessToken: "token123",
      refreshToken: "refreshToken123",
      success: true,
      user: { email: "ivan@example.com", name: "Иван" },
    };
    expect(usersSliceReducer(initialState, setLoginSuccess(userData))).toEqual({
      ...initialState,
      loginRequest: false,
      token: userData.accessToken,
      userInfo: userData.user,
    });
  });
  it("должен обрабатывать setLoginFailed", () => {
    expect(usersSliceReducer(initialState, setLoginFailed())).toEqual({
      ...initialState,
      loginRequest: false,
      loginFailed: true,
    });
  });

  it("должен обрабатывать setLogout", () => {
    expect(usersSliceReducer(initialState, setLogout())).toEqual({
      ...initialState,
      logoutRequest: true,
      logoutFailed: false,
    });
  });

  it("должен обрабатывать setLogoutSuccess", () => {
    expect(usersSliceReducer(initialState, setLogoutSuccess())).toEqual({
      ...initialState,
      logoutRequest: false,
      token: null,
      userInfo: null,
    });
  });

  it("должен обрабатывать setLogoutFailed", () => {
    expect(usersSliceReducer(initialState, setLogoutFailed())).toEqual({
      ...initialState,
      logoutRequest: false,
      logoutFailed: true,
    });
  });
  it("должен обрабатывать setRefreshToken", () => {
    expect(usersSliceReducer(initialState, setRefreshToken())).toEqual({
      ...initialState,
      refreshTokenRequest: true,
      refreshTokenFailed: false,
    });
  });

  it("должен обрабатывать setRefreshTokenSuccess", () => {
    const newToken = "newToken123";
    expect(
      usersSliceReducer(initialState, setRefreshTokenSuccess(newToken))
    ).toEqual({
      ...initialState,
      refreshTokenRequest: false,
      token: newToken,
    });
  });

  it("должен обрабатывать setRefreshTokenFailed", () => {
    expect(usersSliceReducer(initialState, setRefreshTokenFailed())).toEqual({
      ...initialState,
      refreshTokenRequest: false,
      refreshTokenFailed: true,
    });
  });
  it("должен обрабатывать setGetUserInfo", () => {
    expect(usersSliceReducer(initialState, setGetUserInfo())).toEqual({
      ...initialState,
      getUserInfoRequest: true,
      getUserInfoFailed: false,
    });
  });

  it("должен обрабатывать setGetUserInfoSuccess", () => {
    const userInfo: IUserInfo = {
      email: "user@example.com",
      name: "User Name",
    };
    expect(
      usersSliceReducer(initialState, setGetUserInfoSuccess(userInfo))
    ).toEqual({
      ...initialState,
      getUserInfoRequest: false,
      userInfo: userInfo,
    });
  });

  it("должен обрабатывать setGetUserInfoFailed", () => {
    expect(usersSliceReducer(initialState, setGetUserInfoFailed())).toEqual({
      ...initialState,
      getUserInfoRequest: false,
      getUserInfoFailed: true,
    });
  });
  it("должен обрабатывать sendUserInfo", () => {
    expect(usersSliceReducer(initialState, sendUserInfo())).toEqual({
      ...initialState,
      sendUserInfoRequest: true,
      sendUserInfoFailed: false,
    });
  });

  it("должен обрабатывать sendUserInfoSuccess", () => {
    const userInfo: IUserInfo = {
      email: "user@example.com",
      name: "User Name",
    };
    expect(
      usersSliceReducer(initialState, sendUserInfoSuccess(userInfo))
    ).toEqual({
      ...initialState,
      sendUserInfoRequest: false,
      userInfo: userInfo,
    });
  });

  it("должен обрабатывать sendUserInfoFailed", () => {
    expect(usersSliceReducer(initialState, sendUserInfoFailed())).toEqual({
      ...initialState,
      sendUserInfoRequest: false,
      sendUserInfoFailed: true,
    });
  });

  it("должен обрабатывать setForgotPasswordState", () => {
    const isForgotPassword = true;
    expect(
      usersSliceReducer(initialState, setForgotPasswordState(isForgotPassword))
    ).toEqual({
      ...initialState,
      isForgotPassword: isForgotPassword,
    });
  });

  it("должен обрабатывать setForgotPassword", () => {
    expect(usersSliceReducer(initialState, setForgotPassword())).toEqual({
      ...initialState,
      forgotPasswordRequest: true,
      forgotPasswordFailed: false,
    });
  });

  it("должен обрабатывать setForgotPasswordSuccess", () => {
    expect(usersSliceReducer(initialState, setForgotPasswordSuccess())).toEqual(
      {
        ...initialState,
        forgotPasswordRequest: false,
      }
    );
  });

  it("должен обрабатывать setForgotPasswordFailed", () => {
    expect(usersSliceReducer(initialState, setForgotPasswordFailed())).toEqual({
      ...initialState,
      forgotPasswordRequest: false,
      forgotPasswordFailed: true,
    });
  });
  it("должен обрабатывать setResetPassword", () => {
    expect(usersSliceReducer(initialState, setResetPassword())).toEqual({
      ...initialState,
      resetPasswordRequest: true,
      resetPasswordFailed: false,
    });
  });

  it("должен обрабатывать setResetPasswordSuccess", () => {
    expect(usersSliceReducer(initialState, setResetPasswordSuccess())).toEqual({
      ...initialState,
      resetPasswordRequest: false,
    });
  });
});
