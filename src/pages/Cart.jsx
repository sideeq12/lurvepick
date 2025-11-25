import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="container py-20 text-center">
                <h1 className="text-3xl font-bold font-heading mb-4 dark:text-white">Your Cart is Empty</h1>
                <p className="text-black dark:text-gray-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/shop" className="btn btn-primary">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-12">
            <h1 className="text-3xl font-bold font-heading mb-8 dark:text-white">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-6">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4 pb-6 border-b border-border dark:border-gray-700 last:border-0 last:pb-0">
                                <div className="relative w-24 h-24 bg-secondary dark:bg-gray-700 rounded-md overflow-hidden flex-shrink-0">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex-1 flex flex-col">
                                    <div className="flex justify-between">
                                        <h3 className="font-medium text-lg dark:text-white">{item.name}</h3>
                                        <p className="ml-4 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-black dark:text-gray-400 capitalize">{item.category}</p>

                                    <div className="flex flex-1 items-end justify-between text-sm">
                                        <div className="flex items-center border border-input rounded-md">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-1 hover:bg-secondary transition-colors"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </button>
                                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-1 hover:bg-secondary transition-colors"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => removeFromCart(item.id)}
                                            className="font-medium text-red-500 hover:text-red-600 flex items-center gap-1"
                                        >
                                            <Trash2 className="h-4 w-4" /> Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={clearCart}
                        className="text-sm text-black dark:text-gray-400 hover:text-foreground dark:hover:text-white underline"
                    >
                        Clear Cart
                    </button>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-bold font-heading mb-6 dark:text-white">Order Summary</h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-black dark:text-gray-400">Subtotal</p>
                                <p className="text-sm font-medium text-foreground">${cartTotal.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-black dark:text-gray-400">Shipping</p>
                                <p className="text-sm font-medium text-foreground">Free</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-black dark:text-gray-400">Tax</p>
                                <p className="text-sm font-medium text-foreground">${(cartTotal * 0.08).toFixed(2)}</p>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-border dark:border-gray-700">
                                <p className="text-lg font-bold dark:text-white">Total</p>
                                <p className="text-lg font-bold dark:text-white">${(cartTotal + cartTotal * 0.08).toFixed(2)}</p>
                            </div>
                        </div>

                        <button className="w-full mt-6 btn btn-primary h-12 text-base">
                            Checkout <ArrowRight className="ml-2 h-4 w-4" />
                        </button>

                        <p className="mt-4 text-xs text-center text-black dark:text-gray-400">
                            Secure Checkout - SSL Encrypted
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
