import { motion } from 'framer-motion';
import { Shield, Award, CheckCircle } from 'lucide-react';

export default function QualityBadge({ certification, index = 0 }) {
  const icons = {
    'shield-check': Shield,
    'award': Award,
    'leaf': CheckCircle,
    'factory': Shield,
    'badge-check': Award,
    'microscope': CheckCircle,
  };

  const Icon = icons[certification.icon] || Shield;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl p-6 gold-border hover:shadow-lg transition-all duration-300 group"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-forest/10 rounded-lg group-hover:bg-forest/20 transition-colors">
          <Icon className="w-6 h-6 text-forest" />
        </div>
        <div className="flex-1">
          <h4 className="font-heading text-lg font-semibold text-text-brown">
            {certification.name}
          </h4>
          <p className="text-xs text-text-brown/60 mt-1">{certification.fullName}</p>
          <p className="text-sm text-text-brown/70 mt-2 leading-relaxed">
            {certification.description}
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-forest">
            <span className="bg-forest/10 px-2 py-0.5 rounded">
              {certification.certificationNumber}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
