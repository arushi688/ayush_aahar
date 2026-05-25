import { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Target, Eye, Leaf, CheckCircle, Award, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import FloatingParticles from '../components/FloatingParticles';

import kaliGajarImg from '../assets/kali_gajar_kaanji.png';
import chanaDalImg from '../assets/Chana Dal Khichdi.png';

const productImages = {
  'kali-gajar-kanji': kaliGajarImg,
  'chana-dal-khichdi': chanaDalImg,
};

const values = [
  { icon: Target, title: 'Mission', text: 'To make authentic Ayurvedic nutrition accessible to every Indian household through transparent, traceable supply chains.' },
  { icon: Eye, title: 'Vision', text: 'A nation where traditional Ayurvedic food wisdom is integrated with modern nutrition science for holistic wellness.' },
  { icon: Leaf, title: 'Philosophy', text: 'We believe that what is ancient is not outdated — it is time-tested. Ayurveda is the science of life itself.' },
];

const certifications = [
  { name: 'FSSAI Certified', desc: 'Food Safety & Standards Authority of India' },
  { name: 'Organic India (NPOP)', desc: 'National Programme for Organic Production' },
  { name: 'AYUSH Premium Mark', desc: 'Ministry of AYUSH Quality Certification' },
  { name: 'GMP Certified', desc: 'Good Manufacturing Practices Compliance' },
  { name: 'ISO 22000', desc: 'Food Safety Management System' },
  { name: 'NABL Tested', desc: 'National Accreditation Board for Laboratories' },
];

export default function Home() {
  const { products, fetchProducts } = useApp();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* ─── HERO SECTION ─── */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 bg-gradient-to-br from-forest-dark via-forest to-forest-dark">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="botanical" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="50" cy="50" r="1" fill="white" opacity="0.5" />
                  <path d="M25 25 Q 35 15, 45 25 T 65 25" stroke="white" strokeWidth="0.5" fill="none" opacity="0.3" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#botanical)" />
            </svg>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
        </motion.div>

        <FloatingParticles />
        <div className="absolute inset-0 grain-overlay" />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-5xl mx-auto text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-4"
          >
            आयुष आहार
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-heading text-xl md:text-2xl lg:text-3xl text-gold font-light italic mb-4"
          >
            Ancient Ayurvedic Wisdom. Modern Nutritional Science.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/80 text-base md:text-lg max-w-2xl mx-auto mb-10"
          >
            An initiative promoting Ayurvedic nutrition and herbal wellness for a healthier India.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#products" className="btn-primary flex items-center gap-2 text-base">
              Explore Products <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#quality" className="btn-secondary border-white/70 text-white hover:bg-white hover:text-forest flex items-center gap-2">
              <Compass className="w-4 h-4" /> Traceability Journey
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── PRODUCTS SECTION ─── */}
      <section id="products" className="section-padding bg-cream">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm font-medium tracking-widest uppercase text-forest">Our Range</span>
            <h2 className="font-heading text-3xl md:text-5xl font-semibold text-text-brown mt-2">Products</h2>
            <p className="text-text-brown/60 mt-3 max-w-xl mx-auto">Select a product to view its label, lab report & traceability journey</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                className="group bg-white rounded-2xl overflow-hidden gold-border shadow-md hover:shadow-xl transition-all"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="relative h-64 bg-gradient-to-br from-forest/5 to-olive/5 flex items-center justify-center p-8">
                    <img
                      src={productImages[product.id]}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-forest text-white text-xs px-3 py-1 rounded-full font-medium">{product.type}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-2xl font-semibold text-text-brown mb-2">{product.name}</h3>
                    <p className="text-sm text-text-brown/70 leading-relaxed mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {product.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-cream px-3 py-1 rounded-full text-forest font-medium border border-forest/20">{tag}</span>
                        ))}
                      </div>
                      <span className="flex items-center gap-1 text-sm font-medium text-gold group-hover:text-forest transition-colors">
                        View Details <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT SECTION ─── */}
      <section id="about" className="section-padding bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm font-medium tracking-widest uppercase text-forest">About Us</span>
            <h2 className="font-heading text-3xl md:text-5xl font-semibold text-text-brown mt-2">The Initiative</h2>
            <p className="text-text-brown/60 mt-3 max-w-2xl mx-auto">
              Ayush Aahar is a Government of India initiative under the Ministry of AYUSH, promoting authentic Ayurvedic nutrition for national wellness.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-cream rounded-2xl p-8 gold-border hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 bg-forest/10 rounded-xl flex items-center justify-center mb-5">
                  <item.icon className="w-7 h-7 text-forest" />
                </div>
                <h3 className="font-heading text-2xl font-semibold text-text-brown mb-3">{item.title}</h3>
                <p className="text-text-brown/70 leading-relaxed text-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── QUALITY SECTION ─── */}
      <section id="quality" className="section-padding bg-cream">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm font-medium tracking-widest uppercase text-forest">Standards</span>
            <h2 className="font-heading text-3xl md:text-5xl font-semibold text-text-brown mt-2">Quality & Certifications</h2>
            <p className="text-text-brown/60 mt-3 max-w-xl mx-auto">Government-grade quality assurance at every step</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 bg-white rounded-xl p-5 gold-border"
              >
                <div className="w-10 h-10 bg-forest/10 rounded-full flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-forest" />
                </div>
                <div>
                  <h4 className="font-medium text-text-brown text-sm">{cert.name}</h4>
                  <p className="text-xs text-text-brown/60 mt-1">{cert.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
