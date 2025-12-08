"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  Map,
  Package,
  Percent,
  PieChart,
  Settings2,
  ShoppingCart,
  SquareTerminal,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "./NavMain"
import { NavUser } from "./NavUser"
import { UserInformation } from "./UserInformation"
import { useAuth } from "@/hooks/useAuth"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Tổng quan",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Sản phẩm",
      url: "#",
      icon: Package,
      isActive: true,
      items: [
        {
          title: "Tạo mới sản phẩm",
          url: "/admin/products/create",
        },
        {
          title: "Danh sách sản phẩm",
          url: "/admin/products/list",
        },
      ],
    },
    {
      title: "Đơn hàng",
      url: "#",
      icon: ShoppingCart,
      items: [
        {
          title: "Danh sách đơn hàng",
          url: "/admin/orders/list",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Khuyến mãi",
      url: "#",
      icon: Percent,
      items: [
        {
          title: "Danh sách khuyến mãi",
          url: "#",
        },
        {
          title: "Tạo khuyến mãi",
          url: "#",
        },
        {
          title: "Chi tiết khuyến mãi",
          url: "#",
        },
        {
          title: "Xóa khuyến mãi",
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

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { user } = useAuth();
  if (!user) return null;
  return (
    <Sidebar collapsible="icon" {...props} className="text-[16px]">
      <SidebarHeader>
        <UserInformation user={{ name: user?.firstName + " " + user?.lastName, role: user.roles?.[0] || "", avatar: Bot }} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ name: user?.firstName + " " + user?.lastName, email: user?.email || "", avatar: "" }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
