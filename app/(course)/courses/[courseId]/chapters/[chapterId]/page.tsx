import { getChapter } from "@/actions/get-chapter";
import Banner from "@/components/banner";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import VideoPlayer from "./_components/video-player";
import CourseEnrollButton from "./_components/course-enroll-button";
import { Separator } from "@/components/ui/separator";
import Preview from "@/components/preview";
import { File } from "lucide-react";

interface ChaptersPageProps {
    params: {
        courseId: string;
        chapterId: string;
    };
}

const ChaptersPage: React.FC<ChaptersPageProps> = async ({ params }) => {
    const { userId } = auth();
    if (!userId) return redirect("/");

    const { chapter, course, muxData, attachaments, nextChapter, userProgress, purchase } = await getChapter({
        userId,
        courseId: params.courseId,
        chapterId: params.chapterId,
    });

    if (!chapter || !course) return redirect("/");

    const isBlocked = !purchase && !chapter.isFree;
    const completeOnEnd = !!purchase && !userProgress?.isCompleted;

    return (
        <div>
            {userProgress?.isCompleted && <Banner label="You already completed this chapter" variant="success" />}
            {isBlocked && <Banner label="You need to purchase this course to access this chapter" />}
            <div className="flex flex-col max-w-4xl mx-auto pb-20">
                <div className="p-4">
                    <VideoPlayer
                        chapterId={params.chapterId}
                        title={chapter.title}
                        courseId={params.courseId}
                        nextChapterId={nextChapter?.id}
                        playblackId={muxData?.playbackId!}
                        isBlocked={isBlocked}
                        completeOnEnd={completeOnEnd}
                    />
                </div>
                <div>
                    <div className="p-4 flex flex-col md:flex-row items-center justify-between">
                        <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
                        {purchase ? <button /> : <CourseEnrollButton courseId={params.courseId} price={course.price} />}
                    </div>
                    <Separator />
                    <div>
                        <Preview value={chapter.description!} />
                    </div>
                    {!!attachaments.length && (
                        <>
                            <Separator />
                            <div className="p-4">
                                {attachaments.map((attachament) => (
                                    <a
                                        href={attachament.url}
                                        key={attachament.id}
                                        target="_blank"
                                        className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                                    >
                                        <File className="h-6 w-6 mr-2" />
                                        <p className="line-clamp-1">{attachament.name}</p>
                                    </a>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChaptersPage;
