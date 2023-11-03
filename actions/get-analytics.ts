import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";

interface PurchaseWithCourse extends Purchase {
    course: Course;
}

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
    const grouped: { [courseTitle: string]: number } = {};

    purchases.forEach((purchase) => {
        const courseTitle = purchase.course.title;

        if (!grouped[courseTitle]) {
            grouped[courseTitle] = 0;
        }
        grouped[courseTitle] += purchase.course.price!;

        return grouped;
    });

    return grouped;
};

export const getAnalytics = async (userId: string) => {
    try {
        const purchases = await db.purchase.findMany({
            where: { course: { userId } },
            include: { course: true },
        });

        const groupedEarnings = groupByCourse(purchases);
        const data = Object.entries(groupedEarnings).map(([courseTitle, earnings]) => {
            return { name: courseTitle, total: earnings };
        });

        const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
        const totalSales = purchases.length;

        return {
            data,
            totalRevenue,
            totalSales,
        };
    } catch (error) {
        console.log("[GET_ANALYTICS]", error);
        return {
            data: [],
            totalRevenue: 0,
            totalSales: 0,
        };
    }
};
