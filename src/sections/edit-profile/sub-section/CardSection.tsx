import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Edit2Icon, PlusIcon, TrashIcon } from "lucide-react";
import { useCallback } from "react";

export default function CardSection() {
  const handleCardAddButton = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      console.log("card add button");
    },
    []
  );

  const handleCardEditButton = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      console.log("card edit button");
    },
    []
  );

  const handleCardRemoveButton = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      console.log("card remove button");
    },
    []
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4 max-w-3xl"></div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-1 items-center h-8">
          <p className="text-xl font-bold">나의 카드</p>
          <div
            className="hover:bg-gray-200 hover:cursor-pointer rounded-full p-2"
            onClick={handleCardAddButton}
          >
            <PlusIcon className="w-4 h-4 text-gray-600" />
          </div>
        </div>
        {<p>아직 카드가 없습니다.</p>}
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div className="flex w-full relative">
              <div className="flex flex-row absolute bottom-2 right-2 z-105">
                <div
                  className="hover:bg-gray-200 hover:cursor-pointer rounded-full p-2"
                  onClick={handleCardEditButton}
                >
                  <Edit2Icon className="w-4 h-4 text-gray-600" />
                </div>
                <div
                  className="hover:bg-gray-200 hover:cursor-pointer rounded-full p-2"
                  onClick={handleCardRemoveButton}
                >
                  <TrashIcon className="w-4 h-4 text-gray-600" />
                </div>
              </div>
              <div
                key={index}
                className="flex flex-row gap-4 w-full bg-gray-100 rounded-lg p-4 z-100"
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
