interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return <div className="flex items-center justify-center h-full">{children}</div>;
};

export default Layout;
