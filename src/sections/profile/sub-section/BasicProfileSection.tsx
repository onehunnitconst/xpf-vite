import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import type { Profile } from "@/types/profile/profile";
import { GalleryVertical, UserIcon } from "lucide-react";
import { useCallback } from "react";

type Props = {
  profile: Profile;
  profileLoaded: boolean;
  profileNotLoaded: boolean;
}

export default function BasicProfileSection({ profile, profileLoaded, profileNotLoaded }: Props) {
  const handleClickAccount = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (profileLoaded) {
        window.open(`https://x.com/${profile.xAccountId}`, "_blank");
      }
    },
    [profile, profileLoaded]
  );

  return (
    <div className="flex flex-col w-full">
      <Avatar className="w-full h-48 rounded-none z-1">
        <AvatarImage src="" />
        <AvatarFallback className="rounded-none bg-gray-100">
          <GalleryVertical className="w-6 h-6 text-gray-400" />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 items-center sm:mt-[-7.5%] mt-[-10.0%] px-10 z-10">
          <Avatar className="w-28 h-28 rounded-lg border-2">
            <AvatarImage src={profile?.profileImage} />
            <AvatarFallback className="rounded-lg bg-gray-200">
              <UserIcon className="w-6 h-6 text-gray-400" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1 items-center">
            <p className="text-2xl font-bold text-center">
              {profileLoaded && profile.nickname}
              {profileNotLoaded && <Skeleton className="w-28 h-7 rounded-lg" />}
            </p>
            <div className="px-2 py-1 w-fit rounded-lg bg-gray-100 hover:bg-gray-200 hover:cursor-pointer">
              <p
                className="text-sm text-gray-500 "
                onClick={handleClickAccount}
              >
                {profileLoaded && `@${profile.xAccountId}`}
                {profileNotLoaded && (
                  <Skeleton className="w-28 h-7 rounded-lg" />
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:px-0 px-4">
          <p className="text-xl font-bold">자기소개</p>
          <p className="text-md whitespace-pre-wrap">
            {profileLoaded && profile.bio}
            {profileLoaded && profile.bio.length === 0 && <span className="text-md text-gray-500">자기소개가 없습니다.</span>}
            {profileNotLoaded && (
              <div className="flex flex-col gap-1">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="w-full h-6 rounded-lg" />
                ))}
                <Skeleton className="w-[50%] h-6 rounded-lg" />
              </div>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
