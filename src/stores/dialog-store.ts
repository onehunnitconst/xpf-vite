import { createStore } from "zustand";

type State<T> = {
  open: boolean;
  metadata: T | null;
};

type Actions<T> = {
  openDialog: (metadata?: T) => void;
  closeDialog: () => void;
};

export type DialogStore<T> = State<T> & Actions<T>;

export const createDialogStore = <T = never>() =>
  createStore<DialogStore<T>>()((set) => ({
    open: false,
    metadata: null,
    openDialog: (metadata?: T) =>
      set({ open: true, metadata: metadata ?? null }),
    closeDialog: () => set({ open: false, metadata: null }),
  }));
