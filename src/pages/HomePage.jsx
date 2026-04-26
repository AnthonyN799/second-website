import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag, Building2, ArrowRight, Leaf, ShieldCheck,
  Wind, Heart, Users, Zap, Star, ChevronLeft, ChevronRight
} from 'lucide-react';
import { shopItems, heroSlides } from '../data/products';
import ProductIcon from '../components/ProductIcon';

/* ═══════════════════════════════════════════════
   SCROLL REVEAL
   ═══════════════════════════════════════════════ */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
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
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.9s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.9s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   FLOATING ORB
   ═══════════════════════════════════════════════ */
function FloatingOrb({ className, speed = 0.02 }) {
  const ref = useRef(null);
  useEffect(() => {
    let y = 0;
    let frame;
    const animate = () => {
      y += speed;
      if (ref.current) {
        ref.current.style.transform = `translateY(${Math.sin(y) * 20}px) translateX(${Math.cos(y * 0.7) * 12}px)`;
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [speed]);
  return <div ref={ref} className={className} />;
}

/* ═══════════════════════════════════════════════
   DATA — lead with products that have real photos
   ═══════════════════════════════════════════════ */
const withImages = shopItems.filter(i => i.image);
const withoutImages = shopItems.filter(i => !i.image);
const featured = [...withImages, ...withoutImages].slice(0, 6);

export default function HomePage() {
  const carouselRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleCarouselScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const progress = el.scrollLeft / (el.scrollWidth - el.clientWidth);
    setScrollProgress(progress);
  };

  const scrollCarousel = (direction) => {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = window.innerWidth >= 768 ? 340 : 300; // card + gap
    el.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">

      {/* ═══════════════════════════════════════
          HERO — PRODUCT-LED, SPLIT LAYOUT
          ═══════════════════════════════════════ */}
      <header className="relative min-h-screen flex items-center overflow-hidden">
        <FloatingOrb speed={0.015} className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-emerald-100 rounded-full blur-[150px] opacity-50 pointer-events-none" />
        <FloatingOrb speed={0.02} className="absolute bottom-[5%] right-[10%] w-[600px] h-[600px] bg-blue-50 rounded-full blur-[160px] opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 pt-32 pb-20 w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left — Copy */}
          <div>
            <Reveal>
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-900/5 backdrop-blur-sm rounded-full text-slate-500 text-[11px] font-bold uppercase tracking-[0.2em] mb-8">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span>Botanical Performance Care</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-[clamp(3rem,7vw,6rem)] font-black leading-[0.88] tracking-[-0.04em] mb-6">
                Feel the
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500">
                  difference.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="text-lg md:text-xl text-slate-400 max-w-lg mb-10 leading-relaxed">
                The gels, oils, and creams that physiotherapists rely on daily — 
                engineered for the clinic, now in your hands.
              </p>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/shop"
                  className="group px-9 py-4 bg-slate-900 text-white rounded-full font-bold text-base flex items-center hover:bg-slate-800 hover:shadow-2xl hover:shadow-slate-900/25 transition-all duration-300"
                >
                  Shop Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/b2b"
                  className="group px-9 py-4 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-full font-bold text-base text-slate-600 hover:border-slate-400 transition-all duration-300 flex items-center"
                >
                  Wholesale
                  <Building2 className="ml-2 w-4 h-4 text-slate-400" />
                </Link>
              </div>
            </Reveal>

            {/* Trust strip */}
            <Reveal delay={0.35}>
              <div className="mt-12 flex flex-wrap items-center gap-6 text-[13px] text-slate-300 font-medium">
                {[
                  { icon: <Heart className="w-3.5 h-3.5" />, t: 'Cruelty Free' },
                  { icon: <ShieldCheck className="w-3.5 h-3.5" />, t: 'Paraben Free' },
                  { icon: <Leaf className="w-3.5 h-3.5" />, t: 'Botanical' },
                ].map((b, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    {b.icon} {b.t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right — Hero Product */}
          <Reveal delay={0.15} className="flex justify-center lg:justify-end">
            <Link to="/product/pure-ice-gel" className="group relative">
              {/* Glow behind product */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/40 to-emerald-200/30 rounded-full blur-[80px] scale-75 group-hover:scale-90 transition-transform duration-700 pointer-events-none" />
              <img
                src="https://i.imgur.com/sLLnGFB.png"
                alt="Pure Ice Gel"
                className="relative w-[320px] md:w-[420px] lg:w-[460px] drop-shadow-2xl group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Floating label */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md rounded-full px-5 py-2 shadow-lg border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Pure Ice Gel — $12</span>
              </div>
            </Link>
          </Reveal>
        </div>
      </header>


      {/* ═══════════════════════════════════════
          PRODUCT CAROUSEL
          ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <Reveal>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 block mb-3">The Collection</span>
                <h2 className="text-4xl md:text-6xl font-black tracking-tight">Made to perform.</h2>
              </div>
              <div className="flex items-center gap-3 pb-2">
                <button
                  onClick={() => scrollCarousel(-1)}
                  className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 hover:border-slate-300 transition-all active:scale-95"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-600" />
                </button>
                <button
                  onClick={() => scrollCarousel(1)}
                  className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 hover:border-slate-300 transition-all active:scale-95"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5 text-slate-600" />
                </button>
                <Link to="/shop" className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors ml-3">
                  View all <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Horizontal scroll — images-first order */}
        <div
          ref={carouselRef}
          onScroll={handleCarouselScroll}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory px-6 md:px-[calc((100vw-1280px)/2+24px)] pb-6 no-scrollbar cursor-grab active:cursor-grabbing"
        >
          {featured.map((item) => (
            <Link
              key={item.id}
              to={`/product/${item.slug}`}
              className="group flex-none w-[280px] md:w-[320px] snap-start"
            >
              <div className="relative bg-slate-50 rounded-[2rem] overflow-hidden aspect-[3/4] mb-5 border border-slate-100 hover:border-slate-200 transition-all duration-500 hover:shadow-xl">
                <div className="absolute inset-0 flex items-center justify-center p-10">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className={`w-28 h-28 rounded-[2rem] bg-white shadow-lg flex items-center justify-center ${item.iconColor} group-hover:scale-110 transition-transform duration-500`}>
                      <ProductIcon name={item.iconName} className="w-14 h-14" />
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="px-1">
                <h3 className="font-bold text-base mb-1">{item.name}</h3>
                <p className="text-slate-400 text-sm mb-2">{item.description}</p>
                <span className="text-lg font-black">
                  {item.price ? `$${item.price}` : `From $${item.sizes?.[0]?.price}`}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Progress bar (mobile) */}
        <div className="max-w-7xl mx-auto px-6 mt-6">
          <div className="h-[2px] bg-slate-100 rounded-full overflow-hidden md:hidden">
            <div
              className="h-full bg-slate-900 rounded-full transition-all duration-150"
              style={{ width: `${Math.max(15, scrollProgress * 100)}%` }}
            />
          </div>
          <Link to="/shop" className="flex md:hidden items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors mt-4">
            View all products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          STATEMENT — LIGHT PANEL (fixes dark fatigue)
          ═══════════════════════════════════════ */}
      <section className="py-28 md:py-36 border-y border-slate-100 bg-slate-50 relative overflow-hidden">
        <FloatingOrb speed={0.01} className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-emerald-100/50 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <h2 className="text-[clamp(2.2rem,5.5vw,5rem)] font-black leading-[0.92] tracking-tight mb-8">
              Clinical precision.
              <br />
              <span className="text-slate-300">Botanical purity.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Every formula balances glide, absorption, and sensation —
              developed in the lab, perfected in the clinic, loved at home.
            </p>
          </Reveal>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          VALUE PROPS
          ═══════════════════════════════════════ */}
      <section className="py-28 md:py-36 max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-20 md:mb-28">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Why professionals choose us.</h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-16 md:gap-12">
          {[
            {
              icon: <Zap className="w-8 h-8" />,
              bg: 'bg-amber-50 text-amber-600',
              t: 'Performance Tested',
              d: 'Calibrated viscosity for deep tissue work. No early drying, no excess residue — just the right glide, every session.',
            },
            {
              icon: <Leaf className="w-8 h-8" />,
              bg: 'bg-emerald-50 text-emerald-600',
              t: 'Pure Ingredients',
              d: 'Botanical essential oils and plant-derived actives. Zero parabens, silicones, or synthetic fragrances.',
            },
            {
              icon: <ShieldCheck className="w-8 h-8" />,
              bg: 'bg-blue-50 text-blue-600',
              t: 'Skin-Safe',
              d: 'Non-sensitizing formulations safe for therapists applying product 20+ times daily and clients with reactive skin.',
            },
          ].map((b, i) => (
            <Reveal key={i} delay={0.1 * i}>
              <div className="text-center md:text-left">
                <div className={`w-16 h-16 ${b.bg} rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0`}>
                  {b.icon}
                </div>
                <h4 className="text-xl font-bold mb-3">{b.t}</h4>
                <p className="text-slate-400 leading-relaxed">{b.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Trust badges */}
        <Reveal>
          <div className="mt-24 flex flex-wrap justify-center gap-4">
            {[
              { icon: <Heart className="w-4 h-4" />, l: 'Cruelty Free' },
              { icon: <ShieldCheck className="w-4 h-4" />, l: 'Paraben Free' },
              { icon: <Wind className="w-4 h-4" />, l: 'Silicone Free' },
              { icon: <Leaf className="w-4 h-4" />, l: 'Vegan Friendly' },
            ].map((b, i) => (
              <span key={i} className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 rounded-full text-sm font-medium text-slate-500 border border-slate-100">
                {b.icon} {b.l}
              </span>
            ))}
          </div>
        </Reveal>
      </section>


      {/* ═══════════════════════════════════════
          TESTIMONIAL — B2C FRIENDLY
          ═══════════════════════════════════════ */}
      <section className="bg-slate-50 border-y border-slate-100 py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <div className="flex justify-center mb-6">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <blockquote className="text-2xl md:text-4xl font-bold leading-snug tracking-tight mb-8 text-slate-900">
              "Most of my patients ask to take PURE ICE gel tubes home after their sessions.
              <span className="text-slate-300"> </span>"
            </blockquote>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
                <Users className="w-6 h-6 text-slate-400" />
              </div>
              <div className="text-left">
                <p className="font-bold text-sm">{heroSlides[1].author}</p>
                <p className="text-slate-400 text-sm">{heroSlides[1].role}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          TWO WORLDS — B2C / B2B
          ═══════════════════════════════════════ */}
      <section className="py-28 md:py-36 max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Shop your way.</h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {/* B2C */}
          <Reveal delay={0.1}>
            <Link to="/shop" className="group relative p-10 md:p-14 rounded-[2.5rem] bg-gradient-to-br from-slate-50 to-white border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 block h-full">
              <div className="absolute top-[-20%] right-[-15%] w-[300px] h-[300px] bg-emerald-100 rounded-full blur-[100px] opacity-40 pointer-events-none group-hover:opacity-70 transition-opacity duration-700" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <ShoppingBag className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">For You</h3>
                <p className="text-slate-400 leading-relaxed mb-10 text-lg max-w-sm">
                  Professional-grade care, delivered to your door.
                </p>
                <span className="inline-flex items-center text-base font-bold text-emerald-600 group-hover:gap-3 gap-2 transition-all">
                  Shop Now <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </Link>
          </Reveal>

          {/* B2B */}
          <Reveal delay={0.2}>
            <Link to="/b2b" className="group relative p-10 md:p-14 rounded-[2.5rem] bg-slate-950 border border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-slate-950/40 transition-all duration-500 block h-full">
              <div className="absolute top-[-20%] right-[-15%] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity duration-700" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-black mb-4 tracking-tight text-white">For Clinics</h3>
                <p className="text-slate-400 leading-relaxed mb-10 text-lg max-w-sm">
                  Wholesale pricing. Partnership support. Professional supply.
                </p>
                <span className="inline-flex items-center text-base font-bold text-white group-hover:gap-3 gap-2 transition-all">
                  B2B Portal <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          CLOSING CTA
          ═══════════════════════════════════════ */}
      <section className="pb-28 md:pb-36 px-4">
        <Reveal>
          <div className="max-w-6xl mx-auto bg-slate-950 rounded-[3rem] md:rounded-[4rem] p-12 md:p-24 relative overflow-hidden text-center">
            <FloatingOrb speed={0.015} className="absolute top-[10%] left-[20%] w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
            <FloatingOrb speed={0.02} className="absolute bottom-[10%] right-[15%] w-[250px] h-[250px] bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-[0.95]">
                Your body deserves
                <br />
                <span className="text-slate-500">what the pros use.</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto">
                Trusted across clinics and homes in Lebanon. Try it once — you'll feel why.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/shop"
                  className="group px-10 py-5 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-slate-100 transition-all flex items-center gap-3"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/b2b"
                  className="group px-10 py-5 border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-3"
                >
                  B2B Inquiry
                  <Building2 className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
