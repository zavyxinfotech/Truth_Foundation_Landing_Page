/* cspell:disable */
/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MapPin, Facebook, Instagram, Linkedin, X, PhoneCall, ExternalLink } from 'lucide-react';
import truthLogo from '../assets/images/truth_foundation_logo_1785562616008.jpg';

export interface FooterProps {
  onNavigateHome?: (anchor?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateHome }) => {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModal]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    e.preventDefault();
    if (onNavigateHome) {
      onNavigateHome(anchor);
    } else {
      const el = document.getElementById(anchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = `/#${anchor}`;
      }
    }
  };

  return (
    <footer className="bg-[#f8fafc] text-slate-800 text-sm sm:text-base relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        
        {/* Main Footer Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Column 1 (4 Cols): Brand + Quick Links (One by One) + Social Links (Below) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <img
                src={truthLogo}
                alt="Truth Foundation Logo"
                loading="lazy"
                decoding="async"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-[#da8a24] bg-white shrink-0 shadow-sm"
              />
              <div>
                <span className="font-extrabold text-xl sm:text-2xl text-[#0a2240] tracking-tight block leading-none">TRUTH FOUNDATION</span>
                <p className="text-xs text-[#da8a24] font-extrabold uppercase tracking-wider pt-0.5">Registered NGO • Chennai, India</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm font-normal">
              Truth Foundation is a registered non-profit NGO dedicated to empowering underprivileged children, seniors, and special needs communities across Tamil Nadu.
            </p>

            {/* Quick Links Aligned One by One Vertically */}
            <div className="space-y-2 pt-1">
              <h4 className="text-[#da8a24] font-extrabold text-xs uppercase tracking-widest">Quick Links</h4>
              <ul className="flex flex-col space-y-2 text-xs text-slate-700 font-bold">
                <li><a href="#why-donate" onClick={(e) => handleLinkClick(e, 'why-donate')} className="hover:text-[#da8a24] transition">Why Your Donation Matters</a></li>
                <li><a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="hover:text-[#da8a24] transition">About Truth Foundation</a></li>
                <li><a href="#gallery" onClick={(e) => handleLinkClick(e, 'gallery')} className="hover:text-[#da8a24] transition">Field Gallery</a></li>
                <li><a href="#trust" onClick={(e) => handleLinkClick(e, 'trust')} className="hover:text-[#da8a24] transition">Trust & Statutory Audits</a></li>
                <li><a href="#faq" onClick={(e) => handleLinkClick(e, 'faq')} className="hover:text-[#da8a24] transition">FAQs</a></li>
              </ul>
            </div>

            {/* Social Media Links Positioned Below Quick Links */}
            <div className="pt-2 flex items-center gap-3 text-slate-700">
              <a href="https://facebook.com/TruthFoundationNGO" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white border border-slate-200/90 shadow-sm hover:bg-[#da8a24] hover:text-white flex items-center justify-center transition cursor-pointer transform hover:scale-105" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/TruthFoundationNGO" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white border border-slate-200/90 shadow-sm hover:bg-[#da8a24] hover:text-white flex items-center justify-center transition cursor-pointer transform hover:scale-105" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com/company/truth-foundation" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white border border-slate-200/90 shadow-sm hover:bg-[#da8a24] hover:text-white flex items-center justify-center transition cursor-pointer transform hover:scale-105" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2 (4 Cols): Stacked Locations One by One */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-[#0a2240] font-extrabold text-sm sm:text-base uppercase tracking-wider">Locations</h4>
            
            <div className="flex flex-col space-y-6 text-xs sm:text-sm">
              
              {/* Registered Home Office */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-extrabold text-[#0a2240] text-xs sm:text-sm">
                    <MapPin className="w-4 h-4 text-[#da8a24] shrink-0" />
                    <span>Registered Home Office</span>
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Truth+Foundation+244+Mallima+Nagar+Vilagadupakkam+Redhills+Chennai+600052"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] sm:text-xs font-bold text-[#da8a24] hover:underline flex items-center gap-0.5"
                  >
                    <span>Map</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <p className="text-slate-600 leading-relaxed font-sans text-xs pl-5">
                  #244, Mallima Nagar, Vilagadupakkam,<br />
                  Redhills, Chennai - 600052
                </p>

                <div className="flex items-center gap-1.5 text-xs text-slate-700 pl-5">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <a href="tel:04426511661" className="text-[#da8a24] font-bold hover:underline">044-26511661</a>
                </div>
              </div>

              {/* Corporate Office */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-extrabold text-[#0a2240] text-xs sm:text-sm">
                    <MapPin className="w-4 h-4 text-[#da8a24] shrink-0" />
                    <span>Corporate Office</span>
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Truth+Foundation+49+Venus+Nagar+Main+Road+Kolathur+Chennai+600099"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] sm:text-xs font-bold text-[#da8a24] hover:underline flex items-center gap-0.5"
                  >
                    <span>Map</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <p className="text-slate-600 leading-relaxed font-sans text-xs pl-5">
                  #49, Venus Nagar Main Road,<br />
                  Kolathur, Chennai - 600099
                </p>

                <div className="flex items-center gap-1.5 text-xs text-slate-700 pl-5">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <a href="tel:04428552376" className="text-[#da8a24] font-bold hover:underline">044-28552376</a>
                </div>
              </div>

            </div>
          </div>

          {/* Column 3 (4 Cols): Google Maps Embed Aside Locations */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#da8a24] shrink-0" />
                <span className="font-extrabold text-xs sm:text-sm text-[#0a2240] uppercase tracking-wider">
                  Corporate Office Map
                </span>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Truth+Foundation+49+Venus+Nagar+Main+Road+Kolathur+Chennai+600099"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#da8a24] hover:text-[#c77a1e] hover:underline flex items-center gap-1"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            
            <div className="w-full h-64 lg:h-72 rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm relative bg-white">
              <iframe
                title="Truth Foundation Corporate Office Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.642940251147!2d80.2078603!3d13.1221764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5264ff9c5a15bd%3A0x429671d18bb76211!2s49%2C%20Venus%20Nagar%20Main%20Rd%2C%20Venus%20Nagar%2C%20Kolathur%2C%20Chennai%2C%20Tamil%20Nadu%20600099!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-10 pt-6 pb-20 sm:pb-6 border-t border-slate-200/90 flex flex-col items-center gap-3 text-center text-xs text-slate-600 font-medium sm:flex-row sm:justify-between sm:text-left">
          <div>
            © {new Date().getFullYear()} Truth Foundation • Registered NGO. Developed with ❤️ by{' '}
            <a
              href="https://zavyx.odoo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#da8a24] font-bold hover:underline"
            >
              ZAVYX InfoTech
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 font-semibold text-xs text-slate-600">
            <button onClick={() => setActiveModal('privacy')} className="hover:text-[#da8a24] underline cursor-pointer">Privacy Policy</button>
            <span className="text-slate-400">•</span>
            <button onClick={() => setActiveModal('terms')} className="hover:text-[#da8a24] underline cursor-pointer">Terms & Conditions</button>
          </div>
        </div>

      </div>

      {/* Policy Modals */}
      {activeModal && createPortal(
        <div className="fixed inset-0 z-[99999] bg-[#040f1a]/98 backdrop-blur-2xl flex items-center justify-center p-4 overflow-hidden" onClick={() => setActiveModal(null)}>
          <div className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-4 max-h-[85vh] overflow-y-auto relative shadow-2xl my-auto" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 text-slate-600 hover:text-white bg-slate-100 hover:bg-rose-600 rounded-full border border-slate-200 shadow-md cursor-pointer transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold text-[#0a2240]">
              {activeModal === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
            </h3>

            <div className="text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed">
              <p>
                Truth Foundation values your trust and is committed to protecting your personal data. All donor information collected on this landing page is strictly used for payment processing, receipt issuance, and donation status updates.
              </p>
              <p>
                <strong>Security:</strong> All payments are processed through Razorpay's secure encrypted checkout. We do not store credit card CVVs or net banking passwords.
              </p>
              <p>
                <strong>Refunds & Cancellations:</strong> Donations once processed are non-refundable as they are immediately committed to meal procurement drives.
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </footer>
  );
};
