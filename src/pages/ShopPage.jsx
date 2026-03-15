import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Info, Maximize2, X, ChevronDown, Plus, Minus, ShoppingBag } from 'lucide-react';
import { shopItems, SHOP_CATEGORIES, getItemPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductIcon from '../components/ProductIcon';
import Toast from '../components/Toast';

export default function ShopPage() {
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selections, setSelections] = useState({});
  const [quantities, setQuantities] = useState({});
  const [viewProduct, setViewProduct] = useState(null);
  const [expandedImage, setExpandedImage] = useState(null);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    document.body.style.overflow = (viewProduct || expandedImage) ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [viewProduct, expandedImage]);

  const setSel = (id, type, val) => setSelections(p => ({ ...p, [id]: { ...p[id], [type]: val } }));
  const setQty = (id, d) => setQuantities(p => ({ ...p, [id]: Math.max(1, (p[id] || 1) + d) }));

  const getPrice = (item) => item.sizes ? getItemPrice(item, selections[item.id]?.size || item.sizes[0].label) : item.price;

  const handleAdd = (item) => {
    const size = item.sizes ? (selections[item.id]?.size || item.sizes[0].label) : null;
    const scent = item.scents ? (selections[item.id]?.scent || item.scents[0]) : null;
    addItem(item, { size, scent, price: getPrice(item) }, quantities[item.id] || 1);
    setToast(true);
    setQuantities(p => ({ ...p, [item.id]: 1 }));
    setViewProduct(null);
  };

  const filtered = activeCategory === 'All' ? shopItems : shopItems.filter(i => i.categories.includes(activeCategory));

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-8"><h1 className="text-3xl font-black tracking-tight mb-2">Shop Online</h1><p className="text-slate-500 text-sm">Cash on delivery available nationwide.</p></div>

        <div className="flex overflow-x-auto pb-4 mb-6 gap-2 no-scrollbar">
          {SHOP_CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap border ${activeCategory === cat ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>{cat}</button>
          ))}
        </div>

        <div className="space-y-6 mb-12">
          {filtered.map(item => (
            <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4 cursor-pointer" onClick={() => setViewProduct(item)}>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center overflow-hidden shrink-0 border border-slate-100">
                    {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1 mix-blend-multiply" /> : <ProductIcon name={item.iconName} className={`w-6 h-6 ${item.iconColor}`} />}
                  </div>
                  <div><h3 className="font-bold text-lg flex items-center">{item.name}<Info className="w-4 h-4 text-slate-400 ml-2" /></h3><p className="text-slate-500 text-sm">{item.description}</p></div>
                </div>
                <span className="font-black text-xl text-emerald-600">${getPrice(item)}</span>
              </div>
              <div className="space-y-3 mb-4">
                {item.sizes && (
                  <div className="flex items-center space-x-2"><span className="text-xs font-bold uppercase text-slate-400 w-12">Size:</span><div className="flex space-x-2">
                    {item.sizes.map(s => <button key={s.label} onClick={() => setSel(item.id, 'size', s.label)} className={`px-3 py-1 text-xs rounded-full border ${(selections[item.id]?.size || item.sizes[0].label) === s.label ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200'}`}>{s.label}</button>)}
                  </div></div>
                )}
                {item.scents && (
                  <div className="flex items-center space-x-2"><span className="text-xs font-bold uppercase text-slate-400 w-12">Scent:</span><div className="relative">
                    <select className="text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-1 pr-8 outline-none appearance-none cursor-pointer" onChange={e => setSel(item.id, 'scent', e.target.value)} value={selections[item.id]?.scent || item.scents[0]}>
                      {item.scents.map(s => <option key={s} value={s}>{s}</option>)}
                    </select><ChevronDown className="w-4 h-4 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div></div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                  <button onClick={() => setQty(item.id, -1)} className="px-3 py-3 text-slate-500 hover:text-slate-900"><Minus className="w-4 h-4" /></button>
                  <span className="w-8 text-center font-bold text-sm">{quantities[item.id] || 1}</span>
                  <button onClick={() => setQty(item.id, 1)} className="px-3 py-3 text-slate-500 hover:text-slate-900"><Plus className="w-4 h-4" /></button>
                </div>
                <button onClick={() => handleAdd(item)} className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-700 flex items-center justify-center">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
        <Link to="/cart" className="block w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-center hover:bg-slate-800 shadow-lg"><ShoppingBag className="w-5 h-5 inline mr-2" />View Cart & Checkout</Link>
      </div>

      {viewProduct && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-3xl p-8 relative shadow-2xl">
            <button onClick={() => setViewProduct(null)} className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 rounded-full z-10"><X className="w-5 h-5" /></button>
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-48 h-48 rounded-full border-[6px] border-slate-100 bg-white shadow-xl relative flex items-center justify-center overflow-hidden mb-6 group cursor-zoom-in" onClick={() => viewProduct.image && setExpandedImage(viewProduct.image)}>
                {viewProduct.image ? <><img src={viewProduct.image} alt={viewProduct.name} className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform mix-blend-multiply" /><div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Maximize2 className="text-slate-900 w-8 h-8 opacity-50" /></div></> : <ProductIcon name={viewProduct.iconName} className={`w-16 h-16 ${viewProduct.iconColor}`} />}
              </div>
              <h2 className="text-3xl font-bold mb-1">{viewProduct.name}</h2>
              <p className="text-emerald-600 font-bold text-2xl">${getPrice(viewProduct)}</p>
            </div>
            <div className="space-y-8 text-left">
              <div><h4 className="text-xs font-black uppercase text-slate-400 mb-2">Description</h4><p className="text-slate-600 text-sm leading-relaxed">{viewProduct.description}. {viewProduct.details?.usage}</p></div>
              <div><h4 className="text-xs font-black uppercase text-slate-400 mb-2">Ingredients</h4><div className="flex flex-wrap gap-2">{viewProduct.details?.ingredients.map((ing, i) => <span key={i} className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600">{ing}</span>)}</div></div>
              <div className="pt-6 border-t border-slate-100"><button onClick={() => handleAdd(viewProduct)} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-700 shadow-lg">Add to Cart — ${getPrice(viewProduct)}</button></div>
            </div>
          </div>
        </div>
      )}
      {expandedImage && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md cursor-zoom-out" onClick={() => setExpandedImage(null)}>
          <img src={expandedImage} alt="Full size" className="max-w-full max-h-full object-contain drop-shadow-2xl rounded-2xl bg-white p-4" />
        </div>
      )}
      <Toast message="Item added to cart" show={toast} onHide={() => setToast(false)} />
    </div>
  );
}
