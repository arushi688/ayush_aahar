import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import kaliGajarImg from '../assets/kali_gajar_kaanji.png';
import chanaDalImg from '../assets/Chana Dal Khichdi.png';

const productImages = {
  'kali-gajar-kanji': kaliGajarImg,
  'chana-dal-khichdi': chanaDalImg,
};

export default function ProductCard({ product, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl overflow-hidden gold-border shadow-md hover:shadow-2xl transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-64 bg-gradient-to-br from-forest/5 to-olive/5 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <img
            src={productImages[product.id]}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        {/* Type Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-forest text-white text-xs px-3 py-1 rounded-full font-medium">
            {product.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <h3 className="font-heading text-2xl font-semibold text-text-brown mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-text-brown/70 leading-relaxed mb-4">
          {product.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-cream px-3 py-1 rounded-full text-forest font-medium border border-forest/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Weight & Action */}
        <div className="flex items-center justify-between pt-4 border-t border-beige">
          <span className="text-sm text-text-brown/60 font-medium">{product.weight}</span>
          <Link
            to={`/products#${product.id}`}
            className="flex items-center gap-1 text-sm font-medium text-gold hover:text-forest transition-colors group-hover:gap-2"
          >
            View Details
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
