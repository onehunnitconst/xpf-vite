import { createStore } from "zustand";

type State<T> = {
  open: boolean;
  metadata: T | null;
}

type Actions<T> = {
  openDialog: (metadata: T) => void;
  closeDialog: () => void;
}

export type DialogStore<T> = State<T> & Actions<T>;

export const createDialogStore = <T>(initialState: State<T>) => createStore<DialogStore<T>>()((set) => ({
  ...initialState,
  openDialog: (metadata: T) => set({ open: true, metadata }),
  closeDialog: () =>   set({ open: false, metadata: null }),
}));