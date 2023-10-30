import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
    return <Image src="/logo.svg" alt="logo" width={130} height={32} className={cn("h-[32px]", className)} />;
};

export default Logo;
