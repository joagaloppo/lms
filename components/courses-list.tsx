import { Course, Category } from "@prisma/client";
import CourseCard from "./course-card";

interface CourseWithCategoryWithProgress extends Course {
    category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
}

interface CoursesListProps {
    courses: CourseWithCategoryWithProgress[];
}

const CoursesList: React.FC<CoursesListProps> = ({ courses }) => {
    return (
        <div>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
                {courses.map((course) => (
                    <CourseCard
                        key={course.id}
                        id={course.id}
                        title={course.title}
                        imageUrl={course.imageUrl!}
                        chaptersLength={course.chapters.length}
                        price={course.price!}
                        progress={course.progress}
                        category={course?.category?.name!}
                    />
                ))}
            </div>
            {courses.length === 0 && (
                <div className="text-center text-sm text-muted-foreground mt-10">No courses found</div>
            )}
        </div>
    );
};

export default CoursesList;
