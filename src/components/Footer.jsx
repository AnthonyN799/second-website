import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, FileText, X } from 'lucide-react';

export default function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <footer className="py-20 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <Link to="/" className="flex items-center space-x-2 mb-8 md:mb-0">
              <Leaf className="w-6 h-6" />
              <span className="text-xl font-bold">THERAPEUTIC OILS</span>
            </Link>
            <div className="flex space-x-8 text-[11px] font-bold uppercase tracking-widest text-slate-400">
              <Link to="/shop" className="hover:text-slate-900 transition-colors">Shop</Link>
              <Link to="/about" className="hover:text-slate-900 transition-colors">About</Link>
              <button onClick={() => setShowPrivacy(true)} className="hover:text-slate-900 transition-colors">Privacy Policy</button>
            </div>
          </div>
          <div className="text-center text-slate-400 text-xs">
            © {new Date().getFullYear()} Therapeutic Oils. Formulated in Lebanon. Distributed Nationwide.
          </div>
        </div>
      </footer>

      {showPrivacy && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
          <div className="bg-white w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-[2rem] relative shadow-2xl p-8 md:p-12">
            <button onClick={() => setShowPrivacy(false)} className="absolute top-6 right-6 p-3 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors z-10">
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 bg-slate-100 rounded-xl"><FileText className="w-6 h-6 text-slate-900" /></div>
              <h2 className="text-2xl font-bold">Privacy Policy</h2>
            </div>
            <div className="prose prose-slate text-slate-600 text-sm leading-relaxed space-y-6">
              <p><strong>Effective Date:</strong> January 2026</p>
              <p>Therapeutic Oils ("we", "us", "our") respects your privacy. This Privacy Policy describes how we collect, use, and protect your information when you use our website or contact us for business inquiries in Lebanon.</p>
              <h4 className="text-slate-900 font-bold text-lg">1. Information We Collect</h4>
              <p>We collect information you voluntarily provide via our wholesale inquiry forms and online orders, including your Name, Phone Number, Delivery Address, and Email Address. We use this solely for order fulfillment and business-to-business (B2B) communication.</p>
              <h4 className="text-slate-900 font-bold text-lg">2. How We Use Your Information</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>To process and deliver your orders.</li>
                <li>To respond to your wholesale and product inquiries.</li>
                <li>To send requested catalogues or price lists.</li>
                <li>To coordinate deliveries within Lebanon.</li>
              </ul>
              <h4 className="text-slate-900 font-bold text-lg">3. Data Sharing</h4>
              <p>We do not sell, trade, or rent your personal identification information to others. We may use third-party service providers (such as Web3Forms for email processing and Vercel for hosting) to help us operate our business.</p>
              <h4 className="text-slate-900 font-bold text-lg">4. Contact Us</h4>
              <p>If you have any questions about this Privacy Policy, please contact us at:<br /><strong>to.laboratories@gmail.com</strong></p>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-100">
              <button onClick={() => setShowPrivacy(false)} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">Close Policy</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
