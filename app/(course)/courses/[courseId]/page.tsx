import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface CoursePageProps {
    params: {
        courseId: string;
    };
}

const CoursePage: React.FC<CoursePageProps> = async ({ params }) => {
    const course = await db.course.findUnique({
        where: { id: params.courseId },
        include: {
            chapters: { where: { isPublished: true }, orderBy: { position: "asc" } },
        },
    });

    if (!course) return redirect("/");
    return redirect(`/courses/${params.courseId}/chapters/${course.chapters[0].id}`);
};

export default CoursePage;
