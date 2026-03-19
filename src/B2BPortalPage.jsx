import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Wind, Flame, Sparkles, ShieldCheck, Mail, Phone, Leaf, Maximize2, X, Users, CheckCircle2, ArrowRight, MessageSquare, Activity, ShoppingBag, Heart } from 'lucide-react';
import { heroSlides, landingProducts, faqs, WEB3FORMS_KEY } from '../data/products';
import ProductIcon from '../components/ProductIcon';

export default function B2BPortalPage() {
  const [selectedHeroSlide, setSelectedHeroSlide] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const onTouchStart = (e) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const d = touchStart - touchEnd;
    if (d > 50) setCurrentSlide(p => (p + 1) % heroSlides.length);
    if (d < -50) setCurrentSlide(p => (p - 1 + heroSlides.length) % heroSlides.length);
  };

  useEffect(() => {
    document.body.style.overflow = (selectedProduct || selectedHeroSlide) ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProduct, selectedHeroSlide]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 scroll-smooth">
      {/* HERO */}
      <header className="relative min-h-screen flex items-center pt-28 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-50 rounded-full blur-[120px] opacity-60" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-50 rounded-full blur-[120px] opacity-60" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-100 rounded-full text-slate-600 text-[11px] font-bold uppercase tracking-widest mb-6 w-fit">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /><span>Professional Physiotherapy Solutions</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-[0.95] mb-6 tracking-tighter">
              Performance <br />Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 italic font-light">Botanicals.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-lg">The professional choice for manual therapy. Our high-performance gels and oils bridge the gap between clinical efficacy and natural skin care.</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center hover:shadow-2xl hover:bg-slate-800 transition-all group">Shop Online <ShoppingBag className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" /></Link>
              <a href="#contact" className="px-8 py-4 border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all">Wholesale</a>
            </div>
            <div className="mt-10 flex items-center space-x-6">
              <div className="flex -space-x-3">{[1,2,3,4].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center"><Users className="w-5 h-5 text-slate-400" /></div>)}</div>
              <p className="text-sm font-medium text-slate-500">Trusted by <span className="text-slate-900 font-bold">professionals</span> across Lebanon</p>
            </div>
          </div>
          {/* Swipable Card */}
          <div className="relative h-[500px] w-full max-w-md mx-auto mt-8 lg:mt-0" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            {heroSlides.map((slide, i) => (
              <div key={slide.id} className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${i === currentSlide ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-8 z-0'}`}>
                <div className="relative w-full h-full">
                  <div className={`absolute inset-0 bg-gradient-to-tr from-slate-200 to-slate-50 rounded-[3rem] rotate-6`} />
                  <div className={`absolute inset-0 ${slide.color} border border-slate-100 rounded-[3rem] flex flex-col items-center justify-center p-6 text-center shadow-2xl`}>
                    <div className="flex-1 flex items-center justify-center w-full py-4">
                      {slide.image && (
                        <div className="w-56 h-56 rounded-full border-[6px] border-white bg-white shadow-xl relative flex items-center justify-center overflow-hidden cursor-pointer group hover:scale-105 transition-transform duration-300" onClick={() => setSelectedHeroSlide(slide)}>
                          <img src={slide.image} alt={slide.name} className="w-full h-full object-contain p-2 group-hover:opacity-90 transition-opacity" />
                          <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Maximize2 className="text-white w-8 h-8 drop-shadow-lg" /></div>
                        </div>
                      )}
                    </div>
                    <div className="pb-6 pointer-events-none">
                      <h3 className="text-2xl font-bold mb-3">{slide.name}</h3>
                      <div className="flex items-center space-x-1 mb-4 justify-center">{[1,2,3,4,5].map(j => <Sparkles key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />)}</div>
                      <p className="text-slate-500 text-sm italic px-4 leading-relaxed">"{slide.quote}" ~{slide.author} - {slide.role}</p>
                      <div className="mt-6 pt-6 border-t border-slate-100 w-full"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Featured Product</span></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="absolute -bottom-12 left-0 right-0 flex justify-center space-x-4 z-20">
              {heroSlides.map((_, i) => <button key={i} onClick={() => setCurrentSlide(i)} className={`h-3 rounded-full transition-all duration-300 ${i === currentSlide ? 'bg-slate-900 w-10' : 'bg-slate-300 w-3'}`} />)}
            </div>
            <div className="absolute bottom-4 right-8 lg:hidden animate-pulse"><ArrowRight className="w-5 h-5 text-slate-300" /></div>
          </div>
        </div>
      </header>

      {/* Hero Slide Modal */}
      {selectedHeroSlide && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md cursor-zoom-out" onClick={() => setSelectedHeroSlide(null)}>
          <div className="relative w-full max-w-2xl bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl cursor-default" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedHeroSlide(null)} className="absolute top-6 right-6 p-3 bg-slate-100 hover:bg-slate-200 rounded-full z-10"><X className="w-6 h-6" /></button>
            <div className="flex flex-col items-center text-center">
              {selectedHeroSlide.image && <div className="w-full h-80 md:h-96 flex items-center justify-center mb-8"><img src={selectedHeroSlide.image} alt={selectedHeroSlide.name} className="w-full h-full object-contain drop-shadow-2xl" /></div>}
              <h3 className="text-3xl md:text-4xl font-bold mb-4">{selectedHeroSlide.name}</h3>
              <div className="flex space-x-1 mb-6 justify-center">{[1,2,3,4,5].map(j => <Sparkles key={j} className="w-5 h-5 text-amber-400 fill-amber-400" />)}</div>
              <blockquote className="text-slate-600 text-xl italic leading-relaxed max-w-lg">"{selectedHeroSlide.quote}" ~{selectedHeroSlide.author}</blockquote>
            </div>
          </div>
        </div>
      )}

      {/* Social Proof */}
      <section className="bg-slate-50 py-12 border-y border-slate-100 overflow-hidden"><div className="flex w-max animate-scroll">{[1,2].map(i => <div key={i} className="flex space-x-24 px-12 shrink-0">{['PHYSIOTHERAPY CENTERS','ELITE RECOVERY','SPORTS CENTERS','CLINICS AND MORE','WELLNESS LABS','MANUAL THERAPY'].map((n,j) => <span key={j} className="text-xl md:text-2xl font-black tracking-tighter italic opacity-40 text-slate-900">{n}</span>)}</div>)}</div></section>

      {/* Benefits */}
      <section id="benefits" className="py-24 md:py-32 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-24"><h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Engineered for the Professional Hand</h2><p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">We aim to build strategic partnerships with local practitioners through comprehensive packages and high-performance formulations.</p></div>
        <div className="grid md:grid-cols-3 gap-12">
          {[{icon:<Activity className="w-8 h-8"/>,bg:'bg-blue-50 text-blue-600',t:'Precision Glide',d:'Perfectly calibrated viscosity allows for deep tissue work without excessive slipperiness or early drying.'},{icon:<Leaf className="w-8 h-8"/>,bg:'bg-emerald-50 text-emerald-600',t:'Non-Sensitizing',d:'Tested formulations that minimize skin irritation for therapists who apply product 20+ times a day.'},{icon:<ShieldCheck className="w-8 h-8"/>,bg:'bg-purple-50 text-purple-600',t:'Cosmetic Compliance',d:'Pure botanical extracts that meet strict safety standards, ensuring a premium experience for your clients.'}].map((b,i) => (
            <div key={i} className="group"><div className={`w-16 h-16 ${b.bg} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>{b.icon}</div><h4 className="text-xl font-bold mb-4">{b.t}</h4><p className="text-slate-500 leading-relaxed">{b.d}</p></div>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-t border-slate-100 bg-slate-50/50"><div className="max-w-7xl mx-auto px-6 py-12"><div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[{icon:<Heart className="w-6 h-6"/>,bg:'bg-pink-50 text-pink-500',l:'Cruelty Free'},{icon:<ShieldCheck className="w-6 h-6"/>,bg:'bg-emerald-50 text-emerald-500',l:'Paraben Free'},{icon:<Wind className="w-6 h-6"/>,bg:'bg-blue-50 text-blue-500',l:'Silicone Free'}].map((b,i) => (
          <div key={i} className="flex items-center justify-center space-x-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow"><div className={`p-2 ${b.bg} rounded-full`}>{b.icon}</div><p className="font-bold text-slate-900">{b.l}</p></div>
        ))}
      </div></div></section>

      {/* Product Grid */}
      <section id="products" className="py-24 md:py-32 bg-slate-900 text-white rounded-[3rem] md:rounded-[4rem] mx-4 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-32 opacity-10 pointer-events-none"><Droplets className="w-96 h-96" /></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20"><div className="max-w-xl"><span className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 mb-4 block">Our Formulations</span><h2 className="text-4xl md:text-6xl font-bold leading-tight">Tailored solutions for every therapy style.</h2></div></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {landingProducts.map(p => (
              <div key={p.id} className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer" onClick={() => setSelectedProduct(p)}>
                <div className="flex justify-between items-start mb-8"><div className={`p-4 rounded-2xl bg-white/10 ${p.colorClasses.accent}`}><ProductIcon name={p.iconName} className="w-6 h-6" /></div><Maximize2 className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" /></div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 block">{p.category}</span>
                <h3 className="text-2xl font-bold mb-3">{p.name}</h3>
                <p className="text-slate-400 text-sm mb-6 line-clamp-2">{p.tagline}</p>
                <div className="text-xs font-bold text-slate-500 border-t border-white/5 pt-6">{p.packaging}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] relative shadow-2xl">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 p-3 bg-slate-100 hover:bg-slate-200 rounded-full z-10"><X className="w-6 h-6" /></button>
            <div className="grid md:grid-cols-2">
              <div className={`p-12 ${selectedProduct.colorClasses.bg} flex flex-col justify-center`}>
                <div className={`p-8 rounded-[2rem] bg-white shadow-xl mb-8 w-fit ${selectedProduct.colorClasses.accent}`}><ProductIcon name={selectedProduct.iconName} className="w-24 h-24" /></div>
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-4">Professional Overview</h4>
                <p className="text-slate-600 text-xl leading-relaxed font-medium">"{selectedProduct.description}"</p>
              </div>
              <div className="p-12">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">{selectedProduct.category}</span>
                <h2 className="text-4xl font-bold mb-4">{selectedProduct.name}</h2>
                <p className={`text-lg font-bold ${selectedProduct.colorClasses.accent} mb-8`}>{selectedProduct.tagline}</p>
                <div className="space-y-8">
                  <div><h5 className="text-xs font-black uppercase text-slate-900 mb-4 flex items-center"><CheckCircle2 className="w-4 h-4 mr-2" /> Key Benefits</h5><ul className="space-y-3">{selectedProduct.keyFeatures.map((f,i) => <li key={i} className="flex items-center text-slate-600 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-slate-900 mr-3" />{f}</li>)}</ul></div>
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100"><h5 className="text-xs font-black uppercase text-slate-900 mb-2">Usage Guide</h5><p className="text-slate-500 text-sm leading-relaxed">{selectedProduct.usage}</p></div>
                  <Link to="/shop" onClick={() => setSelectedProduct(null)} className="block w-full py-5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 text-center">Shop This Product</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAQ */}
      <section id="faq" className="py-24 md:py-32 bg-white max-w-4xl mx-auto px-6">
        <div className="text-center mb-20"><h2 className="text-4xl font-bold mb-4">Common Questions</h2><p className="text-slate-500">Everything you need to know about our partnership.</p></div>
        <div className="space-y-6">{faqs.map((f,i) => <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100"><h4 className="text-lg font-bold mb-4 flex items-center"><MessageSquare className="w-5 h-5 mr-3 text-slate-400" />{f.q}</h4><p className="text-slate-600 leading-relaxed text-sm ml-8">{f.a}</p></div>)}</div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 md:py-32 px-4">
        <div className="max-w-6xl mx-auto bg-slate-950 rounded-[3rem] md:rounded-[4rem] p-8 md:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
          <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter leading-none">Elevate your practice <span className="text-slate-600">today.</span></h2>
              <p className="text-slate-400 text-lg mb-12">Join our network of elite physiotherapy clinics. Leave your details to receive our professional catalogue and a complimentary sample pack.</p>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 text-white"><div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center"><Phone className="w-5 h-5" /></div><div><p className="text-xs text-slate-500 font-bold uppercase">Direct Line</p><p className="font-bold">+961 03 203 567</p></div></div>
                <div className="flex items-center space-x-4 text-white"><div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center"><Mail className="w-5 h-5" /></div><div><p className="text-xs text-slate-500 font-bold uppercase">Wholesale Dept</p><p className="font-bold">to.laboratories@gmail.com</p></div></div>
              </div>
            </div>
            <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-2xl shadow-black/50">
              <form className="space-y-4" action="https://api.web3forms.com/submit" method="POST">
                <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
                <input type="hidden" name="subject" value="New Wholesale Inquiry - Therapeutic Oils" />
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-slate-400 ml-2">Your Name</label><input type="text" name="name" required className="w-full px-5 py-3.5 bg-slate-50 rounded-xl border border-slate-100 outline-none focus:ring-2 ring-slate-900/5 text-sm" placeholder="John Doe" /></div>
                  <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-slate-400 ml-2">Clinic Name</label><input type="text" name="clinic" className="w-full px-5 py-3.5 bg-slate-50 rounded-xl border border-slate-100 outline-none focus:ring-2 ring-slate-900/5 text-sm" placeholder="Elite Physio" /></div>
                </div>
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-slate-400 ml-2">Work Email</label><input type="email" name="email" required className="w-full px-5 py-3.5 bg-slate-50 rounded-xl border border-slate-100 outline-none focus:ring-2 ring-slate-900/5 text-sm" placeholder="john@clinic.com" /></div>
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-slate-400 ml-2">Phone Number</label><input type="tel" name="phone" className="w-full px-5 py-3.5 bg-slate-50 rounded-xl border border-slate-100 outline-none focus:ring-2 ring-slate-900/5 text-sm" placeholder="03 123 456" /></div>
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-slate-400 ml-2">Message</label><textarea rows="3" name="message" required className="w-full px-5 py-3.5 bg-slate-50 rounded-xl border border-slate-100 outline-none focus:ring-2 ring-slate-900/5 text-sm resize-none" placeholder="How can we help?" /></div>
                <button type="submit" className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 shadow-lg shadow-slate-900/20 mt-4">Request B2B Pricing</button>
                <p className="text-[10px] text-center text-slate-400 mt-4">Sample requests are subject to availability. Regional delivery only.</p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
