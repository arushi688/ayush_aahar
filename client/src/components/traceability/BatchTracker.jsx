import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, QrCode, CheckCircle, Clock, Shield } from 'lucide-react';

export default function BatchTracker() {
  const [batchCode, setBatchCode] = useState('');
  const [result, setResult] = useState(null);
  const [searching, setSearching] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!batchCode.trim()) return;

    setSearching(true);
    // Simulated batch lookup
    setTimeout(() => {
      setResult({
        batchId: batchCode || 'AYUSH-B2024-1456',
        product: 'Kali Gajar Kanji',
        manufactureDate: '2024-11-15',
        expiryDate: '2024-12-15',
        status: 'Verified',
        origin: 'Pushkar, Rajasthan',
        qualityScore: '98/100',
        certifications: ['FSSAI', 'Organic', 'AYUSH Mark'],
        stages: [
          { name: 'Harvested', date: '2024-10-20', status: 'complete' },
          { name: 'Quality Tested', date: '2024-10-25', status: 'complete' },
          { name: 'Processed', date: '2024-11-01', status: 'complete' },
          { name: 'Packaged', date: '2024-11-15', status: 'complete' },
          { name: 'Dispatched', date: '2024-11-18', status: 'complete' },
        ],
      });
      setSearching(false);
    }, 1500);
  };

  return (
    <section className="section-padding bg-gradient-to-b from-forest-dark to-forest relative overflow-hidden">
      <div className="absolute inset-0 grain-overlay opacity-30" />
      
      <div className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium tracking-widest uppercase text-gold">Batch Verification</span>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mt-2 text-white">
            Track Your Product
          </h2>
          <p className="text-white/70 mt-3 max-w-lg mx-auto text-sm">
            Enter your batch code or scan the QR code on your product to view its complete journey.
          </p>
        </motion.div>

        {/* Search Box */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row items-center gap-3 max-w-xl mx-auto mb-12"
        >
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-brown/40" />
            <input
              type="text"
              value={batchCode}
              onChange={(e) => setBatchCode(e.target.value)}
              placeholder="Enter Batch Code (e.g., AYUSH-B2024-1456)"
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-text-brown placeholder:text-text-brown/40 focus:ring-2 focus:ring-gold outline-none font-mono text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={searching}
            className="btn-primary bg-gold hover:bg-gold/90 whitespace-nowrap flex items-center gap-2"
          >
            <QrCode className="w-4 h-4" />
            {searching ? 'Searching...' : 'Verify'}
          </button>
        </motion.form>

        {/* Result Card */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-beige">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-text-brown">{result.product}</p>
                  <p className="text-xs font-mono text-text-brown/50">{result.batchId}</p>
                </div>
              </div>
              <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                {result.status}
              </span>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-cream rounded-lg">
                <p className="text-[10px] text-text-brown/50 uppercase">Origin</p>
                <p className="text-sm font-medium mt-1">{result.origin}</p>
              </div>
              <div className="text-center p-3 bg-cream rounded-lg">
                <p className="text-[10px] text-text-brown/50 uppercase">Manufactured</p>
                <p className="text-sm font-medium mt-1">{result.manufactureDate}</p>
              </div>
              <div className="text-center p-3 bg-cream rounded-lg">
                <p className="text-[10px] text-text-brown/50 uppercase">Quality Score</p>
                <p className="text-sm font-medium text-forest mt-1">{result.qualityScore}</p>
              </div>
              <div className="text-center p-3 bg-cream rounded-lg">
                <p className="text-[10px] text-text-brown/50 uppercase">Certifications</p>
                <p className="text-sm font-medium mt-1">{result.certifications.length} Verified</p>
              </div>
            </div>

            {/* Mini Timeline */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-text-brown flex items-center gap-2">
                <Clock className="w-4 h-4 text-forest" />
                Journey Timeline
              </h4>
              <div className="space-y-2">
                {result.stages.map((stage, i) => (
                  <div key={stage.name} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-forest flex items-center justify-center shrink-0">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                      <span className="text-sm text-text-brown">{stage.name}</span>
                      <span className="text-xs text-text-brown/50 font-mono">{stage.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-beige flex items-center gap-2 text-xs text-text-brown/50">
              <Shield className="w-4 h-4 text-forest" />
              <span>Authenticity verified by AYUSH Quality Assurance Network</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
