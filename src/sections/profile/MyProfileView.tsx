import BasicProfileSection from "./sub-section/BasicProfileSection";
import CardSection from "./sub-section/CardSection";
import ProfileViewDialogContextProvider from "./context/dialog/provider";
import CardDetailDialog from "./dialog/CardDetailDialog";
import { useGetMyProfile } from "@/api/profile/getMyProfile";

export default function MyProfileView() {
    const { profile, profileLoaded, profileNotLoaded } = useGetMyProfile();
    
    


  return (
    <ProfileViewDialogContextProvider>
      <CardDetailDialog />
      <div className="flex flex-col w-full relative">

        <BasicProfileSection
          profile={profile}
          profileLoaded={profileLoaded}
          profileNotLoaded={profileNotLoaded}
        />
        <CardSection
          profile={profile}
          profileLoaded={profileLoaded}
          profileNotLoaded={profileNotLoaded}
        />
      </div>
    </ProfileViewDialogContextProvider>
  );
}
