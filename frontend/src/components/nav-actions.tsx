"use client"
import * as React from "react";
import {
  Link as LucideLink, // Alias Lucide Link
  MoreHorizontal,

} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = [
  [
    {
      label: "GitHUb",
      icon: LucideLink,
    },
  ],
];

export function NavActions() {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
      <div className="flex items-center gap-2 text-sm">
        <Button variant="ghost" size="icon" className="h-7 w-7">
          {/*<Star />*/}
        </Button>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800"
            >
              <MoreHorizontal />
            </Button>
          </PopoverTrigger>
          <PopoverContent
              className="w-56 overflow-hidden rounded-lg p-0"
              align="end"
          >
            <Sidebar collapsible="none" className="bg-transparent">
              <SidebarContent>
                {data.map((group, index) => (
                    <SidebarGroup key={index} className="border-b last:border-none">
                      <SidebarGroupContent className="gap-0">
                        <SidebarMenu>
                          {group.map((item, idx) => (
                              <SidebarMenuItem key={idx}>
                                <SidebarMenuButton asChild>
                                  {item.label === "GitHUb" ? (
                                      <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                        <item.icon /> <span>{item.label}</span>
                                      </Link>
                                  ) : (
                                      <div className="flex items-center gap-2">
                                        <item.icon /> <span>{item.label}</span>
                                      </div>
                                  )}
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                ))}
              </SidebarContent>
            </Sidebar>
          </PopoverContent>
        </Popover>
      </div>
  );
}
