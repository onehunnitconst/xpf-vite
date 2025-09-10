import BasicProfileSection from "./sub-section/BasicProfileSection";
import CardSection from "./sub-section/CardSection";
import EditProfileViewDialogContextProvider from "./context/dialog/provider";
import { useGetMyProfile } from "@/api/profile/getMyProfile";
import { useEffect } from "react";
import CardAddDialog from "./dialog/CardAddDialog";
import CardEditDialog from "./dialog/CardEditDialog";
import CardDeleteDialog from "./dialog/CardDeleteDialog";

export default function EditProfileView() {
  const { profile, profileLoaded, profileNotLoaded } = useGetMyProfile();

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  return (
    <EditProfileViewDialogContextProvider>
      <CardAddDialog profileId={profile?.id} />
      <CardEditDialog profileId={profile?.id} />
      <CardDeleteDialog profileId={profile?.id} />
      <div className="flex flex-col w-full mb-12">
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
    </EditProfileViewDialogContextProvider>
  );
}
