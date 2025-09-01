import type React from "react";
import { useMemo, useRef } from "react";
import type { StoreApi } from "zustand";
import type {
  CardDetailDialogMetadata,
  CardDetailDialogStore,
} from "../../store/CardDetailDialogStore";
import { createDialogStore } from "@/stores/dialog-store";
import { ProfileViewDialogContext } from "./context";

type Props = {
  children: React.ReactNode;
};

export default function ProfileViewDialogContextProvider({ children }: Props) {
  const cardDetail = useRef<StoreApi<CardDetailDialogStore>>(
    createDialogStore<CardDetailDialogMetadata>({
      open: false,
      metadata: null,
    })
  );

  const value = useMemo(
    () => ({
      cardDetail: cardDetail.current,
    }),
    [cardDetail]
  );

  return (
    <ProfileViewDialogContext.Provider value={value}>
      {children}
    </ProfileViewDialogContext.Provider>
  );
}
