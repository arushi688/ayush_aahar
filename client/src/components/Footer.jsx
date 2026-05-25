import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-forest-dark text-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-7 h-7 text-gold" />
              <span className="font-heading text-2xl font-semibold text-white">Ayush Aahar</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              A Government of India initiative promoting Ayurvedic nutrition and herbal wellness for a healthier nation.
            </p>
            <p className="text-white/50 text-xs mt-4">
              Under the aegis of Ministry of AYUSH
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4 text-gold">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/products" className="hover:text-gold transition-colors">Our Products</Link></li>
              <li><Link to="/traceability" className="hover:text-gold transition-colors">Traceability Journey</Link></li>
              <li><Link to="/about" className="hover:text-gold transition-colors">About Initiative</Link></li>
              <li><Link to="/quality" className="hover:text-gold transition-colors">Quality Standards</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4 text-gold">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-gold shrink-0" />
                <span>AYUSH Bhawan, B Block, GPO Complex, INA, New Delhi - 110023</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>1800-XXX-XXXX (Toll Free)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>info@ayushaahar.gov.in</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold shrink-0" />
                <span>Mon-Fri: 9:30 AM - 5:30 PM</span>
              </li>
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4 text-gold">Certifications</h4>
            <div className="grid grid-cols-2 gap-2">
              {['FSSAI', 'Organic India', 'GMP', 'ISO 22000', 'AYUSH Mark', 'NABL'].map((cert) => (
                <div key={cert} className="bg-white/10 rounded-lg px-3 py-2 text-xs text-center">
                  {cert}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs">
            © 2024 Ayush Aahar. Government of India Initiative. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/50">
            <span>Privacy Policy</span>
            <span>Terms of Use</span>
            <span>RTI</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
