import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestPostWithAuthorization } from "../axios";
import { useMemo } from "react";
import type { AxiosError } from "axios";
import type { Profile } from "@/types/profile/profile";
import type { ProfileItem } from "@/types/profile/profile-item";
import type { AddItem } from "@/types/profile/add-item";

export function useAddItem(
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

  const { mutate: addItem } = useMutation({
    mutationFn: (data: AddItem) =>
      requestPostWithAuthorization(`/profiles/${profileId}/items`, data),
    onSuccess: (data: ProfileItem) => {
      const newItem = data;
      queryClient.setQueryData(["profiles", "me"], (old: Profile) => ({
        ...old,
        items: [...old.items, newItem],
      }));

      onSuccess?.();
    },
    onError: (error: AxiosError) => {
      onError?.(error);
    },
  });

  const memoized = useMemo(
    () => ({
      addItem,
    }),
    [addItem]
  );

  return memoized;
}
