"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface SearchInputProps {
    children?: React.ReactNode;
}

const SearchInput: React.FC<SearchInputProps> = () => {
    const [value, setValue] = useState("");
    const debouncedValue = useDebounce(value);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentCategoryId = searchParams.get("categoryId");
    const currentSearchQuery = searchParams.get("title");

    useEffect(() => {
        const url = qs.stringifyUrl(
            {
                url: pathname,
                query: {
                    categoryId: currentCategoryId,
                    title: debouncedValue,
                },
            },
            { skipEmptyString: true, skipNull: true }
        );

        router.push(url);
    }, [debouncedValue, currentCategoryId, pathname, router]);

    return (
        <div className="relative">
            <Search className="h-4 w-4 absolute top-2.5 left-3 text-slate-600" />
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full md:w-[300px] pl-9 rounded-full shadow-none bg-slate-100 focus-visible:ring-slate-200 transition"
                placeholder="Search for a course..."
            />
        </div>
    );
};

export default SearchInput;
