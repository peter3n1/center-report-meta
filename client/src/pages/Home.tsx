import FacebookHeader from "@/components/FacebookHeader";
import Sidebar from "@/components/Sidebar";
import AppealForm from "@/components/AppealForm";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <FacebookHeader />
      <div className="container mx-auto max-w-5xl flex justify-center gap-1">
        <Sidebar />
        <div className="flex-1 pl-1">
          <AppealForm />
        </div>
      </div>
    </div>
  );
}
