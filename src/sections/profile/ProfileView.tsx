import { Avatar, AvatarImage } from "@/components/ui/avatar";
import MainLayout from "@/layout/main/MainLayout";
import { useCallback } from "react";

export default function ProfileView() {
  const handleClickAccount = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      window.open("https://x.com/onehunnitconst", "_blank");
    },
    []
  );

  return (
    <MainLayout>
      <div className="flex flex-col my-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-2">
              <p className="text-2xl font-bold">뚜루루</p>
              <div className="px-2 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 hover:cursor-pointer">
                <p
                  className="text-sm text-gray-500 "
                  onClick={handleClickAccount}
                >
                  @onehunnitconst
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-4 max-w-3xl">
              <Avatar className="w-24 h-24 rounded-lg">
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
              <div className="px-3 py-3 rounded-lg bg-gray-100 h-24 flex-1 overflow-y-auto">
                <p className="whitespace-pre-wrap">
                  안녕하세요. 뚜루루입니다. 안녕하세요. 뚜루루입니다.
                  안녕하세요. 뚜루루입니다. 안녕하세요. 뚜루루입니다.
                  안녕하세요. 뚜루루입니다. 안녕하세요. 뚜루루입니다.
                  안녕하세요. 뚜루루입니다. 안녕하세요. 안녕하세요.
                  뚜루루입니다. 안녕하세요. 뚜루루입니다. 안녕하세요.
                  뚜루루입니다. 안녕하세요. 뚜루루입니다. 안녕하세요.
                  뚜루루입니다. 안녕하세요. 뚜루루입니다. 안녕하세요.
                  뚜루루입니다. 안녕하세요. 안녕하세요. 뚜루루입니다.
                  안녕하세요. 뚜루루입니다. 안녕하세요. 뚜루루입니다.
                  안녕하세요. 뚜루루입니다. 안녕하세요. 뚜루루입니다.
                  안녕하세요. 뚜루루입니다. 안녕하세요. 뚜루루입니다.
                  안녕하세요.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xl font-bold">나의 카드</p>
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-row gap-4 max-w-3xl bg-gray-100 rounded-lg p-4 hover:bg-gray-200 hover:cursor-pointer"
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
      </div>
    </MainLayout>
  );
}
