import { Button } from "@/components/ui/button";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-12 border-b border-gray-200 flex justify-center sticky top-0 z-10 bg-background">
        <div className="min-w-3xl flex flex-row items-center justify-between">
          <p className="text-sm font-bold">XPF Beta</p>
          <div className="flex flex-row items-center justify-center gap-2">
            <Button variant="link">홈</Button>
            <Button variant="link">내 프로필</Button>
            <Button variant="link">로그인</Button>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center flex-1 overflow-y-auto">
        <div className="min-w-3xl h-full">{children}</div>
      </div>
    </div>
  );
}
