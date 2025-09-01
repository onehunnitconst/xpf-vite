import BasicProfileSection from "./sub-section/BasicProfileSection";
import CardSection from "./sub-section/CardSection";
import ProfileViewDialogContextProvider from "./context/dialog/provider";
import CardDetailDialog from "./dialog/CardDetailDialog";

export default function EditProfileView() {
  return (
    <ProfileViewDialogContextProvider>
      <CardDetailDialog />
      <div className="flex flex-col max-w-3xl">
        <BasicProfileSection />
        <CardSection />
      </div>
    </ProfileViewDialogContextProvider>
  );
}
