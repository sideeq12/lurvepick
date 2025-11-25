import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, Moon, Sun } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import EyeTrackingToggle from './EyeTrackingToggle';
import { cn } from '../lib/utils';

const Navbar = () => {
    const { cartCount } = useCart();
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'New Arrivals', path: '/#new-arrivals' },
        { name: 'About', path: '/#about' },
    ];

    const isActive = (path) => location.pathname === path;

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
            setIsMenuOpen(false);
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border bg-white dark:bg-gray-900 dark:border-gray-700 transition-colors">
            <div className="container flex h-16 items-center justify-between gap-4">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
                    <span className="text-2xl font-bold font-heading tracking-tight text-primary dark:text-white">
                        Luxe<span className="text-accent">Vogue</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary dark:hover:text-accent",
                                isActive(link.path) ? "text-primary dark:text-accent" : "text-black dark:text-gray-300"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Search Bar (Desktop) */}
                <div className="hidden md:flex flex-1 max-w-sm mx-4">
                    <form onSubmit={handleSearch} className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-9 pl-9 pr-4 rounded-full border border-input bg-secondary/50 dark:bg-gray-800 dark:border-gray-600 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black dark:text-gray-400" />
                    </form>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4 flex-shrink-0">
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 text-black dark:text-gray-300 hover:text-primary dark:hover:text-accent transition-colors"
                        aria-label="Toggle dark mode"
                    >
                        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>

                    {/* Eye-Tracking Toggle */}
                    <EyeTrackingToggle />

                    <Link to="/cart" className="relative p-2 text-black dark:text-gray-300 hover:text-primary dark:hover:text-accent transition-colors">
                        <ShoppingCart className="h-5 w-5" />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-black dark:text-gray-300 hover:text-primary dark:hover:text-accent"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-border dark:border-gray-700 bg-white dark:bg-gray-900">
                    <div className="container py-4 flex flex-col space-y-4">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-secondary/50 dark:bg-gray-800 dark:border-gray-600 dark:text-white text-sm"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black dark:text-gray-400" />
                        </form>
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary dark:hover:text-accent",
                                    isActive(link.path) ? "text-primary dark:text-accent" : "text-black dark:text-gray-300"
                                )}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
