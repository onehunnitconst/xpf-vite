import { useUpdateProfile } from "@/api/profile/updateProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckIcon, PencilIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

type Props = {
  value: string | null;
  profileId: number;
};

function NicknameEditorOffMode({
  value,
  onOpenEditMode,
}: {
  value: string | null;
  onOpenEditMode: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <div className="flex flex-row gap-2 items-center my-1">
      <p className="text-2xl font-bold text-center">
        {!!value && value}
        {!value && <Skeleton className="w-28 h-7 rounded-lg" />}
      </p>
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-gray-200 hover:cursor-pointer rounded-full p-2"
        onClick={onOpenEditMode}
      >
        <PencilIcon className="w-3 h-3 text-gray-500" />
      </Button>
    </div>
  );
}

function NicknameEditorOnMode({
  value,
  onEdit,
}: {
  value: string | null;
  onEdit: (formData: FormData) => void;
}) {
  return (
    <form action={onEdit}>
      <div className="flex flex-row gap-2 items-center">
        <Input
          id="nickname"
          name="nickname"
          placeholder="닉네임"
          defaultValue={value ?? ""}
          className="border-none focus-visible:border-none shadow-none font-bold text-2xl placeholder:text-2xl md:text-2xl w-24 md:w-36 md:h-10 mt-1 mb-0.5"
        />
        <Button
          variant="ghost"
          size="icon"
          type="submit"
          className="hover:bg-gray-200 hover:cursor-pointer rounded-full p-2"
        >
          <CheckIcon className="w-4 h-4 text-green-600" />
        </Button>
      </div>
    </form>
  );
}

export default function NicknameEditor({ value, profileId }: Props) {
  const { updateProfile } = useUpdateProfile(profileId, {
    onSuccess: () => {
      setEditModeOn(false);
      toast.success("닉네임 변경이 완료되었습니다.");
    },
    onError: (error) => {
      const response = error.response?.data as { message: string };
      toast.error(response.message);
    },
  });

  const [editModeOn, setEditModeOn] = useState(false);

  const onOpenEditMode = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setEditModeOn(true);
    },
    [setEditModeOn]
  );

  const onEdit = useCallback(
    (formData: FormData) => {
      const nickname = formData.get("nickname");

      if (!nickname || nickname?.toString().length === 0) {
        toast.error("닉네임을 입력해주세요.");
        return;
      }

      if (nickname) {
        updateProfile({ nickname: nickname.toString() });
      }
    },
    [updateProfile]
  );

  return (
    <>
      {!editModeOn && (
        <NicknameEditorOffMode value={value} onOpenEditMode={onOpenEditMode} />
      )}
      {editModeOn && <NicknameEditorOnMode value={value} onEdit={onEdit} />}
    </>
  );
}
