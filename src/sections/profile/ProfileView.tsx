import BasicProfileSection from "./sub-section/BasicProfileSection";
import CardSection from "./sub-section/CardSection";
import ProfileViewDialogContextProvider from "./context/dialog/provider";
import CardDetailDialog from "./dialog/CardDetailDialog";
import { useGetProfileByXAccountId } from "@/api/profile/getProfileByXAccountId";
import { ArrowLeftIcon } from "lucide-react";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { paths } from "@/paths";

type Props = {
  xAccountId: string;
};

export default function ProfileView({ xAccountId }: Props) {
  const navigate = useNavigate();

  const { profile, profileLoaded, profileNotLoaded } =
    useGetProfileByXAccountId(xAccountId);

  const handleBackButtonClick = useCallback(() => {
    navigate(paths.home);
  }, [navigate]);

  return (
    <ProfileViewDialogContextProvider>
      <CardDetailDialog />
      <div className="flex flex-col w-full relative">
        <div
          className="absolute flex items-center justify-center top-4 left-4 hover:cursor-pointer hover:bg-gray-500 z-50 bg-gray-400 rounded-full p-2"
          onClick={handleBackButtonClick}
        >
          <ArrowLeftIcon className="w-4 h-4 text-white" />
        </div>
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
