"use client";

import SidebarItem from "./sidebar-item";

import { usePathname, useRouter } from "next/navigation";
import { Layout, Compass, List, BarChart } from "lucide-react";

const guestRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/",
    },
    {
        icon: Compass,
        label: "Browse",
        href: "/search",
    },
];

const teacherRoutes = [
    {
        icon: List,
        label: "Courses",
        href: "/teacher/courses",
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: "/teacher/analytics",
    },
];

const SidebarRoutes: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();

    const routes = pathname?.startsWith("/teacher") ? teacherRoutes : guestRoutes;

    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem key={route.href} icon={route.icon} label={route.label} href={route.href} />
            ))}
        </div>
    );
};

export default SidebarRoutes;
