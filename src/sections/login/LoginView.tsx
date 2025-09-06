import { useLogin } from "@/api/auth/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { paths } from "@/paths";
import { useAuthStore } from "@/stores/auth-store";
import type { AxiosError } from "axios";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function LoginView() {
  const navigate = useNavigate();
  const { setLoginStatus } = useAuthStore();

  const { login } = useLogin({
    onSuccess: () => {
      navigate(paths.home);
      setLoginStatus();
    },
    onError: (error: AxiosError) => {
      const responseData = error.response?.data as { message: string };
      toast.error(responseData.message);
    },
  });

  const handleSubmit = useCallback(
    (formData: FormData) => {
      const id = formData.get("id") ? (formData.get("id") as string) : "";
      const password = formData.get("password")
        ? (formData.get("password") as string)
        : "";

      if (id === "" || password === "") {
        toast.error("아이디와 비밀번호를 입력해주세요.");
        return;
      }

      login({ userId: id, password });
    },
    [login]
  );

  const handleSignUpButtonClick = useCallback(() => {
    navigate(paths.register);
  }, [navigate]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col items-center gap-3">
        <div className="flex flex-row items-center gap-2 mb-4">
          <h2 className="font-bold text-4xl">XPF</h2>
          <p className="text-sm text-gray-500 font-bold">Beta</p>
        </div>
        <form action={handleSubmit}>
          <div className="flex flex-col min-w-xs gap-2 justify-center">
            <Input id="id" name="id" placeholder="아이디" />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호"
            />
            <Button variant="default" type="submit">
              로그인
            </Button>
          </div>
        </form>
        <Button variant="link" onClick={handleSignUpButtonClick}>
          회원가입
        </Button>
      </div>
    </div>
  );
}
