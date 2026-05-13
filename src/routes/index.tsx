import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useSuspenseQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../convex/_generated/api";
import { 
  Coffee, 
  Zap, 
  MapPin, 
  Clock, 
  Phone, 
  Star, 
  ChevronRight, 
  Camera, 
  Share2,
  Menu as MenuIcon,
  X
} from "lucide-react";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { data: products } = useSuspenseQuery(convexQuery(api.products.listAll, {}));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-brand-dark/90 backdrop-blur-md py-4 border-b border-white/10" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-caramel rounded-full flex items-center justify-center">
              <Coffee className="text-brand-dark w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">LATTE <span className="text-brand-caramel italic font-light">Coffee To Go</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide uppercase">
            <a href="#menu" className="hover:text-brand-caramel transition-colors">Meniu</a>
            <a href="#despre" className="hover:text-brand-caramel transition-colors">Despre noi</a>
            <a href="#contact" className="hover:text-brand-caramel transition-colors">Contact</a>
            <a href="tel:0761347957" className="bg-brand-caramel text-brand-dark px-5 py-2 rounded-full hover:bg-white transition-all duration-300 transform hover:scale-105 active:scale-95">
              Sună acum
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden bg-brand-dark border-b border-white/10 px-6 py-6"
          >
            <div className="flex flex-col gap-4 text-center">
              <a href="#menu" onClick={() => setIsMenuOpen(false)} className="py-2 text-lg">Meniu</a>
              <a href="#despre" onClick={() => setIsMenuOpen(false)} className="py-2 text-lg">Despre noi</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="py-2 text-lg">Contact</a>
              <a href="tel:0761347957" className="bg-brand-caramel text-brand-dark py-3 rounded-xl mt-2">Sună acum</a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-brand-dark/20 to-brand-dark z-10" />
          <img 
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover scale-105 motion-safe:animate-[pulse_10s_ease-in-out_infinite]"
            alt="Cinematic Coffee"
          />
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-8xl font-extrabold text-white mb-6 tracking-tight">
              Cafea bună. Rapid.<br />
              <span className="text-brand-caramel">La preț corect.</span>
            </h1>
            <p className="text-xl md:text-2xl text-brand-cream/80 mb-10 max-w-2xl mx-auto font-light">
              LATTE Coffee To Go îți oferă cafea premium accesibilă, exact când ai nevoie.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <a href="#menu" className="group bg-white text-brand-dark px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:bg-brand-caramel hover:text-white flex items-center gap-2">
                Vezi meniul
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="tel:0761347957" className="text-white border border-white/30 px-10 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:bg-white/10 backdrop-blur-sm">
                Sună acum
              </a>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce opacity-50">
          <div className="w-1 h-10 border border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="despre" className="py-24 bg-brand-dark overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-sm uppercase tracking-[0.3em] text-brand-caramel mb-4 font-bold">Povestea Noastră</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
                Pasiune pentru cafea, <br />respect pentru timpul tău.
              </h3>
              <div className="space-y-6 text-lg text-brand-cream/70 leading-relaxed">
                <p>
                  LATTE Coffee To Go s-a născut dintr-o idee simplă: cafeaua de specialitate nu trebuie să fie un lux sau un proces lung. Am vrut să creăm un punct urban unde calitatea întâlnește rapiditatea.
                </p>
                <p>
                  Fie că ești un student în drum spre cursuri, un profesionist grăbit spre birou sau pur și simplu în tranzit prin București, suntem aici să-ți oferim acea doză de energie premium la un preț care te va face să revii zilnic.
                </p>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl font-bold text-brand-caramel">5.0</div>
                  <div className="text-sm text-brand-cream/50 uppercase tracking-widest mt-1">Rating Google</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-brand-caramel">16+</div>
                  <div className="text-sm text-brand-cream/50 uppercase tracking-widest mt-1">Recenzii Reale</div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1887&auto=format&fit=crop" 
                  className="w-full h-full object-cover"
                  alt="Specialty Coffee"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-brand-caramel p-8 rounded-2xl hidden md:block">
                <p className="text-brand-dark font-bold text-xl italic">"Cea mai bună cafea<br />din zonă."</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-brand-coffee">
        <div className="container mx-auto px-6">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-[0.3em] text-brand-caramel mb-4 font-bold">Selecția Noastră</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Meniul LATTE</h3>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-brand-dark border border-white/5 rounded-3xl p-4 transition-all duration-300 hover:border-brand-caramel/50 hover:shadow-2xl"
              >
                <div className="aspect-video mb-4 overflow-hidden rounded-2xl">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex justify-between items-start mb-2 px-2">
                  <h4 className="text-xl font-bold text-white">{item.name}</h4>
                  <span className="text-brand-caramel font-bold">{item.price} RON</span>
                </div>
                <p className="text-brand-cream/60 text-sm px-2 mb-4 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-brand-dark">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <motion.div {...fadeIn}>
              <h2 className="text-sm uppercase tracking-[0.3em] text-brand-caramel mb-4 font-bold">Feedback</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Ce spun clienții noștri</h3>
            </motion.div>
            <div className="flex gap-1 text-brand-gold mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={20} />)}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { text: "O cafea foarte bună la un preț accesibil.", author: "Client Google" },
              { text: "Ridică standardele tonomatelor de cafea din România.", author: "Andrei M." },
              { text: "Foarte bună și ieftină. Recomand cu încredere!", author: "Elena P." }
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-brand-coffee p-8 rounded-3xl border border-white/5 relative"
              >
                <div className="text-brand-caramel text-5xl font-serif absolute top-4 left-4 opacity-20">"</div>
                <p className="text-lg text-brand-cream/80 italic mb-6 relative z-10">
                  {review.text}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-brand-caramel/20 rounded-full flex items-center justify-center text-brand-caramel font-bold">
                    {review.author[0]}
                  </div>
                  <span className="text-white font-medium">{review.author}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-brand-caramel">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            {[
              { icon: <Coffee />, title: "Premium", desc: "Cafea de origine" },
              { icon: <Zap />, title: "Rapid", desc: "Gata în 2 minute" },
              { icon: <Clock />, title: "Non-stop", desc: "Deschis până târziu" },
              { icon: <MapPin />, title: "Urban", desc: "În inima orașului" }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-brand-dark flex flex-col items-center text-center"
              >
                <div className="bg-brand-dark/10 p-4 rounded-2xl mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-black uppercase tracking-tighter mb-1">{feature.title}</h4>
                <p className="font-medium opacity-70">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-brand-dark overflow-hidden">
        <div className="container mx-auto px-6 mb-12 flex justify-between items-center">
          <h3 className="text-3xl font-bold">Galerie Urbană</h3>
          <div className="flex gap-4">
            <Camera className="text-brand-caramel cursor-pointer hover:scale-110 transition-transform" />
            <Share2 className="text-brand-caramel cursor-pointer hover:scale-110 transition-transform" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=500&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=500&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=500&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=500&auto=format&fit=crop"
          ].map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 0.98 }}
              className="aspect-square overflow-hidden rounded-xl grayscale hover:grayscale-0 transition-all duration-500"
            >
              <img src={img} className="w-full h-full object-cover" alt={`Gallery ${i}`} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-brand-coffee">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div {...fadeIn}>
              <h2 className="text-sm uppercase tracking-[0.3em] text-brand-caramel mb-4 font-bold">Contact</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Unde ne găsești?</h3>
              
              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="bg-brand-caramel/10 p-3 rounded-lg text-brand-caramel shrink-0">
                    <MapPin />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">Locație</h4>
                    <p className="text-brand-cream/60">Șoseaua Orhideelor 1, București</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="bg-brand-caramel/10 p-3 rounded-lg text-brand-caramel shrink-0">
                    <Clock />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">Program</h4>
                    <p className="text-brand-cream/60">Zilnic: Deschis până la 01:30</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="bg-brand-caramel/10 p-3 rounded-lg text-brand-caramel shrink-0">
                    <Phone />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">Telefon</h4>
                    <a href="tel:0761347957" className="text-brand-cream/60 hover:text-brand-caramel transition-colors">0761 347 957</a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-[400px] rounded-3xl overflow-hidden grayscale contrast-125 brightness-75 border border-white/10"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.514417124118!2d26.06488337678508!3d44.443153501061975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff5ce92040bb%3A0xc3191195679f2e3c!2zyJpvc2VhdWEgT3JoaWRlZWxvciAxLCBCdWN1cmXImW9p!5e0!3m2!1sro!2sro!4v1700000000000!5m2!1sro!2sro" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark py-12 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-caramel rounded-full flex items-center justify-center">
                <Coffee className="text-brand-dark w-4 h-4" />
              </div>
              <span className="text-lg font-bold tracking-tighter text-white">LATTE <span className="text-brand-caramel italic font-light">Coffee To Go</span></span>
            </div>
            
            <div className="text-brand-cream/40 text-sm">
              © {new Date().getFullYear()} LATTE Coffee To Go București. Toate drepturile rezervate.
            </div>

            <div className="flex gap-6">
              <a href="#" className="text-brand-cream/60 hover:text-white transition-colors">GDPR</a>
              <a href="#" className="text-brand-cream/60 hover:text-white transition-colors">Termeni și condiții</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
