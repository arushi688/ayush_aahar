import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, Tractor, Leaf, Wheat, Microscope, FlaskConical, Package, Truck, HeartPulse } from 'lucide-react';
import Modal from '../Modal';

const iconMap = {
  'sprout': Sprout,
  'tractor': Tractor,
  'leaf': Leaf,
  'wheat': Wheat,
  'microscope': Microscope,
  'flask-conical': FlaskConical,
  'package': Package,
  'truck': Truck,
  'heart-pulse': HeartPulse,
};

export default function JourneyTimeline({ steps }) {
  const [activeStep, setActiveStep] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleStepClick = (step) => {
    setActiveStep(step);
    setModalOpen(true);
  };

  return (
    <section className="section-padding bg-cream relative overflow-hidden">
      <div className="absolute inset-0 grain-overlay" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium tracking-widest uppercase text-forest">The Herb Journey Path</span>
          <h2 className="font-heading text-3xl md:text-5xl font-semibold mt-2 text-text-brown">
            From Seed to Wellness
          </h2>
          <p className="text-text-brown/60 mt-4 max-w-xl mx-auto">
            Click any stage to explore detailed traceability information
          </p>
        </motion.div>

        {/* Desktop Horizontal Timeline */}
        <div className="hidden lg:block relative">
          {/* SVG Curved Path */}
          <svg className="absolute top-1/2 left-0 right-0 w-full h-32 -translate-y-1/2" viewBox="0 0 1200 100" preserveAspectRatio="none">
            <motion.path
              d="M0,50 C100,20 200,80 300,50 C400,20 500,80 600,50 C700,20 800,80 900,50 C1000,20 1100,80 1200,50"
              stroke="#C6A15B"
              strokeWidth="2"
              fill="none"
              strokeDasharray="8 4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
            {/* Animated Glowing Dot */}
            <motion.circle
              r="6"
              fill="#C6A15B"
              filter="url(#glow)"
              initial={{ offsetDistance: '0%' }}
              animate={{ offsetDistance: '100%' }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <animateMotion
                dur="8s"
                repeatCount="indefinite"
                path="M0,50 C100,20 200,80 300,50 C400,20 500,80 600,50 C700,20 800,80 900,50 C1000,20 1100,80 1200,50"
              />
            </motion.circle>
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

          {/* Timeline Nodes */}
          <div className="relative grid grid-cols-9 gap-2">
            {steps.map((step, i) => {
              const Icon = iconMap[step.icon] || Leaf;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => handleStepClick(step)}
                >
                  {/* Node */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className="w-16 h-16 rounded-full bg-white shadow-lg border-2 border-gold/30 flex items-center justify-center group-hover:border-gold group-hover:shadow-xl transition-all duration-300"
                  >
                    <Icon className="w-7 h-7" style={{ color: step.color }} />
                  </motion.div>
                  {/* Label */}
                  <p className="text-xs text-center mt-3 font-medium text-text-brown group-hover:text-forest transition-colors">
                    {step.title}
                  </p>
                  {/* Step Number */}
                  <span className="text-[10px] text-text-brown/40 mt-1">Step {step.id}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="lg:hidden relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gold/30" />

          <div className="space-y-8">
            {steps.map((step, i) => {
              const Icon = iconMap[step.icon] || Leaf;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-6 cursor-pointer group pl-2"
                  onClick={() => handleStepClick(step)}
                >
                  {/* Node */}
                  <div className="relative z-10 w-12 h-12 rounded-full bg-white shadow-md border-2 border-gold/30 flex items-center justify-center shrink-0 group-hover:border-gold transition-colors">
                    <Icon className="w-5 h-5" style={{ color: step.color }} />
                  </div>
                  {/* Content */}
                  <div className="flex-1 bg-white rounded-xl p-4 shadow-sm gold-border group-hover:shadow-md transition-all">
                    <h4 className="font-heading text-lg font-semibold text-text-brown">{step.title}</h4>
                    <p className="text-xs text-forest mb-1">{step.subtitle}</p>
                    <p className="text-sm text-text-brown/70 line-clamp-2">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {activeStep && (
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-forest/10 flex items-center justify-center">
                {(() => {
                  const Icon = iconMap[activeStep.icon] || Leaf;
                  return <Icon className="w-7 h-7" style={{ color: activeStep.color }} />;
                })()}
              </div>
              <div>
                <h3 className="font-heading text-2xl font-semibold text-text-brown">{activeStep.title}</h3>
                <p className="text-sm text-forest">{activeStep.subtitle}</p>
              </div>
            </div>

            <p className="text-text-brown/80 leading-relaxed mb-6">{activeStep.description}</p>

            {/* Traceability Data */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoBlock label="Origin State" value={activeStep.details.originState} />
              <InfoBlock label="Farmer Cluster" value={activeStep.details.farmerCluster} />
              <InfoBlock label="Certification" value={activeStep.details.certification} />
              <InfoBlock label="Ayurvedic Classification" value={activeStep.details.ayurvedicClass} />
              <InfoBlock label="Batch Code" value={activeStep.details.batchCode} mono />
              <InfoBlock label="Sustainability Score" value={`${activeStep.details.sustainabilityScore}/100`} highlight />
            </div>

            {/* Lab Report */}
            <div className="mt-6 bg-forest/5 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-forest mb-2">Lab Report Summary</h4>
              <p className="text-sm text-text-brown/70 font-mono">{activeStep.details.labReport}</p>
            </div>

            {/* Quality Seal */}
            <div className="mt-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-gold rounded-full" />
              </div>
              <span className="text-sm text-forest font-medium">Verified & Authenticated</span>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}

function InfoBlock({ label, value, mono = false, highlight = false }) {
  return (
    <div className="bg-white rounded-lg p-3 border border-beige">
      <p className="text-xs text-text-brown/50 mb-0.5">{label}</p>
      <p className={`text-sm font-medium ${highlight ? 'text-forest' : 'text-text-brown'} ${mono ? 'font-mono text-xs' : ''}`}>
        {value}
      </p>
    </div>
  );
}
