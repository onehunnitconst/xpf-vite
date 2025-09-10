import type { Profile } from "@/types/profile/profile";
import NicknameEditor from "../components/NicknameEditor";
import BioEditor from "../components/BioEditor";
import XAccountIdEditor from "../components/XAccountIdEditor";
import ProfileImageEditor from "../components/ProfileImageEditor";
import HeaderImageEditor from "../components/HeaderImageEditor";

type Props = {
  profile: Profile;
  profileLoaded: boolean;
  profileNotLoaded: boolean;
};

export default function BasicProfileSection({ profile }: Props) {
  return (
    <div className="flex flex-col w-full">
      <HeaderImageEditor
        profileId={profile?.id}
        headerImage={profile?.headerImage}
      />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 items-center mt-[-7.5%] px-10">
          <ProfileImageEditor
            profileId={profile?.id}
            profileImage={profile?.profileImage}
          />
          <div className="flex flex-col items-center">
            <NicknameEditor value={profile?.nickname} profileId={profile?.id} />
            <XAccountIdEditor
              value={profile?.xAccountId}
              profileId={profile?.id}
            />
          </div>
        </div>
        <div className="md:px-0 px-4">
          <BioEditor value={profile?.bio} profileId={profile?.id} />
        </div>
      </div>
    </div>
  );
}
