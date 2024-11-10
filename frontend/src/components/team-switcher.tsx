"use client"

import * as React from "react"
import { ChevronDown, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  DropdownMenuSeparator,
  // DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";
import {Button} from "@/components/ui/button";

export function TeamSwitcher({

}) {

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="w-fit px-1.5">
              <div className="flex aspect-square size-5 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
              </div>
              <span className="truncate font-semibold">Griffan</span>
              <ChevronDown className="opacity-50" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            {/*<DropdownMenuLabel className="text-xs text-slate-500 dark:text-slate-400">*/}
            {/*  Teams*/}
            {/*</DropdownMenuLabel>*/}
            {/*{teams.map((team, index) => (*/}
            {/*  <DropdownMenuItem*/}
            {/*    key={team.name}*/}
            {/*    onClick={() => setActiveTeam(team)}*/}
            {/*    className="gap-2 p-2"*/}
            {/*  >*/}
            {/*    <div className="flex size-6 items-center justify-center rounded-sm border">*/}
            {/*      <team.logo className="size-4 shrink-0" />*/}
            {/*    </div>*/}
            {/*    {team.name}*/}
            {/*    <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>*/}
            {/*  </DropdownMenuItem>*/}
            {/*))}*/}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
                <Plus className="size-4" />
              </div>
              <Link href="/">
                <Button className="font-medium text-slate-500 dark:text-slate-400">Landing page</Button>
              </Link>

            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
