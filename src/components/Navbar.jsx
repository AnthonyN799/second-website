import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, ShoppingBag, Building2 } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isB2B = location.pathname === '/b2b';
  const isShop = location.pathname === '/shop' || location.pathname.startsWith('/product/');
  const hasHero = isHome || isB2B; // transparent header on hero pages

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${isScrolled || !hasHero ? 'bg-white/90 backdrop-blur-md border-b border-slate-100 py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <Leaf className="text-white w-5 h-5" />
          </div>
          <span className="text-lg font-bold tracking-tight">THERAPEUTIC OILS</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-10 text-[13px] font-bold uppercase tracking-widest text-slate-500">
          {/* B2B page anchor links */}
          {isB2B && (
            <>
              <a href="#benefits" className="hover:text-slate-900 transition-colors">Why Us</a>
              <a href="#products" className="hover:text-slate-900 transition-colors">Products</a>
            </>
          )}

          {/* Always-visible links */}
          <Link to="/shop" className={`transition-colors flex items-center ${isShop ? 'text-slate-900 font-black' : 'text-slate-300 hover:text-slate-900 font-bold'}`}>
            <ShoppingBag className="w-4 h-4 mr-1" /> SHOP
          </Link>

          <Link to="/b2b" className={`transition-colors flex items-center ${isB2B ? 'text-slate-900 font-black' : 'text-slate-300 hover:text-slate-900 font-bold'}`}>
            <Building2 className="w-4 h-4 mr-1" /> B2B PORTAL
          </Link>

          {isB2B && (
            <a href="#contact" className="px-5 py-2.5 bg-slate-900 text-white rounded-full hover:bg-slate-700 transition-all">Wholesale Inquiry</a>
          )}

          <Link to="/cart" className="relative p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ShoppingBag className="w-5 h-5 text-slate-900" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">{totalItems}</span>
            )}
          </Link>
        </div>

        {/* Mobile nav */}
        <div className="flex md:hidden items-center space-x-3">
          <Link to="/shop" className={`font-bold text-xs uppercase tracking-wider ${isShop ? 'text-slate-900' : 'text-slate-300'}`}>Shop</Link>
          <Link to="/b2b" className={`font-bold text-xs uppercase tracking-wider ${isB2B ? 'text-slate-900' : 'text-slate-300'}`}>B2B</Link>
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
