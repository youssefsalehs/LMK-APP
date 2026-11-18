import Sidebar from "@/shared/components/sidebar/Sidebar";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <div className="h-dvh w-full overflow-hidden bg-primary flex flex-col md:grid md:grid-cols-12">
      <Sidebar />
      <div className="col-span-1 md:col-span-9 h-full bg-accent-foreground/5 overflow-y-auto">
        <div className="w-full max-w-7xl mx-auto p-4 sm:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
