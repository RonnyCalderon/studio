'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Home, User, Trophy, Flame, Gamepad2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { useUser } from '@/context/user-provider';
import { UserOnboarding } from './user-onboarding';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { userIsKnown } = useUser();

  if (!userIsKnown) {
    return <UserOnboarding />;
  }

  return (
    <SidebarProvider>
      <Sidebar side="left" collapsible="icon" variant="sidebar">
        <SidebarHeader className="p-4 items-center justify-center">
            <Link href="/" className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-12 w-12 text-primary hover:bg-primary/10">
                    <Flame className="h-8 w-8" />
                </Button>
                <h1 className="font-headline text-2xl font-bold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
                    Ignite
                </h1>
            </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/'}
                tooltip={{ children: 'Dashboard' }}
              >
                <Link href="/">
                  <Home />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/games'}
                tooltip={{ children: 'Games' }}
              >
                <Link href="/games">
                  <Gamepad2 />
                  <span>Games</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/history'}
                tooltip={{ children: 'History' }}
              >
                <Link href="/history">
                  <Trophy />
                  <span>History</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/profile'}
                tooltip={{ children: 'Profile' }}
              >
                <Link href="/profile">
                  <User />
                  <span>Profile</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b md:justify-end">
          <SidebarTrigger className="md:hidden" />
          <div className="flex items-center gap-4">
            {/* Can add user avatar here later */}
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
