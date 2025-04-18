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
        <div className="flex flex-wrap justify-center gap-3">
          <a href="#" className="facebook-footer-link">Privacy</a>
          <a href="#" className="facebook-footer-link">Terms</a>
          <a href="#" className="facebook-footer-link">Advertising</a>
          <a href="#" className="facebook-footer-link">Cookies</a>
          <a href="#" className="facebook-footer-link">Ad Choices</a>
          <a href="#" className="facebook-footer-link">More</a>
        </div>
      </div>
    </footer>
  );
}

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
      <FacebookFooter />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Hiển thị English góc phải trên */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            fontSize: "14px",
            color: "#1877f2",
            fontWeight: "500",
            zIndex: 9999,
          }}
        >
          English (US)
        </div>

        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
