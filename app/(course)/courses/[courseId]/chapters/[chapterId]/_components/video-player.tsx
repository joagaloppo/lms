"use client";

import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
    chapterId: string;
    title: string;
    courseId: string;
    nextChapterId?: string;
    playblackId: string;
    isBlocked: boolean;
    completeOnEnd: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
    chapterId,
    title,
    courseId,
    nextChapterId,
    playblackId,
    isBlocked,
    completeOnEnd,
}) => {
    const [isReady, setIsReady] = useState(false);

    return (
        <div className="relative aspect-video">
            {!isReady && !isBlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                    <Loader2 className="h-8 w-8 animate-spin text-secondary" />
                </div>
            )}
            {isBlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800 gap-y-2 text-secondary flex-col">
                    <Lock className="h-8 w-8 text-secondary" />
                    <p className="text-sm">
                        This chapter is blocked. <br />
                    </p>
                </div>
            )}
            {!isBlocked && (
                <MuxPlayer
                    title={title}
                    className={cn(!isReady && "hidden")}
                    onCanPlay={() => setIsReady(true)}
                    onEnded={() => {}}
                    autoPlay
                    playbackId={playblackId}
                />
            )}
        </div>
    );
};

export default VideoPlayer;
