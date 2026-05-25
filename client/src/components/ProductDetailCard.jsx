import { motion } from 'framer-motion';
import { CheckCircle, Leaf, Star } from 'lucide-react';

export default function ProductDetailCard({ product, index = 0 }) {
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      id={product.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7 }}
      className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 items-center`}
    >
      {/* Image Side */}
      <div className="w-full lg:w-1/2">
        <div className="relative bg-gradient-to-br from-forest/5 to-olive/10 rounded-3xl p-8 md:p-12 gold-border">
          <div className="aspect-square max-w-sm mx-auto flex items-center justify-center">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-forest/20 to-olive/20 flex items-center justify-center shadow-inner">
              <span className="font-heading text-6xl text-forest">{product.name.charAt(0)}</span>
            </div>
          </div>
          {/* Decorative */}
          <div className="absolute top-4 right-4 bg-gold/10 px-3 py-1 rounded-full">
            <span className="text-xs text-gold font-medium">{product.type}</span>
          </div>
          {/* Certifications */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1">
            {product.certifications?.slice(0, 3).map((cert) => (
              <span key={cert} className="text-[10px] bg-white/80 px-2 py-0.5 rounded text-forest">
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content Side */}
      <div className="w-full lg:w-1/2">
        <div className="space-y-5">
          {/* Type */}
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-forest bg-forest/10 px-3 py-1 rounded-full">
            {product.type}
          </span>

          {/* Title */}
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-text-brown">
            {product.name}
          </h2>

          {/* Description */}
          <p className="text-text-brown/70 leading-relaxed">
            {product.longDescription || product.description}
          </p>

          {/* Benefits */}
          <div>
            <h4 className="font-medium text-sm text-forest mb-3 uppercase tracking-wide">Benefits</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.benefits?.map((benefit) => (
                <div key={benefit} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                  <span className="text-sm text-text-brown/80">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <h4 className="font-medium text-sm text-forest mb-3 uppercase tracking-wide">Key Ingredients</h4>
            <div className="flex flex-wrap gap-2">
              {product.ingredients?.map((ing) => (
                <span key={ing} className="flex items-center gap-1 text-xs bg-beige px-3 py-1.5 rounded-full text-text-brown">
                  <Leaf className="w-3 h-3 text-olive" />
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Ayurvedic Properties */}
          {product.ayurvedicProperties && (
            <div className="bg-white rounded-xl p-4 border border-beige">
              <h4 className="font-medium text-sm text-forest mb-2 flex items-center gap-1">
                <Star className="w-4 h-4 text-gold" />
                Ayurvedic Properties
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-text-brown/60">Rasa:</span> <span className="font-medium">{product.ayurvedicProperties.rasa}</span></div>
                <div><span className="text-text-brown/60">Virya:</span> <span className="font-medium">{product.ayurvedicProperties.virya}</span></div>
                <div><span className="text-text-brown/60">Vipaka:</span> <span className="font-medium">{product.ayurvedicProperties.vipaka}</span></div>
                <div><span className="text-text-brown/60">Dosha:</span> <span className="font-medium">{product.ayurvedicProperties.dosha}</span></div>
              </div>
            </div>
          )}

          {/* Tags & Price */}
          <div className="flex items-center justify-between pt-4 border-t border-beige">
            <div className="flex gap-2">
              {product.tags?.map((tag) => (
                <span key={tag} className="text-xs bg-forest/10 text-forest px-3 py-1 rounded-full font-medium">
                  {tag}
                </span>
              ))}
            </div>
            <div className="text-right">
              <p className="text-2xl font-heading font-semibold text-forest">{product.price}</p>
              <p className="text-xs text-text-brown/50">{product.weight}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
