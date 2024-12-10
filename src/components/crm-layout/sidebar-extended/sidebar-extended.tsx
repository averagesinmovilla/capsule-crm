import Link from 'next/link';
import { Home, LayoutDashboard, Contact } from 'lucide-react';
import { usePathname } from 'next/navigation';

const SidebarExtended = () => {
    const pathname = usePathname();
    const statusLink: { default: string; active: string } = {
        active: 'bg-muted text-primary',
        default: 'text-muted-foreground'
    }
    return (
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
                href="/dashboard"
                className={
                    `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary
                    ${pathname === '/dashboard' ? statusLink.active : statusLink.default}
                `}
                prefetch={false}
            >
                <LayoutDashboard/>
                Dashboard
            </Link>
            <Link
                href="/properties"
                className={`
                    flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary
                    ${pathname === '/properties' ? statusLink.active : statusLink.default}
                `}
                prefetch={false}
            >
                <Home/>
                Properties
            </Link>
            <Link
                href="/contacts"
                className={`
                    flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary
                    ${pathname === '/contacts' ? statusLink.active : statusLink.default}
                `}
                prefetch={false}
            >
                <Contact/>
                Contacts
            </Link>
        </nav>
    )
}
export default SidebarExtended
