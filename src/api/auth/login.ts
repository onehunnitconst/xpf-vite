import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../axios";
import type { LoginRequest } from "@/types/auth/login";
import { useMemo } from "react";
import type { AxiosError } from "axios";
import { setAccessToken, setRefreshToken } from "@/utils/token-manager";


export function useLogin({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: AxiosError) => void;
}) {
  const { mutate: login } = useMutation({
    mutationFn: (data: LoginRequest) =>
      axiosInstance.post("/authentication/login", data),
    onSuccess(response) {
      const { accessToken, refreshToken } = response.data;

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      onSuccess();
    },
    onError(error: AxiosError) {
      onError(error);
    },
  });

  const memoized = useMemo(
    () => ({
      login,
    }),
    [login]
  );

  return memoized;
}