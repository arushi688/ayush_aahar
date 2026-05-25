import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Tag, FlaskConical, MapPin, CheckCircle, Leaf, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import JourneyTimeline from '../components/traceability/JourneyTimeline';
import JourneyMap from '../components/traceability/JourneyMap';

import kaliGajarImg from '../assets/kali_gajar_kaanji.png';
import chanaDalImg from '../assets/Chana Dal Khichdi.png';

const productImages = {
  'kali-gajar-kanji': kaliGajarImg,
  'chana-dal-khichdi': chanaDalImg,
};

const tabs = [
  { id: 'label', label: 'Label', icon: Tag },
  { id: 'lab-report', label: 'Lab Report', icon: FlaskConical },
  { id: 'traceability', label: 'Traceability', icon: MapPin },
];

export default function ProductDetail() {
  const { id, tab } = useParams();
  const { fetchProductById, traceability, fetchTraceability } = useApp();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState(tab || 'label');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadData();
  }, [id]);

  useEffect(() => {
    if (tab) setActiveTab(tab);
  }, [tab]);

  const loadData = async () => {
    setLoading(true);
    const p = await fetchProductById(id);
    setProduct(p);
    await fetchTraceability();
    setLoading(false);
  };

  const productTrace = traceability?.products?.[id];

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-cream">
        <div className="w-8 h-8 border-2 border-forest border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-cream">
        <p className="text-text-brown/60">Product not found.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 bg-cream min-h-screen"
    >
      {/* Product Header */}
      <section className="bg-white border-b border-beige">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-text-brown/60 hover:text-forest mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>
          <div className="flex items-center gap-4">
            <img src={productImages[id]} alt={product.name} className="w-16 h-16 object-contain" />
            <div>
              <h1 className="font-heading text-2xl md:text-3xl font-semibold text-text-brown">{product.name}</h1>
              <p className="text-sm text-text-brown/60">{product.type} · {product.weight}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-white border-b border-beige sticky top-16 md:top-20 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1">
            {tabs.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-all ${
                    activeTab === t.id
                      ? 'border-forest text-forest'
                      : 'border-transparent text-text-brown/60 hover:text-text-brown hover:border-beige'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'label' && <LabelTab product={product} />}
        {activeTab === 'lab-report' && <LabReportTab product={product} />}
        {activeTab === 'traceability' && <TraceabilityTab productTrace={productTrace} />}
      </motion.div>
    </motion.div>
  );
}

