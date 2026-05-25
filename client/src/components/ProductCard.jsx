import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

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
      <div className="relative h-64 bg-gradient-to-br from-forest/10 to-olive/10 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-forest/10 flex items-center justify-center">
            <span className="font-heading text-4xl text-forest">{product.name.charAt(0)}</span>
          </div>
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

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-4 border-t border-beige">
          <div>
            <span className="text-lg font-semibold text-forest">{product.price}</span>
            <span className="text-xs text-text-brown/50 ml-2">/ {product.weight}</span>
          </div>
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
