import type React from "react";
import { useMemo, useRef } from "react";
import type { StoreApi } from "zustand";
import type { CardAddDialogStore } from "../../store/CardAddDialogStore";
import type { CardEditDialogStore } from "../../store/CardEditDialogStore";
import { createDialogStore } from "@/stores/dialog-store";
import { EditProfileViewDialogContext } from "./context";
import type { CardDeleteDialogStore } from "../../store/CardDeleteDialogStore";

type Props = {
  children: React.ReactNode;
};

export default function EditProfileViewDialogContextProvider({ children }: Props) {
  const cardAdd = useRef<StoreApi<CardAddDialogStore>>(
    createDialogStore()
  );

  const cardEdit = useRef<StoreApi<CardEditDialogStore>>(
    createDialogStore()
  );

  const cardDelete = useRef<StoreApi<CardDeleteDialogStore>>(
    createDialogStore()
  );


  const value = useMemo(
    () => ({
      cardAdd: cardAdd.current,
      cardEdit: cardEdit.current,
      cardDelete: cardDelete.current,
    }),
    [cardAdd, cardEdit, cardDelete]
  );

  return (
    <EditProfileViewDialogContext.Provider value={value}>
      {children}
    </EditProfileViewDialogContext.Provider>
  );
}
