import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MainLayout from "@/layout/main/MainLayout";

export default function HomeView() {
  return (
    <MainLayout>
      <div className="h-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4 mb-10">
          <div className="flex flex-row gap-2"> 
            <p className="text-6xl font-bold">XPF</p>
            <p className="text-lg font-bold">Beta</p>
          </div>
          <p className="text-lg text-gray-500">프로필을 찾아보세요!</p>
          <div className="flex flex-row gap-2">
            <Input className="w-md" placeholder="아이디를 입력해주세요" />
            <Button variant="default">Go</Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
