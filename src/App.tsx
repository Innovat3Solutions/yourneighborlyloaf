import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Menu, ArrowRight, Star, Instagram, Facebook, Twitter, ShoppingBag, Youtube, Store, Coffee, Cookie } from 'lucide-react';

const Navbar = () => (
  <div className="w-full px-4 md:px-6 pt-6 absolute top-0 left-0 right-0 z-50">
    <nav className="mx-auto max-w-6xl bg-white rounded-full px-6 py-3 md:px-8 md:py-4 flex justify-between items-center shadow-sm">
      <div className="flex items-center">
        <span className="text-3xl md:text-4xl font-script text-yellow leading-none">Bakery</span>
        <span className="text-teal font-bold text-sm md:text-base ml-1 mt-2">128</span>
      </div>
      <div className="hidden md:flex items-center gap-8 font-bold text-ink/80">
        <a href="#" className="hover:text-teal transition-colors">Demos</a>
        <a href="#" className="hover:text-teal transition-colors">About Us</a>
        <a href="#" className="hover:text-teal transition-colors">Menu</a>
        <a href="#" className="hover:text-teal transition-colors">Gallery</a>
        <a href="#" className="hover:text-teal transition-colors">All Pages</a>
      </div>
      <div className="flex items-center gap-4 md:gap-6">
        <button className="text-teal hover:text-ink transition-colors">
          <ShoppingCart className="w-6 h-6" />
        </button>
        <button className="hidden md:block bg-yellow hover:bg-yellow-hover text-white px-6 py-2.5 rounded-full font-bold transition-colors shadow-md">
          Contact Us
        </button>
        <button className="md:hidden text-teal">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  </div>
);

