"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";

interface CourseEnrollButtonProps {
    courseId: string;
    price: number | null;
}

const CourseEnrollButton: React.FC<CourseEnrollButtonProps> = ({ courseId, price }) => {
    return <Button className="w-full md:w-auto">Enroll for {price ? formatPrice(price) : "free"}</Button>;
};

export default CourseEnrollButton;
