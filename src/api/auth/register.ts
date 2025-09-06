import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../axios";
import type { RegisterRequest } from "@/types/auth/register";
import { useMemo } from "react";
import type { AxiosError } from "axios";

export function useRegister({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: AxiosError) => void;
}) {
  const { mutate: register } = useMutation({
    mutationFn: (data: RegisterRequest) =>
      axiosInstance.post("/authentication/register", data),
    onSuccess() {
      onSuccess();
    },
    onError(error: AxiosError) {
      onError(error);
    },
  });

  const memoized = useMemo(
    () => ({
      register,
    }),
    [register]
  );

  return memoized;
}