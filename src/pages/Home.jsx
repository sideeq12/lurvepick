import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { products, categories } from '../data/products';
import { motion } from 'framer-motion';

const Home = () => {
    const trendingProducts = products.slice(0, 4);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80"
                        alt="Hero Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="relative z-10 container text-center text-white space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-7xl font-bold font-heading tracking-tight"
                    >
                        Elevate Your Style
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl md:text-2xl font-light max-w-2xl mx-auto text-gray-200"
                    >
                        Discover the latest trends in fashion and accessories. curated for the modern individual.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <Link to="/shop" className="btn bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg rounded-full">
                            Shop Now
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-20 bg-secondary/30 dark:bg-gray-800/50">
                <div className="container">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12 dark:text-white">Shop by Category</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                to={`/shop?category=${category.id}`}
                                className="group relative h-96 overflow-hidden rounded-lg shadow-md"
                            >
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <h3 className="text-2xl font-bold text-white font-heading tracking-wider uppercase border-b-2 border-transparent group-hover:border-white transition-all pb-1">
                                        {category.name}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trending Products */}
            <section className="py-20" id="new-arrivals">
                <div className="container">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-2 dark:text-white">Trending Now</h2>
                            <p className="text-black dark:text-gray-400">Our most popular picks this week.</p>
                        </div>
                        <Link to="/shop" className="hidden md:flex items-center text-primary hover:text-accent transition-colors font-medium">
                            View All <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {trendingProducts.map((product) => (
                            <Link key={product.id} to={`/product/${product.id}`} className="group">
                                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-secondary dark:bg-gray-800 mb-4">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {/* Quick Add Button (Optional - could be added here) */}
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-medium text-lg leading-tight group-hover:text-primary/80 dark:text-white dark:group-hover:text-accent transition-colors">
                                            {product.name}
                                        </h3>
                                        <span className="font-bold text-lg dark:text-white">${product.price}</span>
                                    </div>
                                    <p className="text-sm text-black dark:text-gray-400 capitalize">{product.category}</p>
                                    <div className="flex items-center text-yellow-500 text-sm">
                                        <Star className="h-4 w-4 fill-current" />
                                        <span className="ml-1 text-foreground font-medium">{product.rating}</span>
                                        <span className="ml-1 text-black dark:text-gray-400">({product.reviews})</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-12 text-center md:hidden">
                        <Link to="/shop" className="btn btn-outline w-full">
                            View All Products
                        </Link>
                    </div>
                </div>
            </section>

            {/* Newsletter / CTA */}
            <section className="py-20 bg-primary text-primary-foreground">
                <div className="container text-center max-w-2xl mx-auto space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading">Join the Club</h2>
                    <p className="text-lg text-primary-foreground/80">
                        Sign up for our newsletter and get 10% off your first order. Plus, be the first to know about new arrivals and exclusive sales.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-1 h-12 px-4 rounded-md text-foreground focus:outline-none"
                        />
                        <button className="btn bg-white text-primary hover:bg-gray-100 h-12 px-8 font-bold">
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Home;
