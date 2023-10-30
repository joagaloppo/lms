"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Book, User } from "lucide-react";

const NavbarRoutes: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();

    const isTeacherPage = pathname?.startsWith("/teacher");
    const isPlayerPage = pathname?.includes("/chapter");

    return (
        <div className="flex gap-x-4 ml-auto">
            {isTeacherPage || isPlayerPage ? (
                <Button variant="outline" onClick={() => router.push("/")}>
                    {isTeacherPage ? (
                        <>
                            <User className="h-4 w-4 mr-2" />
                            Student
                        </>
                    ) : (
                        <>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                        </>
                    )}
                </Button>
            ) : (
                <Button variant="outline" onClick={() => router.push("/teacher/courses")}>
                    <Book className="h-4 w-4 mr-2" />
                    Teacher
                </Button>
            )}
            <UserButton afterSignOutUrl="/login" />
        </div>
    );
};

export default NavbarRoutes;
