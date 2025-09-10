import type { DialogStore } from "@/stores/dialog-store";
import type { ProfileItem } from "@/types/profile/profile-item";

export type CardDetailDialogMetadata = {
  item: ProfileItem;
};

export type CardDetailDialogStore = DialogStore<CardDetailDialogMetadata>;
