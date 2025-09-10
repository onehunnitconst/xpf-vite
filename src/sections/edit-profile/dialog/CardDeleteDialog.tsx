import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCardDeleteDialog } from "../context/dialog";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useDeleteItem } from "@/api/profile/deleteItem";

export default function CardDeleteDialog({ profileId }: { profileId: number }) {
  const open = useCardDeleteDialog((state) => state.open);
  const closeDialog = useCardDeleteDialog((state) => state.closeDialog);
  const metadata = useCardDeleteDialog((state) => state.metadata);

  const { deleteItem } = useDeleteItem(profileId, {
    onSuccess: () => {
      toast.success("카드가 삭제되었습니다.");
      closeDialog();
    },
    onError: (error) => {
      const response = error.response?.data as { message: string };
      toast.error(response.message);
    },
  });

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        closeDialog();
      }
    },
    [closeDialog]
  );

  const handleDeleteItemButton = useCallback(() => {
    deleteItem({ itemId: metadata!.item!.id });
  }, [deleteItem, metadata]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>카드 삭제하기</DialogTitle>
        </DialogHeader>
        <DialogDescription>카드를 삭제하시겠습니까?</DialogDescription>
        <DialogFooter>
          <Button variant="outline" type="button" onClick={closeDialog}>
            취소하기
          </Button>
          <Button variant="default" type="button" onClick={handleDeleteItemButton}>
            삭제하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
