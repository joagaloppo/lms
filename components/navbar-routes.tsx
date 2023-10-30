import { UserButton } from "@clerk/nextjs";

interface NavbarRoutesProps {
    children?: React.ReactNode;
}

const NavbarRoutes: React.FC<NavbarRoutesProps> = () => {
    return (
        <div className="flex gap-x-2 ml-auto">
            <UserButton afterSignOutUrl="/login" />
        </div>
    );
};

export default NavbarRoutes;
