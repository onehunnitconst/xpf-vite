import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MainLayout from "@/layout/main/MainLayout";

export default function HomeView() {
  return (
    <MainLayout>
      <div className="h-full flex flex-col items-center justify-center">
        <div className="flex"></div>
        <div className="flex flex-row gap-2">
          <Input className="w-md" placeholder="아이디를 입력해주세요" />
          <Button variant="default">Go</Button>
        </div>
      </div>
    </MainLayout>
  );
}
