"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { UserDetailsContext } from "@/context/UserDetailsContext";

import {
  LayoutDashboardIcon,
  Bot,
  Database,
  WalletCards,
  User2Icon,
  Gem,
  Zap,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";

const AppSideBar = () => {
  const { open } = useSidebar();

  const { userDetails, setUserDetails } = useContext(UserDetailsContext);

  const path = usePathname();

  const menuItems = [
    { label: "Dashboard", url: "/dashboard", icon: LayoutDashboardIcon },
    { label: "AI Agents", url: "#", icon: Bot },
    { label: "Data", url: "#", icon: Database },
    { label: "Pricing", url: "#", icon: WalletCards },
    { label: "Profile", url: "#", icon: User2Icon },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-1">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
          </div>
          {open && (
            <h2 className="px-2 text-lg font-extrabold tracking-tight">
              FlowAgent
            </h2>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application Menu</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((menu) => (
                <SidebarMenuItem key={menu.label}>
                  <SidebarMenuButton asChild size="lg" isActive={path === menu.url ? true : false}>

                    <Link href={menu.url} className="flex items-center">
                      <menu.icon className={`h-5 w-5 ${open ? "mr-3" : ""}`} />
                      {open && <span>{menu.label}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mb-8">
        <div className="flex items-center gap-2 px-2">
          <Gem className="h-5 w-5" />
          {open && (
            <span className="text-sm">
              Credits:
              <span className="ml-1 font-semibold">
                {userDetails?.token ?? 0}
              </span>
            </span>
          )}
        </div>
        {open && <Button className="mt-2 w-full">Upgrade to Pro</Button>}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSideBar;
