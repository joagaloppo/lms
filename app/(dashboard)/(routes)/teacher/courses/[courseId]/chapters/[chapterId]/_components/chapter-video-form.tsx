"use client";

import * as z from "zod";
import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle, VideoIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";
import FileUpload from "@/components/file-upload";

interface ChapterVideoFormProps {
    initialData: Chapter & { muxData?: MuxData | null };
    courseId: string;
    chapterId: string;
}

const formSchema = z.object({
    videoUrl: z.string(),
});

const ChapterVideoForm: React.FC<ChapterVideoFormProps> = ({ initialData, courseId, chapterId }) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast.success("Chapter updated");
            setIsEditing(false);
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Chapter video
                <Button variant="ghost" onClick={() => setIsEditing((prev) => !prev)}>
                    {isEditing && <>Cancel</>}
                    {!isEditing && initialData?.videoUrl && (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit video
                        </>
                    )}
                    {!isEditing && !initialData?.videoUrl && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add video
                        </>
                    )}
                </Button>
            </div>

            {!isEditing &&
                (!initialData.videoUrl ? (
                    <div className="flex items-center justify-center h-60 aspect-video bg-slate-200 rounded-md">
                        <VideoIcon className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
                ))}
            {isEditing && (
                <div>
                    <FileUpload
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ videoUrl: url });
                            }
                        }}
                        endpoint="chapterVideo"
                    />
                    <div className="text-xs text-muted-foreground mt-4">Upload this chapter&apos;s video</div>
                </div>
            )}
            {initialData.videoUrl && !isEditing && (
                <div className="text-xs text-muted-foreground mt-2">
                    Videos can take a while to process. If you just uploaded a video, it may take a few minutes to show
                    up here.
                </div>
            )}
        </div>
    );
};

export default ChapterVideoForm;
