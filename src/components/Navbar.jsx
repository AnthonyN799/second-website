import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${isScrolled || !isHome ? 'bg-white/90 backdrop-blur-md border-b border-slate-100 py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <Leaf className="text-white w-5 h-5" />
          </div>
          <span className="text-lg font-bold tracking-tight">THERAPEUTIC OILS</span>
        </Link>

        <div className="hidden md:flex items-center space-x-10 text-[13px] font-bold uppercase tracking-widest text-slate-500">
          {isHome && (
            <>
              <a href="#benefits" className="hover:text-slate-900 transition-colors">Why Us</a>
              <a href="#products" className="hover:text-slate-900 transition-colors">Products</a>
            </>
          )}
          <Link to="/shop" className="text-slate-900 hover:text-emerald-600 transition-colors font-black flex items-center">
            <ShoppingBag className="w-4 h-4 mr-1" /> SHOP
          </Link>
          {isHome && (
            <a href="#contact" className="px-5 py-2.5 bg-slate-900 text-white rounded-full hover:bg-slate-700 transition-all">Wholesale Inquiry</a>
          )}
          <Link to="/cart" className="relative p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ShoppingBag className="w-5 h-5 text-slate-900" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">{totalItems}</span>
            )}
          </Link>
        </div>

        <div className="flex md:hidden items-center space-x-3">
          <Link to="/shop" className="text-slate-900 font-bold text-xs uppercase tracking-wider">Shop</Link>
          <Link to="/cart" className="relative p-2">
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">{totalItems}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
