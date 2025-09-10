import { getAccessToken } from "@/utils/token-manager";
import axios, { type AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const fetcher = (url: string, options?: AxiosRequestConfig) =>
  axiosInstance.get(url, options).then((res) => res.data);

export const fetcherWithAuthorization = (
  url: string,
  options?: AxiosRequestConfig
) =>
  axiosInstance
    .get(url, {
      ...options,
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    })
    .then((res) => res.data);

export const requestPost = <T>(
  url: string,
  data: T,
  options?: AxiosRequestConfig
) => axiosInstance.post(url, data, options).then((res) => res.data);

export const requestPostWithAuthorization = <T>(
  url: string,
  data: T,
  options?: AxiosRequestConfig
) =>
  axiosInstance
    .post(url, data, {
      ...options,
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    })
    .then((res) => res.data);

export const requestPut = <T>(
  url: string,
  data: T,
  options?: AxiosRequestConfig
) => axiosInstance.put(url, data, options).then((res) => res.data);

export const requestPutWithAuthorization = <T>(
  url: string,
  data: T,
  options?: AxiosRequestConfig
) =>
  axiosInstance
    .put(url, data, {
      ...options,
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    })
    .then((res) => res.data);

export const requestPatch = <T>(
  url: string,
  data: T,
  options?: AxiosRequestConfig
) => axiosInstance.patch(url, data, options).then((res) => res.data);

export const requestPatchWithAuthorization = <T>(
  url: string,
  data: T,
  options?: AxiosRequestConfig
) =>
  axiosInstance
    .patch(url, data, {
      ...options,
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    })
    .then((res) => res.data);

export const requestDelete = (url: string, options?: AxiosRequestConfig) =>
  axiosInstance.delete(url, options).then((res) => res.data);

export const requestDeleteWithAuthorization = (
  url: string,
  options?: AxiosRequestConfig
) =>
  axiosInstance
    .delete(url, {
      ...options,
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    })
    .then((res) => res.data);
