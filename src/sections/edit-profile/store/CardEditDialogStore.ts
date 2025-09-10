import type { DialogStore } from "@/stores/dialog-store";
import type { ProfileItem } from "@/types/profile/profile-item";

export type CardEditDialogMetadata = {
  item?: ProfileItem;
}

export type CardEditDialogStore = DialogStore<CardEditDialogMetadata>;
