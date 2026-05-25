import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import SectionHeading from '../components/SectionHeading';
import ProductDetailCard from '../components/ProductDetailCard';

export default function Products() {
  const { fetchProductById } = useApp();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const p1 = await fetchProductById('kali-gajar-kanji');
    const p2 = await fetchProductById('chana-dal-khichdi');
    setProducts([p1, p2].filter(Boolean));
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-20"
    >
      {/* Hero Banner */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-forest-dark to-forest overflow-hidden">
        <div className="absolute inset-0 grain-overlay" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-gold/30 rounded-full" />
          <div className="absolute bottom-10 right-10 w-48 h-48 border border-gold/20 rounded-full" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-6xl font-semibold text-white mb-4"
          >
            Our Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            Authentic Ayurvedic nutrition products crafted with traditional wisdom and modern food science.
          </motion.p>
        </div>
      </section>

      {/* Products List */}
      <section className="section-padding bg-cream">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-2 border-forest border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-16">
              {products.map((product, i) => (
                <ProductDetailCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
