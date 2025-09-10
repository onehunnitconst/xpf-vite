import type { ProfileItem } from "./profile-item";

export type Profile = {
  id: number;
  nickname: string;
  profileImage: string;
  headerImage: string;
  xAccountId: string;
  bio: string;
  items: ProfileItem[];
}