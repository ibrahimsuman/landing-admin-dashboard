import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./LayoutComponents/app-sidebar";
import { Input } from "@/components/ui/input";
import { Bell, MessageSquare, HelpCircle } from "lucide-react";

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex w-full overflow-hidden">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content Area */}
        <SidebarInset className="flex flex-col flex-1 bg-gray-50">
          {/* Header */}
          <header className="fixed top-0 z-20 flex h-16 w-full items-center border-b bg-white px-4 shadow-sm">
            
            {/* Left */}
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1 md:hidden" />
              <SidebarTrigger className="-ml-1 hidden md:inline-flex" />
              <h1 className="text-sm font-medium text-gray-800 uppercase mr-[650px]">
                Welcome Admin Dashboard
              </h1>
            </div>

            {/* Middle */}
            <div className="flex px-4">
              <div className="w-full max-w-xs">
                <Input placeholder=" Search..." className="w-full rounded-lg" />
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4 flex-shrink-0 text-gray-700">
              <Bell className="w-6 h-6 cursor-pointer hover:text-blue-600" />
              <MessageSquare className="w-6 h-6 cursor-pointer hover:text-blue-600" />
              <HelpCircle className="w-6 h-6 cursor-pointer hover:text-blue-600" />
            </div>
          </header>

          {/* Scrollable content */}
          <main className="mt-16 flex-1 overflow-y-auto px-4 py-4 scrollbar-hide">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
