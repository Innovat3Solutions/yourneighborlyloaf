import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Menu, Star, Instagram, Store, Coffee, Cookie, Truck, MapPin, Clock, CheckCircle2, X } from 'lucide-react';

/* ── Reusable scroll-triggered wrapper ── */
const FadeIn = ({ children, className = '', delay = 0, direction = 'up', ...rest }: {
  children: React.ReactNode; className?: string; delay?: number; direction?: 'up' | 'down' | 'left' | 'right';
} & Omit<React.ComponentProps<typeof motion.div>, 'initial' | 'animate' | 'transition'>) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const dirs = { up: { y: 40 }, down: { y: -40 }, left: { x: 60 }, right: { x: -60 } };
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...dirs[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ── Decorative SVG components ── */
const WheatSVG = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 40 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 120V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <ellipse cx="20" cy="18" rx="6" ry="12" fill="currentColor" opacity="0.3"/>
    <ellipse cx="12" cy="35" rx="5" ry="10" fill="currentColor" opacity="0.25" transform="rotate(-20 12 35)"/>
    <ellipse cx="28" cy="35" rx="5" ry="10" fill="currentColor" opacity="0.25" transform="rotate(20 28 35)"/>
    <ellipse cx="10" cy="55" rx="5" ry="9" fill="currentColor" opacity="0.2" transform="rotate(-25 10 55)"/>
    <ellipse cx="30" cy="55" rx="5" ry="9" fill="currentColor" opacity="0.2" transform="rotate(25 30 55)"/>
    <ellipse cx="12" cy="75" rx="4" ry="8" fill="currentColor" opacity="0.15" transform="rotate(-20 12 75)"/>
    <ellipse cx="28" cy="75" rx="4" ry="8" fill="currentColor" opacity="0.15" transform="rotate(20 28 75)"/>
  </svg>
);

