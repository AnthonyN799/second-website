import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag, Building2, ArrowRight, Leaf, ShieldCheck,
  Wind, Heart, Users, ChevronRight, Zap
} from 'lucide-react';
import { shopItems } from '../data/products';
import ProductIcon from '../components/ProductIcon';

/* ── tiny fade-in-on-scroll hook ── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── featured products (first 4 from shop) ── */
const featured = shopItems.slice(0, 4);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">

      {/* ═══════════════  HERO  ═══════════════ */}
      <header className="relative min-h-screen flex items-center overflow-hidden">
        {/* ambient blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-15%] left-[-10%] w-[55%] h-[55%] bg-emerald-50 rounded-full blur-[140px] opacity-70" />
          <div className="absolute bottom-[-10%] right-[-8%] w-[50%] h-[50%] bg-blue-50 rounded-full blur-[120px] opacity-60" />
          <div className="absolute top-[40%] left-[50%] w-[30%] h-[30%] bg-amber-50 rounded-full blur-[100px] opacity-40" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 pt-32 pb-20 w-full">
          <Reveal>
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-slate-100 rounded-full text-slate-600 text-[11px] font-bold uppercase tracking-widest mb-8 w-fit">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span>Therapeutic Oils — Lebanon</span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] font-black text-slate-900 leading-[0.92] tracking-tighter max-w-4xl mb-8">
              Nature's finest,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                formulated
              </span>{' '}
              for performance.
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl mb-12">
              High-performance gels, oils, and creams trusted by physiotherapists and loved by everyone.
              Whether you run a clinic or want professional-grade care at home — we've got you covered.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="group px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center hover:shadow-2xl hover:bg-slate-800 transition-all"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Shop Now
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/b2b"
                className="group px-8 py-4 border-2 border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center"
              >
                <Building2 className="w-5 h-5 mr-2 text-slate-400" />
                B2B Portal
                <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>

          {/* trust strip */}
          <Reveal delay={0.32}>
            <div className="mt-16 flex flex-wrap items-center gap-8 text-sm text-slate-400 font-medium">
              {[
                { icon: <Heart className="w-4 h-4" />, t: 'Cruelty Free' },
                { icon: <ShieldCheck className="w-4 h-4" />, t: 'Paraben Free' },
                { icon: <Wind className="w-4 h-4" />, t: 'Silicone Free' },
                { icon: <Leaf className="w-4 h-4" />, t: 'Botanical Formulas' },
              ].map((b, i) => (
                <span key={i} className="flex items-center gap-2">
                  {b.icon} {b.t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </header>

      {/* ═══════════════  MARQUEE  ═══════════════ */}
      <section className="bg-slate-50 py-10 border-y border-slate-100 overflow-hidden">
        <div className="flex w-max animate-scroll">
          {[1, 2].map(i => (
            <div key={i} className="flex space-x-20 px-10 shrink-0">
              {[
                'PHYSIOTHERAPY', 'SPORTS RECOVERY', 'WELLNESS', 'MASSAGE',
                'DEEP TISSUE', 'BOTANICAL', 'PROFESSIONAL CARE',
              ].map((n, j) => (
                <span key={j} className="text-xl md:text-2xl font-black tracking-tighter italic opacity-30 text-slate-900 select-none">
                  {n}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════  TWO PATHS  ═══════════════ */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-4 block">Who We Serve</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Two worlds.&nbsp;One standard.</h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          {/* B2C card */}
          <Reveal delay={0.1}>
            <Link to="/shop" className="group relative p-10 md:p-12 rounded-[2.5rem] border border-slate-100 bg-gradient-to-br from-white to-slate-50 overflow-hidden hover:shadow-xl transition-all duration-500 block h-full">
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-50 rounded-full blur-[80px] opacity-60 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">For You</h3>
                <p className="text-slate-500 leading-relaxed mb-8 max-w-sm">
                  Professional-grade massage oils, cooling gels, and warming creams — available for home use.
                  Treat yourself to what the pros use.
                </p>
                <span className="inline-flex items-center text-sm font-bold text-emerald-600 group-hover:gap-3 gap-2 transition-all">
                  Browse the Shop <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </Reveal>

          {/* B2B card */}
          <Reveal delay={0.2}>
            <Link to="/b2b" className="group relative p-10 md:p-12 rounded-[2.5rem] border border-slate-800 bg-slate-900 overflow-hidden hover:shadow-xl hover:shadow-slate-900/20 transition-all duration-500 block h-full">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">For Professionals</h3>
                <p className="text-slate-400 leading-relaxed mb-8 max-w-sm">
                  Wholesale pricing, clinic partnerships, and dedicated support for physiotherapists,
                  sports centers, and wellness studios.
                </p>
                <span className="inline-flex items-center text-sm font-bold text-white group-hover:gap-3 gap-2 transition-all">
                  Open B2B Portal <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════  FEATURED PRODUCTS  ═══════════════ */}
      <section className="py-24 md:py-32 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-16">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-4 block">Featured</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Best sellers</h2>
              </div>
              <Link to="/shop" className="text-sm font-bold text-slate-500 hover:text-slate-900 flex items-center gap-2 transition-colors">
                View all products <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((item, i) => (
              <Reveal key={item.id} delay={0.08 * i}>
                <Link
                  to={`/product/${item.slug}`}
                  className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300 block"
                >
                  <div className="aspect-square bg-slate-50 flex items-center justify-center p-8 relative overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className={`w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center ${item.iconColor}`}>
                        <ProductIcon name={item.iconName} className="w-10 h-10" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-1">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-black">
                        {item.price ? `$${item.price}` : `From $${item.sizes?.[0]?.price}`}
                      </span>
                      <span className="text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        View <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════  WHY US (shared value props)  ═══════════════ */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Why Therapeutic Oils?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
              Every formula is designed to perform — in the clinic and at home.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              icon: <Zap className="w-7 h-7" />,
              bg: 'bg-amber-50 text-amber-600',
              t: 'Clinical-Grade Quality',
              d: 'Developed for physiotherapists who need precise viscosity, sustained sensation, and skin-safe formulations — now available to everyone.',
            },
            {
              icon: <Leaf className="w-7 h-7" />,
              bg: 'bg-emerald-50 text-emerald-600',
              t: 'Pure Botanicals',
              d: 'Natural essential oils and plant-derived actives. No parabens, no silicones, no synthetic fragrances. Just effective ingredients.',
            },
            {
              icon: <Users className="w-7 h-7" />,
              bg: 'bg-blue-50 text-blue-600',
              t: 'Trusted by Professionals',
              d: 'Used daily across physiotherapy clinics, sports rehab centers, and wellness studios throughout Lebanon.',
            },
          ].map((b, i) => (
            <Reveal key={i} delay={0.1 * i}>
              <div className="group">
                <div className={`w-16 h-16 ${b.bg} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  {b.icon}
                </div>
                <h4 className="text-xl font-bold mb-4">{b.t}</h4>
                <p className="text-slate-500 leading-relaxed">{b.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════  B2B BANNER  ═══════════════ */}
      <section className="px-4 pb-24 md:pb-32">
        <Reveal>
          <div className="max-w-6xl mx-auto bg-slate-950 rounded-[3rem] md:rounded-[4rem] p-10 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
              <div className="max-w-xl">
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 rounded-full text-white/60 text-[11px] font-bold uppercase tracking-widest mb-6 w-fit">
                  <Building2 className="w-3 h-3" />
                  <span>B2B Partnerships</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
                  Running a clinic or studio?
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                  Get wholesale pricing, complimentary samples, and a dedicated account. Join our
                  growing network of professional partners across Lebanon.
                </p>
              </div>
              <Link
                to="/b2b"
                className="group shrink-0 px-10 py-5 bg-white text-slate-900 rounded-2xl font-bold text-lg hover:bg-slate-100 transition-all flex items-center gap-3 w-fit"
              >
                Explore the B2B Portal
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
