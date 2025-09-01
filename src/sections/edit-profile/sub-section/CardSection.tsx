import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useCallback } from "react";
import useCardDetailDialog from "../context/dialog/hooks";

export default function CardSection() {
  const openDialog = useCardDetailDialog((state) => state.openDialog);

  const handleClickCard = useCallback(
    (ev: React.MouseEvent<HTMLDivElement>) => {
      ev.preventDefault();
      openDialog({ cardId: "1" });
    },
    [openDialog]
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4 max-w-3xl"></div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xl font-bold">나의 카드</p>
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-row gap-4 max-w-3xl bg-gray-100 rounded-lg p-4 hover:bg-gray-200 hover:cursor-pointer"
              onClick={handleClickCard}
            >
              <Avatar className="w-24 h-24 rounded-lg">
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
              <div className="flex flex-col gap-2">
                <p className="text-xl font-bold">팝픈뮤직</p>
                <p className="text-sm text-gray-500">
                  2014년 시작 <br />
                  팝클래스 99.4
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
