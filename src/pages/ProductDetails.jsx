import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Star, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const product = products.find((p) => p.id === parseInt(id));
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return (
            <div className="container py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Product not found</h2>
                <Link to="/shop" className="btn btn-primary">
                    Back to Shop
                </Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
    };

    return (
        <div className="container py-12">
            <Link to="/shop" className="inline-flex items-center text-black dark:text-gray-400 hover:text-primary dark:hover:text-accent mb-8 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Shop
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                {/* Product Image */}
                <div className="relative aspect-square bg-secondary dark:bg-gray-800 rounded-lg overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Product Info */}
                <div className="flex flex-col justify-center space-y-8">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-black dark:text-gray-400 uppercase tracking-wider">
                                {product.category}
                            </span>
                            <div className="flex items-center text-yellow-500">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="ml-1 text-foreground font-medium">{product.rating}</span>
                                <span className="ml-1 text-black dark:text-gray-400 text-sm">({product.reviews} reviews)</span>
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold font-heading mb-4 dark:text-white">{product.name}</h1>
                        <p className="text-2xl font-medium text-primary dark:text-accent">${product.price}</p>
                    </div>

                    <p className="text-black dark:text-gray-300 leading-relaxed text-lg">
                        {product.description}
                    </p>

                    <div className="space-y-6 pt-6 border-t border-border">
                        {/* Quantity */}
                        <div className="flex items-center space-x-4">
                            <span className="font-medium dark:text-white">Quantity:</span>
                            <div className="flex items-center border border-input rounded-md">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-2 hover:bg-secondary transition-colors"
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="h-4 w-4" />
                                </button>
                                <span className="w-12 text-center font-medium dark:text-white">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-2 hover:bg-secondary transition-colors"
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 btn btn-primary h-14 text-lg"
                            >
                                <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
                            </button>
                            <button className="btn btn-outline h-14 px-6">
                                <Star className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Features (Static) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 text-sm text-black dark:text-gray-300">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            Free shipping over $100
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            30-day return policy
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            Secure checkout
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            24/7 customer support
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
