import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import CourseSidebarItem from "./course-sidebar-item";

interface CourseSidebarProps {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null;
        })[];
    };
    progressCount: number;
}

const CourseSidebar: React.FC<CourseSidebarProps> = async ({ course, progressCount }) => {
    const { userId } = auth();
    if (!userId) return redirect("/");

    const purchaste = await db.purchase.findUnique({
        where: {
            userId_courseId: {
                courseId: course.id,
                userId,
            },
        },
    });

    return (
        <div className="h-full border-r flex-col overflow-y-auto shadow-sm">
            <div className="p-8 flex flex-col border-b">
                <h1 className="font-semibold">{course.title}</h1>
                {/* Check purchase and add progress */}
            </div>
            <div className="flex flex-col w-full">
                {course.chapters.map((chapter) => (
                    <CourseSidebarItem
                        key={chapter.id}
                        id={chapter.id}
                        label={chapter.title}
                        isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                        courseId={course.id}
                        isLocked={!chapter.isFree && !purchaste}
                    />
                ))}
            </div>
        </div>
    );
};

export default CourseSidebar;
