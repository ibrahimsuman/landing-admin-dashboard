import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./LayoutComponents/app-sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex w-screen overflow-hidden">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content Area */}
        <SidebarInset className="flex flex-col flex-1 bg-gray-50">
          {/* Header */}
          <header className="fixed top-0 z-10 flex h-16 w-full shrink-0 items-center justify-between gap-2 border-b bg-white px-4 shadow-sm">
            <div className="flex items-center gap-2">
              {/* Sidebar toggle buttons */}
              <SidebarTrigger className="-ml-1 md:hidden" />
              <SidebarTrigger className="-ml-1 hidden md:inline-flex" />

              <Separator orientation="vertical" className="mr-2 h-4" />

              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          {/* Scrollable content area */}
          <main className="mt-16 flex-1 overflow-y-auto px-4 py-4 scrollbar-hide">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
