import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-secondary/50 dark:bg-gray-900 border-t border-border dark:border-gray-700 transition-colors">
            <div className="container py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link to="/" className="text-2xl font-bold font-heading tracking-tight text-primary dark:text-white">
                            Luxe<span className="text-accent">Vogue</span>
                        </Link>
                        <p className="text-sm text-black dark:text-gray-400">
                            Premium fashion for the modern individual. Quality, style, and sustainability in every stitch.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-black dark:text-gray-400 hover:text-primary dark:hover:text-accent transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-black dark:text-gray-400 hover:text-primary dark:hover:text-accent transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-black dark:text-gray-400 hover:text-primary dark:hover:text-accent transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-black dark:text-gray-400 hover:text-primary dark:hover:text-accent transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 className="font-heading font-semibold text-primary dark:text-white mb-4">Shop</h3>
                        <ul className="space-y-2 text-sm text-black dark:text-gray-400">
                            <li><Link to="/shop" className="hover:text-primary dark:hover:text-accent transition-colors">All Products</Link></li>
                            <li><Link to="/shop?category=men" className="hover:text-primary dark:hover:text-accent transition-colors">Men</Link></li>
                            <li><Link to="/shop?category=women" className="hover:text-primary dark:hover:text-accent transition-colors">Women</Link></li>
                            <li><Link to="/shop?category=accessories" className="hover:text-primary dark:hover:text-accent transition-colors">Accessories</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-heading font-semibold text-primary dark:text-white mb-4">Support</h3>
                        <ul className="space-y-2 text-sm text-black dark:text-gray-400">
                            <li><a href="#" className="hover:text-primary dark:hover:text-accent transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-primary dark:hover:text-accent transition-colors">FAQs</a></li>
                            <li><a href="#" className="hover:text-primary dark:hover:text-accent transition-colors">Shipping & Returns</a></li>
                            <li><a href="#" className="hover:text-primary dark:hover:text-accent transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-heading font-semibold text-primary dark:text-white mb-4">Stay Updated</h3>
                        <p className="text-sm text-black dark:text-gray-400 mb-4">
                            Subscribe to our newsletter for the latest trends and exclusive offers.
                        </p>
                        <form className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="h-10 px-3 rounded-md border border-input dark:border-gray-600 bg-background dark:bg-gray-800 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                            <button className="btn btn-primary w-full">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-black dark:text-gray-400">
                    <p>&copy; {new Date().getFullYear()} LuxeVogue. All rights reserved.</p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-primary dark:hover:text-accent transition-colors">Terms</a>
                        <a href="#" className="hover:text-primary dark:hover:text-accent transition-colors">Privacy</a>
                        <a href="#" className="hover:text-primary dark:hover:text-accent transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
