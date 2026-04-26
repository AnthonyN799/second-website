import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Leaf, ShieldCheck, Heart, Sparkles, ArrowRight,
  ShoppingBag, Building2, Quote, Target, Eye, Star
} from 'lucide-react';

/* ═══════════════════════════════════════════════
   SCROLL REVEAL — same pattern as HomePage
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
   FLOATING ORB — matches HomePage atmosphere
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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">

      {/* ═══════════════════════════════════════
          HERO
          ═══════════════════════════════════════ */}
      <header className="relative min-h-[90vh] flex items-center overflow-hidden">
        <FloatingOrb speed={0.015} className="absolute top-[15%] left-[8%] w-[500px] h-[500px] bg-emerald-100 rounded-full blur-[150px] opacity-50 pointer-events-none" />
        <FloatingOrb speed={0.02} className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-blue-50 rounded-full blur-[160px] opacity-40 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10 pt-32 pb-20 w-full text-center">
          <Reveal>
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-900/5 backdrop-blur-sm rounded-full text-slate-500 text-[11px] font-bold uppercase tracking-[0.2em] mb-8">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span>About Us</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-black leading-[0.92] tracking-[-0.04em] mb-8">
              What you put on your body
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500">
                deserves the same care
              </span>
              <br />
              as what you put in it.
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Personal care is personal. It touches your skin, your senses, your daily rituals —
              and yet most of the market treats it as an afterthought.
            </p>
          </Reveal>
        </div>
      </header>


      {/* ═══════════════════════════════════════
          THE STORY
          ═══════════════════════════════════════ */}
      <section className="py-24 md:py-32 max-w-3xl mx-auto px-6">
        <Reveal>
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-slate-100 rounded-full text-slate-500 text-[11px] font-bold uppercase tracking-widest mb-8">
            <Leaf className="w-3 h-3" />
            <span>Our Story</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.05] mb-12">
            We saw a gap — and set out to close it.
          </h2>
        </Reveal>

        <div className="space-y-7 text-lg md:text-xl text-slate-500 leading-relaxed">
          <Reveal delay={0.1}>
            <p>
              Most of the market dresses up ordinary formulas in beautiful packaging and calls it done.
              We started <strong className="text-slate-900 font-bold">Therapeutic Oils™</strong> because
              we saw a gap between what wellness professionals trusted and what most people had access to.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p>
              The products used by the best spas, beauty centers, and physiotherapists weren't available
              to everyone — and the ones that were rarely lived up to the same standard.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p>
              So we set out to close that gap. Every product we make is purposefully formulated —
              not to follow a trend, but to do something specific and do it well. We work with carefully
              selected ingredients, keep our production small and considered, and hold ourselves to the
              standard of practitioners who rely on results, not just promises.
            </p>
          </Reveal>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          PULL QUOTE
          ═══════════════════════════════════════ */}
      <section className="bg-slate-50 border-y border-slate-100 py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <Quote className="w-10 h-10 text-emerald-500 mx-auto mb-8" />
          </Reveal>
          <Reveal delay={0.1}>
            <blockquote className="text-3xl md:text-5xl font-black leading-[1.15] tracking-tight text-slate-900">
              We don't make products for shelves.
              <br />
              <span className="text-slate-300">We make products for people —</span>
              <br />
              and we think you can feel the difference.
            </blockquote>
          </Reveal>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          MISSION / VISION / BELIEF
          ═══════════════════════════════════════ */}
      <section className="py-28 md:py-36 max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">What drives us.</h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Target className="w-7 h-7" />,
              bg: 'bg-emerald-50 text-emerald-600',
              label: 'Our Mission',
              body: 'To bring professional-grade personal care within reach of everyone — without ever compromising on what goes into it.',
            },
            {
              icon: <Eye className="w-7 h-7" />,
              bg: 'bg-blue-50 text-blue-600',
              label: 'Our Vision',
              body: 'A world where the standard for personal care is set by expertise and intention — not marketing budgets.',
            },
            {
              icon: <Sparkles className="w-7 h-7" />,
              bg: 'bg-amber-50 text-amber-600',
              label: 'Our Belief',
              body: "The best products aren't the loudest ones. They're the ones you keep coming back to because they actually work.",
            },
          ].map((card, i) => (
            <Reveal key={i} delay={0.1 * i}>
              <div className="h-full p-10 rounded-[2rem] bg-gradient-to-br from-slate-50 to-white border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500">
                <div className={`w-14 h-14 ${card.bg} rounded-2xl flex items-center justify-center mb-8`}>
                  {card.icon}
                </div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
                  {card.label}
                </p>
                <p className="text-xl font-bold leading-snug text-slate-900">
                  {card.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>


      {/* ═══════════════════════════════════════
          TRUSTED BY
          ═══════════════════════════════════════ */}
      <section className="pb-28 md:pb-36 max-w-5xl mx-auto px-6">
        <Reveal>
          <div className="relative p-12 md:p-20 rounded-[2.5rem] bg-slate-50 border border-slate-100 overflow-hidden text-center">
            <FloatingOrb speed={0.018} className="absolute top-[-20%] left-[-10%] w-[300px] h-[300px] bg-emerald-100 rounded-full blur-[100px] opacity-60 pointer-events-none" />
            <FloatingOrb speed={0.022} className="absolute bottom-[-20%] right-[-10%] w-[300px] h-[300px] bg-blue-100 rounded-full blur-[100px] opacity-50 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-6 leading-tight">
                Trusted by spas, beauty centers,
                <br />
                and physiotherapists.
              </h3>
              <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
                And available directly to anyone who holds their personal care to the same standard.
              </p>

              <div className="mt-12 flex flex-wrap justify-center gap-3">
                {[
                  { icon: <Heart className="w-4 h-4" />, l: 'Cruelty Free' },
                  { icon: <ShieldCheck className="w-4 h-4" />, l: 'Paraben Free' },
                  { icon: <Leaf className="w-4 h-4" />, l: 'Botanical' },
                ].map((b, i) => (
                  <span key={i} className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-full text-sm font-medium text-slate-600 border border-slate-100 shadow-sm">
                    {b.icon} {b.l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>


      {/* ═══════════════════════════════════════
          CLOSING CTA — matches HomePage tone
          ═══════════════════════════════════════ */}
      <section className="pb-28 md:pb-36 px-4">
        <Reveal>
          <div className="max-w-6xl mx-auto bg-slate-950 rounded-[3rem] md:rounded-[4rem] p-12 md:p-24 relative overflow-hidden text-center">
            <FloatingOrb speed={0.015} className="absolute top-[10%] left-[20%] w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
            <FloatingOrb speed={0.02} className="absolute bottom-[10%] right-[15%] w-[250px] h-[250px] bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-[0.95]">
                Feel the difference
                <br />
                <span className="text-slate-500">for yourself.</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto">
                Professional-grade care, formulated with intention. Built for the people who use it daily.
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
                  Wholesale
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
