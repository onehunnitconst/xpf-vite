const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";


export function setAccessToken(accessToken: string) {
  sessionStorage.setItem(ACCESS_TOKEN, accessToken);
}

export function setRefreshToken(refreshToken: string) {
  sessionStorage.setItem(REFRESH_TOKEN, refreshToken);
}

export function getAccessToken() {
  return sessionStorage.getItem(ACCESS_TOKEN);
}

export function getRefreshToken() {
  return sessionStorage.getItem(REFRESH_TOKEN);
}

export function removeAccessToken() {
  sessionStorage.removeItem(ACCESS_TOKEN);
}

export function removeRefreshToken() {
  sessionStorage.removeItem(REFRESH_TOKEN);
}

export function isAccessTokenNotFound() {
  const accessToken = getAccessToken();

  return !accessToken;
}

export function isRefreshTokenNotFound() {
  const refreshToken = getRefreshToken();

  return !refreshToken;
}