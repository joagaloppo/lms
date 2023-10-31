"use client";

import * as z from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";

import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import Image from "next/image";
import FileUpload from "@/components/file-upload";

interface ImageFormProps {
    initialData: Course;
    courseId: string;
}

const formSchema = z.object({
    imageUrl: z.string(),
});

const ImageForm: React.FC<ImageFormProps> = ({ initialData, courseId }) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success("Image updated");
            setIsEditing(false);
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course image
                <Button variant="ghost" onClick={() => setIsEditing((prev) => !prev)}>
                    {isEditing && <>Cancel</>}
                    {!isEditing && initialData?.imageUrl && (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit image
                        </>
                    )}
                    {!isEditing && !initialData?.imageUrl && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add image
                        </>
                    )}
                </Button>
            </div>

            {!isEditing &&
                (!initialData.imageUrl ? (
                    <div className="flex items-center justify-center h-60 aspect-video bg-slate-200 rounded-md">
                        <ImageIcon className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <Image className="object-cover rounded-md" fill alt="Upload" src={initialData.imageUrl} />
                    </div>
                ))}
            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="courseImage"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ imageUrl: url });
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">16:9 aspect ratio recommended</div>
                </div>
            )}
        </div>
    );
};

export default ImageForm;
