"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, ShoppingCart } from 'lucide-react';

const LandingNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="h-16 bg-white border-b border-gray-100 sticky top-0 z-50" />;
    }

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-evenly h-16 items-center">
                    {/* Logo */}
                    <div className="shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-bold text-green-600">
                            FreshHaat
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link href="/shops" className="text-gray-600 hover:text-green-600 font-medium transition">
                            Shops
                        </Link>
                        <Link href="/farmers" className="text-gray-600 hover:text-green-600 font-medium transition">
                            Farmers
                        </Link>
                        <Link href="/about" className="text-gray-600 hover:text-green-600 font-medium transition">
                            About
                        </Link>
                    </div>
                    {/* hide this in mobile screen */}
                    <div className="hidden md:flex space-x-5 border-l pl-6 border-gray-200">
                        <Link href="/cart" className="text-green-600 hover:text-green-700 transition-colors">
                            <ShoppingCart size={24} fill="currentColor" />
                        </Link>
                        <Link href="/profile" className="text-green-600 hover:text-green-700 transition-colors">
                            <User size={24} fill="currentColor" />
                        </Link>
                    </div>

                    {/* Mobile Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-green-600 focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-1">
                    <Link href="/shops" className="block px-3 py-2 text-gray-600 hover:bg-green-50 rounded-md">Shops</Link>
                    <Link href="/farmers" className="block px-3 py-2 text-gray-600 hover:bg-green-50 rounded-md">Farmers</Link>
                    <Link href="/about" className="block px-3 py-2 text-gray-600 hover:bg-green-50 rounded-md">About</Link>
                    <Link href="/login" className="block px-3 py-2 text-green-600 font-bold">Sign In</Link>
                </div>
            )}
        </nav>
    );
};

export default LandingNav;