"use client";

import { Category } from "@prisma/client";
import {
    FcMultipleDevices,
    FcMusic,
    FcOldTimeCamera,
    FcSportsMode,
    FcSalesPerformance,
    FcFilmReel,
} from "react-icons/fc";
import { IconType } from "react-icons";
import CategoryItem from "./category-item";

interface CategoriesProps {
    items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
    "Computer Science": FcMultipleDevices,
    Music: FcMusic,
    Photography: FcOldTimeCamera,
    Fitness: FcSportsMode,
    Accounting: FcSalesPerformance,
    Filming: FcFilmReel,
};

const Categories: React.FC<CategoriesProps> = ({ items }) => {
    return (
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
            {items.map((item) => (
                <CategoryItem key={item.id} label={item.name} icon={iconMap[item.name]} value={item.id} />
            ))}
        </div>
    );
};

export default Categories;
