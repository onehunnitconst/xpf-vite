import { Button } from "@/components/ui/button";
import { paths } from "@/paths";
import {
  isAccessTokenNotFound,
  removeAccessToken,
  removeRefreshToken,
} from "@/utils/session-storage";
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

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-12 border-b border-gray-200 flex justify-center sticky top-0 z-10 bg-background">
        <div className="md:w-4xl w-full flex flex-row items-center justify-center sm:justify-between">
          <p className="hidden sm:block text-sm font-bold sm:px-4 px-0 hover:cursor-pointer" onClick={handleHomeButtonClick}>XPF Beta</p>
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
      <div className="w-full flex justify-center flex-1 overflow-y-auto">
        <div className="w-full md:w-4xl h-full">{children}</div>
      </div>
    </div>
  );
}