/* ─── Label Tab ─── */
function LabelTab({ product }) {
  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl p-6 md:p-10 gold-border">
        <div className="text-center mb-8">
          <img src={productImages[product.id]} alt={product.name} className="w-40 h-40 object-contain mx-auto mb-4" />
          <h2 className="font-heading text-2xl font-semibold text-text-brown">{product.name}</h2>
          <p className="text-sm text-text-brown/60 mt-1">{product.type} · Net Content: {product.weight}</p>
        </div>

        <p className="text-text-brown/80 leading-relaxed mb-6">{product.longDescription || product.description}</p>

        {/* Ingredients */}
        <div className="mb-6">
          <h3 className="font-medium text-sm text-forest uppercase tracking-wide mb-3">Ingredients</h3>
          <div className="flex flex-wrap gap-2">
            {product.ingredients?.map((ing) => (
              <span key={ing} className="flex items-center gap-1 text-xs bg-beige px-3 py-1.5 rounded-full text-text-brown">
                <Leaf className="w-3 h-3 text-olive" />
                {ing}
              </span>
            ))}
          </div>
        </div>

        {/* Nutritional Info */}
        {product.nutritionalInfo && (
          <div className="mb-6">
            <h3 className="font-medium text-sm text-forest uppercase tracking-wide mb-3">Nutritional Information</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(product.nutritionalInfo).map(([key, val]) => (
                <div key={key} className="bg-forest/5 rounded-lg p-3 text-center">
                  <p className="text-xs text-text-brown/60 capitalize">{key}</p>
                  <p className="text-sm font-semibold text-forest">{val}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ayurvedic Properties */}
        {product.ayurvedicProperties && (
          <div className="mb-6">
            <h3 className="font-medium text-sm text-forest uppercase tracking-wide mb-3 flex items-center gap-1">
              <Star className="w-4 h-4 text-gold" /> Ayurvedic Properties
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {Object.entries(product.ayurvedicProperties).map(([key, val]) => (
                <div key={key} className="bg-cream rounded-lg p-3">
                  <span className="text-text-brown/60 capitalize">{key}: </span>
                  <span className="font-medium text-text-brown">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Benefits */}
        <div className="mb-6">
          <h3 className="font-medium text-sm text-forest uppercase tracking-wide mb-3">Benefits</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {product.benefits?.map((b) => (
              <div key={b} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span className="text-sm text-text-brown/80">{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="font-medium text-sm text-forest uppercase tracking-wide mb-3">Certifications</h3>
          <div className="flex flex-wrap gap-2">
            {product.certifications?.map((c) => (
              <span key={c} className="text-xs bg-forest/10 text-forest px-3 py-1.5 rounded-full font-medium">{c}</span>
            ))}
          </div>
        </div>

        {/* Storage */}
        <div className="mt-6 pt-4 border-t border-beige text-xs text-text-brown/50">
          Shelf Life: {product.shelfLife} · Store as directed on pack
        </div>
      </div>
    </section>
  );
}

/* ─── Lab Report Tab ─── */
function LabReportTab({ product }) {
  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl p-6 md:p-10 gold-border">
        <div className="flex items-center gap-3 mb-6">
          <FlaskConical className="w-6 h-6 text-forest" />
          <div>
            <h2 className="font-heading text-xl font-semibold text-text-brown">Quality Lab Report</h2>
            <p className="text-xs text-text-brown/50">{product.name} · NABL Accredited Testing</p>
          </div>
        </div>

        {/* Nutritional Analysis */}
        {product.nutritionalInfo && (
          <div className="mb-8">
            <h3 className="font-medium text-sm text-forest uppercase tracking-wide mb-4">Nutritional Analysis</h3>
            <div className="overflow-hidden rounded-xl border border-beige">
              <table className="w-full text-sm">
                <thead className="bg-forest/5">
                  <tr>
                    <th className="text-left px-4 py-3 text-text-brown/70 font-medium">Parameter</th>
                    <th className="text-right px-4 py-3 text-text-brown/70 font-medium">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(product.nutritionalInfo).map(([key, val], i) => (
                    <tr key={key} className={i % 2 === 0 ? 'bg-white' : 'bg-cream/50'}>
                      <td className="px-4 py-3 capitalize text-text-brown">{key}</td>
                      <td className="px-4 py-3 text-right font-mono text-forest">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Safety & Quality */}
        <div className="mb-8">
          <h3 className="font-medium text-sm text-forest uppercase tracking-wide mb-4">Safety & Quality Tests</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { test: 'Heavy Metals (Pb, As, Cd, Hg)', result: 'Below Detection Limit', status: 'pass' },
              { test: 'Pesticide Residue (76 compounds)', result: 'Not Detected', status: 'pass' },
              { test: 'Aflatoxin (B1, B2, G1, G2)', result: 'Not Detected', status: 'pass' },
              { test: 'Microbiological (E.coli, Salmonella)', result: 'Absent', status: 'pass' },
              { test: 'Moisture Content', result: 'Within Specification', status: 'pass' },
              { test: 'Total Plate Count', result: 'Within Limits', status: 'pass' },
            ].map((item) => (
              <div key={item.test} className="flex items-start gap-3 bg-cream/50 rounded-lg p-3">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-medium text-text-brown">{item.test}</p>
                  <p className="text-xs text-green-700">{item.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-6">
          <h3 className="font-medium text-sm text-forest uppercase tracking-wide mb-3">Accreditations</h3>
          <div className="flex flex-wrap gap-2">
            {product.certifications?.map((c) => (
              <span key={c} className="text-xs bg-forest/10 text-forest px-3 py-1.5 rounded-full font-medium">{c}</span>
            ))}
          </div>
        </div>

        {/* Origin */}
        {product.origin && (
          <div className="bg-cream rounded-xl p-4">
            <h3 className="font-medium text-sm text-forest uppercase tracking-wide mb-2">Origin Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-text-brown/60">State: </span>
                <span className="font-medium">{product.origin.state}</span>
              </div>
              <div>
                <span className="text-text-brown/60">Farm: </span>
                <span className="font-medium">{product.origin.farmCluster}</span>
              </div>
              <div>
                <span className="text-text-brown/60">Harvest: </span>
                <span className="font-medium">{product.origin.harvestSeason}</span>
              </div>
            </div>
          </div>
        )}

        <p className="text-[10px] text-text-brown/40 mt-6">
          Report generated by NABL-accredited laboratory. Batch-specific reports available on request.
        </p>
      </div>
    </section>
  );
}

/* ─── Traceability Tab ─── */
function TraceabilityTab({ productTrace }) {
  if (!productTrace) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-10 text-center">
        <p className="text-text-brown/60">Loading traceability data...</p>
      </section>
    );
  }

  return (
    <div>
      <JourneyTimeline steps={productTrace.journeySteps} />
      <JourneyMap
        locations={productTrace.farmLocations}
        stats={productTrace.stats}
        highlightStates={productTrace.highlightStates}
      />
    </div>
  );
}
