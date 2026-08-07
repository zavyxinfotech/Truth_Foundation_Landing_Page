import React, { useState, useEffect } from 'react';
import { Activity, X, Terminal, CheckCircle2, ChevronUp, ChevronDown } from 'lucide-react';
import { PixelEvent } from '../types';
import { pixelTracker } from '../utils/pixelTracker';

export const PixelTrackerConsole: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState<PixelEvent[]>([]);

  useEffect(() => {
    setEvents(pixelTracker.getHistory());
    const unsubscribe = pixelTracker.subscribe((newEvent) => {
      setEvents((prev) => [newEvent, ...prev]);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="fixed top-18 sm:top-24 left-3 sm:left-6 z-40 max-w-[calc(100vw-1.5rem)]">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-slate-900/90 hover:bg-slate-900 text-slate-200 border border-slate-700/80 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-mono font-semibold shadow-lg backdrop-blur-xs flex items-center gap-1.5 sm:gap-2 cursor-pointer"
        >
          <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 animate-pulse shrink-0" />
          <span className="truncate">Meta Pixel & GA4 ({events.length})</span>
        </button>
      ) : (
        <div className="bg-slate-950 border border-slate-800 text-slate-200 rounded-2xl shadow-2xl w-[calc(100vw-2rem)] sm:w-96 overflow-hidden text-xs font-mono">
          <div className="bg-slate-900 p-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-emerald-400">
              <Terminal className="w-4 h-4" />
              <span>Meta Ads & GA4 Live Events</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 max-h-64 overflow-y-auto space-y-2.5">
            {events.length === 0 ? (
              <div className="text-slate-500 text-[11px] italic">No pixel events fired yet...</div>
            ) : (
              events.map((ev) => (
                <div key={ev.id} className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-amber-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {ev.eventName}
                    </span>
                    <span className="text-slate-500 text-[10px]">{ev.timestamp}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    Platform: <span className="text-slate-300">{ev.platform}</span>
                  </div>
                  {Object.keys(ev.payload).length > 0 && (
                    <div className="text-[10px] text-slate-500 bg-black/40 p-1.5 rounded-md overflow-x-auto">
                      {JSON.stringify(ev.payload, null, 1)}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="p-2 bg-slate-900 border-t border-slate-800 text-[10px] text-slate-400 text-center">
            Tracking active: Meta Pixel ID: 1092837492019 • GA4: G-TF928371
          </div>
        </div>
      )}
    </div>
  );
};
