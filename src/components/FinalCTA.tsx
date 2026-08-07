import React from 'react';
import { Heart, MessageCircle, ShieldCheck, Sparkles, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { pixelTracker } from '../utils/pixelTracker';
import { AnimatedCounter } from './AnimatedCounter';

interface FinalCTAProps {
  onOpenDonateModal: (amount?: number) => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenDonateModal }) => {
  const handleWhatsApp = () => {
    pixelTracker.trackWhatsAppClick('Final CTA Section');
    const msg = encodeURIComponent(`Hello Truth Foundation! Every meal matters. I would like to donate now or sponsor a monthly meal package.`);
    window.open(`https://wa.me/9104426511661?text=${msg}`, '_blank');
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-blue-900 via-blue-950 to-slate-950 text-white relative overflow-hidden text-center">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-amber-400/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6 sm:space-y-8">
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-1.5 bg-blue-950/80 backdrop-blur-md text-amber-300 border border-blue-800 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider relative z-10 shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Join Over <AnimatedCounter value={12000} suffix="+" /> Donors Today</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto relative z-10 drop-shadow-md"
        >
          Every Meal Matters. <br className="hidden sm:inline" />
          <span className="text-amber-400">Every Smile Matters.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xs sm:text-xl text-blue-100 max-w-2xl mx-auto font-light leading-relaxed relative z-10"
        >
          It takes just ₹100 to change a child's day from hunger to hope. Be the reason a child goes to bed with a full stomach tonight.
        </motion.p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 relative z-10">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              pixelTracker.trackDonateClick(500, 'Final CTA Button');
              onOpenDonateModal(500);
            }}
            className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-blue-950 text-sm sm:text-lg font-black px-8 sm:px-10 py-4 sm:py-4.5 rounded-2xl shadow-2xl shadow-amber-400/20 transition flex items-center justify-center gap-2 sm:gap-3 cursor-pointer uppercase tracking-wider"
          >
            <Heart className="w-5 h-5 fill-blue-950 shrink-0 animate-pulse" />
            <span>Donate Now (₹500 Feeds 1 Month)</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleWhatsApp}
            className="w-full sm:w-auto bg-blue-950/80 backdrop-blur-md hover:bg-blue-950 text-white border border-blue-800 text-xs sm:text-base font-extrabold px-6 sm:px-8 py-4 sm:py-4.5 rounded-2xl transition flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <MessageCircle className="w-5 h-5 text-emerald-400 fill-emerald-400 shrink-0" />
            <span>Chat on WhatsApp</span>
          </motion.button>
        </div>

        {/* Micro Trust Indicators */}
        <div className="pt-6 sm:pt-10 border-t border-blue-800/80 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs text-blue-200 relative z-10 font-semibold">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" /> 100% Tax Deductible (80G)
          </span>
          <span className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-400 shrink-0" /> ISO 22000 Kitchens
          </span>
          <span className="flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" /> Instant WhatsApp Receipts
          </span>
        </div>

      </div>
    </section>
  );
};
