import { Button } from "@/components/ui/button";
import { paths } from "@/paths";
import { useAuthStore } from "@/stores/auth-store";
import { isAccessTokenNotFound, removeAccessToken, removeRefreshToken } from "@/utils/session-storage";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const { isAuthenticated, setLogoutStatus } = useAuthStore();
  
  const navigate = useNavigate();

  const handleHomeButtonClick = useCallback(() => {
    navigate(paths.home);
  }, [navigate]);

  const handleProfileButtonClick = useCallback(() => {
    navigate(paths.profile);
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
    setLogoutStatus();
  }, [setLogoutStatus]);

  useEffect(() => {
    if (isAccessTokenNotFound()) {
      handleLogoutButtonClick();
    }
  }, [handleLogoutButtonClick]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-12 border-b border-gray-200 flex justify-center sticky top-0 z-10 bg-background">
        <div className="min-w-3xl flex flex-row items-center justify-between">
          <p className="text-sm font-bold">XPF Beta</p>
          <div className="flex flex-row items-center justify-center gap-2">
            {!isAuthenticated && (
              <>
                <Button variant="link" onClick={handleHomeButtonClick}>
                  홈
                </Button>

                <Button variant="link" onClick={handleLoginButtonClick}>
                  로그인
                </Button>
              </>
            )}
            {isAuthenticated && (
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
                <Button variant="link" onClick={handleLoginButtonClick}>
                  로그아웃
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center flex-1 overflow-y-auto">
        <div className="min-w-3xl h-full">{children}</div>
      </div>
    </div>
  );
}
