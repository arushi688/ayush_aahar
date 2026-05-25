import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import JourneyTimeline from '../components/traceability/JourneyTimeline';
import JourneyMap from '../components/traceability/JourneyMap';
import BatchTracker from '../components/traceability/BatchTracker';
import SustainabilityCards from '../components/traceability/SustainabilityCards';

export default function Traceability() {
  const { traceability, fetchTraceability } = useApp();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchTraceability();
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
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-forest-dark via-forest to-olive/80 overflow-hidden">
        <div className="absolute inset-0 grain-overlay" />
        <div className="absolute inset-0">
          {/* Animated SVG Path */}
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1200 400">
            <path
              d="M0,200 Q150,100 300,200 T600,200 T900,200 T1200,200"
              stroke="white"
              strokeWidth="2"
              fill="none"
              strokeDasharray="8 4"
            />
          </svg>
        </div>
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6"
          >
            <div className="w-2 h-2 bg-gold rounded-full animate-glow" />
            <span className="text-white/90 text-sm">Farm-to-Table Transparency</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-heading text-4xl md:text-6xl font-semibold text-white mb-4"
          >
            Traceability Journey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            Follow every ingredient from its origin to your table. Complete transparency at every stage.
          </motion.p>
        </div>
      </section>

      {/* Journey Timeline */}
      {traceability && (
        <>
          <JourneyTimeline steps={traceability.journeySteps} />
          <JourneyMap locations={traceability.farmLocations} stats={traceability.stats} />
          <BatchTracker />
          <SustainabilityCards steps={traceability.journeySteps} />
        </>
      )}
    </motion.div>
  );
}
