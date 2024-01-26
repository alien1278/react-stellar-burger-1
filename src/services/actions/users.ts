import { AppDispatch } from "./../store";
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

export function register(email: string, name: string, password: string) {
  return function (dispatch: AppDispatch) {
    dispatch(registrationUser());
    return registerRequest(email, name, password)
      .then((res) => {
        dispatch(registrationUserSuccess(res.accessToken));
        localStorage.setItem("refreshToken", res.refreshToken);
      })
      .catch((err) => dispatch(registrationUserFailed()));
  };
}
export function login(email: string, password: string) {
  return function (dispatch: AppDispatch) {
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
export function logout(refreshToken: string | null) {
  return function (dispatch: AppDispatch) {
    dispatch(setLogout());

    // Проверка перед вызовом функции
    if (refreshToken) {
      return refreshTokenRequest(refreshToken)
        .then((res) => {
          localStorage.removeItem("refreshToken");
          dispatch(setLogoutSuccess());
        })
        .catch((err) => {
          dispatch(setLogoutFailed());
        });
    } else {
      dispatch(setLogoutFailed());
    }
  };
}

export function forgotPassword(email: string) {
  return function (dispatch: AppDispatch) {
    dispatch(setForgotPassword());
    return sendEmailRequest(email)
      .then((res) => {
        dispatch(setForgotPasswordSuccess());
        dispatch(setForgotPasswordState(true));
      })
      .catch((err) => dispatch(setForgotPasswordFailed()));
  };
}
export function resetPassword(password: string, code: string) {
  return function (dispatch: AppDispatch) {
    dispatch(setResetPassword());
    return resetPasswordRequest(password, code)
      .then((res) => {
        dispatch(setResetPasswordSuccess());
        dispatch(setForgotPasswordState(false));
      })
      .catch((err) => dispatch(setResetPasswordFailed()));
  };
}
export function sendUserData(
  token: string | null,
  name: string,
  email: string,
  password: string
) {
  return function (dispatch: AppDispatch) {
    dispatch(sendUserInfo());
    if (token) {
      return sendUserInfoRequest(token, name, email, password)
        .then((res) => {
          dispatch(sendUserInfoSuccess(res.user));
        })
        .catch((err) => {
          const tokenFromStorage = localStorage.getItem("refreshToken");
          if (tokenFromStorage) {
            dispatch(refreshToken(tokenFromStorage));
          } else {
            dispatch(sendUserInfoFailed());
          }
        });
    }
  };
}
export function getUserData(token: string) {
  return function (dispatch: AppDispatch) {
    dispatch(setGetUserInfo());
    return getUserDataRequest(token)
      .then((res) => {
        dispatch(setGetUserInfoSuccess(res.user));
      })
      .catch((err) => {
        const tokenFromStorage = localStorage.getItem("refreshToken");
        if (tokenFromStorage) {
          dispatch(refreshToken(tokenFromStorage));
        } else {
          dispatch(setGetUserInfoFailed());
        }
      });
  };
}

export function refreshToken(refreshToken: string) {
  return function (dispatch: AppDispatch) {
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
