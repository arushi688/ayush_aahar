import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

const stats = [
  { value: 2847, suffix: '+', label: 'Partner Farmers' },
  { value: 12, suffix: '', label: 'States Covered' },
  { value: 5200, suffix: '+', label: 'Organic Acres' },
  { value: 47, suffix: '', label: 'Quality Parameters' },
];

export default function StatsSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="text-sm text-text-brown/70 mt-2 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
