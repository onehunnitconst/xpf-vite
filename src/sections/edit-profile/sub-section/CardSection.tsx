import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Edit2Icon,
  GalleryHorizontalIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import type { Profile } from "@/types/profile/profile";
import { Button } from "@/components/ui/button";
import {
  useCardEditDialog,
  useCardAddDialog,
  useCardDeleteDialog,
} from "../context/dialog/hooks";
import type { ProfileItem } from "@/types/profile/profile-item";
import { toast } from "sonner";

type Props = {
  profile: Profile;
  profileLoaded: boolean;
  profileNotLoaded: boolean;
};

export default function CardSection({
  profile,
  profileLoaded,
  profileNotLoaded,
}: Props) {
  const openAddDialog = useCardAddDialog((state) => state.openDialog);

  const openEditDialog = useCardEditDialog((state) => state.openDialog);

  const openDeleteDialog = useCardDeleteDialog((state) => state.openDialog);

  const handleCardAddButton = useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>) => {
      ev.preventDefault();
      
      if (profile?.items?.length >= 10) {
        toast.error("카드는 최대 10개까지 추가할 수 있습니다.");
        return;
      }
      openAddDialog();
    },
    [openAddDialog, profile]
  );

  const handleCardEditButton = useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>, item: ProfileItem) => {
      ev.preventDefault();
      openEditDialog({ item });
    },
    [openEditDialog]
  );

  const handleCardRemoveButton = useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>, item: ProfileItem) => {
      ev.preventDefault();
      openDeleteDialog({ item });
    },
    [openDeleteDialog]
  );

  return (
    <>
      <div className="flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4 max-w-3xl"></div>
        </div>
        <div className="flex flex-col gap-2 md:px-0 px-4 w-full">
          <div className="flex flex-row gap-2 items-center">
            <p className="text-xl font-bold">나의 카드</p>
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-gray-200 hover:cursor-pointer rounded-full p-2"
              onClick={handleCardAddButton}
            >
              <PlusIcon className="w-4 h-4 text-gray-600" />
            </Button>
          </div>
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
                  className="relative bg-gray-100 rounded-lg p-4"
                >
                  <div className="flex flex-row absolute bottom-2 right-2 z-3">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="hover:bg-gray-200 hover:cursor-pointer rounded-full p-2"
                      onClick={(ev) => handleCardEditButton(ev, item)}
                    >
                      <Edit2Icon className="w-4 h-4 text-gray-600" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="hover:bg-gray-200 hover:cursor-pointer rounded-full p-2"
                      onClick={(ev) => handleCardRemoveButton(ev, item)}
                    >
                      <TrashIcon className="w-4 h-4 text-gray-600" />
                    </Button>
                  </div>
                  <div className="flex flex-row gap-4">
                    <Avatar className="w-24 h-24 rounded-lg">
                      <AvatarImage src={item.itemImageUrl} />
                      <AvatarFallback className="rounded-lg bg-gray-200">
                        <GalleryHorizontalIcon className="w-6 h-6 text-gray-400" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2">
                      <p className="text-xl font-bold">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.summary}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
