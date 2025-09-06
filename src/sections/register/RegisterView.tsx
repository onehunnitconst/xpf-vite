import { useRegister } from "@/api/auth/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { paths } from "@/paths";
import type { AxiosError } from "axios";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function RegisterView() {
  const navigate = useNavigate();

  const { register } = useRegister({
    onSuccess: () => {
      toast.success(
        "회원가입이 완료되었습니다.\n관리자 승인 후 로그인이 가능합니다."
      );
      navigate(paths.login);
    },
    onError: (error: AxiosError) => {
      const responseData = error.response?.data as { message: string };
      toast.error(responseData.message);
    },
  });

  const handleSubmit = useCallback(
    (formData: FormData) => {
      const id = formData.get("id") ? (formData.get("id") as string) : "";
      const nickname = formData.get("nickname")
        ? (formData.get("nickname") as string)
        : "";
      const password = formData.get("password")
        ? (formData.get("password") as string)
        : "";
      const passwordConfirm = formData.get("password_confirm")
        ? (formData.get("password_confirm") as string)
        : "";
      const xAccountId = formData.get("x_account_id")
        ? (formData.get("x_account_id") as string)
        : "";

      if (
        [id, nickname, password, passwordConfirm, xAccountId].some(
          (value) => value === ""
        )
      ) {
        toast.error("모든 필드를 입력해주세요.");
        return;
      }

      if (password !== passwordConfirm) {
        toast.error("비밀번호 확인이 일치하지 않습니다.");
        return;
      }

      register({ userId: id, nickname, password, passwordConfirm, xAccountId });
    },
    [register]
  );

  const handleBackButtonClick = useCallback(() => {
    console.log("회원가입");
    navigate(paths.login);
  }, [navigate]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col items-center gap-3">
        <h2 className="font-bold text-3xl">Welcome to XPF</h2>
        <form action={handleSubmit}>
          <div className="flex flex-col min-w-xs gap-2 justify-center">
            <Input id="id" name="id" placeholder="아이디" />
            <Input id="nickname" name="nickname" placeholder="닉네임" />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호"
            />
            <Input
              id="password_confirm"
              name="password_confirm"
              type="password"
              placeholder="비밀번호 확인"
            />
            <Input
              id="x_account_id"
              name="x_account_id"
              type="text"
              placeholder="X(구 Twitter) 계정 ID"
            />
            <Button variant="default" type="submit">
              회원가입
            </Button>
          </div>
        </form>
        <Button variant="link" onClick={handleBackButtonClick}>
          뒤로
        </Button>
      </div>
    </div>
  );
}
