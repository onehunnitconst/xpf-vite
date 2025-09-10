import { useUpdateProfile } from "@/api/profile/updateProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckIcon, PencilIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

type Props = {
  value: string | null;
  profileId: number;
};

function XAccountIdEditorOffMode({
  value,
  onOpenEditMode,
}: {
  value: string | null;
  onOpenEditMode: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <div className="flex flex-row gap-1 items-center">
      <div className="px-2 py-1 w-fit rounded-lg bg-gray-100 hover:bg-gray-200">
        <p className="text-sm text-gray-500 ">@{value ?? "..."}</p>
      </div>
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

function XAccountIdEditorOnMode({
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
          id="xAccountId"
          name="xAccountId"
          placeholder="닉네임"
          defaultValue={value ?? ""}
          className="rounded-lg bg-gray-100 hover:bg-gray-200"
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

export default function XAccountIdEditor({ value, profileId }: Props) {
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
      const xAccountId = formData.get("xAccountId");

      if (!xAccountId || xAccountId?.toString().length === 0) {
        toast.error("X 계정을 입력해주세요.");
        return;
      }

      if (xAccountId) {
        updateProfile({ xAccountId: xAccountId.toString() });
      }
    },
    [updateProfile]
  );

  return (
    <>
      {!editModeOn && (
        <XAccountIdEditorOffMode
          value={value}
          onOpenEditMode={onOpenEditMode}
        />
      )}
      {editModeOn && <XAccountIdEditorOnMode value={value} onEdit={onEdit} />}
    </>
  );
}
