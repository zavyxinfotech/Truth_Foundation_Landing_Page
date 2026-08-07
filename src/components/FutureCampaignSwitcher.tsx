import React from 'react';
import { Layers, Sparkles, Check, ArrowRight } from 'lucide-react';
import { FUTURE_CAMPAIGNS } from '../data/campaignData';
import { Campaign } from '../types';

interface FutureCampaignSwitcherProps {
  currentCampaignId: string;
  onSelectCampaign: (campaignId: string) => void;
}

export const FutureCampaignSwitcher: React.FC<FutureCampaignSwitcherProps> = ({
  currentCampaignId,
  onSelectCampaign,
}) => {
  return (
    <section className="py-6 sm:py-10 bg-slate-900 text-white border-b border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6">
          
          <div className="space-y-1 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Future Scope Component Reusability</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-serif text-white">Modular Campaign Switcher</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              This landing page is engineered with reusable UI modules. Test how the entire page transforms for future NGO drives:
            </p>
          </div>

          {/* Campaign Selector Grid */}
          <div className="w-full lg:w-auto flex flex-wrap items-center gap-2 pt-1 lg:pt-0">
            {FUTURE_CAMPAIGNS.map((camp) => {
              const isSelected = camp.id === currentCampaignId;
              return (
                <button
                  key={camp.id}
                  onClick={() => onSelectCampaign(camp.id)}
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border cursor-pointer active:scale-95 ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-extrabold'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                  <span className="whitespace-nowrap">{camp.title}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
