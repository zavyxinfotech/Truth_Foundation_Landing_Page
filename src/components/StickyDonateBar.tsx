import React, { useState, useEffect } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { LIVE_DONATION_TICKER } from '../data/campaignData';

interface StickyDonateBarProps {
  onOpenDonateModal?: (amount?: number) => void;
}

export const StickyDonateBar: React.FC<StickyDonateBarProps> = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % LIVE_DONATION_TICKER.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const currentTicker = LIVE_DONATION_TICKER[tickerIndex];

  return (
    /* Left corner popup toast - takes only its content width, stacked above bottom-left CTA */
    <div className="fixed bottom-20 left-4 sm:bottom-22 sm:left-6 z-40 pointer-events-auto transition-all duration-300 animate-in fade-in slide-in-from-bottom-3">
      <div className="bg-blue-950/95 text-white border border-blue-700/80 rounded-2xl p-2.5 sm:p-3 shadow-2xl backdrop-blur-md flex items-center gap-2.5 max-w-[280px] sm:max-w-xs">
        <div className="relative shrink-0 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping absolute" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 relative" />
        </div>
        
        <div className="text-[11px] sm:text-xs leading-snug">
          <div className="font-extrabold text-amber-300 flex items-center gap-1 flex-wrap">
            <span>{currentTicker.name}</span>
            <span className="text-slate-300 font-normal">from {currentTicker.location}</span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="font-black text-amber-400 bg-amber-400/20 px-1.5 py-0.5 rounded text-[10px]">
              {currentTicker.amount}
            </span>
            <span className="text-blue-200 text-[10px]">({currentTicker.time})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

