import { uploadProfileImage } from "@/api/image/uploadProfileImage";
import { useUpdateProfile } from "@/api/profile/updateProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CameraIcon, UserIcon } from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";

type Props = {
  profileId: number;
  profileImage: string;
};

export default function ProfileImageEditor({ profileId, profileImage }: Props) {
  const { updateProfile } = useUpdateProfile(profileId, {
    onSuccess: () => {
      toast.success("프로필 이미지 변경이 완료되었습니다.");
    },
    onError: (error) => {
      const response = error.response?.data as { message: string };
      toast.error(response.message);
    },
  });

  const handleChangeProfileImage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const file = event.target.files?.[0];

      if (file) {
        if (!["image/jpeg", "image/png"].includes(file.type)) {
          toast.error("프로필 이미지는 JPEG 또는 PNG 파일이어야 합니다.");
          return;
        }

        if (file.size > 1024 * 1024 * 1) {
          toast.error("프로필 이미지의 크기는 1MB 이하여야 합니다.");
          return;
        }

        uploadProfileImage(file)
          .then((response: { location: string }) => {
            updateProfile({ profileImage: response.location });
          })
          .catch((error) => {
            const response = error.response?.data as { message: string };
            toast.error(response.message);
          });
      }
    },
    [updateProfile]
  );

  return (
    <div className="relative w-28 h-28 z-2">
      <Avatar className="w-full h-full rounded-lg border-2">
        <AvatarImage src={profileImage} className="object-cover" />
        <AvatarFallback className="rounded-none">
          <UserIcon className="w-6 h-6 text-gray-400" />
        </AvatarFallback>
      </Avatar>
      <input
        id="profile-image-input"
        type="file"
        accept="image/*"
        onChange={handleChangeProfileImage}
        className="hidden"
      />
      <label htmlFor="profile-image-input">
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray-800/75 hover:bg-gray-800/85 rounded-full p-2 hover:cursor-pointer z-13">
          <CameraIcon className="w-6 h-6 text-gray-100" />
        </div>
      </label>
    </div>
  );
}
