import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestPatchWithAuthorization } from "../axios";
import type { UpdateProfileRequest } from "@/types/profile/update-profile";
import { useMemo } from "react";
import type { AxiosError } from "axios";
import type { Profile } from "@/types/profile/profile";

export function useUpdateProfile(
  profileId: number,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: () => void;
    onError?: (error: AxiosError) => void;
  }
) {
  const queryClient = useQueryClient();

  const { mutate: updateProfile } = useMutation({
    mutationFn: (data: UpdateProfileRequest) =>
      requestPatchWithAuthorization(`/profiles/${profileId}`, data),
    onSuccess: (_, variables) => {
      queryClient.setQueryData(["profiles", "me"], (old: Profile) => ({
        ...old,
        ...(variables.nickname && { nickname: variables.nickname }),
        ...(variables.profileImage && { profileImage: variables.profileImage }),
        ...(variables.xAccountId && { xAccountId: variables.xAccountId }),
        ...(variables.bio && { bio: variables.bio }),
      }));
      onSuccess?.();
    },
    onError: (error: AxiosError) => {
      onError?.(error);
    },
  });

  const memoized = useMemo(
    () => ({
      updateProfile,
    }),
    [updateProfile]
  );

  return memoized;
}
