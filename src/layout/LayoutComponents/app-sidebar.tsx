
import {
  BookOpen,
  Bot,
  Frame,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Zap
} from "lucide-react";
import * as React from "react";


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Order Manage",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Order",
          url: "order",
        },
        {
          title: "Report",
          url: "report",
        },
        {
          title: "Order Tracking",
          url: "ordertracking",
        },
      ],
    },
    {
      title: "Product Manage",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Create Product",
          url: "createproduct",
        },
        {
          title: "Product List",
          url: "productlist",
        },
        {
          title: "Category & Brand ",
          url: "productcategory",
        },
      ],
    },
    {
      title: "User Manage",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Get Started",
          url: "staffenroll",
        },
        {
          title: "Staff",
          url: "staff",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate()
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
      <div onClick={()=>navigate("/dashboard")} className="flex items-center  gap-2 cursor-pointer">
      <Zap className="text-white bg-primary w-6 h-6 p-1 rounded-sm"/>
      <div className="grid flex-1 text-left text-sm leading-tight hidden xs:block">
        <span className="truncate font-medium text-secondary uppercase text-md">Company Name</span> 
      </div>
    </div>
      </SidebarHeader>
        <div>
    </div>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser  />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
