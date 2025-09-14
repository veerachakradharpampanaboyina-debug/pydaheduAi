'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Code,
  LayoutDashboard,
  Settings,
  FileText,
  Presentation,
  BookOpen,
  Calculator,
} from 'lucide-react';

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from './ui/button';
import { Icons } from './icons';
import { ThemeToggle } from './theme-toggle';
import React from 'react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/tutor', label: 'PYDAH AI Tutor', icon: BookOpen },
  { href: '/math-tutor', label: 'Math Tutor', icon: Calculator },
  { href: '/practice', label: 'Practice', icon: Code },
  { href: '/notes', label: 'Notes', icon: FileText },
  { href: '/ppt-generator', label: 'PPT Generator', icon: Presentation },
];

const settingsNav = {
  href: '/settings',
  label: 'Settings',
  icon: Settings,
};

function AppShellContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isHomePage = pathname === '/';

  if(isHomePage) {
    return (
        <div className='flex flex-col min-h-svh'>
             <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link href="/" className='flex items-center gap-2'>
                        <Icons.logo className="h-6 w-6 text-primary" />
                        <span className="font-headline text-lg font-semibold tracking-tight">PYDAH AI</span>
                    </Link>
                    <div className='flex items-center gap-2'>
                        <ThemeToggle />
                    </div>
                </div>
            </header>
            <div className='flex-1'>{children}</div>
        </div>
    )
  }


  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="h-10 w-10 flex-shrink-0" asChild>
              <Link href={'/dashboard'}>
                <Icons.logo className="h-5 w-5 text-primary" />
              </Link>
            </Button>
            <div className="flex flex-col">
              <h2 className="font-headline text-lg font-semibold tracking-tight">PYDAH AI</h2>
              <p className="text-sm text-sidebar-foreground/80">by Pydah College of Engineering</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4 flex-col gap-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === settingsNav.href}
                tooltip={settingsNav.label}
              >
                <Link href={settingsNav.href}>
                  <settingsNav.icon />
                  <span>{settingsNav.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <div className="flex items-center justify-center">
             <ThemeToggle />
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <SidebarTrigger className="md:hidden" />
        </header>
        <main className="flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}


export function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <AppShellContent>{children}</AppShellContent>
    )
}
