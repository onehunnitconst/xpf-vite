import type { ProfileItem } from "./profile-item";

export type Profile = {
  id: number;
  nickname: string;
  profileImage: string;
  xAccountId: string;
  bio: string;
  items: ProfileItem[];
}