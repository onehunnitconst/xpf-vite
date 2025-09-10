import Cookies from "js-cookie";

export function setCookie(name: string, value: string, options: Cookies.CookieAttributes) {
  Cookies.set(name, value, {
    ...options,
    secure: process.env.NODE_ENV === "production",
  });
}

export function getCookie(name: string) {
  return Cookies.get(name);
}

export function removeCookie(name: string) {
  Cookies.remove(name);
}
