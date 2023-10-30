import { UserButton } from "@clerk/nextjs";

interface HomeProps {
    children?: React.ReactNode;
}

const Home: React.FC<HomeProps> = () => {
    return (
        <>
            <div>
                <UserButton afterSignOutUrl="/login" />
            </div>
        </>
    );
};

export default Home;
