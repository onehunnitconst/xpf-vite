import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestPatchWithAuthorization } from "../axios";
import { useMemo } from "react";
import type { AxiosError } from "axios";
import type { Profile } from "@/types/profile/profile";
import type { ProfileItem } from "@/types/profile/profile-item";
import type { UpdateItem } from "@/types/profile/update-item";

export function useUpdateItem(
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

  const { mutate: updateItem } = useMutation({
    mutationFn: (variables: { itemId: number; data: UpdateItem }) =>
      requestPatchWithAuthorization(
        `/profiles/${profileId}/items/${variables.itemId}`,
        variables.data
      ),
    onSuccess: (data: ProfileItem) => {
      queryClient.setQueryData(["profiles", "me"], (old: Profile) => {

        return {
          ...old,
          items: old.items.map((item) =>
            item.id === data.id ? data : item
          ),
        };
      });

      onSuccess?.();
    },
    onError: (error: AxiosError) => {
      onError?.(error);
    },
  });

  const memoized = useMemo(
    () => ({
      updateItem,
    }),
    [updateItem]
  );

  return memoized;
}
