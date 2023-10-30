import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";

interface SidebarProps {
    children?: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = () => {
    return (
        <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
            <div className="p-6 flex">
                <Logo />
            </div>
            <div className="flex flex-col w-full">
                <SidebarRoutes />
            </div>
        </div>
    );
};

export default Sidebar;
