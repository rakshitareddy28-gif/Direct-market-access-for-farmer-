import React from 'react';
import { motion } from 'motion/react';
import { PackageCheck, ArrowRight, ShieldCheck, Sparkles, Check, Plus } from 'lucide-react';
import { ProduceItem } from '../types';

export interface CuratedCrate {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  bundlePriceRupees: number;
  originalPriceRupees: number;
  farmerPayoutRupees: number;
  imageUrl: string;
  produceItems: ProduceItem[];
}

interface CuratedCratesProps {
  crates: CuratedCrate[];
  onAddCrateToCart: (crate: CuratedCrate) => void;
  onSelectProduct: (produce: ProduceItem) => void;
}

export const CuratedCrates: React.FC<CuratedCratesProps> = ({
  crates,
  onAddCrateToCart,
  onSelectProduct,
}) => {
  return (
    <section className="py-12 border-b border-[#16221A]/10 bg-[#FAF9F5]">
      <div className="max-w-[1360px] mx-auto px-4 md:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#16221A]/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8C5332]/10 text-[#8C5332] text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#4F9D2D]" />
              <span>Standout Feature · Curated Estate Crates</span>
            </div>
            <h2 className="font-claude-serif text-3xl sm:text-4xl text-[#16221A] tracking-tight">
              Curated Weekly Terroir Crates
            </h2>
            <p className="text-xs sm:text-sm text-[#3E4F44] max-w-2xl font-claude-sans mt-1">
              Hand-selected dawn pairings curated by the estate agronomist. 1-click addition with complete 88.5% farmer payout guarantees.
            </p>
          </div>

          <span className="text-xs font-mono-nums text-[#6F7F75] bg-white px-3 py-1.5 rounded-full border border-[#16221A]/10 shadow-2xs">
            Save ~15% vs individual crop purchase
          </span>
        </div>

        {/* Crate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {crates.map((crate, idx) => (
            <motion.div
              key={crate.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-3xl border border-[#16221A]/10 overflow-hidden shadow-[0_4px_20px_-4px_rgba(20,40,29,0.05)] hover:shadow-[0_16px_36px_-8px_rgba(20,40,29,0.09)] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Crate Cover Image */}
                <div className="relative aspect-[16/10] bg-[#EFEDE6] overflow-hidden">
                  <img
                    src={crate.imageUrl}
                    alt={crate.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-[#16221A]/10 text-[11px] font-bold text-[#14281D] shadow-xs">
                    {crate.badge}
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[10px] font-mono-nums uppercase tracking-wider text-[#95FB71]">
                      {crate.subtitle}
                    </span>
                    <h3 className="font-claude-serif font-bold text-xl text-white">
                      {crate.title}
                    </h3>
                  </div>
                </div>

                {/* Description & Crop List */}
                <div className="p-6 space-y-4">
                  <p className="text-xs text-[#3E4F44] leading-relaxed font-claude-sans">
                    {crate.description}
                  </p>

                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold text-[#6F7F75] tracking-wider block">
                      Included in Today's Crate:
                    </span>
                    <div className="space-y-1.5">
                      {crate.produceItems.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => onSelectProduct(item)}
                          className="flex items-center justify-between text-xs p-2 rounded-xl bg-[#F7F6F2] hover:bg-[#EFEDE6] cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <Check className="w-3.5 h-3.5 text-[#4F9D2D] shrink-0" />
                            <span className="font-medium text-[#16221A] truncate">{item.name}</span>
                          </div>
                          <span className="text-[11px] font-mono-nums text-[#8C5332] shrink-0">
                            {item.farmerName.split('&')[0]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing & 3D Add Crate Button */}
              <div className="p-6 bg-[#F7F6F2]/60 border-t border-[#16221A]/8 flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-mono-nums font-bold text-2xl text-[#16221A]">
                      ₹{crate.bundlePriceRupees.toLocaleString()}
                    </span>
                    <span className="text-xs font-mono-nums text-[#6F7F75] line-through">
                      ₹{crate.originalPriceRupees.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#1D6D00] font-mono-nums font-semibold block">
                    ₹{crate.farmerPayoutRupees.toLocaleString()} direct to {crate.produceItems.length} growers
                  </span>
                </div>

                <button
                  onClick={() => onAddCrateToCart(crate)}
                  className="px-5 py-3 rounded-full bg-[#14281D] hover:bg-[#243F2F] text-white font-semibold text-xs btn-3d-primary flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5 text-[#95FB71]" />
                  <span>Add Crate</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
