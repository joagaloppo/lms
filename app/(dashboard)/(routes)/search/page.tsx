import { db } from "@/lib/db";
import Categories from "./_components/categories";
import SearchInput from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CoursesList from "../../../../components/courses-list";

interface SearchProps {
    searchParams: {
        title: string;
        categoryId: string;
    };
}

const Search: React.FC<SearchProps> = async ({ searchParams }) => {
    const categories = await db.category.findMany({
        orderBy: { name: "asc" },
    });

    const { userId } = auth();
    if (!userId) return redirect("/");
    const courses = await getCourses({ userId, ...searchParams });

    return (
        <>
            <div className="px-6 pt-6 md:hidden md:mb-0 block">
                <SearchInput />
            </div>
            <div className="p-6 space-y-6">
                <Categories items={categories} />
                <CoursesList courses={courses} />
            </div>
        </>
    );
};

export default Search;
