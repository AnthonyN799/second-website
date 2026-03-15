import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Package, ShoppingBag, Copy, Check } from 'lucide-react';
import ProductIcon from '../components/ProductIcon';

export default function OrderConfirmedPage() {
  const [order, setOrder] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => { try { const s = sessionStorage.getItem('to_last_order'); if (s) setOrder(JSON.parse(s)); } catch {} }, []);

  const copyRef = () => { if (order?.ref) { navigator.clipboard.writeText(order.ref); setCopied(true); setTimeout(() => setCopied(false), 2000); } };

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 pb-20 font-sans text-slate-900">
        <div className="max-w-2xl mx-auto px-6 text-center py-20">
          <h1 className="text-2xl font-bold mb-4">No recent order found</h1>
          <Link to="/shop" className="inline-flex items-center px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold"><ShoppingBag className="w-5 h-5 mr-2" /> Go to Shop</Link>
        </div>
      </div>
    );
  }

  const d = new Date(order.date);
  const dateStr = d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 font-sans text-slate-900">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="w-10 h-10 text-emerald-600" /></div>
          <h1 className="text-3xl font-black tracking-tight mb-2">Order Confirmed!</h1>
          <p className="text-slate-500">Thank you, {order.customer.name}. We'll be in touch shortly.</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div><p className="text-xs font-bold uppercase text-slate-400 mb-1">Order Reference</p><p className="text-2xl font-black tracking-tight">{order.ref}</p></div>
            <button onClick={copyRef} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg">{copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5 text-slate-400" />}</button>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><p className="text-slate-400 text-xs font-bold uppercase">Date</p><p className="font-medium">{dateStr}</p></div>
            <div><p className="text-slate-400 text-xs font-bold uppercase">Payment</p><p className="font-medium">{order.payment}</p></div>
            <div><p className="text-slate-400 text-xs font-bold uppercase">Phone</p><p className="font-medium">{order.customer.phone}</p></div>
            <div><p className="text-slate-400 text-xs font-bold uppercase">Delivery</p><p className="font-medium truncate">{order.customer.address}</p></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
          <h3 className="font-bold text-lg mb-4 flex items-center"><Package className="w-5 h-5 mr-2 text-slate-400" /> Order Items</h3>
          <div className="space-y-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center overflow-hidden shrink-0 border border-slate-100">
                  {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-contain p-0.5 mix-blend-multiply" /> : <ProductIcon name={item.iconName} className={`w-4 h-4 ${item.iconColor}`} />}
                </div>
                <div className="flex-1 min-w-0"><p className="font-medium truncate">{item.name}</p><p className="text-slate-400 text-xs">Qty: {item.qty}{item.size ? ` · ${item.size}` : ''}{item.scent ? ` · ${item.scent}` : ''}</p></div>
                <span className="font-bold shrink-0">${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-100 mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-sm text-slate-500"><span>Subtotal</span><span>${order.subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-sm text-slate-500"><span>Delivery</span><span>${order.deliveryFee.toFixed(2)}</span></div>
            <div className="flex justify-between pt-2 border-t border-slate-100"><span className="font-bold text-lg">Total</span><span className="font-black text-2xl text-emerald-600">${order.total.toFixed(2)}</span></div>
          </div>
        </div>
        <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-6 mb-8">
          <h4 className="font-bold text-emerald-900 mb-2">What happens next?</h4>
          <ul className="text-emerald-800 text-sm space-y-2">
            <li className="flex items-start gap-2"><span className="w-5 h-5 bg-emerald-200 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">1</span>Our team will review and confirm via phone.</li>
            <li className="flex items-start gap-2"><span className="w-5 h-5 bg-emerald-200 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">2</span>Your order will be prepared and dispatched.</li>
            <li className="flex items-start gap-2"><span className="w-5 h-5 bg-emerald-200 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">3</span>Pay cash upon delivery. Keep your reference handy!</li>
          </ul>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/shop" className="flex-1 py-4 bg-slate-900 text-white rounded-xl font-bold text-center hover:bg-slate-800">Continue Shopping</Link>
          <Link to="/" className="flex-1 py-4 border border-slate-200 text-slate-700 rounded-xl font-bold text-center hover:bg-slate-50">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
