import type { DialogStore } from "@/stores/dialog-store";
import type { ProfileItem } from "@/types/profile/profile-item";

export type CardDeleteDialogMetadata = {
  item?: ProfileItem;
}

export type CardDeleteDialogStore = DialogStore<CardDeleteDialogMetadata>;
