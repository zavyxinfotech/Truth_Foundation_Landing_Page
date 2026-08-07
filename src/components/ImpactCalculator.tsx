import React, { useState } from 'react';
import { Heart, Calculator, Sparkles, Check, ArrowRight, ShieldCheck, Utensils, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { pixelTracker } from '../utils/pixelTracker';

interface ImpactCalculatorProps {
  onOpenDonateModal: (amount: number) => void;
}

const PRESET_AMOUNTS = [
  { amount: 100, label: '₹100', meals: 1 },
  { amount: 500, label: '₹500', meals: 5, popular: true },
  { amount: 1000, label: '₹1,000', meals: 10 },
  { amount: 2500, label: '₹2,500', meals: 25 },
  { amount: 5000, label: '₹5,000', meals: 50 }
];

export const ImpactCalculator: React.FC<ImpactCalculatorProps> = ({ onOpenDonateModal }) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(500);
  const [customInput, setCustomInput] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);

  const activeAmount = isCustom ? (parseInt(customInput, 10) || 100) : selectedAmount;
  const mealsProvided = Math.max(1, Math.floor(activeAmount / 100)); // 1 meal = ₹100
  const daysFed = Math.max(1, Math.floor(mealsProvided / 2)); // 2 meals/day per child
  const taxSavings80G = Math.floor(activeAmount * 0.15); // Net ~15% tax savings

  const handleSelectPreset = (amt: number) => {
    setSelectedAmount(amt);
    setIsCustom(false);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomInput(e.target.value);
    setIsCustom(true);
  };

  const handleProceed = () => {
    pixelTracker.trackDonateClick(activeAmount, 'Impact Calculator Button');
    onOpenDonateModal(activeAmount);
  };

  return (
    <section id="impact" className="py-12 sm:py-20 bg-blue-950 text-white relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[400px] bg-blue-600/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-12">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 bg-blue-900/80 text-amber-300 border border-blue-700/60 px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Impact Calculator</span>
          </div>
          <h2 className="text-[20px] xs:text-[24px] sm:text-[36px] lg:text-[48px] font-extrabold tracking-tight text-white leading-tight">
            Calculate Your Real-World Impact
          </h2>
          <p className="text-blue-100 text-xs sm:text-base leading-relaxed font-light">
            Every contribution directly provides hot, nutritious daily meals for underprivileged school children (<span className="text-amber-400 font-bold">1 Meal = ₹100</span>).
          </p>
        </motion.div>

        {/* Uncarded Open Calculator Layout - Completely Borderless & Card-Free */}
        <div className="space-y-8 sm:space-y-12">
          
          {/* Top Control Bar: Pill Amount Selection */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="flex items-center justify-between text-xs font-extrabold">
              <span className="flex items-center gap-1.5 text-blue-200 uppercase tracking-wider text-[10px] sm:text-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Select Contribution Amount
              </span>
              <span className="text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-3 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-400" /> 80G Tax Deductible
              </span>
            </div>

            {/* Uncarded Segmented Control Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {PRESET_AMOUNTS.map((preset) => {
                const isSelected = !isCustom && selectedAmount === preset.amount;
                return (
                  <button
                    key={preset.amount}
                    onClick={() => handleSelectPreset(preset.amount)}
                    className={`py-2.5 px-4 sm:px-5 rounded-full font-black text-xs sm:text-sm transition-all cursor-pointer relative flex items-center gap-2 ${
                      isSelected
                        ? 'bg-amber-400 text-blue-950 shadow-lg shadow-amber-400/20 scale-105'
                        : 'bg-blue-900/60 text-blue-100 hover:bg-blue-900 hover:text-white border border-blue-800/60'
                    }`}
                  >
                    <span>{preset.label}</span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-blue-950 text-amber-300' : 'bg-blue-950/80 text-amber-400'
                    }`}>
                      {preset.meals} {preset.meals === 1 ? 'Meal' : 'Meals'}
                    </span>
                    {preset.popular && (
                      <span className="text-[9px] font-black uppercase text-amber-400 pl-0.5">
                        ★
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Custom Amount Pill */}
              <button
                onClick={() => setIsCustom(true)}
                className={`py-2.5 px-5 rounded-full font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
                  isCustom
                    ? 'bg-amber-400 text-blue-950 shadow-lg shadow-amber-400/20 scale-105'
                    : 'bg-blue-900/60 text-blue-100 hover:bg-blue-900 hover:text-white border border-blue-800/60'
                }`}
              >
                <span>Custom</span>
              </button>
            </div>

            {/* Custom Input Drawer */}
            {isCustom && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-2 max-w-xs mx-auto"
              >
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-amber-400 text-base">₹</span>
                  <input
                    type="number"
                    min="50"
                    step="50"
                    value={customInput}
                    onChange={handleCustomChange}
                    placeholder="Enter amount (e.g. 1500)"
                    className="w-full pl-9 pr-4 py-2.5 bg-blue-950 border border-amber-400 rounded-full text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-center"
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Interactive Precision Slider */}
          <div className="space-y-2 max-w-2xl mx-auto">
            <div className="flex justify-between items-center text-xs text-blue-200 font-medium">
              <span>₹100</span>
              <span className="font-black text-amber-400 text-sm bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                ₹{activeAmount.toLocaleString()} Selected
              </span>
              <span>₹10,000</span>
            </div>
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              value={activeAmount > 10000 ? 10000 : activeAmount}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                setSelectedAmount(val);
                setIsCustom(false);
              }}
              className="w-full h-2 bg-blue-900 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>

          {/* Open Impact Metrics Row (No Enclosing Cards) */}
          <div className="py-8 border-y border-blue-900/80 grid grid-cols-1 md:grid-cols-3 gap-8 text-center items-center divide-y md:divide-y-0 md:divide-x divide-blue-900/80">
            
            {/* Primary Impact Metric */}
            <div className="space-y-1.5 py-2 md:py-0 px-2">
              <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-black uppercase tracking-wider">
                <Utensils className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Direct Meals Provided</span>
              </div>
              <div className="text-4xl sm:text-6xl font-black text-amber-400 tracking-tight">
                {mealsProvided.toLocaleString()}
              </div>
              <p className="text-xs sm:text-sm font-light text-blue-100">
                Fresh, hot cooked meals served to hungry students
              </p>
            </div>

            {/* Child Health Metric */}
            <div className="space-y-1.5 py-4 md:py-0 px-2">
              <div className="inline-flex items-center gap-1.5 text-xs text-blue-200 font-black uppercase tracking-wider">
                <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Child Health Support</span>
              </div>
              <div className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {daysFed} Days
              </div>
              <p className="text-xs sm:text-sm font-light text-blue-100">
                Continuous daily nutrition & classroom energy
              </p>
            </div>

            {/* 80G Tax Exemption */}
            <div className="space-y-1.5 py-4 md:py-0 px-2">
              <div className="inline-flex items-center gap-1.5 text-xs text-blue-200 font-black uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Estimated 80G Tax Relief</span>
              </div>
              <div className="text-3xl sm:text-5xl font-black text-amber-400 tracking-tight">
                ₹{taxSavings80G.toLocaleString()}
              </div>
              <p className="text-xs sm:text-sm font-light text-blue-100">
                Instant 50% tax deduction under Section 80G
              </p>
            </div>

          </div>

          {/* Action CTA Row */}
          <div className="text-center max-w-md mx-auto space-y-3 pt-2">
            <button
              onClick={handleProceed}
              className="w-full bg-amber-400 hover:bg-amber-300 text-blue-950 font-black py-4 px-8 rounded-full text-base sm:text-lg shadow-xl shadow-amber-400/10 transition-all cursor-pointer active:scale-98 uppercase tracking-wider flex items-center justify-center gap-3"
            >
              <Heart className="w-5 h-5 fill-blue-950 shrink-0" />
              <span>Donate ₹{activeAmount.toLocaleString()} Now</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </button>
            <p className="text-xs text-blue-200 flex items-center justify-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Instant WhatsApp Receipt & 80G Exemption Certificate</span>
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
