import { axiosInstance } from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MainLayout from "@/layout/main/MainLayout";
import { paths } from "@/paths";
import type { AxiosError } from "axios";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function HomeView() {
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (formData: FormData) => {
      const xAccountId = formData.get("x_account_id")
        ? (formData.get("x_account_id") as string)
        : "";

      try {
        await axiosInstance.get(`/profiles/${xAccountId}`);
        navigate(paths.profileByXAccountId.replace(":xAccountId", xAccountId));
      } catch (error: AxiosError) {
        const responseData = error.response?.data as { message: string };
        toast.error(responseData.message);
      }
    },
    [navigate]
  );

  return (
    <MainLayout>
      <div className="h-full flex flex-col items-center md:justify-center mt-20 md:mt-0">
        <div className="flex flex-col items-center gap-4 mb-10">
          <div className="flex flex-row gap-2">
            <p className="text-6xl font-bold">XPF</p>
            <p className="text-lg font-bold">Beta</p>
          </div>
          <p className="text-lg text-gray-500">프로필을 찾아보세요!</p>
          <form action={handleSubmit}>
            <div className="flex flex-row gap-2">
              <Input
                id="x_account_id"
                name="x_account_id"
                className="md:w-md w-xs"
                placeholder="X(Twitter) 아이디를 입력해주세요"
              />
              <Button variant="default" type="submit">
                Go
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
