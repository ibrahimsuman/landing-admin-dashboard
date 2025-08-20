import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./LayoutComponents/app-sidebar";
import { Input } from "@/components/ui/input";
import { Bell, MessageSquare, HelpCircle, Search } from "lucide-react";

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex w-full overflow-hidden">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content Area */}
        <SidebarInset className="flex flex-col flex-1 bg-gray-50">
          {/* Header */}
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm">
            {/* Left */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <SidebarTrigger className="-ml-1 md:hidden" />
              <SidebarTrigger className="-ml-1 hidden md:inline-flex" />
              <h1 className="text-sm font-medium text-gray-800 uppercase">
                Welcome
              </h1>
            </div>

            {/* Middle */}

            <div className="flex-1 flex justify-center px-4">
              <div className="relative w-full max-w-xs group">
                <Input
                  placeholder="Search..."
                  className="w-full rounded-md pl-10 py-1 
                 border border-gray-300 
                 focus:border-primary focus:ring-primary 
                 transition-colors"
                />
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 
                 group-focus-within:text-primary transition-colors"
                />
              </div>
            </div>


            {/* Right */}
            <div className="flex items-center gap-4 flex-shrink-0 text-gray-700">
              <MessageSquare className="w-6 h-6 cursor-pointer hover:text-primary" />
              <Bell className="w-6 h-6 cursor-pointer hover:text-primary" />
              <HelpCircle className="w-6 h-6 cursor-pointer hover:text-primary" />
            </div>
          </header>

          {/* Scrollable content */}
          <main className="flex-1 overflow-y-auto px-4 py-4 scrollbar-hide">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
