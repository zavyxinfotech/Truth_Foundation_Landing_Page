import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { pixelTracker } from '../utils/pixelTracker';
import { WhatsAppIcon } from './WhatsAppIcon';
import truthLogo from '../assets/images/truth_foundation_logo_1785562616008.jpg';

interface HeaderProps {
  onOpenDonateModal: (amount?: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDonateModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    pixelTracker.trackWhatsAppClick('Header WhatsApp Button');
    const msg = encodeURIComponent(`Hello Truth Foundation! I am interested in donating meals or volunteering.`);
    window.open(`https://wa.me/916382721178?text=${msg}`, '_blank');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a2240]/95 backdrop-blur-md shadow-lg border-b border-[#163863]/60 py-1.5 sm:py-2'
          : 'bg-transparent py-2 sm:py-3'
      }`}
    >
      {/* Main Navbar Container */}
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 h-14 sm:h-16 lg:h-18 flex items-center justify-between gap-1.5 sm:gap-4">
        
        {/* Left Side: Brand Logo & Title */}
        <div className="flex items-center min-w-0 shrink">
          <a href="#" className="flex items-center gap-2 sm:gap-3 group min-w-0">
            <motion.div
              whileHover={{ scale: 1.08, rotate: 3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="relative shrink-0"
            >
              {/* Outer gold glow ring */}
              <div className="absolute -inset-1 rounded-full bg-[#da8a24]/30 blur-sm group-hover:bg-[#da8a24]/50 transition-all duration-300" />
              <img
                src={truthLogo}
                alt="Truth Foundation Logo"
                className="relative w-10 h-10 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-full object-cover border-2 border-[#da8a24] shadow-lg shrink-0"
              />
            </motion.div>

            <div className="min-w-0 text-left">
              <span className="text-sm xs:text-base sm:text-2xl lg:text-[26px] font-extrabold text-white tracking-tight leading-none block group-hover:text-[#da8a24] transition-colors whitespace-nowrap drop-shadow-sm">
                TRUTH FOUNDATION
              </span>
              <div className="flex items-center gap-1.5 pt-0.5">
                <p className="text-[8px] xs:text-[10px] sm:text-xs lg:text-[13px] font-bold text-[#da8a24] uppercase tracking-widest whitespace-nowrap">
                  Registered NGO &bull; Chennai, India
                </p>
              </div>
            </div>
          </a>
        </div>

        {/* Right Side: Buttons — icon-only on mobile, full label on sm+ */}
        <div className="flex flex-row items-center justify-end gap-1.5 sm:gap-3.5 shrink-0">

          {/* WhatsApp button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleWhatsAppClick}
            className="flex items-center justify-center gap-1.5 sm:gap-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-extrabold shadow-sm cursor-pointer transition-all shrink-0
              w-9 h-9 sm:w-auto sm:h-auto sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 text-xs sm:text-sm lg:text-base"
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
            <span className="hidden sm:inline font-extrabold">WhatsApp</span>
          </motion.button>

          {/* Donate Now button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              pixelTracker.trackDonateClick(500, 'Header Donate Button');
              onOpenDonateModal(500);
            }}
            className="flex items-center justify-center gap-1.5 sm:gap-2 bg-[#da8a24] hover:bg-[#c77a1e] text-[#0a2240] rounded-xl font-extrabold shadow-md cursor-pointer transition-all shrink-0 uppercase tracking-wider
              w-9 h-9 sm:w-auto sm:h-auto sm:px-5 sm:py-2 lg:px-6 lg:py-2.5 text-xs sm:text-sm lg:text-base"
            aria-label="Donate Now"
          >
            <Heart className="w-4 h-4 fill-[#0a2240] shrink-0 animate-pulse" />
            <span className="hidden sm:inline">Donate Now</span>
          </motion.button>

        </div>

      </div>
    </header>
  );
};




