import MainLayout from "@/layout/main/MainLayout";
import ProfileView from "@/sections/profile/ProfileView";
import { useParams } from "react-router";

export default function MyProfilePage() {
  const { xAccountId } = useParams();

  return (
    <MainLayout>
      <ProfileView xAccountId={xAccountId ?? ''} />
    </MainLayout>
  );
}
