import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
    return (
        <div className="flex gap-4 p-6">
            <Button>Button</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Delete</Button>
        </div>
    );
}
