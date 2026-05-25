import { motion } from 'framer-motion';

export default function SectionHeading({ title, subtitle, centered = true, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}
    >
      {subtitle && (
        <span className={`text-sm font-medium tracking-widest uppercase ${light ? 'text-gold' : 'text-forest'}`}>
          {subtitle}
        </span>
      )}
      <h2 className={`font-heading text-3xl md:text-4xl lg:text-5xl font-semibold mt-2 ${light ? 'text-white' : 'text-text-brown'}`}>
        {title}
      </h2>
      <div className={`w-16 h-0.5 mt-4 ${centered ? 'mx-auto' : ''} bg-gold`} />
    </motion.div>
  );
}
