import type { StoreApi } from "zustand";
import type { CardAddDialogStore } from "../../store/CardAddDialogStore";
import type { CardEditDialogStore } from "../../store/CardEditDialogStore";
import { createContext } from "react";
import type { CardDeleteDialogStore } from "../../store/CardDeleteDialogStore";

type ContextType = {
  cardAdd: StoreApi<CardAddDialogStore>;
  cardEdit: StoreApi<CardEditDialogStore>;
  cardDelete: StoreApi<CardDeleteDialogStore>;
};

export const EditProfileViewDialogContext = createContext({} as ContextType);
