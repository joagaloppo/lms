import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = () => {
    const { userId } = auth();
    if (!userId) throw new Error("Unauthorized");
    return { userId };
};

export const ourFileRouter = {
    courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => {
            return;
        }),
    courseAttachments: f(["text", "image", "video", "audio", "pdf"])
        .middleware(() => handleAuth())
        .onUploadComplete(() => {
            return;
        }),
    chapterVideo: f({ video: { maxFileSize: "1GB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => {
            return;
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
