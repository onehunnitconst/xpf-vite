import { getCookie, removeCookie, setCookie } from "./cookie";

export function setAccessToken(accessToken: string) {
  setCookie("accessToken", accessToken, { expires: 1 });
}

export function setRefreshToken(refreshToken: string) {
  setCookie("refreshToken", refreshToken, { expires: 7 });
}

export function getAccessToken() {
  return getCookie("accessToken");
}

export function getRefreshToken() {
  return getCookie("refreshToken");
}

export function removeAccessToken() {
  removeCookie("accessToken");
}

export function removeRefreshToken() {
  removeCookie("refreshToken");
}

export function isAccessTokenNotFound() {
  const accessToken = getAccessToken();

  return !accessToken;
}

export function isRefreshTokenNotFound() {
  const refreshToken = getRefreshToken();

  return !refreshToken;
}