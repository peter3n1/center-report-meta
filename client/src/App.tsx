import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";

// Footer component
function FacebookFooter() {
  return (
    <footer className="facebook-footer">
      <div className="facebook-footer-container">
        <span>Meta © 2025</span>
        <div className="ml-auto flex flex-wrap">
          <a href="#" className="facebook-footer-link">Quyền riêng tư</a>
          <a href="#" className="facebook-footer-link">Điều khoản</a>
          <a href="#" className="facebook-footer-link">Quảng cáo</a>
          <a href="#" className="facebook-footer-link">Cookie</a>
          <a href="#" className="facebook-footer-link">Lựa chọn quảng cáo</a>
          <a href="#" className="facebook-footer-link">Chính sách</a>
          <a href="#" className="facebook-footer-link">Trợ giúp</a>
          <a href="#" className="facebook-footer-link">Liên hệ</a>
          <a href="#" className="facebook-footer-link">Giới thiệu</a>
        </div>
      </div>
    </footer>
  );
}

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow pb-8">
        <Switch>
          <Route path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <FacebookFooter />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
