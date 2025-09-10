import { Dialog, DialogContent } from "@/components/ui/dialog";
import useCardDetailDialog from "../context/dialog/hooks";
import { useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GalleryHorizontalIcon } from "lucide-react";

export default function CardDetailDialog() {
  const { open, closeDialog, metadata } = useCardDetailDialog((state) => ({
    open: state.open,
    closeDialog: state.closeDialog,
    metadata: state.metadata,
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
            <AvatarImage src={metadata?.item.itemImageUrl} />
            <AvatarFallback className="rounded-lg bg-gray-100">
              <GalleryHorizontalIcon className="w-6 h-6 text-gray-400" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col gap-2">
            <p className="text-xl font-bold">{metadata?.item.title}</p>
            <p className="text-sm text-gray-500">
              {metadata?.item.summary}
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-4 px-3 py-2 rounded-lg bg-gray-100 max-h-96 overflow-y-auto">
          <p>{metadata?.item.memo}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
