import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { CameraIcon, CheckIcon, PencilIcon, XIcon } from "lucide-react";
import { useCallback, useState } from "react";

export default function BasicProfileSection() {
  const handleClickAccount = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      window.open("https://x.com/onehunnitconst", "_blank");
    },
    []
  );

  const [nicknameEditModeOpen, setNicknameEditModeOpen] = useState(false);

  const handleClickNicknameEditModeOpen = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      setNicknameEditModeOpen(true);
    },
    [setNicknameEditModeOpen]
  );

  const handleClickNicknameEditConfirm = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      setNicknameEditModeOpen(false);
    },
    [setNicknameEditModeOpen]
  );

  return (
    <div className="flex flex-col">
      <div className="relative">
        <img
          src="https://github.com/shadcn.png"
          alt="profile"
          className="w-full h-48 object-cover z-1"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900/35 rounded-lg z-2" />
        <div className="absolute bottom-2 right-2 flex flex-row gap-2 z-3">
          <div className="bg-gray-800/65 hover:bg-gray-800/85 rounded-full p-2 hover:cursor-pointer z-3">
            <CameraIcon className="w-6 h-6 text-gray-100" />
          </div>
          <div className="bg-gray-800/65 hover:bg-gray-800/85 rounded-full p-2 hover:cursor-pointer z-3">
            <XIcon className="w-6 h-6 text-gray-100" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 items-center mt-[-7.5%] px-10">
          <div className="relative w-28 h-28 rounded-lg border-2">
            <Avatar className="w-full h-full rounded-lg z-11">
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            <div className="absolute top-0 left-0 w-full h-full bg-gray-900/35 rounded-lg z-12" />
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray-800/75 hover:bg-gray-800/85 rounded-full p-2 hover:cursor-pointer z-13">
              <CameraIcon className="w-6 h-6 text-gray-100" />
            </div>
          </div>
          <div className="flex flex-col gap-1 items-center">
            {!nicknameEditModeOpen && (
              <div className="flex flex-row gap-2 items-center my-1">
                <p className="text-2xl font-bold">뚜루루</p>
                <div
                  className="hover:bg-gray-200 hover:cursor-pointer rounded-full p-2"
                  onClick={handleClickNicknameEditModeOpen}
                >
                  <PencilIcon className="w-3 h-3 text-gray-500" />
                </div>
              </div>
            )}
            {nicknameEditModeOpen && (
              <div className="flex flex-row gap-2 items-center">
                <Input
                  placeholder="닉네임"
                  className="placeholder:text-2xl font-bold text-2xl w-48 h-10"
                />
                <div
                  className="hover:bg-gray-200 hover:cursor-pointer rounded-full p-2"
                  onClick={handleClickNicknameEditConfirm}
                >
                  <CheckIcon className="w-4 h-4 text-green-600" />
                </div>
              </div>
            )}

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
