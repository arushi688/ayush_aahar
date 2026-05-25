import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Tag, FlaskConical, MapPin, CheckCircle, Leaf, Star, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';
import JourneyTimeline from '../components/traceability/JourneyTimeline';
import JourneyMap from '../components/traceability/JourneyMap';

import kaliGajarImg from '../assets/kali_gajar_kaanji.png';
import chanaDalImg from '../assets/Chana Dal Khichdi.png';
import kaliGajarReport from '../assets/TestReport_KaliGajarKanji.pdf';
import chanaDalReport from '../assets/TestReport_Khichdi_ChanaDal.pdf';

const productImages = {
  'kali-gajar-kanji': kaliGajarImg,
  'chana-dal-khichdi': chanaDalImg,
};

const productReports = {
  'kali-gajar-kanji': kaliGajarReport,
  'chana-dal-khichdi': chanaDalReport,
};

const labData = {
  'kali-gajar-kanji': {
    reportRef: 'ISSPL/FA/25-26/99021',
    ulr: 'TC584325000099021F',
    issueDate: '07/05/2026',
    sampleReceived: '02/05/2026',
    lab: 'IRCLASS Systems and Solutions Pvt. Ltd., Jaipur',
    serving: 'Per Serving: 250 mL (1 standard glass)',
    batch: 'KGK51222',
    conclusion: 'COMPLIANT — 25/25 parameters passed',
    nutrients: [
      { param: 'Energy', value: '35.0', unit: 'kcal' },
      { param: 'Total Fat', value: '0.3', unit: 'g' },
      { param: 'Saturated Fat', value: '0.05', unit: 'g' },
      { param: 'Trans Fat', value: '0.0', unit: 'g' },
      { param: 'Sodium', value: '210.0', unit: 'mg' },
      { param: 'Total Carbohydrate', value: '7.8', unit: 'g' },
      { param: 'Dietary Fibre', value: '1.2', unit: 'g' },
      { param: 'Total Sugars', value: '4.5', unit: 'g' },
      { param: 'Added Sugars', value: '0.0', unit: 'g' },
      { param: 'Protein', value: '0.8', unit: 'g' },
    ],
    bioactives: [
      { param: 'Vitamin C', value: '8.5', unit: 'mg' },
      { param: 'Calcium', value: '28.0', unit: 'mg' },
      { param: 'Iron', value: '1.2', unit: 'mg' },
      { param: 'Potassium', value: '185.0', unit: 'mg' },
      { param: 'Anthocyanins (Total)', value: '42.0', unit: 'mg' },
      { param: 'Lactic Acid', value: '1.85', unit: 'g' },
      { param: 'Probiotic (LAB Count)', value: '2.8 × 10⁶', unit: 'CFU/mL' },
    ],
  },
  'chana-dal-khichdi': {
    reportRef: 'ISSPL/FA/25-26/99022',
    ulr: 'TC584325000099022F',
    issueDate: '07/05/2026',
    sampleReceived: '02/05/2026',
    lab: 'IRCLASS Systems and Solutions Pvt. Ltd., Jaipur',
    serving: 'Per Serving: 60 g dry mix (1 serving)',
    batch: 'KHI51333',
    conclusion: 'COMPLIANT — 25/25 parameters passed',
    nutrients: [
      { param: 'Energy', value: '215.0', unit: 'kcal' },
      { param: 'Total Fat', value: '2.8', unit: 'g' },
      { param: 'Saturated Fat', value: '0.55', unit: 'g' },
      { param: 'Trans Fat', value: '0.0', unit: 'g' },
      { param: 'Sodium', value: '310.0', unit: 'mg' },
      { param: 'Total Carbohydrate', value: '38.5', unit: 'g' },
      { param: 'Dietary Fibre', value: '5.8', unit: 'g' },
      { param: 'Total Sugars', value: '2.2', unit: 'g' },
      { param: 'Added Sugars', value: '0.0', unit: 'g' },
      { param: 'Protein', value: '11.5', unit: 'g' },
    ],
    bioactives: [
      { param: 'Vitamin A', value: '45.0', unit: 'µg' },
      { param: 'Calcium', value: '52.0', unit: 'mg' },
      { param: 'Iron', value: '3.2', unit: 'mg' },
      { param: 'Potassium', value: '280.0', unit: 'mg' },
      { param: 'Zinc', value: '1.8', unit: 'mg' },
      { param: 'Curcumin (from Turmeric)', value: '12.5', unit: 'mg' },
    ],
  },
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
  const report = labData[product.id];
  const reportFile = productReports[product.id];

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl p-6 md:p-10 gold-border">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <FlaskConical className="w-6 h-6 text-forest" />
            <div>
              <h2 className="font-heading text-xl font-semibold text-text-brown">Test Report</h2>
              <p className="text-xs text-text-brown/50">{product.name} · NABL Accredited Lab</p>
            </div>
          </div>
          <a
            href={reportFile}
            download
            className="flex items-center gap-2 bg-forest text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-forest-dark transition-colors shrink-0"
          >
            <Download className="w-4 h-4" />
            Download Report
          </a>
        </div>

        {/* Report Meta */}
        {report && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 bg-cream rounded-xl p-4">
              <div>
                <p className="text-[10px] text-text-brown/50 uppercase">Report Ref</p>
                <p className="text-xs font-mono font-medium text-text-brown">{report.reportRef}</p>
              </div>
              <div>
                <p className="text-[10px] text-text-brown/50 uppercase">Issue Date</p>
                <p className="text-xs font-medium text-text-brown">{report.issueDate}</p>
              </div>
              <div>
                <p className="text-[10px] text-text-brown/50 uppercase">Batch</p>
                <p className="text-xs font-mono font-medium text-text-brown">{report.batch}</p>
              </div>
              <div>
                <p className="text-[10px] text-text-brown/50 uppercase">Lab</p>
                <p className="text-xs font-medium text-text-brown">{report.lab}</p>
              </div>
            </div>

            {/* Conclusion Badge */}
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-3 mb-8">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
              <p className="text-sm font-medium text-green-800">{report.conclusion}</p>
            </div>

            {/* Macronutrient Table */}
            <div className="mb-8">
              <h3 className="font-medium text-sm text-forest uppercase tracking-wide mb-3">
                Macronutrient Profile <span className="normal-case text-text-brown/50 font-normal">({report.serving})</span>
              </h3>
              <div className="overflow-hidden rounded-xl border border-beige">
                <table className="w-full text-sm">
                  <thead className="bg-forest/5">
                    <tr>
                      <th className="text-left px-4 py-3 text-text-brown/70 font-medium">Parameter</th>
                      <th className="text-right px-4 py-3 text-text-brown/70 font-medium">Result</th>
                      <th className="text-right px-4 py-3 text-text-brown/70 font-medium">Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.nutrients.map((row, i) => (
                      <tr key={row.param} className={i % 2 === 0 ? 'bg-white' : 'bg-cream/50'}>
                        <td className="px-4 py-2.5 text-text-brown">{row.param}</td>
                        <td className="px-4 py-2.5 text-right font-mono text-forest font-medium">{row.value}</td>
                        <td className="px-4 py-2.5 text-right text-text-brown/50">{row.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bioactive Compounds */}
            <div className="mb-8">
              <h3 className="font-medium text-sm text-forest uppercase tracking-wide mb-3">Micronutrient & Bioactive Compounds</h3>
              <div className="overflow-hidden rounded-xl border border-beige">
                <table className="w-full text-sm">
                  <thead className="bg-forest/5">
                    <tr>
                      <th className="text-left px-4 py-3 text-text-brown/70 font-medium">Parameter</th>
                      <th className="text-right px-4 py-3 text-text-brown/70 font-medium">Result</th>
                      <th className="text-right px-4 py-3 text-text-brown/70 font-medium">Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.bioactives.map((row, i) => (
                      <tr key={row.param} className={i % 2 === 0 ? 'bg-white' : 'bg-cream/50'}>
                        <td className="px-4 py-2.5 text-text-brown">{row.param}</td>
                        <td className="px-4 py-2.5 text-right font-mono text-forest font-medium">{row.value}</td>
                        <td className="px-4 py-2.5 text-right text-text-brown/50">{row.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Certifications */}
        <div className="mb-6">
          <h3 className="font-medium text-sm text-forest uppercase tracking-wide mb-3">Accreditations</h3>
          <div className="flex flex-wrap gap-2">
            {product.certifications?.map((c) => (
              <span key={c} className="text-xs bg-forest/10 text-forest px-3 py-1.5 rounded-full font-medium">{c}</span>
            ))}
          </div>
        </div>

        <p className="text-[10px] text-text-brown/40 mt-6">
          Tested by IRCLASS Systems and Solutions Pvt. Ltd. (NABL Accredited, TC-5843). Full report available for download above.
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
