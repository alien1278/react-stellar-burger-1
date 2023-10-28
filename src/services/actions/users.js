import {
  getUserDataRequest,
  loginRequest,
  refreshTokenRequest,
  registerRequest,
  resetPasswordRequest,
  sendEmailRequest,
  sendUserInfoRequest,
} from "../../utils/api";
import { TOKEN_EXPIRED, UNAUTHORIZED } from "../../utils/api-constants";
import {
  registrationUser,
  registrationUserFailed,
  registrationUserSuccess,
  sendUserInfo,
  sendUserInfoFailed,
  sendUserInfoSuccess,
  setForgotPassword,
  setForgotPasswordFailed,
  setForgotPasswordState,
  setForgotPasswordSuccess,
  setGetUserInfo,
  setGetUserInfoFailed,
  setGetUserInfoSuccess,
  setLogin,
  setLoginFailed,
  setLoginSuccess,
  setLogout,
  setLogoutFailed,
  setLogoutSuccess,
  setRefreshToken,
  setRefreshTokenFailed,
  setRefreshTokenSuccess,
  setResetPassword,
  setResetPasswordFailed,
  setResetPasswordSuccess,
} from "../usersSlice";

export function register(email, name, password) {
  return function (dispatch) {
    dispatch(registrationUser());
    return registerRequest(email, name, password)
      .then((res) => {
        dispatch(registrationUserSuccess(res.accessToken));
        localStorage.setItem("refreshToken", res.refreshToken);
      })
      .catch((err) => dispatch(registrationUserFailed()));
  };
}
export function login(email, password) {
  return function (dispatch) {
    dispatch(setLogin());
    return loginRequest(email, password)
      .then((res) => {
        dispatch(setLoginSuccess(res));
        localStorage.setItem("refreshToken", res.refreshToken);
      })
      .catch((err) => {
        dispatch(setLoginFailed());
        console.log(err);
      });
  };
}
export function logout(refreshToken) {
  return function (dispatch) {
    dispatch(setLogout());
    return refreshTokenRequest(refreshToken)
      .then((res) => {
        localStorage.removeItem("refreshToken");
        dispatch(setLogoutSuccess());
      })
      .catch((err) => {
        dispatch(setLogoutFailed());
      });
  };
}
export function forgotPassword(email) {
  return function (dispatch) {
    dispatch(setForgotPassword());
    return sendEmailRequest(email)
      .then((res) => {
        dispatch(setForgotPasswordSuccess());
        dispatch(setForgotPasswordState(true));
      })
      .catch((err) => dispatch(setForgotPasswordFailed()));
  };
}
export function resetPassword(password, code) {
  return function (dispatch) {
    dispatch(setResetPassword());
    return resetPasswordRequest(password, code)
      .then((res) => {
        dispatch(setResetPasswordSuccess());
        dispatch(setForgotPasswordState(false));
      })
      .catch((err) => dispatch(setResetPasswordFailed()));
  };
}
export function sendUserData(token, name, email, password) {
  return function (dispatch) {
    dispatch(sendUserInfo());
    return sendUserInfoRequest(token, name, email, password)
      .then((res) => {
        dispatch(sendUserInfoSuccess(res.user));
      })
      .catch((err) => {
        if (err === TOKEN_EXPIRED) {
          dispatch(refreshToken(localStorage.getItem("refreshToken")));
        }

        dispatch(sendUserInfoFailed());
      });
  };
}
export function getUserData(token) {
  return function (dispatch) {
    dispatch(setGetUserInfo());
    return getUserDataRequest(token)
      .then((res) => {
        dispatch(setGetUserInfoSuccess(res.user));
      })
      .catch((err) => {
        if (err === TOKEN_EXPIRED || err === UNAUTHORIZED) {
          dispatch(refreshToken(localStorage.getItem("refreshToken")));
        }
        dispatch(setGetUserInfoFailed());
      });
  };
}

export function refreshToken(refreshToken) {
  return function (dispatch) {
    dispatch(setRefreshToken());
    return refreshTokenRequest(refreshToken)
      .then((res) => {
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setRefreshTokenSuccess(res.accessToken));
        return res.accessToken;
      })
      .catch((err) => {
        dispatch(setRefreshTokenFailed());
      });
  };
}
