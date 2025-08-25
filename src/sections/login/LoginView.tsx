import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { paths } from "@/paths";
import { useCallback } from "react";
import { useNavigate } from "react-router";

export default function LoginView() {
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (formData: FormData) => {
      const id = formData.get("id");
      const password = formData.get("password");
      console.log(id, password);
      navigate(paths.home);
    },
    [navigate]
  );

  const handleSignUpButtonClick = useCallback(() => {
    console.log("회원가입");
    navigate(paths.register);
  }, [navigate]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col items-center gap-3">
        <h2 className="font-bold text-3xl">XPF</h2>
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