const FloatingDots = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="currentColor">
    <circle cx="10" cy="10" r="2.5" opacity="0.3"/>
    <circle cx="50" cy="20" r="1.5" opacity="0.2"/>
    <circle cx="85" cy="15" r="3" opacity="0.25"/>
    <circle cx="25" cy="50" r="2" opacity="0.2"/>
    <circle cx="70" cy="45" r="1.5" opacity="0.15"/>
    <circle cx="90" cy="60" r="2.5" opacity="0.2"/>
    <circle cx="15" cy="80" r="1.5" opacity="0.25"/>
    <circle cx="55" cy="75" r="3" opacity="0.2"/>
    <circle cx="80" cy="85" r="2" opacity="0.15"/>
  </svg>
);
const LoafSVG = ({ className = '' }: { className?: string }) => (<svg className={className} viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="40" cy="35" rx="38" ry="14" fill="currentColor" opacity="0.12"/><path d="M6 32C6 20 18 8 40 8s34 12 34 24c0 6-14 10-34 10S6 38 6 32z" fill="currentColor" opacity="0.08"/><path d="M20 14c6-4 14-6 20-6s14 2 20 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.15"/><path d="M25 12c0 8-2 16-2 22" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.08"/><path d="M40 8c0 10 0 20 0 28" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.08"/><path d="M55 12c0 8 2 16 2 22" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.08"/></svg>);
const CookieSVG = ({ className = '' }: { className?: string }) => (<svg className={className} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="30" r="26" fill="currentColor" opacity="0.08"/><circle cx="30" cy="30" r="24" stroke="currentColor" strokeWidth="1" opacity="0.12" strokeDasharray="3 4"/><circle cx="20" cy="22" r="3" fill="currentColor" opacity="0.15"/><circle cx="36" cy="18" r="2.5" fill="currentColor" opacity="0.12"/><circle cx="24" cy="36" r="2.5" fill="currentColor" opacity="0.13"/><circle cx="40" cy="32" r="3" fill="currentColor" opacity="0.14"/><circle cx="32" cy="40" r="2" fill="currentColor" opacity="0.1"/></svg>);
const SwirlSVG = ({ className = '' }: { className?: string }) => (<svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M60 10c27.6 0 50 22.4 50 50s-22.4 50-50 50" stroke="currentColor" strokeWidth="1" opacity="0.08" strokeLinecap="round"/><path d="M60 25c19.3 0 35 15.7 35 35s-15.7 35-35 35" stroke="currentColor" strokeWidth="1" opacity="0.06" strokeLinecap="round"/><path d="M60 40c11 0 20 9 20 20s-9 20-20 20" stroke="currentColor" strokeWidth="1" opacity="0.04" strokeLinecap="round"/></svg>);

const Navbar = ({ onOrderClick, onContactClick }: { onOrderClick: () => void; onContactClick: () => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full px-4 md:px-6 pt-6 absolute top-0 left-0 right-0 z-50">
      <nav className="mx-auto max-w-6xl bg-white rounded-full px-6 py-3 md:px-8 md:py-4 flex justify-center md:justify-between items-center shadow-sm relative z-50 overflow-hidden">
        {/* Decorative cookie graphics */}
        <img src="/58.png" alt="" className="absolute -left-2 -bottom-3 w-16 h-16 object-contain opacity-[0.18] rotate-[-15deg] pointer-events-none hidden md:block" />
        <img src="/57.png" alt="" className="absolute left-[30%] -top-3 w-12 h-12 object-contain opacity-[0.14] rotate-12 pointer-events-none hidden md:block" />
        <img src="/58.png" alt="" className="absolute right-[28%] -bottom-2 w-14 h-14 object-contain opacity-[0.15] rotate-[25deg] pointer-events-none hidden md:block" />
        <img src="/57.png" alt="" className="absolute right-[12%] -top-2 w-11 h-11 object-contain opacity-[0.12] rotate-[-8deg] pointer-events-none hidden md:block" />
        <div className="absolute left-6 md:hidden w-10" />
        <div className="flex items-center md:flex-none">
          <img src="/59.png" alt="Your Neighborly Loaf" className="h-12 md:h-12 w-auto" />
        </div>
        <div className="hidden md:flex items-center gap-8 font-bold text-ink/80">
          <a href="#home" className="hover:text-teal transition-colors">Home</a>
          <a href="#about" className="hover:text-teal transition-colors">About</a>
          <a href="#menu" className="hover:text-teal transition-colors">Menu</a>
          <button onClick={onContactClick} className="hover:text-teal transition-colors">Contact</button>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <button onClick={onOrderClick} className="bg-yellow hover:bg-yellow-hover text-white px-6 py-2.5 rounded-full font-bold transition-colors shadow-md btn-bite">
            Order Now
          </button>
        </div>
        <button className="md:hidden text-teal absolute right-6" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-md flex flex-col pt-8 px-6 pb-6 h-screen overflow-y-auto"
          >
            <div className="flex items-center justify-center mb-8">
              <img src="/59.png" alt="Your Neighborly Loaf" className="h-14 w-auto" />
            </div>
            <button className="absolute top-8 right-5 bg-teal/10 hover:bg-teal/20 text-teal rounded-full p-3 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
               <X className="w-7 h-7" />
            </button>
            <div className="flex flex-col items-center gap-8 font-bold text-2xl text-ink mt-8 flex-grow">
              <a href="#home" className="hover:text-teal transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
              <a href="#about" className="hover:text-teal transition-colors" onClick={() => setIsMobileMenuOpen(false)}>About</a>
              <a href="#menu" className="hover:text-teal transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Menu</a>
              <button className="hover:text-teal transition-colors" onClick={() => { onContactClick(); setIsMobileMenuOpen(false); }}>Contact</button>
            </div>
            <button 
              className="w-full bg-yellow hover:bg-yellow-hover text-white px-6 py-4 rounded-full font-bold text-lg transition-colors shadow-md mt-auto mb-8 relative z-50 text-center" 
              onClick={() => { onOrderClick(); setIsMobileMenuOpen(false); }}
            >
              Order Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Hero = () => (
  <section id="home" className="bg-stripes pt-28 pb-8 md:min-h-screen md:pt-36 relative flex flex-col items-center grain-overlay">
    {/* Background image with dark overlay (clipped to section, doesn't constrain children) */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <img
        src="/hero-background.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-40 select-none"
      />
      <div className="absolute inset-0 bg-black/55" />
    </div>

    {/* Floating decorative elements — refined botanical & geometric */}
    {/* Wheat sprig */}
    <div className="absolute top-1/4 left-[5%] md:left-[10%] opacity-25 md:opacity-30 scale-75 md:scale-100 animate-float">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V8" />
        <path d="M12 8c0-2 1.5-3.5 3.5-3.5C15.5 6.5 14 8 12 8z" />
        <path d="M12 8c0-2-1.5-3.5-3.5-3.5C8.5 6.5 10 8 12 8z" />
        <path d="M12 12c0-1.6 1.2-3 3-3 0 1.7-1.4 3-3 3z" />
        <path d="M12 12c0-1.6-1.2-3-3-3 0 1.7 1.4 3 3 3z" />
        <path d="M12 16c0-1.6 1.2-3 3-3 0 1.7-1.4 3-3 3z" />
        <path d="M12 16c0-1.6-1.2-3-3-3 0 1.7 1.4 3 3 3z" />
      </svg>
    </div>

    {/* 4-point sparkle */}
    <div className="absolute bottom-1/4 left-[10%] md:left-[20%] opacity-30 md:opacity-40 scale-75 md:scale-100 hidden sm:block animate-pulse-soft" style={{ animationDelay: '1s' }}>
      <svg width="40" height="40" viewBox="0 0 24 24" fill="white" stroke="none">
        <path d="M12 2 L13.2 10.8 L22 12 L13.2 13.2 L12 22 L10.8 13.2 L2 12 L10.8 10.8 Z" />
      </svg>
    </div>

    {/* Olive / laurel sprig */}
    <div className="absolute top-1/3 right-[5%] md:right-[10%] opacity-25 md:opacity-35 scale-75 md:scale-100 animate-float-reverse">
       <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
         <path d="M4 20 C 9 18, 14 14, 20 4" />
         <path d="M8 16 C 8 14, 9.5 12.5, 11.5 12.5 C 11.5 14.5, 10 16, 8 16 Z" />
         <path d="M12 12 C 12 10, 13.5 8.5, 15.5 8.5 C 15.5 10.5, 14 12, 12 12 Z" />
         <path d="M15.5 8 C 15.5 6, 17 4.5, 19 4.5 C 19 6.5, 17.5 8, 15.5 8 Z" />
       </svg>
    </div>

    {/* Thin geometric ring */}
    <div className="absolute top-[20%] lg:bottom-1/3 right-[15%] md:right-[20%] opacity-25 md:opacity-35 scale-75 md:scale-100 z-0 hidden sm:block animate-float-slow" style={{ animationDelay: '2s' }}>
       <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="0.8" strokeLinecap="round">
         <circle cx="12" cy="12" r="10" />
         <circle cx="12" cy="12" r="6" strokeDasharray="2 3" />
       </svg>
    </div>

    {/* Small twinkle */}
    <div className="absolute top-[15%] left-[35%] opacity-30 md:opacity-40 hidden md:block animate-pulse-soft" style={{ animationDelay: '3s' }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="none">
        <path d="M12 2 L13.2 10.8 L22 12 L13.2 13.2 L12 22 L10.8 13.2 L2 12 L10.8 10.8 Z" />
      </svg>
    </div>

    {/* Decorative wheat stalks */}
    <WheatSVG className="absolute left-[3%] bottom-[15%] w-8 h-24 text-white/15 animate-float-slow hidden lg:block" />
    <WheatSVG className="absolute right-[5%] bottom-[25%] w-6 h-20 text-white/10 animate-float hidden lg:block" />

    {/* Decorative rings */}
    <div className="deco-ring w-64 h-64 border-2 border-white/[0.06] -left-20 top-1/3 animate-spin-slow hidden md:block" />
    <div className="deco-ring w-40 h-40 border border-white/[0.05] -right-10 bottom-1/4 animate-spin-slow hidden md:block" style={{ animationDirection: 'reverse' }} />

    {/* Floating dots */}
    <FloatingDots className="absolute inset-0 w-full h-full text-white/60 pointer-events-none" />

    {/* Hero Content */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
      className="flex flex-col items-center justify-start pt-8 md:pt-24 relative z-10 max-w-5xl mx-auto w-full px-6"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-[40px] md:text-6xl lg:text-7xl font-extrabold text-white text-center leading-[1.1] md:leading-[1.2] tracking-tight drop-shadow-sm"
      >
        Simple Ingredients,<br />
        Made With{' '}
        <motion.span
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.8, type: 'spring', stiffness: 120 }}
          className="font-script text-yellow font-normal text-[52px] leading-none sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-md inline-block"
        >
          Heart
        </motion.span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-white/90 text-center max-w-2xl mt-6 md:mt-10 text-base md:text-lg font-medium px-2"
      >
        From our home kitchen to your table, baked with Italian flour, slow-fermented with love, and proudly nurse-owned. You're family here.
      </motion.p>
    </motion.div>

    <div className="scallop-down"></div>

    {/* Floating Hero Image */}
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
      className="relative w-full flex justify-center z-20 mt-8 md:mt-12 -mb-32 md:-mb-48 lg:-mb-56 px-0 sm:px-8"
    >
      <img
        src="/hero-products.png"
        alt="Your Neighborly Loaf bread, cookies, and baked goods"
        className="w-[115%] max-w-[115%] sm:w-full sm:max-w-5xl object-contain drop-shadow-2xl translate-x-1 sm:translate-x-0"
      />
    </motion.div>
  </section>
);

const AboutUs = ({ onOrderClick }: { onOrderClick: () => void }) => (
  <section id="about" className="pt-40 md:pt-64 pb-16 md:pb-24 px-6 md:px-12 max-w-7xl mx-auto relative bg-dots">
    {/* Decorative accents */}
    <div className="deco-ring w-48 h-48 border-2 border-teal/[0.06] -right-12 top-24 hidden lg:block animate-spin-slow" />
    <FloatingDots className="absolute top-16 right-0 w-32 h-32 text-teal hidden lg:block" />

    <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-16 md:mb-24">
      <FadeIn direction="right" delay={0.2} className="order-1 md:order-2">
        <div className="space-y-6 text-center md:text-left">
          <h4 className="font-script text-teal text-2xl">Meet Melina</h4>
          <h2 className="text-3xl md:text-5xl font-extrabold text-ink leading-tight">
            Nourishment Shaped<br/>By <span className="font-script text-yellow font-normal text-4xl md:text-5xl">Time</span>, Heritage & <span className="font-script text-yellow font-normal text-4xl md:text-5xl">Heart</span>
          </h2>
          <p className="text-ink/70 font-medium leading-relaxed">
            What started as curiosity quickly turned into a passion. I began experimenting in my kitchen, learning the process of slow fermentation and baking breads with simple ingredients.
          </p>
          <p className="text-ink/70 font-medium leading-relaxed">
            One loaf turned into many and now here we are. This little micro bakery was created to share that journey and the breads I've come to love baking. Everything is made in small batches from our home kitchen with care and patience.
          </p>
          <p className="text-ink/70 font-medium leading-relaxed">
            Proudly nurse-owned, this bakery was founded on a deep commitment to caring for others, both in and out of the kitchen.
          </p>
        </div>
      </FadeIn>
      <FadeIn direction="left" className="order-2 md:order-1">
        <div className="relative flex justify-center">
          {/* Teal blob background */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1.05, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute inset-0 bg-teal rounded-[60%_40%_50%_50%/50%_50%_60%_40%] -z-10 rotate-[-10deg]"
          />
          {/* Thin outline blob — animated */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1.1, opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
            className="absolute inset-0 border-2 border-teal rounded-[50%_50%_40%_60%/60%_40%_50%_50%] -z-20 rotate-12"
          />
          {/* Second decorative outline ring */}
          <div className="absolute inset-0 border border-yellow/20 rounded-[45%_55%_50%_50%/55%_45%_55%_45%] scale-[1.18] -z-20 rotate-[-5deg] animate-pulse-soft hidden md:block" />
          {/* Melina clipped inside the blob shape */}
          <div className="w-full max-w-lg rounded-[60%_40%_50%_50%/50%_50%_60%_40%] rotate-[-10deg] overflow-hidden p-[2px]">
            <img
              src="/melina.png"
              alt="Melina, chef and founder of Your Neighborly Loaf"
              className="w-full h-full object-cover rotate-[10deg] scale-[1.12]"
            />
          </div>
        </div>
      </FadeIn>
    </div>

    {/* Why Our Ingredients Matter */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-14 md:gap-y-16 pt-16">
      {[
        { title: "Italian Flour", desc: "We bake with flour grown and milled in Italy, prized for its rich flavor, fine texture, and superior nutritional profile compared to mass-produced alternatives.", icon: <Store className="w-6 h-6 md:w-8 md:h-8 text-teal stroke-[1.5]" /> },
        { title: "From Our Home", desc: "Every loaf and cookie comes straight from our home kitchen to your table, made with the same love and care as if we were baking for our own family.", icon: <Coffee className="w-6 h-6 md:w-8 md:h-8 text-teal stroke-[1.5]" /> },
        { title: "Slow Fermentation", desc: "Every loaf is crafted slowly and thoughtfully. Long fermentation breaks down gluten, making our bread easier to digest and more nutrient-rich.", icon: <Clock className="w-6 h-6 md:w-8 md:h-8 text-teal stroke-[1.5]" /> },
        { title: "Small Batch", desc: "Everything is made in small batches from our home kitchen with care and patience. No preservatives, no shortcuts, just real ingredients and real bread.", icon: <Cookie className="w-6 h-6 md:w-8 md:h-8 text-teal stroke-[1.5]" /> },
      ].map((feature, i) => (
        <div key={i}>
        <FadeIn delay={i * 0.1}>
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-[#f0ece4] rounded-2xl px-4 md:px-6 pb-6 md:pb-8 pt-10 md:pt-14 text-center flex flex-col items-center relative mt-10 md:mt-8 h-full"
          >
            <div className="w-14 h-14 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center absolute -top-7 md:-top-10 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              {feature.icon}
            </div>
            <h3 className="text-base md:text-2xl font-extrabold text-ink mb-2 md:mb-3">{feature.title}</h3>
            <p className="text-ink/70 text-xs md:text-[15px] font-medium leading-relaxed">
              {feature.desc}
            </p>
          </motion.div>
        </FadeIn>
        </div>
      ))}
    </div>
  </section>
);

const AwesomeMenu = ({ onOrderClick }: { onOrderClick: () => void }) => {
  const cards = [
    { title: "Sourdough", bg: "bg-[#e8e0d0]", desc: "Our signature artisan sourdough, slow-fermented with a crisp golden crust and an open, airy crumb that's perfect for every occasion.", img: "/56.png" },
    { title: "Cookies", bg: "bg-[#e5ddd0]", desc: "Handcrafted cookies baked fresh daily, from classic chocolate chip to white chocolate macadamia, each one made with love.", img: "/58.png" },
    { title: "Packaged", bg: "bg-[#dde3d5]", desc: "Take home our freshly baked goods in our signature packaging, the perfect gift or a treat for yourself to enjoy later.", img: "/54.png" },
  ];

  const breadItems = [
    { name: "Sourdough", price: "$12" },
    { name: "Semolina", price: "$16" },
    { name: "Banana", price: "$16" },
    { name: "Gluten Free", price: "$23" },
  ];

  const cookieItems = [
    { name: "Chocolate Chip", price: "$10 / $18" },
    { name: "White Chocolate Chip", price: "$10 / $18" },
    { name: "Chocolate Chip Duo", price: "$10 / $18" },
    { name: "White Macadamia", price: "$10 / $18" },
  ];

  return (
    <section id="menu" className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto text-center relative">
      {/* Background decoration */}
      <WheatSVG className="absolute -left-4 top-20 w-8 h-28 text-teal/10 hidden lg:block animate-float-slow" />
      <WheatSVG className="absolute -right-2 top-1/3 w-6 h-20 text-yellow/10 hidden lg:block animate-float" />
      <div className="deco-ring w-56 h-56 border border-yellow/[0.06] -left-16 bottom-32 hidden lg:block animate-spin-slow" />
      <LoafSVG className="absolute right-8 bottom-16 w-32 h-20 text-teal hidden lg:block animate-drift" />
      <CookieSVG className="absolute left-4 bottom-1/4 w-20 h-20 text-yellow hidden lg:block animate-float" />
      <SwirlSVG className="absolute -right-8 top-16 w-28 h-28 text-teal hidden lg:block animate-spin-slow" />

      <FadeIn>
        <h4 className="font-script text-teal text-2xl mb-2">Our Menu</h4>
        <h2 className="text-4xl md:text-5xl font-extrabold text-ink mb-16 md:mb-24">Baked With <span className="font-script text-yellow font-normal text-4xl md:text-5xl">Love</span>, For You</h2>
      </FadeIn>

      <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide mt-16 md:mt-0">
        {cards.map((card, i) => (
          <FadeIn key={card.title} delay={i * 0.15} className="min-w-[75vw] sm:min-w-[60vw] md:min-w-0 snap-center mt-14 md:mt-24">
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`${card.bg} rounded-2xl px-6 pb-2 pt-4 relative flex flex-col items-center h-full`}
            >
              <div className="w-full flex justify-center -mt-16 md:-mt-28 mb-2 md:mb-4">
                <motion.img
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  src={card.img} alt={card.title} className="h-28 md:h-44 w-auto object-contain drop-shadow-lg"
                />
              </div>
              <h3 className="text-2xl font-extrabold text-ink mb-1 md:mb-2">{card.title}</h3>
              <p className="text-ink/70 font-medium mb-2 md:mb-3 text-sm leading-relaxed px-2">{card.desc}</p>
              <button onClick={onOrderClick} className="w-full xl:w-auto bg-white text-teal hover:bg-teal hover:text-white hover:scale-105 px-6 py-2.5 md:px-8 md:py-3 rounded-full font-bold transition-all shadow-sm btn-bite text-sm md:text-base">
                Order Now
              </button>
            </motion.div>
          </FadeIn>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 text-left mt-44 md:mt-40">
        {/* Bread Loafs */}
        <FadeIn direction="left">
          <div className="space-y-6">
            <h3 className="text-2xl font-extrabold text-ink mb-6">Bread Loafs</h3>
            {breadItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex justify-between items-baseline pb-4 border-b border-dashed border-ink/20 hover:border-teal/40 transition-colors"
              >
                <span className="text-lg font-bold text-ink">{item.name}</span>
                <span className="text-teal font-extrabold">{item.price}</span>
              </motion.div>
            ))}
          </div>
        </FadeIn>
        {/* Cookies */}
        <FadeIn direction="right" delay={0.1}>
          <div className="space-y-6">
            <div className="flex justify-between items-baseline mb-6">
              <h3 className="text-2xl font-extrabold text-ink">Cookies</h3>
              <span className="text-ink/50 font-bold text-sm">6 &nbsp;&nbsp; 12</span>
            </div>
            {cookieItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex justify-between items-baseline pb-4 border-b border-dashed border-ink/20 hover:border-teal/40 transition-colors"
              >
                <span className="text-lg font-bold text-ink">{item.name}</span>
                <span className="text-teal font-extrabold">{item.price}</span>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const DiscountBanner = ({ onContactClick }: { onContactClick: () => void }) => (
  <section className="relative py-24 md:py-32 flex items-center justify-center text-center bg-ink overflow-hidden grain-overlay">
    <div className="scallop-top"></div>

    <div className="absolute inset-0 z-0">
      <img src="/background banner.jpeg" alt="Cookies and sourdough on baking trays" className="w-full h-full object-cover opacity-70" />
    </div>

    {/* Decorative overlay elements */}
    <div className="deco-ring w-72 h-72 border-2 border-white/[0.06] -left-20 -top-20 animate-spin-slow hidden md:block" />
    <div className="deco-ring w-48 h-48 border border-yellow/[0.08] -right-12 -bottom-12 animate-spin-slow hidden md:block" style={{ animationDirection: 'reverse' }} />
    <FloatingDots className="absolute inset-0 w-full h-full text-white/40 pointer-events-none z-[1]" />
    <WheatSVG className="absolute left-[8%] bottom-12 w-10 h-32 text-white/10 hidden lg:block animate-float" />
    <WheatSVG className="absolute right-[8%] top-16 w-8 h-24 text-white/8 hidden lg:block animate-float-reverse" />
    <LoafSVG className="absolute left-[5%] top-1/2 -translate-y-1/2 w-32 h-20 text-white hidden lg:block animate-drift" />
    <CookieSVG className="absolute right-[5%] top-1/2 -translate-y-1/2 w-24 h-24 text-white hidden lg:block animate-float-slow" />
    <img src="/56.png" alt="" className="absolute left-[2%] bottom-8 w-28 h-28 object-contain opacity-[0.08] hidden xl:block animate-float-slow rotate-[-10deg]" />
    <img src="/58.png" alt="" className="absolute right-[2%] bottom-8 w-24 h-24 object-contain opacity-[0.08] hidden xl:block animate-drift rotate-12" />

    <FadeIn className="relative z-10 space-y-6 px-6 w-full max-w-4xl">
      <h4 className="font-script text-teal text-3xl">Special Discount</h4>
      <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
        Get Special Autumn<br/>Discount!
      </h2>
      <div className="flex flex-col md:flex-row justify-center gap-4 pt-4">
        <button className="w-full md:w-auto bg-yellow hover:bg-yellow-hover hover:scale-105 text-white px-8 py-3.5 rounded-full font-bold transition-all shadow-md btn-shimmer btn-bite">
          Our Menu
        </button>
        <button onClick={onContactClick} className="w-full md:w-auto bg-teal hover:bg-teal/90 hover:scale-105 text-white px-8 py-3.5 rounded-full font-bold transition-all shadow-md btn-bite">
          Contact Us
        </button>
      </div>
    </FadeIn>

    <div className="scallop-bottom"></div>
  </section>
);

const Testimonials = () => {
  const [showReview, setShowReview] = useState(false);
  const [reviewStep, setReviewStep] = useState<1 | 2 | 3>(1);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');

  const resetReview = () => {
    setShowReview(false);
    setReviewStep(1);
    setRating(0);
    setHoverRating(0);
    setReviewName('');
    setReviewText('');
  };

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-center space-y-16 relative bg-dots overflow-hidden">
      <div className="deco-ring w-40 h-40 border border-teal/[0.06] -right-8 top-12 hidden lg:block animate-spin-slow" />
      <WheatSVG className="absolute left-0 bottom-8 w-6 h-20 text-yellow/10 hidden lg:block animate-float-slow" />
      <SwirlSVG className="absolute -left-10 top-20 w-36 h-36 text-yellow hidden lg:block" />
      <CookieSVG className="absolute right-4 bottom-12 w-24 h-24 text-teal hidden lg:block animate-drift" />
      <LoafSVG className="absolute left-1/4 -bottom-2 w-28 h-16 text-teal hidden lg:block animate-float-slow" />
      {/* Floating product images */}
      <img src="/57.png" alt="" className="absolute -right-6 top-8 w-20 h-20 object-contain opacity-[0.07] hidden lg:block animate-float rotate-12" />
      <img src="/56.png" alt="" className="absolute -left-4 bottom-20 w-24 h-24 object-contain opacity-[0.06] hidden lg:block animate-drift -rotate-6" />
      <FadeIn><div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-ink">What Our Clients are <span className="font-script text-yellow font-normal text-5xl md:text-6xl">saying</span></h2>
        <button
          onClick={() => setShowReview(true)}
          className="mt-6 bg-yellow hover:bg-yellow-hover hover:scale-105 text-white px-8 py-3 rounded-full font-bold transition-all shadow-md btn-shimmer btn-bite"
        >
          Leave a Review
        </button>
      </div></FadeIn>

      {/* Review Modal */}
      {showReview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={resetReview} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 z-10"
          >
            <button onClick={resetReview} className="absolute top-4 right-4 text-ink/30 hover:text-ink transition-colors">
              <X className="w-6 h-6" />
            </button>

            {reviewStep === 1 && (
              <motion.div key="r1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-6">
                <h3 className="text-2xl font-extrabold text-ink">How was your experience?</h3>
                <p className="text-ink/50 text-sm font-medium">Tap a star to rate us</p>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => { setRating(star); setReviewStep(2); }}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-10 h-10 transition-colors ${
                          star <= (hoverRating || rating) ? 'text-yellow fill-current' : 'text-ink/15'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-2 pt-2">
                  <div className="h-2 rounded-full bg-yellow w-6" />
                  <div className="h-2 rounded-full bg-ink/10 w-2" />
                  <div className="h-2 rounded-full bg-ink/10 w-2" />
                </div>
              </motion.div>
            )}

            {reviewStep === 2 && (
              <motion.form
                key="r2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={(e: React.FormEvent) => { e.preventDefault(); if (reviewName && reviewText) setReviewStep(3); }}
                className="space-y-5"
              >
                <div className="text-center">
                  <div className="flex justify-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className={`w-6 h-6 ${star <= rating ? 'text-yellow fill-current' : 'text-ink/15'}`} />
                    ))}
                  </div>
                  <h3 className="text-2xl font-extrabold text-ink">Tell us more!</h3>
                </div>
                <input
                  type="text"
                  required
                  value={reviewName}
                  onChange={e => setReviewName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-5 py-3.5 rounded-xl border-2 border-ink/10 focus:border-teal outline-none font-medium text-ink placeholder:text-ink/30 transition-colors"
                />
                <textarea
                  required
                  value={reviewText}
                  onChange={e => setReviewText(e.target.value)}
                  placeholder="What did you love about your order?"
                  rows={3}
                  className="w-full px-5 py-3.5 rounded-xl border-2 border-ink/10 focus:border-teal outline-none font-medium text-ink placeholder:text-ink/30 transition-colors resize-none"
                />
                <button type="submit" className="w-full bg-yellow hover:bg-yellow-hover text-white py-3.5 rounded-full font-bold text-lg transition-colors shadow-md">
                  Submit Review
                </button>
                <button type="button" onClick={() => setReviewStep(1)} className="w-full text-ink/40 hover:text-ink text-sm font-medium transition-colors">
                  Back
                </button>
                <div className="flex items-center justify-center gap-2">
                  <div className="h-2 rounded-full bg-ink/10 w-2" />
                  <div className="h-2 rounded-full bg-yellow w-6" />
                  <div className="h-2 rounded-full bg-ink/10 w-2" />
                </div>
              </motion.form>
            )}

            {reviewStep === 3 && (
              <motion.div key="r3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-4 py-4">
                <CheckCircle2 className="w-14 h-14 text-teal mx-auto" />
                <h3 className="text-2xl font-extrabold text-ink">Thank you, {reviewName}!</h3>
                <p className="text-ink/60 text-sm font-medium leading-relaxed">
                  Your review means the world to us. We appreciate your support!
                </p>
                <button onClick={resetReview} className="bg-teal hover:bg-teal/90 text-white px-8 py-3 rounded-full font-bold transition-colors mt-2">
                  Done
                </button>
                <div className="flex items-center justify-center gap-2 pt-2">
                  <div className="h-2 rounded-full bg-ink/10 w-2" />
                  <div className="h-2 rounded-full bg-ink/10 w-2" />
                  <div className="h-2 rounded-full bg-yellow w-6" />
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}

      <div className="flex md:grid md:grid-cols-2 gap-6 md:gap-12 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 pb-4 md:pb-0 scrollbar-hide">
        <FadeIn direction="left" className="min-w-[85vw] sm:min-w-[75vw] md:min-w-0 snap-center">
          <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="bg-warm-gray p-8 md:p-12 rounded-[2rem] space-y-6 relative text-left h-full overflow-hidden card-glow">
            <div className="text-yellow text-8xl font-script absolute -top-4 left-8 opacity-30">&ldquo;</div>
            <LoafSVG className="absolute -right-4 -bottom-2 w-28 h-16 text-teal" />
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-teal/[0.04] to-transparent rounded-bl-full" />
            <div className="flex gap-1 text-yellow relative z-10">
              {[...Array(5)].map((_, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.08, type: 'spring', stiffness: 400 }}>
                  <Star className="w-6 h-6 fill-current" />
                </motion.div>
              ))}
            </div>
            <p className="text-xl font-bold leading-relaxed relative z-10 text-ink/80">
              &ldquo;The best sourdough in the city. Period. The crust is perfectly blistered and the crumb is incredibly tender.&rdquo;
            </p>
            <div className="font-bold uppercase tracking-widest text-teal relative z-10">&mdash; Jane D.</div>
          </motion.div>
        </FadeIn>
        <FadeIn direction="right" delay={0.2} className="min-w-[85vw] sm:min-w-[75vw] md:min-w-0 snap-center">
          <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="bg-warm-gray p-8 md:p-12 rounded-[2rem] space-y-6 relative text-left h-full overflow-hidden card-glow">
            <div className="text-yellow text-8xl font-script absolute -top-4 left-8 opacity-30">&ldquo;</div>
            <CookieSVG className="absolute -right-2 -bottom-2 w-24 h-24 text-yellow" />
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-yellow/[0.04] to-transparent rounded-bl-full" />
            <div className="flex gap-1 text-yellow relative z-10">
              {[...Array(5)].map((_, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.08, type: 'spring', stiffness: 400 }}>
                  <Star className="w-6 h-6 fill-current" />
                </motion.div>
              ))}
            </div>
            <p className="text-xl font-bold leading-relaxed relative z-10 text-ink/80">
              &ldquo;Their almond croissants transport me straight to Paris. I come here every weekend without fail.&rdquo;
            </p>
            <div className="font-bold uppercase tracking-widest text-teal relative z-10">&mdash; Mark T.</div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
};


const ReferralForm = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [friendName, setFriendName] = useState('');
  const [friendContact, setFriendContact] = useState('');
  const [yourName, setYourName] = useState('');
  const [yourEmail, setYourEmail] = useState('');

  const inputClass = "w-full px-5 py-3.5 rounded-xl border-2 border-white/20 bg-white/10 text-white placeholder:text-white/50 font-medium outline-none focus:border-yellow focus:bg-white/20 transition-all";

  const renderStep = () => {
    if (step === 3) {
      return (
        <motion.div
          key="step3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl px-8 py-6 text-center max-w-sm mx-auto"
        >
          <CheckCircle2 className="w-10 h-10 text-teal mx-auto mb-3" />
          <p className="text-ink font-bold text-lg">Referral submitted!</p>
          <p className="text-ink/60 text-sm font-medium mt-2 leading-relaxed">
            A confirmation has been sent to <strong className="text-ink">{yourEmail}</strong>. When <strong className="text-ink">{friendName}</strong> places their first order, you'll both get $5 off!
          </p>
        </motion.div>
      );
    }

    if (step === 2) {
      return (
        <motion.form
          key="step2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={(e: React.FormEvent) => { e.preventDefault(); if (yourName && yourEmail) setStep(3); }}
          className="max-w-sm mx-auto space-y-3 relative z-10"
        >
          <p className="text-white/90 text-sm font-bold text-center mb-1">Now your info, so we can credit you!</p>
          <input type="text" required value={yourName} onChange={e => setYourName(e.target.value)} placeholder="Your name" className={inputClass} />
          <input type="email" required value={yourEmail} onChange={e => setYourEmail(e.target.value)} placeholder="Your email" className={inputClass} />
          <button type="submit" className="w-full bg-yellow hover:bg-yellow-hover text-white py-3.5 rounded-full font-bold text-lg transition-colors shadow-md">
            Submit Referral
          </button>
          <button type="button" onClick={() => setStep(1)} className="w-full text-white/60 hover:text-white text-sm font-medium transition-colors pt-1">
            Back
          </button>
        </motion.form>
      );
    }

    return (
      <motion.form
        key="step1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={(e: React.FormEvent) => { e.preventDefault(); if (friendName && friendContact) setStep(2); }}
        className="max-w-sm mx-auto space-y-3 relative z-10"
      >
        <p className="text-white/90 text-sm font-bold text-center mb-1">Who are you referring?</p>
        <input type="text" required value={friendName} onChange={e => setFriendName(e.target.value)} placeholder="Friend's name" className={inputClass} />
        <input type="text" required value={friendContact} onChange={e => setFriendContact(e.target.value)} placeholder="Friend's phone or email" className={inputClass} />
        <button type="submit" className="w-full bg-yellow hover:bg-yellow-hover text-white py-3.5 rounded-full font-bold text-lg transition-colors shadow-md">
          Next
        </button>
        <p className="text-white/50 text-xs font-medium text-center">
          Offer valid through May 31st
        </p>
      </motion.form>
    );
  };

  return (
    <section id="contact" className="relative px-6 md:px-12 max-w-5xl mx-auto z-10 -mt-24 -mb-24">
      <div className="bg-teal rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden grain-overlay">
        {/* Decorative graphics */}
        <div className="absolute -right-4 -top-4 w-24 h-24 hidden md:block z-0 opacity-20">
          <img src="/57.png" alt="" className="w-full h-full object-contain" />
        </div>
        <img src="/56.png" alt="" className="absolute -left-6 -bottom-6 w-28 h-28 object-contain opacity-[0.12] hidden md:block rotate-[-15deg]" />
        <div className="deco-ring w-40 h-40 border border-white/[0.08] -left-12 -top-12 hidden md:block animate-spin-slow" />
        <div className="deco-ring w-28 h-28 border border-yellow/[0.1] -right-8 -bottom-8 hidden md:block animate-spin-slow" style={{ animationDirection: 'reverse' }} />
        <WheatSVG className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-20 text-white/10 hidden lg:block" />
        <FloatingDots className="absolute inset-0 w-full h-full text-white/30 pointer-events-none" />
        <div className="absolute inset-0 stripe-accent text-white pointer-events-none rounded-3xl" />

        <div className="relative z-10 text-center space-y-4 mb-8">
          <h4 className="font-script text-yellow text-2xl">Referral Program</h4>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Refer a Friend &<br />Get <span className="text-yellow">$5 Off</span>
          </h2>
          <p className="text-white/80 font-medium max-w-lg mx-auto text-sm md:text-base leading-relaxed">
            Tell a friend about our microbakery! When they place their first order and mention your name, <strong className="text-white">you get $5 off your next purchase</strong>.
          </p>
          {step < 3 && (
            <div className="flex items-center justify-center gap-2 pt-2">
              <div className={`h-2 rounded-full transition-all ${step === 1 ? 'bg-yellow w-6' : 'bg-white/30 w-2'}`} />
              <div className={`h-2 rounded-full transition-all ${step === 2 ? 'bg-yellow w-6' : 'bg-white/30 w-2'}`} />
            </div>
          )}
        </div>

        {renderStep()}
      </div>
    </section>
  );
};

type BreadKey = 'sourdough' | 'semolina' | 'banana' | 'glutenFree';
type CookieKey = 'chocolateChip' | 'chocolateChipDuo' | 'whiteChocolateChip' | 'whiteMacadamia';

const BREAD_SKU: Record<BreadKey, string> = {
  sourdough: 'LOAF-SOURDOUGH',
  semolina: 'LOAF-SEMOLINA',
  banana: 'LOAF-BANANA',
  glutenFree: 'LOAF-GF',
};

const COOKIE_SKU_PREFIX: Record<CookieKey, string> = {
  chocolateChip: 'CKY-CHOC',
  chocolateChipDuo: 'CKY-DUO',
  whiteChocolateChip: 'CKY-WHITE',
  whiteMacadamia: 'CKY-MAC',
};

// Generate the next ~5 weeks of Tuesdays and Thursdays for the date picker.
function upcomingFulfillmentDates(weeks = 5): { value: string; label: string }[] {
  const out: { value: string; label: string }[] = [];
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  for (let i = 1; i <= weeks * 7; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    const dow = d.getDay();
    if (dow !== 2 && dow !== 4) continue;
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const label = d.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
    out.push({ value: `${yyyy}-${mm}-${dd}`, label });
  }
  return out;
}

const OrderForm = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [delivery, setDelivery] = useState<'pickup' | 'delivery' | ''>('');
  const [address, setAddress] = useState('');
  const [fulfillmentDate, setFulfillmentDate] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [otherNotes, setOtherNotes] = useState<Record<string, string>>({});
  const [breadQuantities, setBreadQuantities] = useState<Record<BreadKey, number | 'other'>>({
    sourdough: 0, semolina: 0, banana: 0, glutenFree: 0,
  });
  const [cookieQuantities, setCookieQuantities] = useState<Record<CookieKey, number | 'other'>>({
    chocolateChip: 0, chocolateChipDuo: 0, whiteChocolateChip: 0, whiteMacadamia: 0,
  });

  if (!isOpen) return null;

  const fulfillmentDateOptions = upcomingFulfillmentDates();

  const breads: { key: BreadKey; name: string; price: number }[] = [
    { key: 'sourdough', name: 'Sourdough', price: 12 },
    { key: 'semolina', name: 'Semolina', price: 16 },
    { key: 'banana', name: 'Banana Bread', price: 16 },
    { key: 'glutenFree', name: 'Gluten Free', price: 23 },
  ];

  const cookies: { key: CookieKey; name: string }[] = [
    { key: 'chocolateChip', name: 'Chocolate Chip Cookies' },
    { key: 'chocolateChipDuo', name: 'Chocolate Chip Duo' },
    { key: 'whiteChocolateChip', name: 'White Chocolate Chip' },
    { key: 'whiteMacadamia', name: 'White Macadamia Nut' },
  ];

  const cookiePricing = [
    { qty: 6, price: 10 },
    { qty: 12, price: 18 },
    { qty: 18, price: 28 },
    { qty: 24, price: 36 },
  ];

  const calculateTotal = () => {
    let total = 0;
    breads.forEach(b => {
      const qty = breadQuantities[b.key];
      if (typeof qty === 'number') total += qty * b.price;
    });
    cookies.forEach(c => {
      const qty = cookieQuantities[c.key];
      if (typeof qty === 'number') {
        const tier = cookiePricing.find(t => t.qty === qty);
        if (tier) total += tier.price;
      }
    });
    if (delivery === 'delivery') total += 5;
    return total;
  };

  const hasItems = () => {
    return Object.values(breadQuantities).some(v => v !== 0) ||
           Object.values(cookieQuantities).some(v => v !== 0);
  };

  const buildOrderSummary = () => {
    const lines: string[] = [];
    lines.push(`New order from ${name} (${phone})`);
    lines.push(delivery === 'delivery' ? `Delivery to: ${address}` : 'Pick-up');
    if (fulfillmentDate) lines.push(`For: ${fulfillmentDate}`);
    const breadLines = breads
      .map(b => {
        const qty = breadQuantities[b.key];
        if (qty === 0 || qty === undefined) return null;
        if (qty === 'other') return `${b.name}: other (${otherNotes[`bread-${b.key}`] || 'TBD'})`;
        return `${b.name} x${qty}`;
      })
      .filter(Boolean);
    const cookieLines = cookies
      .map(c => {
        const qty = cookieQuantities[c.key];
        if (qty === 0 || qty === undefined) return null;
        if (qty === 'other') return `${c.name}: other (${otherNotes[`cookie-${c.key}`] || 'TBD'})`;
        return `${c.name} x${qty}`;
      })
      .filter(Boolean);
    if (breadLines.length) lines.push('Breads: ' + breadLines.join(', '));
    if (cookieLines.length) lines.push('Cookies: ' + cookieLines.join(', '));
    if (orderNotes.trim()) lines.push(`Notes: ${orderNotes.trim()}`);
    lines.push(`Estimated total: $${calculateTotal()}`);
    return lines.join('\n');
  };

  const notifyOwner = () => {
    const body = encodeURIComponent(buildOrderSummary());
    window.location.href = `sms:+17864139347?&body=${body}`;
  };

  const buildWebhookPayload = () => {
    const websiteOrderId = `ord_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const items: { sku: string; name: string; qty: number; unit_price: number }[] = [];
    const otherLines: string[] = [];

    breads.forEach(b => {
      const qty = breadQuantities[b.key];
      if (qty === 'other') {
        otherLines.push(`${b.name} (custom): ${otherNotes[`bread-${b.key}`] || 'TBD'}`);
      } else if (typeof qty === 'number' && qty > 0) {
        items.push({ sku: BREAD_SKU[b.key], name: b.name, qty, unit_price: b.price });
      }
    });

    cookies.forEach(c => {
      const qty = cookieQuantities[c.key];
      if (qty === 'other') {
        otherLines.push(`${c.name} (custom): ${otherNotes[`cookie-${c.key}`] || 'TBD'}`);
      } else if (typeof qty === 'number' && qty > 0) {
        const tier = cookiePricing.find(t => t.qty === qty);
        if (tier) {
          items.push({
            sku: `${COOKIE_SKU_PREFIX[c.key]}-${qty}`,
            name: `${c.name} (${qty}ct)`,
            qty: 1,
            unit_price: tier.price,
          });
        }
      }
    });

    const subtotal = items.reduce((sum, it) => sum + it.qty * it.unit_price, 0);
    const deliveryFee = delivery === 'delivery' ? 5 : 0;
    const notesParts: string[] = [];
    if (orderNotes.trim()) notesParts.push(orderNotes.trim());
    if (otherLines.length) notesParts.push(otherLines.join(' | '));

    return {
      website_order_id: websiteOrderId,
      placed_at: new Date().toISOString(),
      customer: { name, email: email.trim(), phone },
      fulfillment: {
        type: delivery as 'pickup' | 'delivery',
        date: fulfillmentDate,
        address: delivery === 'delivery' ? address : null,
      },
      items,
      subtotal: Number(subtotal.toFixed(2)),
      delivery_fee: deliveryFee,
      total: Number((subtotal + deliveryFee).toFixed(2)),
      notes: notesParts.join(' — '),
    };
  };

  const submitToDashboard = async (): Promise<{ ok: boolean; cutoffPassed: boolean }> => {
    try {
      const payload = buildWebhookPayload();
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) return { ok: true, cutoffPassed: false };
      let bodyText = '';
      try { bodyText = await res.text(); } catch { /* ignore */ }
      // 409 with anything other than a duplicate marker = cut-off passed.
      if (res.status === 409 && !/duplicate/i.test(bodyText)) {
        return { ok: false, cutoffPassed: true };
      }
      if (res.status === 409) return { ok: true, cutoffPassed: false };
      console.warn('[orders] dashboard webhook returned', res.status, bodyText);
      return { ok: false, cutoffPassed: false };
    } catch (err) {
      console.warn('[orders] dashboard webhook unreachable', err);
      return { ok: false, cutoffPassed: false };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!name || !phone || !delivery || !fulfillmentDate || !hasItems()) return;
    if (delivery === 'delivery' && !address) return;

    setSubmitting(true);
    setSubmitError(null);

    const result = await submitToDashboard();
    if (result.cutoffPassed) {
      setSubmitting(false);
      setSubmitError("The cut-off for that date has passed. Please pick a later pick-up/delivery date.");
      return;
    }

    // Whether the dashboard accepted or not, fall back to SMS so the order
    // still reaches Melina while the webhook function is being rolled out.
    notifyOwner();
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative max-w-2xl w-full text-center bg-white rounded-3xl p-12 md:p-16 shadow-2xl z-10"
        >
          <button onClick={onClose} className="absolute top-5 right-5 text-ink/30 hover:text-ink transition-colors">
            <X className="w-6 h-6" />
          </button>
          <CheckCircle2 className="w-16 h-16 text-teal mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-ink mb-2">Order Received!</h2>
          <p className="text-ink/70 font-medium leading-relaxed mb-6">
            Thank you, <span className="font-bold text-ink">{name}</span>! We've notified Melina at <span className="font-bold text-ink">(786) 413-9347</span>.
          </p>
          <div className="bg-[#f0ece4] rounded-2xl p-5 text-left mb-6">
            <div className="flex justify-between items-center">
              <span className="font-bold text-ink">Estimated Total</span>
              <span className="text-2xl font-extrabold text-teal">${calculateTotal()}</span>
            </div>
            <span className="text-sm text-ink/50 font-medium">
              {delivery === 'delivery' ? 'Includes $5 delivery fee' : 'Pick-up, no delivery fee'}
            </span>
          </div>
          <div className="border-2 border-teal/20 rounded-2xl p-6 bg-white">
            <h3 className="text-lg font-extrabold text-ink mb-1">Pay with Zelle to confirm</h3>
            <p className="text-ink/60 text-sm font-medium mb-4">Scan the QR code or send to the phone number below.</p>
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <img
                src="/zelle-qr.png"
                alt="Zelle QR code for Your Neighborly Loaf"
                className="w-40 h-40 object-contain rounded-xl border border-ink/10 bg-white p-1"
              />
              <div className="text-left flex-1">
                <p className="text-xs font-bold uppercase tracking-wide text-ink/40 mb-1">Zelle Phone</p>
                <a
                  href="tel:+17864139347"
                  className="block text-2xl font-extrabold text-teal hover:text-teal/80 transition-colors"
                >
                  (786) 413-9347
                </a>
                <p className="text-xs text-ink/50 font-medium mt-2 leading-relaxed">
                  Recipient: <strong className="text-ink/70">Your Neighborly Loaf</strong>
                </p>
                <button
                  onClick={() => navigator.clipboard?.writeText('7864139347')}
                  className="mt-3 text-xs font-bold text-teal hover:text-teal/80 underline underline-offset-2"
                >
                  Copy number
                </button>
              </div>
            </div>
          </div>
          <p className="text-ink/50 text-xs font-medium mt-4 leading-relaxed">
            Melina will follow up at <strong className="text-ink/70">{phone}</strong> to confirm pick-up/delivery timing.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={notifyOwner}
              className="flex-1 bg-white border-2 border-teal text-teal hover:bg-teal hover:text-white px-6 py-3 rounded-full font-bold transition-colors"
            >
              Resend Order to Bakery
            </button>
            <button
              onClick={() => {
                setSubmitted(false);
                setName('');
                setPhone('');
                setEmail('');
                setDelivery('');
                setAddress('');
                setFulfillmentDate('');
                setOrderNotes('');
                setSubmitError(null);
                setBreadQuantities({ sourdough: 0, semolina: 0, banana: 0, glutenFree: 0 });
                setCookieQuantities({ chocolateChip: 0, chocolateChipDuo: 0, whiteChocolateChip: 0, whiteMacadamia: 0 });
                setOtherNotes({});
              }}
              className="flex-1 bg-teal hover:bg-teal/90 text-white px-6 py-3 rounded-full font-bold transition-colors"
            >
              Place Another Order
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto z-10"
      >
        <div className="sticky top-0 bg-white rounded-t-3xl border-b border-ink/5 px-6 md:px-8 py-4 flex items-center justify-between z-20">
          <h2 className="text-xl font-extrabold text-ink">Weekly Order Form</h2>
          <button onClick={onClose} className="text-ink/30 hover:text-ink transition-colors p-1">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="px-6 md:px-8 py-8">
        <div className="text-center mb-12">
          <h4 className="font-script text-teal text-2xl mb-2">Order Now</h4>
          <h2 className="text-4xl md:text-5xl font-extrabold text-ink mb-6">
            Weekly <span className="text-yellow">Order</span> Form
          </h2>
          <div className="bg-[#f0ece4] rounded-2xl p-6 md:p-8 text-left space-y-3 max-w-xl mx-auto">
            <p className="text-ink/80 font-medium leading-relaxed">
              Welcome to Your Neighborly Loaf's weekly order form!
            </p>
            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-teal mt-0.5 flex-shrink-0" />
              <p className="text-ink/70 font-medium text-sm leading-relaxed">
                We offer pick-up/delivery twice a week, <strong className="text-ink">Tuesdays and Thursdays</strong>, in the afternoon after working hours.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-teal mt-0.5 flex-shrink-0" />
              <div className="text-ink/70 font-medium text-sm leading-relaxed">
                <p>Orders for <strong className="text-ink">Tuesday</strong> are due by <strong className="text-ink">Saturday</strong>.</p>
                <p>Orders for <strong className="text-ink">Thursday</strong> are due by <strong className="text-ink">Monday</strong>.</p>
              </div>
            </div>
            <p className="text-ink/60 text-xs font-medium pt-1">
              Payment via Zelle to <strong className="text-ink">(786) 413-9347</strong> confirms your order. You'll see the QR code after submitting.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-ink mb-2">
                Name <span className="text-yellow">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-5 py-3.5 rounded-xl border-2 border-ink/10 focus:border-teal focus:ring-0 outline-none font-medium text-ink placeholder:text-ink/30 transition-colors bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-ink mb-2">
                Phone Number <span className="text-yellow">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="(555) 123-4567"
                className="w-full px-5 py-3.5 rounded-xl border-2 border-ink/10 focus:border-teal focus:ring-0 outline-none font-medium text-ink placeholder:text-ink/30 transition-colors bg-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-ink mb-2">
                Email <span className="text-ink/40 font-medium">(optional)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-5 py-3.5 rounded-xl border-2 border-ink/10 focus:border-teal focus:ring-0 outline-none font-medium text-ink placeholder:text-ink/30 transition-colors bg-white"
              />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-extrabold text-ink mb-2">Bread Loaves</h3>
            <p className="text-ink/50 text-sm font-medium mb-6">Select the quantity you'd like. Choose "Other" for custom amounts.</p>
            <div className="space-y-4">
              {breads.map(bread => {
                const qty = breadQuantities[bread.key];
                return (
                  <div key={bread.key} className="bg-white border-2 border-ink/5 rounded-2xl p-5 hover:border-teal/20 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-lg font-bold text-ink">{bread.name}</span>
                        <span className="ml-3 text-teal font-extrabold">${bread.price}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[0, 1, 2, 3].map(n => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => setBreadQuantities(prev => ({ ...prev, [bread.key]: n }))}
                            className={`w-11 h-11 rounded-xl font-bold text-sm transition-all ${
                              qty === n
                                ? n === 0 ? 'bg-ink/10 text-ink/60 ring-2 ring-ink/20' : 'bg-teal text-white shadow-md'
                                : 'bg-ink/5 text-ink/60 hover:bg-ink/10'
                            }`}
                          >
                            {n === 0 ? '–' : n}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => setBreadQuantities(prev => ({ ...prev, [bread.key]: 'other' }))}
                          className={`px-4 h-11 rounded-xl font-bold text-sm transition-all ${
                            qty === 'other' ? 'bg-yellow text-white shadow-md' : 'bg-ink/5 text-ink/60 hover:bg-ink/10'
                          }`}
                        >
                          Other
                        </button>
                      </div>
                    </div>
                    {qty === 'other' && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3">
                        <input
                          type="text"
                          placeholder="How many would you like? I'll reach out with pricing."
                          value={otherNotes[bread.key] || ''}
                          onChange={e => setOtherNotes(prev => ({ ...prev, [bread.key]: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-lg border-2 border-yellow/30 focus:border-yellow outline-none text-sm font-medium text-ink placeholder:text-ink/30 bg-yellow/5"
                        />
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-extrabold text-ink mb-2">Cookies</h3>
            <p className="text-ink/50 text-sm font-medium mb-6">Select a pack size. Choose "Other" for custom amounts.</p>
            <div className="space-y-4">
              {cookies.map(cookie => {
                const qty = cookieQuantities[cookie.key];
                return (
                  <div key={cookie.key} className="bg-white border-2 border-ink/5 rounded-2xl p-5 hover:border-teal/20 transition-colors">
                    <div className="flex flex-col gap-3">
                      <span className="text-lg font-bold text-ink">{cookie.name}</span>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setCookieQuantities(prev => ({ ...prev, [cookie.key]: 0 }))}
                          className={`w-11 h-11 rounded-xl font-bold text-sm transition-all ${
                            qty === 0 ? 'bg-ink/10 text-ink/60 ring-2 ring-ink/20' : 'bg-ink/5 text-ink/60 hover:bg-ink/10'
                          }`}
                        >
                          –
                        </button>
                        {cookiePricing.map(tier => (
                          <button
                            key={tier.qty}
                            type="button"
                            onClick={() => setCookieQuantities(prev => ({ ...prev, [cookie.key]: tier.qty }))}
                            className={`h-11 px-3 rounded-xl font-bold text-sm transition-all flex flex-col items-center justify-center leading-tight ${
                              qty === tier.qty ? 'bg-teal text-white shadow-md' : 'bg-ink/5 text-ink/60 hover:bg-ink/10'
                            }`}
                          >
                            <span>{tier.qty}ct</span>
                            <span className="text-[10px] opacity-80">${tier.price}</span>
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => setCookieQuantities(prev => ({ ...prev, [cookie.key]: 'other' }))}
                          className={`px-4 h-11 rounded-xl font-bold text-sm transition-all ${
                            qty === 'other' ? 'bg-yellow text-white shadow-md' : 'bg-ink/5 text-ink/60 hover:bg-ink/10'
                          }`}
                        >
                          Other
                        </button>
                      </div>
                    </div>
                    {qty === 'other' && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3">
                        <input
                          type="text"
                          placeholder="How many would you like? I'll reach out with pricing."
                          value={otherNotes[cookie.key] || ''}
                          onChange={e => setOtherNotes(prev => ({ ...prev, [cookie.key]: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-lg border-2 border-yellow/30 focus:border-yellow outline-none text-sm font-medium text-ink placeholder:text-ink/30 bg-yellow/5"
                        />
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-extrabold text-ink mb-2">
              Pick-up or Delivery? <span className="text-yellow">*</span>
            </h3>
            <p className="text-ink/50 text-sm font-medium mb-6">Delivery adds a $5 fee to your order.</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setDelivery('pickup')}
                className={`p-6 rounded-2xl border-2 text-center transition-all ${
                  delivery === 'pickup' ? 'border-teal bg-[#f0ece4] shadow-md' : 'border-ink/10 hover:border-teal/30 bg-white'
                }`}
              >
                <MapPin className={`w-8 h-8 mx-auto mb-3 ${delivery === 'pickup' ? 'text-teal' : 'text-ink/30'}`} />
                <span className={`text-lg font-bold ${delivery === 'pickup' ? 'text-teal' : 'text-ink/60'}`}>Pick-up</span>
                <span className={`block text-sm font-medium mt-1 ${delivery === 'pickup' ? 'text-teal/70' : 'text-ink/40'}`}>Free</span>
              </button>
              <button
                type="button"
                onClick={() => setDelivery('delivery')}
                className={`p-6 rounded-2xl border-2 text-center transition-all ${
                  delivery === 'delivery' ? 'border-teal bg-[#f0ece4] shadow-md' : 'border-ink/10 hover:border-teal/30 bg-white'
                }`}
              >
                <Truck className={`w-8 h-8 mx-auto mb-3 ${delivery === 'delivery' ? 'text-teal' : 'text-ink/30'}`} />
                <span className={`text-lg font-bold ${delivery === 'delivery' ? 'text-teal' : 'text-ink/60'}`}>Delivery</span>
                <span className={`block text-sm font-medium mt-1 ${delivery === 'delivery' ? 'text-teal/70' : 'text-ink/40'}`}>+ $5</span>
              </button>
            </div>
            {delivery === 'delivery' && (
              <div className="mt-6">
                <label className="block text-sm font-bold text-ink mb-2">
                  Delivery Address <span className="text-yellow">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="Enter your delivery address"
                  className="w-full px-5 py-3.5 rounded-xl border-2 border-ink/10 focus:border-teal focus:ring-0 outline-none font-medium text-ink placeholder:text-ink/30 transition-colors bg-white"
                />
              </div>
            )}
            <div className="mt-6">
              <label className="block text-sm font-bold text-ink mb-2">
                Pick-up / Delivery Date <span className="text-yellow">*</span>
              </label>
              <select
                required
                value={fulfillmentDate}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFulfillmentDate(e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl border-2 border-ink/10 focus:border-teal focus:ring-0 outline-none font-medium text-ink transition-colors bg-white"
              >
                <option value="">Choose a Tuesday or Thursday…</option>
                {fulfillmentDateOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <p className="text-xs text-ink/50 font-medium mt-2">
                Tuesday orders are due by Saturday. Thursday orders are due by Monday.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-ink mb-2">
              Notes <span className="text-ink/40 font-medium">(optional)</span>
            </label>
            <textarea
              rows={3}
              value={orderNotes}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setOrderNotes(e.target.value)}
              placeholder="Allergies, preferences, gift instructions…"
              className="w-full px-5 py-3.5 rounded-xl border-2 border-ink/10 focus:border-teal focus:ring-0 outline-none font-medium text-ink placeholder:text-ink/30 transition-colors bg-white resize-none"
            />
          </div>

          <div className="bg-ink/[0.03] rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-ink">Estimated Total</span>
              <span className="text-3xl font-extrabold text-teal">${calculateTotal()}</span>
            </div>
            {delivery === 'delivery' && (
              <p className="text-xs text-ink/50 font-medium mb-4">Includes $5 delivery fee</p>
            )}
            <p className="text-xs text-ink/50 font-medium mb-6">
              Items marked "Other" are not included in the total. I'll reach out with custom pricing.
            </p>
            <button
              type="submit"
              disabled={submitting || !name || !phone || !delivery || !fulfillmentDate || !hasItems() || (delivery === 'delivery' && !address)}
              className="w-full bg-yellow hover:bg-yellow-hover disabled:opacity-40 disabled:cursor-not-allowed text-white py-4 rounded-full font-bold text-lg transition-colors shadow-md"
            >
              {submitting ? 'Submitting…' : 'Submit Order'}
            </button>
            {submitError && (
              <p className="text-center text-red-600 text-sm font-bold mt-3">{submitError}</p>
            )}
            <p className="text-center text-ink/40 text-xs font-medium mt-4">
              On submit, your order goes straight to Melina and you'll get a Zelle QR code to pay.
            </p>
          </div>
        </form>
        </div>
      </motion.div>
    </div>
  );
};

const ContactModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [isSpecialOrder, setIsSpecialOrder] = useState(false);
  const [message, setMessage] = useState('');
  const [occasion, setOccasion] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const reset = () => { setStep(1); setName(''); setContact(''); setIsSpecialOrder(false); setMessage(''); setOccasion(''); setEventDate(''); setSubmitted(false); onClose(); };
  if (!isOpen) return null;
  const inputClass = "w-full px-5 py-3.5 rounded-xl border-2 border-ink/10 focus:border-teal outline-none font-medium text-ink placeholder:text-ink/30 transition-colors bg-white";

  if (submitted) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={reset} />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 z-10 text-center">
          <button onClick={reset} className="absolute top-4 right-4 text-ink/30 hover:text-ink transition-colors"><X className="w-6 h-6" /></button>
          <CheckCircle2 className="w-16 h-16 text-teal mx-auto mb-4" />
          <h3 className="text-2xl font-extrabold text-ink mb-2">Message Sent!</h3>
          <p className="text-ink/60 text-sm font-medium leading-relaxed">
            Thank you, <strong className="text-ink">{name}</strong>! Melina will reach out to you{isSpecialOrder ? ' to discuss your special order' : ' shortly'} at <strong className="text-ink">{contact}</strong>.
          </p>
          <button onClick={reset} className="mt-6 bg-teal hover:bg-teal/90 text-white px-8 py-3 rounded-full font-bold transition-colors">Done</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={reset} />
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 z-10">
        <button onClick={reset} className="absolute top-4 right-4 text-ink/30 hover:text-ink transition-colors"><X className="w-6 h-6" /></button>
        {step === 1 && (
          <motion.form key="c1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            onSubmit={(e: React.FormEvent) => { e.preventDefault(); if (name && contact) setStep(2); }} className="space-y-5">
            <div className="text-center mb-2">
              <h3 className="text-2xl font-extrabold text-ink">Get in Touch</h3>
              <p className="text-ink/50 text-sm font-medium mt-1">We'd love to hear from you!</p>
            </div>
            <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className={inputClass} />
            <input type="text" required value={contact} onChange={e => setContact(e.target.value)} placeholder="Phone number or email" className={inputClass} />
            <button type="submit" className="w-full bg-yellow hover:bg-yellow-hover text-white py-3.5 rounded-full font-bold text-lg transition-colors shadow-md">Next</button>
            <div className="flex items-center justify-center gap-2 pt-1">
              <div className="h-2 rounded-full bg-yellow w-6" /><div className="h-2 rounded-full bg-ink/10 w-2" />
            </div>
          </motion.form>
        )}
        {step === 2 && (
          <motion.form key="c2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            onSubmit={(e: React.FormEvent) => { e.preventDefault(); if (isSpecialOrder && (!occasion || !eventDate)) return; setSubmitted(true); }} className="space-y-5">
            <div className="text-center mb-2">
              <h3 className="text-2xl font-extrabold text-ink">How can we help?</h3>
            </div>
            <button type="button" onClick={() => setIsSpecialOrder(!isSpecialOrder)}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${isSpecialOrder ? 'border-teal bg-[#f2fbf9]' : 'border-ink/10 hover:border-teal/30'}`}>
              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${isSpecialOrder ? 'bg-teal border-teal' : 'border-ink/20'}`}>
                {isSpecialOrder && <CheckCircle2 className="w-4 h-4 text-white" />}
              </div>
              <div>
                <span className={`font-bold text-sm ${isSpecialOrder ? 'text-teal' : 'text-ink/60'}`}>This is a special order</span>
                <span className={`block text-xs ${isSpecialOrder ? 'text-teal/70' : 'text-ink/40'}`}>Catering, events, custom requests</span>
              </div>
            </button>
            {isSpecialOrder && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-3">
                <input type="text" required value={occasion} onChange={e => setOccasion(e.target.value)} placeholder="Occasion (e.g. Birthday, Wedding, Corporate)" className={inputClass} />
                <input type="date" required value={eventDate} onChange={e => setEventDate(e.target.value)} className={inputClass} />
              </motion.div>
            )}
            <textarea value={message} onChange={e => setMessage(e.target.value)}
              placeholder={isSpecialOrder ? "Tell us about your vision — quantity, flavors, any details..." : "Your message or question (optional)"}
              rows={3} className={`${inputClass} resize-none`} />
            <button type="submit" className="w-full bg-yellow hover:bg-yellow-hover text-white py-3.5 rounded-full font-bold text-lg transition-colors shadow-md">
              {isSpecialOrder ? 'Request Quote' : 'Send Message'}
            </button>
            <button type="button" onClick={() => setStep(1)} className="w-full text-ink/40 hover:text-ink text-sm font-medium transition-colors">Back</button>
            <div className="flex items-center justify-center gap-2">
              <div className="h-2 rounded-full bg-ink/10 w-2" /><div className="h-2 rounded-full bg-yellow w-6" />
            </div>
            <p className="text-ink/40 text-xs text-center">Melina will reach out to discuss details and pricing.</p>
          </motion.form>
        )}
      </motion.div>
    </div>
  );
};

const Footer = ({ onOrderClick, onContactClick }: { onOrderClick: () => void; onContactClick: () => void }) => (
  <footer className="bg-white pt-40 pb-12 px-6 md:px-12 relative overflow-hidden">
    {/* Gradient divider at top */}
    <div className="gradient-divider absolute top-32 left-[10%] right-[10%]" />
    {/* Decorative elements */}
    <FloatingDots className="absolute top-12 left-0 w-40 h-40 text-teal/30 hidden lg:block" />
    <div className="deco-ring w-32 h-32 border border-yellow/[0.06] -right-8 top-32 hidden lg:block animate-spin-slow" />
    <WheatSVG className="absolute left-4 bottom-4 w-6 h-20 text-teal/8 hidden lg:block" />
    <WheatSVG className="absolute right-8 bottom-8 w-5 h-16 text-yellow/8 hidden lg:block" />
    <LoafSVG className="absolute right-12 top-36 w-24 h-14 text-teal hidden lg:block" />
    <CookieSVG className="absolute left-12 top-40 w-16 h-16 text-yellow hidden lg:block" />

    <div className="max-w-7xl mx-auto relative z-10">
      <FadeIn>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="flex items-center">
            <img src="/59.png" alt="Your Neighborly Loaf" className="h-14 w-auto" />
          </div>
          <div className="flex flex-wrap justify-center gap-8 font-extrabold text-ink">
            <a href="#about" className="hover:text-teal transition-colors">About</a>
            <a href="#menu" className="hover:text-teal transition-colors">Menu</a>
            <button onClick={onOrderClick} className="hover:text-teal transition-colors">Order</button>
            <button onClick={onContactClick} className="hover:text-teal transition-colors">Contact</button>
          </div>
          <div className="flex gap-4 text-yellow">
            {[
              { icon: <Instagram className="w-6 h-6" />, href: "https://www.instagram.com/yourneighborlyloaf/" },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="hover:text-teal transition-colors"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </FadeIn>
      <div className="gradient-divider mb-8"></div>
      <div className="text-center text-ink/70 font-medium text-sm">
        <p>&copy; Your Neighborly Loaf. All Rights Reserved.</p>
        <p className="mt-2">Design supported by <a href="https://innovat3solutions.com" target="_blank" rel="noopener noreferrer" className="text-teal hover:text-yellow font-bold transition-colors">Innovat3 Solutions</a></p>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [orderOpen, setOrderOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const openOrder = () => setOrderOpen(true);
  const closeOrder = () => setOrderOpen(false);
  const openContact = () => setContactOpen(true);
  const closeContact = () => setContactOpen(false);

  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden">
      <Navbar onOrderClick={openOrder} onContactClick={openContact} />
      <main className="flex-grow">
        <Hero />
        <AboutUs onOrderClick={openOrder} />
        <AwesomeMenu onOrderClick={openOrder} />
        <DiscountBanner onContactClick={openContact} />
        <Testimonials />

        {/* Section divider */}
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-8">
          <div className="flex items-center gap-6">
            <div className="flex-1 gradient-divider" />
            <WheatSVG className="w-5 h-14 text-teal/20" />
            <div className="flex-1 gradient-divider" />
          </div>
        </div>

        <ReferralForm />
      </main>
      <Footer onOrderClick={openOrder} onContactClick={openContact} />
      <OrderForm isOpen={orderOpen} onClose={closeOrder} />
      <ContactModal isOpen={contactOpen} onClose={closeContact} />
    </div>
  );
}
