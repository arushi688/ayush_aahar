import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-r from-forest-dark to-forest" />
      <div className="absolute inset-0 grain-overlay opacity-30" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-olive/10 rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-4xl mx-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-5xl font-semibold text-white mb-4">
            Experience the Journey
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Trace every ingredient from farm to your table. Transparency, authenticity, and wellness — guaranteed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/traceability" className="btn-secondary border-white text-white hover:bg-white hover:text-forest">
              Explore Traceability
            </Link>
            <Link to="/products" className="btn-primary bg-gold hover:bg-gold/90">
              View Products
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
