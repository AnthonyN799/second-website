import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Plus, Minus, ShoppingBag, Maximize2, X } from 'lucide-react';
import { getShopItemBySlug, getItemPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductIcon from '../components/ProductIcon';
import Toast from '../components/Toast';

export default function ProductPage() {
  const { slug } = useParams();
  const item = getShopItemBySlug(slug);
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(item?.sizes?.[0]?.label || null);
  const [selectedScent, setSelectedScent] = useState(item?.scents?.[0] || null);
  const [qty, setQty] = useState(1);
  const [expandedImage, setExpandedImage] = useState(null);
  const [toast, setToast] = useState(false);

  if (!item) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 pb-20 font-sans text-slate-900">
        <div className="max-w-2xl mx-auto px-6 text-center py-20">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/shop" className="inline-flex items-center px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold"><ArrowLeft className="w-5 h-5 mr-2" /> Back to Shop</Link>
        </div>
      </div>
    );
  }

  const price = getItemPrice(item, selectedSize);

  const handleAddToCart = () => {
    addItem(item, { size: selectedSize, scent: selectedScent, price }, qty);
    setToast(true);
    setQty(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
          <Link to="/shop" className="hover:text-slate-900 flex items-center"><ArrowLeft className="w-4 h-4 mr-1" /> Shop</Link>
          <span>/</span><span className="text-slate-900 font-medium">{item.name}</span>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex items-center justify-center">
            <div className="w-72 h-72 md:w-80 md:h-80 rounded-3xl border-[6px] border-slate-100 bg-white shadow-xl relative flex items-center justify-center overflow-hidden cursor-zoom-in group" onClick={() => item.image && setExpandedImage(item.image)}>
              {item.image ? (
                <><img src={item.image} alt={item.name} className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-300 mix-blend-multiply" />
                <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Maximize2 className="text-slate-900 w-8 h-8 opacity-50" /></div></>
              ) : <ProductIcon name={item.iconName} className={`w-24 h-24 ${item.iconColor}`} />}
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight mb-2">{item.name}</h1>
            <p className="text-slate-500 mb-4">{item.description}</p>
            <p className="text-3xl font-black text-emerald-600 mb-8">${price}</p>
            {item.sizes && (
              <div className="mb-6">
                <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Size</label>
                <div className="flex gap-2">{item.sizes.map(s => (
                  <button key={s.label} onClick={() => setSelectedSize(s.label)} className={`px-4 py-2 text-sm rounded-xl border font-medium ${selectedSize === s.label ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>{s.label} — ${s.price}</button>
                ))}</div>
              </div>
            )}
            {item.scents && (
              <div className="mb-6">
                <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Scent</label>
                <div className="relative">
                  <select className="text-sm bg-white border border-slate-200 rounded-xl px-4 py-3 pr-10 outline-none appearance-none cursor-pointer w-full" onChange={e => setSelectedScent(e.target.value)} value={selectedScent}>
                    {item.scents.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            )}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-slate-200 rounded-xl bg-white">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 text-slate-500 hover:text-slate-900"><Minus className="w-4 h-4" /></button>
                <span className="w-10 text-center font-bold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-3 text-slate-500 hover:text-slate-900"><Plus className="w-4 h-4" /></button>
              </div>
              <button onClick={handleAddToCart} className="flex-1 bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-slate-700 transition-colors flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 mr-2" /> Add to Cart — ${(price * qty).toFixed(2)}
              </button>
            </div>
            <div className="space-y-6">
              <div><h4 className="text-xs font-black uppercase text-slate-400 mb-2">How to Use</h4><p className="text-slate-600 text-sm leading-relaxed">{item.details?.usage}</p></div>
              <div><h4 className="text-xs font-black uppercase text-slate-400 mb-2">Ingredients</h4>
                <div className="flex flex-wrap gap-2">{item.details?.ingredients.map((ing, i) => <span key={i} className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600">{ing}</span>)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {expandedImage && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md cursor-zoom-out" onClick={() => setExpandedImage(null)}>
          <div className="relative w-full h-full max-w-4xl max-h-screen flex items-center justify-center">
            <img src={expandedImage} alt="Full size" className="max-w-full max-h-full object-contain drop-shadow-2xl rounded-2xl bg-white p-4" />
            <button className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white"><X className="w-8 h-8" /></button>
          </div>
        </div>
      )}
      <Toast message="Item added to cart" show={toast} onHide={() => setToast(false)} />
    </div>
  );
}