const Hero = () => (
  <section className="bg-stripes min-h-screen pt-32 relative overflow-hidden flex flex-col items-center">
    {/* Floating Icons (Absolute positioned) */}
    <div className="absolute top-1/4 left-[10%] opacity-40">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.5a2.5 2.5 0 0 0-2.5 2.5c0 1.5 2.5 4 2.5 4s2.5-2.5 2.5-4a2.5 2.5 0 0 0-2.5-2.5z"/><path d="M19 10h-1.5a2.5 2.5 0 0 0-5 0H12h-.5a2.5 2.5 0 0 0-5 0H5a2 2 0 0 0-2 2v2c0 3 2.5 5.5 5.5 5.5h7c3 0 5.5-2.5 5.5-5.5v-2a2 2 0 0 0-2-2z"/></svg>
    </div>
    <div className="absolute bottom-1/4 left-[20%] opacity-40">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
    </div>
    <div className="absolute top-1/3 right-[10%] opacity-40">
       <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><path d="M2 21h20"/><path d="M7 8v3"/><path d="M12 8v3"/><path d="M17 8v3"/><path d="M7 4h.01"/><path d="M12 4h.01"/><path d="M17 4h.01"/></svg>
    </div>
    <div className="absolute bottom-1/3 right-[20%] opacity-40">
       <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"/><path d="M12 22c2.5-3 2.5-17 0-20"/><path d="M12 22c-2.5-3-2.5-17 0-20"/><path d="M2 12h20"/></svg>
    </div>

    {/* Hero Content */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-start pt-8 md:pt-16 relative z-10 max-w-5xl mx-auto w-full px-6"
    >
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white text-center leading-[1.2] tracking-tight drop-shadow-sm">
        Unwind And Savor A Moment<br />
        Of Pure <span className="font-script text-yellow font-normal text-5xl md:text-7xl lg:text-8xl drop-shadow-md">Enjoyment</span>
      </h1>
      <p className="text-white/90 text-center max-w-2xl mt-6 text-base md:text-lg font-medium">
        Enjoy some of the most delicious baked dishes. With our unique recipes and high-quality ingredients, it's an experience you won't forget!
      </p>
    </motion.div>

    {/* Image with Blob */}
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative mt-auto w-full max-w-3xl flex justify-center translate-y-16 z-10"
    >
      {/* Large white circle background */}
      <div className="absolute inset-0 bg-white rounded-full scale-[1.15] -z-10 shadow-xl"></div>
      {/* Thin outline circle */}
      <div className="absolute inset-0 border-2 border-white rounded-full scale-[1.3] -z-20 opacity-60"></div>
      
      <img 
        src="https://images.unsplash.com/photo-1556910103-1c02745a872f?q=80&w=2070&auto=format&fit=crop" 
        alt="Happy baker" 
        className="w-80 h-80 md:w-[32rem] md:h-[32rem] object-cover rounded-full"
        referrerPolicy="no-referrer"
      />
    </motion.div>

    <div className="scallop-down"></div>
  </section>
);

const AboutUs = () => (
  <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
    <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
      <div className="relative flex justify-center">
        {/* Teal blob background */}
        <div className="absolute inset-0 bg-teal rounded-[60%_40%_50%_50%/50%_50%_60%_40%] scale-105 -z-10 rotate-[-10deg]"></div>
        {/* Thin outline blob */}
        <div className="absolute inset-0 border-2 border-teal rounded-[50%_50%_40%_60%/60%_40%_50%_50%] scale-110 -z-20 opacity-60 rotate-12"></div>
        <img 
          src="https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?q=80&w=2000&auto=format&fit=crop" 
          alt="Croissants" 
          className="w-full max-w-md object-cover rounded-3xl mix-blend-multiply"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="space-y-6">
        <h4 className="font-script text-teal text-2xl">About Us</h4>
        <h2 className="text-4xl md:text-5xl font-extrabold text-ink leading-tight">
          The <span className="text-yellow">Taste</span> You Need,<br/>For Your Pleasure
        </h2>
        <p className="text-ink/70 font-medium leading-relaxed">
          At Bakery 128, we believe that every day deserves a little sweetness. Our artisanal bakery is your one-stop destination for delectable treats that melt in your mouth and warm your heart. With a passion for baking that's been passed down through generations, we take pride in creating mouthwatering masterpieces that delight your taste buds.
        </p>
        <button className="bg-yellow hover:bg-yellow-hover text-white px-8 py-3.5 rounded-full font-bold transition-colors shadow-md mt-4">
          More About Us
        </button>
      </div>
    </div>

    {/* Features Row */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 pt-16">
      {[
        { title: "Shop", desc: "Where Flour, Sugar, and Creativity Converge", btn: "Our Shop", icon: <Store className="w-8 h-8 text-teal stroke-[1.5]" /> },
        { title: "Delivery", desc: "Where Flour, Sugar, and Creativity Converge", btn: "Order", icon: <ShoppingBag className="w-8 h-8 text-teal stroke-[1.5]" /> },
        { title: "Catering", desc: "Where Flour, Sugar, and Creativity Converge", btn: "Contact", icon: <Coffee className="w-8 h-8 text-teal stroke-[1.5]" /> },
        { title: "Free Sample", desc: "Where Flour, Sugar, and Creativity Converge", btn: "More Info", icon: <Cookie className="w-8 h-8 text-teal stroke-[1.5]" /> },
      ].map((feature, i) => (
        <div key={i} className="bg-[#f2fbf9] rounded-2xl px-6 pb-8 pt-14 text-center flex flex-col items-center relative mt-8">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center absolute -top-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            {feature.icon}
          </div>
          <h3 className="text-2xl font-extrabold text-ink mb-3">{feature.title}</h3>
          <p className="text-ink/70 text-[15px] font-medium mb-8 leading-relaxed">
            {feature.desc}
          </p>
          <button className="mt-auto bg-teal hover:bg-teal/90 text-white px-8 py-2.5 rounded-full font-bold transition-colors">
            {feature.btn}
          </button>
        </div>
      ))}
    </div>
  </section>
);

const AwesomeMenu = () => {
  const cards = [
    { title: "Desserts", bg: "bg-[#e6f6f5]", desc: "Desserts are a beloved category of food that typically round out a meal with a sweet and satisfying note.", img: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=500&auto=format&fit=crop" },
    { title: "Cakes", bg: "bg-[#fce8f0]", desc: "Cakes are a beloved category of dessert that has been enjoyed by people around the world for centuries.", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=500&auto=format&fit=crop" },
    { title: "Baking", bg: "bg-[#fef4e3]", desc: "Baking is a culinary technique and an art form that involves the preparation and cooking of various food.", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=500&auto=format&fit=crop" },
  ];

  const listItems = [
    { name: "Sponge Cake", desc: "Sponge cake is characterized.", price: "$ 26.80 USD" },
    { name: "Eclair", desc: "Eclair are enjoyed on various occasions.", price: "$ 7.12 USD" },
    { name: "Bun", desc: "A small, sometimes sweet, bread-based item.", price: "$ 3.75 USD" },
    { name: "Cheesecake", desc: "A sweet dessert consisting of one or more layers.", price: "$ 19.50 USD" },
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-center">
      <h4 className="font-script text-teal text-2xl mb-2">Awesome Menu</h4>
      <h2 className="text-4xl md:text-5xl font-extrabold text-ink mb-24">Bakery For Lovely People</h2>
      
      <div className="grid md:grid-cols-3 gap-8 mb-24">
        {cards.map((card, i) => (
          <div key={i} className={`${card.bg} rounded-2xl p-8 pt-20 relative flex flex-col items-center`}>
            <div className="absolute -top-16 w-32 h-32 rounded-full bg-white p-2 shadow-md">
               <img src={card.img} alt={card.title} className="w-full h-full object-cover rounded-full" />
            </div>
            <h3 className="text-2xl font-extrabold text-ink mb-4">{card.title}</h3>
            <p className="text-ink/70 font-medium mb-8 text-sm leading-relaxed">{card.desc}</p>
            <button className="bg-white text-teal hover:bg-teal hover:text-white px-8 py-3 rounded-full font-bold transition-colors shadow-sm mt-auto">
              Order Now
            </button>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-x-16 gap-y-8 text-left">
        {listItems.map((item, i) => (
          <div key={i} className="flex flex-col">
            <div className="flex justify-between items-baseline mb-2">
              <h3 className="text-xl font-extrabold text-ink">{item.name}</h3>
              <span className="text-teal font-extrabold">{item.price}</span>
            </div>
            <p className="text-ink/60 font-medium text-sm mb-4">{item.desc}</p>
            <div className="w-full border-b border-dashed border-ink/20"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

const DiscountBanner = () => (
  <section className="relative py-32 flex items-center justify-center text-center">
    <div className="scallop-top"></div>
    
    <div className="absolute inset-0 z-0">
      <img src="https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?q=80&w=2070&auto=format&fit=crop" alt="Bakery background" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-ink/60"></div>
    </div>

    <div className="relative z-10 space-y-6 px-6">
      <h4 className="font-script text-teal text-3xl">Special Discount</h4>
      <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
        Get Special Autumn<br/>Discount!
      </h2>
      <div className="flex justify-center gap-4 pt-4">
        <button className="bg-yellow hover:bg-yellow-hover text-white px-8 py-3.5 rounded-full font-bold transition-colors shadow-md">
          Our Menu
        </button>
        <button className="bg-teal hover:bg-teal/90 text-white px-8 py-3.5 rounded-full font-bold transition-colors shadow-md">
          Contact Us
        </button>
      </div>
    </div>

    <div className="scallop-bottom"></div>
  </section>
);

const Testimonials = () => (
  <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-center space-y-16">
    <h2 className="text-4xl md:text-5xl font-extrabold text-ink">What Our Clients are <span className="font-script text-yellow font-normal text-5xl md:text-6xl">saying</span></h2>
    <div className="grid md:grid-cols-2 gap-12">
      <div className="bg-warm-gray p-12 rounded-[2rem] space-y-6 relative text-left">
        <div className="text-yellow text-8xl font-script absolute -top-4 left-8 opacity-30">"</div>
        <div className="flex gap-1 text-yellow">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
        </div>
        <p className="text-xl font-bold leading-relaxed relative z-10 text-ink/80">
          "The best sourdough in the city. Period. The crust is perfectly blistered and the crumb is incredibly tender."
        </p>
        <div className="font-bold uppercase tracking-widest text-teal">— Jane D.</div>
      </div>
      <div className="bg-warm-gray p-12 rounded-[2rem] space-y-6 relative text-left">
        <div className="text-yellow text-8xl font-script absolute -top-4 left-8 opacity-30">"</div>
        <div className="flex gap-1 text-yellow">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
        </div>
        <p className="text-xl font-bold leading-relaxed relative z-10 text-ink/80">
          "Their almond croissants transport me straight to Paris. I come here every weekend without fail."
        </p>
        <div className="font-bold uppercase tracking-widest text-teal">— Mark T.</div>
      </div>
    </div>
  </section>
);

const BlogPreview = () => {
  const posts = [
    {
      title: "The Secret to Perfect Sourdough Starter",
      date: "Oct 12, 2026",
      category: "Baking Tips",
      img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop"
    },
    {
      title: "Autumn Flavor Profiles: Cinnamon & Nutmeg",
      date: "Oct 05, 2026",
      category: "Seasonal",
      img: "https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=2066&auto=format&fit=crop"
    }
  ];

  return (
    <section className="pt-24 pb-40 bg-[#fef4e3] px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-ink">Our Latest <span className="font-script text-yellow font-normal text-5xl md:text-6xl">Blog</span></h2>
          <a href="#" className="font-bold uppercase tracking-widest text-teal hover:text-yellow transition-colors flex items-center gap-2">
            View All Posts <ArrowRight className="w-5 h-5" />
          </a>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          {posts.map((post, i) => (
            <div key={i} className="group cursor-pointer flex flex-col md:flex-row gap-8 items-center bg-white p-4 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow">
              <div className="w-full md:w-1/2 aspect-square rounded-[2rem] overflow-hidden">
                <img 
                  src={post.img} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4 pr-4">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-ink/60">
                  <span>{post.date}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow"></span>
                  <span className="text-teal">{post.category}</span>
                </div>
                <h3 className="font-extrabold text-2xl group-hover:text-teal transition-colors leading-tight text-ink">{post.title}</h3>
                <p className="text-ink/70 font-medium">Discover the techniques and stories behind our favorite bakes...</p>
                <div className="pt-2 inline-flex items-center gap-2 font-bold uppercase tracking-widest text-teal group-hover:text-yellow transition-colors">
                  Read More <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ReferralForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="relative px-6 md:px-12 max-w-5xl mx-auto z-10 -mt-24 -mb-24">
      <div className="bg-teal rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white">Referral</h2>
        
        {submitted ? (
          <div className="bg-white px-8 py-4 rounded-full text-teal font-bold">
            Thank you for letting us know!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full md:w-auto bg-white p-1.5 rounded-full relative">
            {/* Decorative cupcake icon */}
            <div className="absolute -left-6 -top-8 w-16 h-16 hidden md:block z-20">
               <img src="https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=200&auto=format&fit=crop" alt="Cupcake" className="w-full h-full object-cover drop-shadow-md" style={{ clipPath: 'circle(50%)' }} />
            </div>
            <select 
              required
              defaultValue=""
              className="bg-transparent border-none outline-none px-6 py-3 text-ink font-medium w-full md:w-64 appearance-none cursor-pointer z-10 relative"
            >
              <option value="" disabled>How did you find us?</option>
              <option value="friend">Friend or Family</option>
              <option value="social">Social Media</option>
              <option value="search">Search Engine</option>
              <option value="walk">Walked by</option>
              <option value="other">Other</option>
            </select>
            <button 
              type="submit"
              className="bg-yellow hover:bg-yellow-hover text-white px-8 py-3 rounded-full font-bold transition-colors whitespace-nowrap z-10 relative"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-white pt-40 pb-12 px-6 md:px-12">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
        <div className="flex items-center">
          <span className="text-4xl font-script text-yellow leading-none">Bakery</span>
          <span className="text-teal font-bold text-base ml-1 mt-2">128</span>
        </div>
        <div className="flex flex-wrap justify-center gap-8 font-extrabold text-ink">
          <a href="#" className="hover:text-teal transition-colors">About Us</a>
          <a href="#" className="hover:text-teal transition-colors">Our Team</a>
          <a href="#" className="hover:text-teal transition-colors">Portfolio</a>
          <a href="#" className="hover:text-teal transition-colors">Menu</a>
        </div>
        <div className="flex gap-4 text-yellow">
          <a href="#" className="hover:text-teal transition-colors"><Facebook className="w-6 h-6 fill-current" /></a>
          <a href="#" className="hover:text-teal transition-colors"><Instagram className="w-6 h-6" /></a>
          <a href="#" className="hover:text-teal transition-colors"><Youtube className="w-6 h-6 fill-current" /></a>
        </div>
      </div>
      <div className="w-full h-px bg-teal mb-8"></div>
      <div className="text-center text-ink/70 font-medium text-sm space-y-2">
        <p>© Bakery 128. All Rights Reserved. <a href="#" className="text-teal hover:underline">Licensing</a></p>
        <p><a href="#" className="text-teal hover:underline">Webflow Templates</a> by <a href="#" className="text-teal hover:underline">128.digital.</a> Powered by <a href="#" className="text-teal hover:underline">Webflow</a></p>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <AboutUs />
        <AwesomeMenu />
        <DiscountBanner />
        <Testimonials />
        <BlogPreview />
        <ReferralForm />
      </main>
      <Footer />
    </div>
  );
}
