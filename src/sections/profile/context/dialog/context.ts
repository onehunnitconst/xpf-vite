import type { StoreApi } from "zustand";
import type { CardDetailDialogStore } from "../../store/CardDetailDialogStore";
import { createContext } from "react";

type ContextType = {
  cardDetail: StoreApi<CardDetailDialogStore>;
};

export const ProfileViewDialogContext = createContext({} as ContextType);
