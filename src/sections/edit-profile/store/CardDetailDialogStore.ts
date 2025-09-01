import type { DialogStore } from "@/stores/dialog-store";

export type CardDetailDialogMetadata = {
  cardId: string;
};

export type CardDetailDialogStore = DialogStore<CardDetailDialogMetadata>;
