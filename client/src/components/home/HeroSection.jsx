import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import FloatingParticles from '../FloatingParticles';

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background with Parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-gradient-to-br from-forest-dark via-forest to-forest-dark"
      >
        {/* Botanical Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="botanical" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="1" fill="white" opacity="0.5" />
                <path d="M25 25 Q 35 15, 45 25 T 65 25" stroke="white" strokeWidth="0.5" fill="none" opacity="0.3" />
                <path d="M50 0 Q 55 10, 50 20" stroke="white" strokeWidth="0.3" fill="none" opacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#botanical)" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
      </motion.div>

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Grain Texture */}
      <div className="absolute inset-0 grain-overlay" />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 max-w-5xl mx-auto text-center px-4">
        {/* Hindi Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-4"
        >
          आयुष आहार
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading text-xl md:text-2xl lg:text-3xl text-gold font-light italic mb-4"
        >
          Ancient Ayurvedic Wisdom. Modern Nutritional Science.
        </motion.p>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/80 text-base md:text-lg max-w-2xl mx-auto mb-10"
        >
          An initiative promoting Ayurvedic nutrition and herbal wellness for a healthier India.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/products" className="btn-primary flex items-center gap-2 text-base">
            Explore Products
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/traceability" className="btn-secondary border-white/70 text-white hover:bg-white hover:text-forest flex items-center gap-2">
            <Compass className="w-4 h-4" />
            Traceability Journey
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1.5"
          >
            <motion.div className="w-1.5 h-3 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
