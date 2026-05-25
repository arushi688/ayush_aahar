import { motion } from 'framer-motion';
import { Heart, Leaf, Recycle, Users } from 'lucide-react';
import SectionHeading from '../SectionHeading';

const missions = [
  {
    icon: Heart,
    title: 'Nutrition',
    description: 'Promoting balanced Ayurvedic nutrition rooted in ancient Indian dietary wisdom for modern wellness needs.',
  },
  {
    icon: Leaf,
    title: 'Ayurveda',
    description: 'Harnessing 5000-year-old Ayurvedic knowledge to create scientifically validated nutritional products.',
  },
  {
    icon: Recycle,
    title: 'Sustainability',
    description: 'Supporting regenerative agriculture and eco-conscious practices from farm to packaging.',
  },
  {
    icon: Users,
    title: 'Farmer Empowerment',
    description: 'Enabling organic farmer clusters with fair trade, technical training, and market access.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15 },
  }),
};

export default function MissionSection() {
  return (
    <section className="section-padding bg-cream relative overflow-hidden">
      {/* Subtle Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-forest/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto">
        <SectionHeading
          subtitle="Our Mission"
          title="Rooted in Tradition, Driven by Science"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {missions.map((mission, i) => (
            <motion.div
              key={mission.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 gold-border group"
            >
              <div className="w-14 h-14 bg-forest/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-forest/20 transition-colors">
                <mission.icon className="w-7 h-7 text-forest" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-text-brown mb-3">
                {mission.title}
              </h3>
              <p className="text-sm text-text-brown/70 leading-relaxed">
                {mission.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
