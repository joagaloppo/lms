interface PageProps {
    params: {
        courseId: string;
    };
}

const Page: React.FC<PageProps> = ({ params }) => {
    return (
        <>
            <div>Course page: {params.courseId}</div>
        </>
    );
};

export default Page;
