import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";

const MobileSidebar: React.FC = () => {
    return (
        <Sheet>
            <SheetTrigger className="md:hidden">
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-white">
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
};

export default MobileSidebar;
