import { uploadHeaderImage } from "@/api/image/uploadProfileImage";
import { useUpdateProfile } from "@/api/profile/updateProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CameraIcon, GalleryVertical, XIcon } from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";

type Props = {
  profileId: number;
  headerImage: string;
};

export default function HeaderImageEditor({ profileId, headerImage }: Props) {
  const { updateProfile } = useUpdateProfile(profileId, {
    onSuccess: () => {
      toast.success("프로필 이미지 변경이 완료되었습니다.");
    },
    onError: (error) => {
      const response = error.response?.data as { message: string };
      toast.error(response.message);
    },
  });

  const handleChangeHeaderImage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const file = event.target.files?.[0];

      if (file) {
        if (!["image/jpeg", "image/png"].includes(file.type)) {
          toast.error("프로필 이미지는 JPEG 또는 PNG 파일이어야 합니다.");
          return;
        }

        if (file.size > 1024 * 1024 * 3) {
          toast.error("프로필 이미지의 크기는 3MB 이하여야 합니다.");
          return;
        }

        uploadHeaderImage(file)
          .then((response: { location: string }) => {
            updateProfile({ headerImage: response.location });
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
    <div className="relative">
      <Avatar className="w-full h-48 rounded-none z-1">
        <AvatarImage src={headerImage} className="object-cover" />
        <AvatarFallback className="rounded-none bg-gray-100">
          <GalleryVertical className="w-6 h-6 text-gray-400" />
        </AvatarFallback>
      </Avatar>
      <div className="absolute bottom-2 right-2 flex flex-row gap-2 z-3">
        <input
          id="header-image-input"
          type="file"
          accept="image/*"
          onChange={handleChangeHeaderImage}
          className="hidden"
        />
        <label htmlFor="header-image-input">
          <div className="bg-gray-800/65 hover:bg-gray-800/85 rounded-full p-2 hover:cursor-pointer">
            <CameraIcon className="w-6 h-6 text-gray-100" />
          </div>
        </label>
        <div className="bg-gray-800/65 hover:bg-gray-800/85 rounded-full p-2 hover:cursor-pointer">
          <XIcon className="w-6 h-6 text-gray-100" />
        </div>
      </div>
    </div>
  );
}
