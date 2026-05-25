import { motion } from 'framer-motion';
import { Droplets, Wind, Recycle, Zap } from 'lucide-react';

export default function SustainabilityCards({ steps }) {
  const avgScore = Math.round(
    steps.reduce((acc, s) => acc + s.details.sustainabilityScore, 0) / steps.length
  );

  const metrics = [
    { icon: Droplets, label: 'Water Conservation', value: '40%', desc: 'less water usage vs conventional' },
    { icon: Wind, label: 'Carbon Footprint', value: '-62%', desc: 'reduced emissions per unit' },
    { icon: Recycle, label: 'Packaging', value: '100%', desc: 'biodegradable materials' },
    { icon: Zap, label: 'Energy', value: '35%', desc: 'from renewable sources' },
  ];

  return (
    <section className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium tracking-widest uppercase text-forest">Impact & Sustainability</span>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mt-2 text-text-brown">
            Our Environmental Commitment
          </h2>
        </motion.div>

        {/* Overall Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-sm mx-auto mb-12"
        >
          <div className="bg-white rounded-2xl p-8 text-center shadow-md gold-border">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-full h-full -rotate-90">
                <circle cx="64" cy="64" r="56" stroke="#E7DDCF" strokeWidth="8" fill="none" />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#4E6B3C"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                  whileInView={{ strokeDashoffset: 2 * Math.PI * 56 * (1 - avgScore / 100) }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-heading text-3xl font-bold text-forest">{avgScore}</span>
              </div>
            </div>
            <h4 className="font-heading text-lg font-semibold text-text-brown">Sustainability Score</h4>
            <p className="text-xs text-text-brown/60 mt-1">Averaged across all supply chain stages</p>
          </div>
        </motion.div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm gold-border hover:shadow-md transition-all text-center"
            >
              <div className="w-12 h-12 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <metric.icon className="w-6 h-6 text-forest" />
              </div>
              <p className="font-heading text-2xl font-bold text-forest">{metric.value}</p>
              <p className="text-sm font-medium text-text-brown mt-1">{metric.label}</p>
              <p className="text-xs text-text-brown/60 mt-1">{metric.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
