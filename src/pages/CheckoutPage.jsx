import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Banknote, CreditCard, Loader2, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { DELIVERY_FEE, WEB3FORMS_KEY } from '../data/products';
import ProductIcon from '../components/ProductIcon';

export default function CheckoutPage() {
  const { items, totalItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', address: '', notes: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const paymentMethod = 'Cash on Delivery';
  const deliveryFee = items.length > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 pb-20 font-sans text-slate-900">
        <div className="max-w-2xl mx-auto px-6 text-center py-20">
          <h1 className="text-2xl font-bold mb-4">Nothing to checkout</h1>
          <Link to="/shop" className="inline-flex items-center px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold"><ArrowLeft className="w-5 h-5 mr-2" /> Go to Shop</Link>
        </div>
      </div>
    );
  }

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.phone.trim()) e.phone = 'Required';
    else if (form.phone.replace(/\D/g, '').length < 7) e.phone = 'Invalid number';
    if (!form.address.trim()) e.address = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field, value) => {
    setForm(p => ({ ...p, [field]: value }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: undefined }));
  };

  const generateOrderRef = () => {
    const c = parseInt(localStorage.getItem('to_order_counter') || '1531', 10);
    localStorage.setItem('to_order_counter', String(c + 1));
    return `TO-${String(c).padStart(6, '0')}`;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    const orderRef = generateOrderRef();
    const itemLines = items.map(i => {
      let l = `${i.qty}x ${i.name}`;
      if (i.size) l += ` (${i.size})`;
      if (i.scent) l += ` - ${i.scent}`;
      l += ` — $${(i.price * i.qty).toFixed(2)}`;
      return l;
    }).join('\n');

    const msg = `ORDER: ${orderRef}\n\nCustomer: ${form.name}\nPhone: ${form.phone}\nAddress: ${form.address}\n${form.notes ? 'Notes: ' + form.notes + '\n' : ''}\nItems:\n${itemLines}\n\nSubtotal: $${subtotal.toFixed(2)}\nDelivery: $${deliveryFee.toFixed(2)}\nTOTAL: $${total.toFixed(2)}\nPayment: ${paymentMethod}`;

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: `New Order ${orderRef} — Therapeutic Oils`, from_name: form.name, message: msg }),
      });
      const result = await res.json();
      if (result.success) {
        sessionStorage.setItem('to_last_order', JSON.stringify({ ref: orderRef, items: [...items], subtotal, deliveryFee, total, customer: { ...form }, payment: paymentMethod, date: new Date().toISOString() }));
        clearCart();
        navigate('/order-confirmed');
      } else { alert('Issue submitting order. Please try again or contact us via WhatsApp.'); }
    } catch { alert('Network error. Please check your connection.'); }
    finally { setSubmitting(false); }
  };

  const inputClass = (field) => `w-full p-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 ring-slate-900/10 ${errors[field] ? 'border-red-300' : 'border-slate-200'}`;

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div><h1 className="text-3xl font-black tracking-tight">Checkout</h1><p className="text-slate-500 text-sm">{totalItems} item{totalItems !== 1 ? 's' : ''} — ${total.toFixed(2)}</p></div>
          <Link to="/cart" className="text-sm font-bold text-slate-500 hover:text-slate-900 flex items-center"><ArrowLeft className="w-4 h-4 mr-1" /> Back to Cart</Link>
        </div>
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="font-bold text-lg mb-6 flex items-center"><Truck className="w-5 h-5 mr-2 text-slate-400" /> Delivery Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-slate-500 ml-1 block mb-1">Full Name *</label>
                  <input type="text" className={inputClass('name')} placeholder="John Doe" value={form.name} onChange={e => handleChange('name', e.target.value)} />
                  {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-slate-500 ml-1 block mb-1">Phone Number *</label>
                  <input type="tel" className={inputClass('phone')} placeholder="03 123 456" value={form.phone} onChange={e => handleChange('phone', e.target.value)} />
                  {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-slate-500 ml-1 block mb-1">Delivery Address *</label>
                  <textarea rows={2} className={`${inputClass('address')} resize-none`} placeholder="City, Street, Building, Floor" value={form.address} onChange={e => handleChange('address', e.target.value)} />
                  {errors.address && <p className="text-red-500 text-xs mt-1 ml-1">{errors.address}</p>}
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-slate-500 ml-1 block mb-1">Order Notes (optional)</label>
                  <textarea rows={2} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 ring-slate-900/10 resize-none" placeholder="Special instructions..." value={form.notes} onChange={e => handleChange('notes', e.target.value)} />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="font-bold text-lg mb-6 flex items-center"><Banknote className="w-5 h-5 mr-2 text-slate-400" /> Payment Method</h2>
              <div className="p-4 rounded-xl border-2 border-slate-900 bg-slate-50 flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center"><Banknote className="w-5 h-5" /></div>
                <div><p className="font-bold text-sm">Cash on Delivery</p><p className="text-slate-500 text-xs">Pay when your order arrives</p></div>
                <div className="ml-auto w-5 h-5 bg-slate-900 rounded-full flex items-center justify-center"><div className="w-2 h-2 bg-white rounded-full" /></div>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center gap-4 mt-3 opacity-50 cursor-not-allowed">
                <div className="w-10 h-10 bg-slate-200 text-slate-400 rounded-xl flex items-center justify-center"><CreditCard className="w-5 h-5" /></div>
                <div><p className="font-bold text-sm text-slate-400">Credit / Debit Card</p><p className="text-slate-400 text-xs">Coming soon</p></div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sticky top-28">
              <h3 className="font-bold text-lg mb-4">Order Summary</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                {items.map(item => (
                  <div key={item.key} className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center overflow-hidden shrink-0 border border-slate-100">
                      {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-contain p-0.5 mix-blend-multiply" /> : <ProductIcon name={item.iconName} className={`w-4 h-4 ${item.iconColor}`} />}
                    </div>
                    <div className="flex-1 min-w-0"><p className="font-medium truncate">{item.name}</p><p className="text-slate-400 text-xs">{item.qty} × ${item.price}{item.scent ? ` · ${item.scent}` : ''}</p></div>
                    <span className="font-bold shrink-0">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-slate-500"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm text-slate-500"><span>Delivery</span><span>${deliveryFee.toFixed(2)}</span></div>
                <div className="flex justify-between pt-3 border-t border-slate-100"><span className="font-bold text-lg">Total</span><span className="font-black text-2xl text-emerald-600">${total.toFixed(2)}</span></div>
              </div>
              <button onClick={handleSubmit} disabled={submitting} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 mt-6 disabled:opacity-60 flex items-center justify-center">
                {submitting ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Placing Order...</> : 'Place Order'}
              </button>
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-400"><ShieldCheck className="w-4 h-4" /><span>Secure checkout · Order sent instantly</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
