import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className="h-full">
            <div className="h-[80px] md:pl-56 inset-y-0 w-full z-50">
                <Navbar />
            </div>
            <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
                <Sidebar />
            </div>
            <main className="md:pl-56 h-full">{children}</main>
        </div>
    );
};

export default DashboardLayout;
