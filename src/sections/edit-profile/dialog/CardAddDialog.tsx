import { useAddItem } from "@/api/profile/addItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CameraIcon } from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";
import { useCardAddDialog } from "../context/dialog/hooks";
import { useForm } from "react-hook-form";
import { uploadItemImage } from "@/api/image/uploadProfileImage";

export default function CardAddDialog({ profileId }: { profileId: number }) {
  const { handleSubmit, setValue, watch } = useForm<{
    title: string;
    summary: string;
    memo: string;
    itemImageUrl: string;
  }>();

  const { itemImageUrl } = watch();

  const open = useCardAddDialog((state) => state.open);
  const closeDialog = useCardAddDialog((state) => state.closeDialog);

  const { addItem } = useAddItem(profileId, {
    onSuccess: () => {
      toast.success("카드가 추가되었습니다.");
      closeDialog();
    },
    onError: (error) => {
      const response = error.response?.data as { message: string };
      toast.error(response.message);
    },
  });

  const handleChangeImage = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
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

        try {
          const response = await uploadItemImage(file);
          setValue("itemImageUrl", response.location);
        } catch (error: unknown) {
          const err = error as { response?: { data: { message: string } } };
          toast.error(err.response?.data.message);
          return;
        }
      }
    },
    [setValue]
  );

  const handleSubmitItem = handleSubmit(async (data) => {
    if (!data.title || !data.summary || !data.memo) {
      toast.error("모든 필드를 입력해주세요.");
      return;
    }

    addItem({
      ...data,
    });
  });

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) {
        closeDialog();
      }
    },
    [closeDialog]
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <form onSubmit={handleSubmitItem}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>카드 추가하기</DialogTitle>
            <DialogDescription>
              카드를 추가하여 나의 관심사를 공유하세요!
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row h-27 items-center gap-2">
                <div className="relative w-27 h-27">
                  <Avatar className="w-full h-full rounded-lg border-1">
                    <AvatarImage
                      src={itemImageUrl ?? ""}
                      className="w-full h-full object-cover"
                    />
                    <AvatarFallback className="w-full h-full bg-transparent" />
                  </Avatar>
                  <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-row gap-2 z-3">
                    <input
                      id="card-image-input"
                      type="file"
                      accept="image/*"
                      onChange={handleChangeImage}
                      className="hidden"
                    />
                    <label htmlFor="card-image-input">
                      <div className="bg-gray-800/65 hover:bg-gray-800/85 rounded-full p-2 hover:cursor-pointer">
                        <CameraIcon className="w-3 h-3 text-gray-100" />
                      </div>
                    </label>
                  </div>
                </div>
                <div className="flex flex-col justify-between flex-1 h-full">
                  <Input
                    type="text"
                    placeholder="관심사 이름"
                    name="title"
                    onChange={(e) => setValue("title", e.target.value)}
                  />
                  <Textarea
                    className="resize-none"
                    placeholder="관심사 요약"
                    name="summary"
                    rows={2}
                    onChange={(e) => setValue("summary", e.target.value)}
                  />
                </div>
              </div>
              <Textarea
                placeholder="관심사에 대한 내용을 적어주세요!"
                name="memo"
                onChange={(e) => setValue("memo", e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={closeDialog}>
              취소하기
            </Button>
            <Button variant="default" type="button" onClick={handleSubmitItem}>
              추가하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
