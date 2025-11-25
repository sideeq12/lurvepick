import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import { Filter, Star } from 'lucide-react';
import { cn } from '../lib/utils';

const Shop = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');

    const [filteredProducts, setFilteredProducts] = useState(products);
    const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
    const [sortBy, setSortBy] = useState('featured');

    useEffect(() => {
        let result = [...products];

        // Filter by category
        if (selectedCategory !== 'all') {
            result = result.filter(p => p.category === selectedCategory);
        }

        // Filter by search
        if (searchParam) {
            const query = searchParam.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
            );
        }

        // Sort
        if (sortBy === 'price-low') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            result.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating') {
            result.sort((a, b) => b.rating - a.rating);
        }

        setFilteredProducts(result);
    }, [selectedCategory, sortBy, searchParam]);

    useEffect(() => {
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        } else {
            setSelectedCategory('all');
        }
    }, [categoryParam]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        if (category === 'all') {
            searchParams.delete('category');
            setSearchParams(searchParams);
        } else {
            setSearchParams({ category });
        }
    };

    return (
        <div className="container py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-heading dark:text-white">
                        {searchParam ? `Search Results for "${searchParam}"` : 'Shop All'}
                    </h1>
                    <p className="text-black dark:text-gray-400 mt-1">
                        {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                    </p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    {/* Mobile Filter (simplified) */}
                    <div className="md:hidden w-full">
                        <select
                            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                            value={selectedCategory}
                            onChange={(e) => handleCategoryChange(e.target.value)}
                        >
                            <option value="all">All Categories</option>
                            {categories.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Sort */}
                    <select
                        className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary w-full md:w-48"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="featured">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Top Rated</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters (Desktop) */}
                <aside className="hidden md:block w-64 space-y-8 flex-shrink-0">
                    <div>
                        <h3 className="font-semibold mb-4 flex items-center">
                            <Filter className="h-4 w-4 mr-2" /> Categories
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <button
                                    onClick={() => handleCategoryChange('all')}
                                    className={cn(
                                        "text-sm hover:text-primary transition-colors w-full text-left",
                                        selectedCategory === 'all' ? "font-bold text-primary dark:text-accent" : "text-black dark:text-gray-400"
                                    )}
                                >
                                    All Products
                                </button>
                            </li>
                            {categories.map((category) => (
                                <li key={category.id}>
                                    <button
                                        onClick={() => handleCategoryChange(category.id)}
                                        className={cn(
                                            "text-sm hover:text-primary transition-colors w-full text-left",
                                            selectedCategory === category.id ? "font-bold text-primary dark:text-accent" : "text-black dark:text-gray-400"
                                        )}
                                    >
                                        {category.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <Link key={product.id} to={`/product/${product.id}`} className="group">
                                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-secondary dark:bg-gray-800 mb-4">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
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
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-lg text-black dark:text-gray-400">No products found in this category.</p>
                            <button
                                onClick={() => handleCategoryChange('all')}
                                className="mt-4 btn btn-outline"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shop;
