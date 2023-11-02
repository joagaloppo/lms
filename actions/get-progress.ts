import { db } from "@/lib/db";

export const getProgress = async (userId: string, courseId: string): Promise<number> => {
    try {
        const publishedChapters = await db.chapter.findMany({
            where: { courseId, isPublished: true },
            select: { id: true },
        });

        const publishedChaptersIds = publishedChapters.map((chapter) => chapter.id);
        const userCompletedChapters = await db.userProgress.findMany({
            where: {
                userId,
                chapterId: { in: publishedChaptersIds },
                isCompleted: true,
            },
        });

        const completedPercentage = Math.round((userCompletedChapters.length / publishedChapters.length) * 100);

        return completedPercentage;
    } catch (error) {
        console.log("[GET_PROGRESS]", error);
        return 0;
    }
};
