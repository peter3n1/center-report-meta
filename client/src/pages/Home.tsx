import FacebookHeader from "@/components/FacebookHeader";
import Sidebar from "@/components/Sidebar";
import AppealForm from "@/components/AppealForm";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <FacebookHeader />
      <div className="container mx-auto flex">
        <Sidebar />
        <div className="flex-1">
          <AppealForm />
        </div>
      </div>
    </div>
  );
}
