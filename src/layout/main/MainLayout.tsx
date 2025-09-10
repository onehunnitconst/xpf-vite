import SvgColor from "@/components/svg-color";
import { Button } from "@/components/ui/button";
import { paths } from "@/paths";
import {
  isAccessTokenNotFound,
  removeAccessToken,
  removeRefreshToken,
} from "@/utils/token-manager";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const [authenticateState, setAuthenticateState] = useState<string>("");

  const navigate = useNavigate();

  const handleHomeButtonClick = useCallback(() => {
    navigate(paths.home);
  }, [navigate]);

  const handleProfileButtonClick = useCallback(() => {
    navigate(paths.myProfile);
  }, [navigate]);

  const handleProfileEditButtonClick = useCallback(() => {
    navigate(paths.editProfile);
  }, [navigate]);

  const handleLoginButtonClick = useCallback(() => {
    navigate(paths.login);
  }, [navigate]);

  const handleLogoutButtonClick = useCallback(() => {
    removeAccessToken();
    removeRefreshToken();
    setAuthenticateState("unauthenticated");
  }, []);

  useEffect(() => {
    if (isAccessTokenNotFound()) {
      handleLogoutButtonClick();
    }
  }, [handleLogoutButtonClick]);

  useEffect(() => {
    if (isAccessTokenNotFound()) {
      setAuthenticateState("unauthenticated");
      return;
    }

    setAuthenticateState("authenticated");
  }, []);

  const handleContactButtonClick = useCallback(() => {
    window.open("mailto:xpf@onehunnitconst.kr", "_blank");
  }, []);

  const handleXButtonClick = useCallback(() => {
    window.open("https://x.com/onehunnitconst", "_blank");
  }, []);

  const handleGitHubButtonClick = useCallback(() => {
    window.open("https://www.github.com/onehunnitconst", "_blank");
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-12 border-b border-gray-200 flex justify-center sticky top-0 z-10 bg-background">
        <div className="md:w-4xl w-full flex flex-row items-center justify-center sm:justify-between">
          <p
            className="hidden sm:block text-sm font-bold sm:px-4 px-0 hover:cursor-pointer"
            onClick={handleHomeButtonClick}
          >
            XPF Beta
          </p>
          <div className="flex flex-row items-center justify-center gap-2">
            {authenticateState === "unauthenticated" && (
              <>
                <Button variant="link" onClick={handleHomeButtonClick}>
                  홈
                </Button>

                <Button variant="link" onClick={handleLoginButtonClick}>
                  로그인
                </Button>
              </>
            )}
            {authenticateState === "authenticated" && (
              <>
                <Button variant="link" onClick={handleHomeButtonClick}>
                  홈
                </Button>
                <Button variant="link" onClick={handleProfileButtonClick}>
                  내 프로필
                </Button>
                <Button variant="link" onClick={handleProfileEditButtonClick}>
                  프로필 편집
                </Button>
                <Button variant="link" onClick={handleLogoutButtonClick}>
                  로그아웃
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col flex-1 items-center justify-start overflow-y-auto">
        <div className="w-full md:w-4xl">{children}</div>
        <div className="pt-10 pb-10 flex justify-center w-full border-t border-gray-200">
          <div className="flex flex-col items-center lg:items-start lg:px-0 px-4 md:w-4xl w-full">
            <div className="flex flex-row gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="bg-gray-100 rounded-md w-8 h-8 hover:cursor-pointer"
                onClick={handleContactButtonClick}
              >
                <SvgColor
                  className="bg-gray-500"
                  src="/icons/icon-mail.svg"
                  width={20}
                  height={20}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-gray-100 rounded-md w-8 h-8 hover:cursor-pointer"
                onClick={handleXButtonClick}
              >
                <SvgColor
                  className="bg-gray-500"
                  src="/icons/icon-x.svg"
                  width={20}
                  height={20}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-gray-100 rounded-md w-8 h-8 hover:cursor-pointer"
                onClick={handleGitHubButtonClick}
              >
                <SvgColor
                  className="bg-gray-500"
                  src="/icons/icon-gh.svg"
                  width={20}
                  height={20}
                />
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              © 2025 XPF. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
