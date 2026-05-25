import { useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';
import MissionSection from '../components/home/MissionSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import StatsSection from '../components/StatsSection';
import CTASection from '../components/CTASection';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <HeroSection />
      <MissionSection />
      <FeaturedProducts />
      <StatsSection />
      <CTASection />
    </motion.div>
  );
}
