import { db } from "@/lib/db";
import Categories from "./_components/categories";

interface SearchProps {
    children?: React.ReactNode;
}

const Search: React.FC<SearchProps> = async () => {
    const categories = await db.category.findMany({
        orderBy: { name: "asc" },
    });
    return (
        <div className="p-6">
            <Categories items={categories} />
        </div>
    );
};

export default Search;
