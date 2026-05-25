import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Award, Users, Leaf, TrendingUp } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import AnimatedCounter from '../components/AnimatedCounter';

const timeline = [
  { year: '2020', title: 'Initiative Conceived', desc: 'Ministry of AYUSH proposes Ayurvedic nutrition program' },
  { year: '2021', title: 'Pilot Launch', desc: 'First farmer clusters onboarded in Rajasthan and MP' },
  { year: '2022', title: 'Product Development', desc: 'R&D collaboration with CSIR and IIT labs completed' },
  { year: '2023', title: 'FSSAI Certification', desc: 'Full regulatory compliance and market readiness achieved' },
  { year: '2024', title: 'National Rollout', desc: 'Pan-India distribution and digital traceability launch' },
];

const values = [
  { icon: Target, title: 'Mission', text: 'To make authentic Ayurvedic nutrition accessible to every Indian household through transparent, traceable supply chains.' },
  { icon: Eye, title: 'Vision', text: 'A nation where traditional Ayurvedic food wisdom is integrated with modern nutrition science for holistic wellness.' },
  { icon: Leaf, title: 'Philosophy', text: 'We believe that what is ancient is not outdated — it is time-tested. Ayurveda is the science of life itself.' },
];

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
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
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-forest-dark to-forest overflow-hidden">
        <div className="absolute inset-0 grain-overlay" />
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-6xl font-semibold text-white mb-4"
          >
            About the Initiative
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            Ayush Aahar is a Government of India initiative under the Ministry of AYUSH, promoting authentic Ayurvedic nutrition for national wellness.
          </motion.p>
        </div>
      </section>

      {/* Mission, Vision, Philosophy */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white rounded-2xl p-8 gold-border shadow-sm hover:shadow-lg transition-all"
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

      {/* Timeline */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">
          <SectionHeading subtitle="Our Journey" title="Building India's Ayurvedic Nutrition Movement" />

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gold/30 md:-translate-x-0.5" />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-center gap-6 md:gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} pl-12 md:pl-0`}>
                    <span className="text-gold font-heading text-2xl font-bold">{item.year}</span>
                    <h4 className="font-heading text-lg font-semibold text-text-brown mt-1">{item.title}</h4>
                    <p className="text-sm text-text-brown/70 mt-1">{item.desc}</p>
                  </div>

                  {/* Node */}
                  <div className="absolute left-4 md:relative md:left-0 w-8 h-8 bg-white border-2 border-gold rounded-full flex items-center justify-center shrink-0 z-10">
                    <div className="w-3 h-3 bg-gold rounded-full" />
                  </div>

                  {/* Empty space for opposite side */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-forest-dark text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white">Impact in Numbers</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 2847, suffix: '+', label: 'Farmers Empowered' },
              { value: 12, suffix: '', label: 'States Reached' },
              { value: 150, suffix: '+', label: 'Villages Connected' },
              { value: 95, suffix: '%', label: 'Quality Score' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <p className="text-white/70 text-sm mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Farmer Empowerment */}
      <section className="section-padding bg-cream">
        <div className="max-w-6xl mx-auto">
          <SectionHeading subtitle="Farmer First" title="Empowering India's Organic Farmers" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Users, title: 'Fair Trade Pricing', desc: 'Guaranteed minimum support price 20% above market rates for organic produce.' },
              { icon: Award, title: 'Technical Training', desc: 'Regular workshops on organic farming, soil health, and Ayurvedic herb cultivation.' },
              { icon: TrendingUp, title: 'Market Access', desc: 'Direct farm-to-consumer model eliminating middlemen and ensuring fair returns.' },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 gold-border shadow-sm"
              >
                <div className="w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center mb-4">
                  <card.icon className="w-6 h-6 text-forest" />
                </div>
                <h4 className="font-heading text-lg font-semibold text-text-brown mb-2">{card.title}</h4>
                <p className="text-sm text-text-brown/70 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
