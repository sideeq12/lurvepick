import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100">
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
