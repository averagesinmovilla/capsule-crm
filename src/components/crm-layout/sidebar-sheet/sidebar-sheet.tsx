import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Contact, Home, LayoutDashboard, Menu, Pill } from 'lucide-react';

const SidebarSheet = () => (
    <Sheet>
        <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu/>
                <span className="sr-only">Toggle navigation menu</span>
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col" aria-describedby={undefined}>
            <VisuallyHidden.Root>
                <SheetTitle></SheetTitle>
            </VisuallyHidden.Root>
            <nav className="grid gap-2 text-lg font-medium">
                <Link href="#" className="flex items-center gap-2 text-lg font-semibold" prefetch={false}>
                    <Pill/>
                    <span className="sr-only">Capsule CRM</span>
                </Link>
                <Link
                    href="#"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    prefetch={false}
                >
                    <LayoutDashboard />
                    Dashboard
                </Link>
                <Link
                    href="/properties"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                    prefetch={false}
                >
                    <Home />
                    Properties
                </Link>
                <Link
                    href="/contacts"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    prefetch={false}
                >
                    <Contact/>
                    Contacts
                </Link>
            </nav>
        </SheetContent>
    </Sheet>
)

export default SidebarSheet
