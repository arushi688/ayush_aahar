import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

import kaliGajarImg from '../assets/kali_gajar_kaanji.png';
import chanaDalImg from '../assets/Chana Dal Khichdi.png';

const productImages = {
  'kali-gajar-kanji': kaliGajarImg,
  'chana-dal-khichdi': chanaDalImg,
};

export default function Home() {
  const { products, fetchProducts } = useApp();

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
      className="pt-20"
    >
      {/* Hero */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-forest-dark via-forest to-olive/80 overflow-hidden">
        <div className="absolute inset-0 grain-overlay" />
        <div className="relative max-w-5xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6"
          >
            <Leaf className="w-4 h-4 text-gold" />
            <span className="text-white/90 text-sm">Government of India Initiative</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl font-semibold text-white mb-4"
          >
            Ayush Aahar
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            Authentic Ayurvedic nutrition — traceable from farm to table.
          </motion.p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-cream">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-text-brown">Our Products</h2>
            <p className="text-text-brown/60 mt-2">Select a product to view its label, lab report & traceability</p>
          </div>

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
                      <span className="bg-forest text-white text-xs px-3 py-1 rounded-full font-medium">
                        {product.type}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-2xl font-semibold text-text-brown mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-text-brown/70 leading-relaxed mb-4">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {product.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-cream px-3 py-1 rounded-full text-forest font-medium border border-forest/20">
                            {tag}
                          </span>
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
    </motion.div>
  );
}
