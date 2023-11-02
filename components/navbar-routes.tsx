"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Book, User } from "lucide-react";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import SearchInput from "./search-input";

const NavbarRoutes: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();

    const isTeacherPage = pathname?.startsWith("/teacher");
    const isPlayerPage = pathname?.includes("/chapter");
    const isSearchPage = pathname?.includes("/search");

    return (
        <>
            {isSearchPage && (
                <div className="hidden md:block">
                    <SearchInput />
                </div>
            )}

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
                <ClerkLoading>
                    <div className="h-8 w-8 bg-gray-200 rounded-full" />
                </ClerkLoading>
                <ClerkLoaded>
                    <UserButton afterSignOutUrl="/login" />
                </ClerkLoaded>
            </div>
        </>
    );
};

export default NavbarRoutes;
