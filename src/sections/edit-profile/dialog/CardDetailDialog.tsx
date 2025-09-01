import { Dialog, DialogContent } from "@/components/ui/dialog";
import useCardDetailDialog from "../context/dialog/hooks";
import { useCallback } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function CardDetailDialog() {
  const { open, closeDialog } = useCardDetailDialog((state) => ({
    open: state.open,
    closeDialog: state.closeDialog,
  }));

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        closeDialog();
      }
    },
    [closeDialog]
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <div className="flex flex-row gap-4">
          <Avatar className="w-24 h-24 rounded-lg">
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <div className="flex flex-1 flex-col gap-2">
            <p className="text-xl font-bold">팝픈뮤직</p>
            <p className="text-sm text-gray-500">
              2014년 시작 <br />
              팝클래스 99.4
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-4 px-3 py-2 rounded-lg bg-gray-100">
          <p>자기소개</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
