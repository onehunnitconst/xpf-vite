import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestDeleteWithAuthorization } from "../axios";
import { useMemo } from "react";
import type { AxiosError } from "axios";
import type { Profile } from "@/types/profile/profile";

export function useDeleteItem(
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

  const { mutate: deleteItem } = useMutation({
    mutationFn: (variables: { itemId: number }) =>
      requestDeleteWithAuthorization(
        `/profiles/${profileId}/items/${variables.itemId}`
      ),
    onSuccess: (_, variables) => {
      queryClient.setQueryData(["profiles", "me"], (old: Profile) => ({
        ...old,
        items: old.items.filter((item) => item.id !== variables.itemId),
      }));

      onSuccess?.();
    },
    onError: (error: AxiosError) => {
      onError?.(error);
    },
  });

  const memoized = useMemo(
    () => ({
      deleteItem,
    }),
    [deleteItem]
  );

  return memoized;
}
