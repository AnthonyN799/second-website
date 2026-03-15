import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { DELIVERY_FEE } from '../data/products';
import ProductIcon from '../components/ProductIcon';

export default function CartPage() {
  const { items, updateQty, removeItem, totalItems, subtotal } = useCart();
  const deliveryFee = items.length > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 pb-20 font-sans text-slate-900">
        <div className="max-w-2xl mx-auto px-6 text-center py-20">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6"><ShoppingBag className="w-10 h-10 text-slate-300" /></div>
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-slate-500 mb-8">Browse our shop to find the perfect products.</p>
          <Link to="/shop" className="inline-flex items-center px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold"><ArrowLeft className="w-5 h-5 mr-2" /> Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 font-sans text-slate-900">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div><h1 className="text-3xl font-black tracking-tight">Your Cart</h1><p className="text-slate-500 text-sm">{totalItems} item{totalItems !== 1 ? 's' : ''}</p></div>
          <Link to="/shop" className="text-sm font-bold text-slate-500 hover:text-slate-900 flex items-center"><ArrowLeft className="w-4 h-4 mr-1" /> Continue Shopping</Link>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm mb-8 divide-y divide-slate-100">
          {items.map((item) => (
            <div key={item.key} className="p-6 flex items-center gap-4">
              <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center overflow-hidden shrink-0 border border-slate-100">
                {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1 mix-blend-multiply" /> : <ProductIcon name={item.iconName} className={`w-6 h-6 ${item.iconColor}`} />}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm truncate">{item.name}</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {item.size && <span className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded">{item.size}</span>}
                  {item.scent && <span className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded">{item.scent}</span>}
                </div>
                <p className="text-emerald-600 font-bold text-sm mt-1">${item.price}</p>
              </div>
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                <button onClick={() => updateQty(item.key, item.qty - 1)} className="px-2.5 py-2 text-slate-500 hover:text-slate-900"><Minus className="w-3.5 h-3.5" /></button>
                <span className="w-8 text-center font-bold text-sm">{item.qty}</span>
                <button onClick={() => updateQty(item.key, item.qty + 1)} className="px-2.5 py-2 text-slate-500 hover:text-slate-900"><Plus className="w-3.5 h-3.5" /></button>
              </div>
              <div className="text-right shrink-0">
                <p className="font-black text-sm">${(item.price * item.qty).toFixed(2)}</p>
                <button onClick={() => removeItem(item.key)} className="text-red-400 hover:text-red-600 mt-1"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-8">
          <h3 className="font-bold text-lg mb-4">Order Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-slate-500"><span>Subtotal ({totalItems} items)</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-sm text-slate-500"><span>Delivery</span><span>${deliveryFee.toFixed(2)}</span></div>
            <div className="flex justify-between pt-3 border-t border-slate-100"><span className="font-bold text-lg">Total</span><span className="font-black text-2xl text-emerald-600">${total.toFixed(2)}</span></div>
          </div>
        </div>
        <Link to="/checkout" className="block w-full py-5 bg-slate-900 text-white rounded-2xl font-bold text-center hover:bg-slate-800 transition-all shadow-lg text-lg">
          Proceed to Checkout <ArrowRight className="w-5 h-5 inline ml-2" />
        </Link>
        <p className="text-xs text-center text-slate-400 mt-4">Cash on Delivery available nationwide in Lebanon.</p>
      </div>
    </div>
  );
}
