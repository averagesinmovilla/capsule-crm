import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ReactNode } from 'react';
import SidebarExtended from '@/components/crm-layout/sidebar-extended/sidebar-extended';
import AvatarDropdownMenu from '@/components/crm-layout/avatar-dropdown-menu/avatar-dropdown-menu';
import SidebarSheet from '@/components/crm-layout/sidebar-sheet/sidebar-sheet';
import { Bell, Pill } from 'lucide-react';
import { UserType } from '@/types/user.type';
import { ThemeProvider } from "@/components/structure/theme-provider";
import {ToogleTheme} from "@/components/shared/toggleTheme";
import { Toaster } from "@/components/ui/toaster"

export default function CrmLayout({ user, children }: { user: UserType, children: ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
        <div className="grid h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] ">
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
                            <Pill/>
                            <span className="">Capsule CRM</span>
                        </Link>
                        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                            <Bell/>
                            <span className="sr-only">Toggle notifications</span>
                        </Button>
                    </div>
                    <div className="flex-1">
                        <SidebarExtended />
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex justify-end h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <SidebarSheet/>
                    <AvatarDropdownMenu user={user}/>
                    <ToogleTheme/>
                </header>
                <main className="flex flex-1 flex-col overflow-auto">
                    {children}
                    <Toaster />
                </main>
            </div>
        </div>
        </ThemeProvider>
    )
}
