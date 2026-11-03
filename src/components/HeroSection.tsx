import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Clock, ShieldCheck, ThermometerSnowflake, MapPin, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onExploreHarvest: () => void;
  onOpenLedger: () => void;
  onOpenMap: () => void;
  onOpenChat: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreHarvest,
  onOpenLedger,
  onOpenMap,
  onOpenChat,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:py-20 border-b border-[#16221A]/10 bg-[#F7F6F2]">
      <div className="max-w-[1360px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Headline & Value Proposition with Motion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start space-y-6"
          >
            {/* Express Harvest Provenance Banner */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#16221A]/12 text-xs text-[#14281D] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#4F9D2D] animate-pulse" />
              <span className="font-semibold tracking-wider uppercase font-mono-nums text-[10px]">
                Stillfield Dawn Harvest Slot
              </span>
              <span className="text-[#6F7F75]">·</span>
              <span className="text-[#3E4F44]">Active cold transit across 14 estates</span>
            </div>

            <h1 className="font-claude-serif text-3xl sm:text-5xl lg:text-6xl text-[#16221A] tracking-tight leading-[1.12] text-balance">
              Radical farm provenance. Directly from grower to table.
            </h1>

            <p className="text-[#3E4F44] text-base md:text-lg leading-relaxed max-w-2xl font-claude-sans">
              Inspired by the Stillfield landcare philosophy. Cut out the 4-tier supermarket intermediary chain. Every harvest batch is logged with soil pH, morning cut timestamps, and 100% transparent direct disbursements in Indian Rupees (₹).
            </p>

            {/* CTAs with 3D Tactile Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreHarvest}
                className="px-6 py-3.5 bg-[#14281D] hover:bg-[#243F2F] text-white font-semibold text-xs sm:text-sm rounded-full btn-3d-primary flex items-center gap-2 cursor-pointer group"
              >
                <span>Shop Today’s Harvest</span>
                <ArrowRight className="w-4 h-4 text-[#95FB71] transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenLedger}
                className="px-5 py-3.5 bg-white hover:bg-[#FAF9F5] text-[#16221A] font-semibold text-xs sm:text-sm rounded-full border border-[#16221A]/18 btn-3d-white cursor-pointer"
              >
                Inspect Fair Price Ledger
              </button>

              <button
                onClick={onOpenChat}
                className="px-4 py-3.5 bg-[#8C5332] hover:bg-[#6D3F25] text-white font-semibold text-xs sm:text-sm rounded-full btn-3d-clay flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FFDCC5]" />
                <span>Ask AI Agronomist</span>
              </button>
            </div>

            {/* Micro Provenance Indicators */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-3 text-xs text-[#3E4F44]">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#4F9D2D]" />
                <span>Avg. 3.4h soil-to-door</span>
              </div>
              <span className="text-[#C8C5B9]">·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8C5332]" />
                <span>88.5% Direct Payout to Farmers</span>
              </div>
              <span className="text-[#C8C5B9]">·</span>
              <button 
                onClick={onOpenMap} 
                className="flex items-center gap-1.5 hover:text-[#14281D] underline decoration-[#14281D]/30 cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#14281D]" />
                <span>Verified Terroirs</span>
              </button>
            </div>

          </motion.div>

          {/* Right Column: Hero Visual Asset with Motion and 3D Card Elevation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-[#16221A]/10 shadow-[0_20px_48px_-12px_rgba(20,40,29,0.12)] bg-white">
              
              {/* Hero Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EFEDE6]">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80"
                  alt="Stillfield estate dawn harvest crate"
                  className="w-full h-full object-cover"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent pointer-events-none" />

                {/* Overlaid Provenance Badge */}
                <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#16221A]/10 text-xs font-semibold text-[#14281D] flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#4F9D2D]" />
                  <span>Harvest Batch #STF-26-09</span>
                </div>

                <div className="absolute bottom-3.5 left-4 right-4 text-white flex items-end justify-between">
                  <div>
                    <p className="text-[11px] font-mono-nums text-[#95FB71]">Russian River Valley Terroir</p>
                    <p className="font-claude-serif font-bold text-base sm:text-lg">Stillfield River Basin Plots</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-white/80 block">Harvest Time</span>
                    <span className="font-mono-nums font-bold text-xs bg-black/40 px-2 py-0.5 rounded">05:30 AM Today</span>
                  </div>
                </div>
              </div>

              {/* Live Cold-Chain Telemetry Strip */}
              <div className="p-4 bg-white border-t border-[#16221A]/8 grid grid-cols-3 gap-2 text-center">
                <div className="border-r border-[#16221A]/8 pr-2">
                  <span className="text-[10px] uppercase font-bold text-[#6F7F75] block tracking-wide">Transit Core</span>
                  <span className="font-mono-nums font-bold text-sm text-[#14281D] flex items-center justify-center gap-1">
                    <ThermometerSnowflake className="w-3.5 h-3.5 text-[#4F9D2D]" />
                    4.6°C
                  </span>
                </div>
                <div className="border-r border-[#16221A]/8 px-2">
                  <span className="text-[10px] uppercase font-bold text-[#6F7F75] block tracking-wide">Grower Share</span>
                  <span className="font-mono-nums font-bold text-sm text-[#1D6D00]">
                    88.5%
                  </span>
                </div>
                <div className="pl-2">
                  <span className="text-[10px] uppercase font-bold text-[#6F7F75] block tracking-wide">Next Transit Drop</span>
                  <span className="font-mono-nums font-bold text-sm text-[#8C5332]">
                    18 min
                  </span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
