import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCallback } from "react";
import useCardDetailDialog from "../context/dialog/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { GalleryHorizontalIcon } from "lucide-react";
import type { Profile } from "@/types/profile/profile";
import type { ProfileItem } from "@/types/profile/profile-item";

type Props = {
  profile: Profile;
  profileLoaded: boolean;
  profileNotLoaded: boolean;
}

export default function CardSection({ profile, profileLoaded, profileNotLoaded }: Props) {
  const openDialog = useCardDetailDialog((state) => state.openDialog);

  const handleClickCard = useCallback(
    (ev: React.MouseEvent<HTMLDivElement>, item: ProfileItem) => {
      ev.preventDefault();

      if (profileLoaded) {
        openDialog({ item });
      }
    },
    [openDialog, profileLoaded]
  );

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4 max-w-3xl"></div>
      </div>
      <div className="flex flex-col gap-2 md:px-0 px-4 w-full">
        <p className="text-xl font-bold">나의 카드</p>
        <div className="grid grid-cols-1 md:grid-cols-2 md:w-full gap-4">
          {profileNotLoaded &&
            Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} className="w-full h-32 rounded-lg" />
            ))}
          {profileLoaded && profile?.items?.length === 0 && (
            <p className="text-md text-gray-500">아직 카드가 없습니다.</p>
          )}
          {profileLoaded &&
            profile?.items?.map((item, index) => (
              <div
                key={index}
                className="flex flex-row gap-4 bg-gray-100 rounded-lg p-4 hover:bg-gray-200 hover:cursor-pointer"
                onClick={(ev) => handleClickCard(ev, item)}
              >
                <Avatar className="w-24 h-24 rounded-lg">
                  <AvatarImage src={item.itemImageUrl} />
                  <AvatarFallback className="rounded-lg bg-gray-200">
                    <GalleryHorizontalIcon className="w-6 h-6 text-gray-400" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                  <p className="text-xl font-bold">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.memo}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}