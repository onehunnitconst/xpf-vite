import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useCallback } from "react";

export default function BasicProfileSection() {
  const handleClickAccount = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      window.open("https://x.com/onehunnitconst", "_blank");
    },
    []
  );

  return (
    <div className="flex flex-col">
      <img
        src="https://github.com/shadcn.png"
        alt="profile"
        className="w-full h-48 object-cover"
      />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 items-center mt-[-7.5%] px-10">
          <Avatar className="w-28 h-28 rounded-lg border-2">
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <div className="flex flex-col gap-1 items-center">
            <p className="text-2xl font-bold">뚜루루</p>
            <div className="px-2 py-1 w-fit rounded-lg bg-gray-100 hover:bg-gray-200 hover:cursor-pointer">
              <p
                className="text-sm text-gray-500 "
                onClick={handleClickAccount}
              >
                @onehunnitconst
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold">자기소개</p>
          <p className="whitespace-pre-wrap">
            안녕하세요. 뚜루루입니다. 안녕하세요. 뚜루루입니다. 안녕하세요.
            뚜루루입니다. 안녕하세요. 뚜루루입니다. 안녕하세요. 뚜루루입니다.
            안녕하세요. 뚜루루입니다. 안녕하세요. 뚜루루입니다. 안녕하세요.
            안녕하세요. 뚜루루입니다. 안녕하세요. 뚜루루입니다. 안녕하세요.
            뚜루루입니다. 안녕하세요. 뚜루루입니다. 안녕하세요. 뚜루루입니다.
            안녕하세요. 뚜루루입니다. 안녕하세요. 뚜루루입니다. 안녕하세요.
            안녕하세요. 뚜루루입니다. 안녕하세요. 뚜루루입니다. 안녕하세요.
            뚜루루입니다. 안녕하세요. 뚜루루입니다. 안녕하세요. 뚜루루입니다.
            안녕하세요. 뚜루루입니다. 안녕하세요. 뚜루루입니다. 안녕하세요.
          </p>
        </div>
      </div>
    </div>
  );
}
