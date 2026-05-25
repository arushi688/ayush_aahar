import { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import SectionHeading from '../SectionHeading';
import ProductCard from '../ProductCard';

export default function FeaturedProducts() {
  const { products, fetchProducts } = useApp();

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, []);

  return (
    <section className="section-padding bg-white relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          subtitle="Our Products"
          title="Ayurvedic Nutrition, Thoughtfully Crafted"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
