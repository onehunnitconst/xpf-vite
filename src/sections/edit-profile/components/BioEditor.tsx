import { useUpdateProfile } from "@/api/profile/updateProfile";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckIcon, PencilIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

type Props = {
  value: string | null;
  profileId: number;
};

function BioEditorOffMode({
  value,
  onOpenEditMode,
}: {
  value: string | null;
  onOpenEditMode: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2 items-center h-8">
        <p className="text-xl font-bold">자기소개</p>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-gray-200 hover:cursor-pointer rounded-full p-2"
          onClick={onOpenEditMode}
        >
          <PencilIcon className="w-4 h-4 text-gray-500" />
        </Button>
      </div>
      {!!value && value}
      {(!value || value?.length === 0) && (
        <span className="text-md text-gray-500">자기소개가 없습니다.</span>
      )}
    </div>
  );
}

function BioEditorOnMode({
  value,
  onEdit,
}: {
  value: string | null;
  onEdit: (formData: FormData) => void;
}) {
  return (
    <form action={onEdit}>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 items-center h-8">
          <p className="text-xl font-bold">자기소개</p>
          <Button
            variant="ghost"
            size="icon"
            type="submit"
            className="hover:bg-gray-200 hover:cursor-pointer rounded-full p-2"
          >
            <CheckIcon className="w-4 h-4 text-green-600" />
          </Button>
        </div>
        <Textarea
          id="bio"
          name="bio"
          placeholder="자기소개"
          className="w-full h-24 p-2 md:text-md"
          defaultValue={value ?? ""}
        />
      </div>
    </form>
  );
}

export default function BioEditor({ value, profileId }: Props) {
  const { updateProfile } = useUpdateProfile(profileId, {
    onSuccess: () => {
      setEditModeOn(false);
      toast.success("자기소개 변경이 완료되었습니다.");
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
      const bio = formData.get("bio");

      if (bio) {
        updateProfile({ bio: bio.toString() });
      }
    },
    [updateProfile]
  );

  return (
    <>
      {!editModeOn && (
        <BioEditorOffMode value={value} onOpenEditMode={onOpenEditMode} />
      )}
      {editModeOn && <BioEditorOnMode value={value} onEdit={onEdit} />}
    </>
  );
}
