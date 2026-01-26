import { AppHeader } from "./_components/AppHeader";
import AppSideBar from "./_components/AppSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSideBar />
      <div className="w-full">
        <AppHeader /> 
        {children}
      </div>
    </SidebarProvider>
  );
}
