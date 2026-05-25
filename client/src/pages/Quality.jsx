import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import SectionHeading from '../components/SectionHeading';
import QualityBadge from '../components/QualityBadge';
import { CheckCircle, AlertCircle, FlaskConical } from 'lucide-react';

export default function Quality() {
  const { quality, fetchQuality } = useApp();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchQuality();
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
            Quality & Standards
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            Government-grade quality assurance. Every product undergoes rigorous testing and certification.
          </motion.p>
        </div>
      </section>

      {quality && (
        <>
          {/* Certifications Grid */}
          <section className="section-padding bg-cream">
            <div className="max-w-7xl mx-auto">
              <SectionHeading subtitle="Certifications" title="Compliance & Quality Marks" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quality.standards.map((cert, i) => (
                  <QualityBadge key={cert.id} certification={cert} index={i} />
                ))}
              </div>
            </div>
          </section>

          {/* Testing Process */}
          <section className="section-padding bg-white">
            <div className="max-w-5xl mx-auto">
              <SectionHeading subtitle="Quality Process" title="7-Step Quality Assurance" />
              <div className="space-y-4">
                {quality.testingProcess.map((step, i) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-4 bg-cream rounded-xl p-5 gold-border"
                  >
                    <div className="w-10 h-10 bg-forest rounded-full flex items-center justify-center shrink-0">
                      <span className="text-white text-sm font-bold">{step.step}</span>
                    </div>
                    <div>
                      <h4 className="font-heading text-lg font-semibold text-text-brown">{step.title}</h4>
                      <p className="text-sm text-text-brown/70 mt-1">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Lab Results */}
          <section className="section-padding bg-gradient-to-br from-forest-dark to-forest text-white">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <span className="text-sm font-medium tracking-widest uppercase text-gold">Latest Test Results</span>
                <h2 className="font-heading text-3xl md:text-4xl font-semibold mt-2 text-white">
                  Batch Quality Report
                </h2>
                <p className="text-white/60 text-sm mt-2 font-mono">
                  Batch: {quality.labResults.lastBatchTested} | Date: {quality.labResults.testDate}
                </p>
              </motion.div>

              {/* Overall Result */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <FlaskConical className="w-6 h-6 text-gold" />
                    <span className="font-semibold text-white">Overall Assessment</span>
                  </div>
                  <span className="bg-green-500/20 text-green-300 px-4 py-1 rounded-full text-sm font-semibold">
                    {quality.labResults.overallResult}
                  </span>
                </div>
                <div className="text-center">
                  <p className="text-5xl font-heading font-bold text-gold">
                    {quality.labResults.parametersPassed}/{quality.labResults.parametersTestedCount}
                  </p>
                  <p className="text-white/60 text-sm mt-2">Parameters Passed</p>
                </div>
              </motion.div>

              {/* Key Findings Table */}
              <div className="bg-white/5 rounded-2xl overflow-hidden">
                <div className="grid grid-cols-4 gap-4 p-4 bg-white/10 text-xs font-semibold text-white/80">
                  <span>Parameter</span>
                  <span>Result</span>
                  <span>Limit</span>
                  <span>Status</span>
                </div>
                {quality.labResults.keyFindings.map((finding, i) => (
                  <motion.div
                    key={finding.parameter}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="grid grid-cols-4 gap-4 p-4 border-t border-white/5 text-sm"
                  >
                    <span className="text-white/90">{finding.parameter}</span>
                    <span className="font-mono text-gold">{finding.result}</span>
                    <span className="font-mono text-white/50">{finding.limit}</span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-xs">{finding.status}</span>
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </motion.div>
  );
}
