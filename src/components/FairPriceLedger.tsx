import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, TrendingUp, Scale, CheckCircle2 } from 'lucide-react';

export const FairPriceLedger: React.FC = () => {
  // Realistic basket value in Indian Rupees (₹)
  const [basketValue, setBasketValue] = useState<number>(4500);

  // Traditional Supermarket Distribution Model:
  // Farmer: ~22%
  // Distributors & Aggregators: ~48%
  // Supermarket shelf markup: ~30%
  const traditionalFarmer = basketValue * 0.22;
  const traditionalIntermediaries = basketValue * 0.48;
  const traditionalRetail = basketValue * 0.30;

  // Direct Market Access Model:
  // Direct Farmer Payout: 88.5%
  // Cold-Chain Direct Transit: 7.5%
  // Direct Platform Ops: 4.0%
  const directFarmer = basketValue * 0.885;
  const directLogistics = basketValue * 0.075;
  const directPlatform = basketValue * 0.04;
  const extraToFarmer = directFarmer - traditionalFarmer;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="py-10 md:py-14 space-y-10 max-w-[1360px] mx-auto px-4 md:px-8"
    >
      {/* Title & Introduction */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8C5332]/10 text-[#8C5332] text-xs font-semibold">
          <Scale className="w-3.5 h-3.5" />
          <span>Radical Economic Transparency</span>
        </div>
        <h2 className="font-claude-serif text-3xl sm:text-4xl lg:text-5xl text-[#16221A] tracking-tight">
          The Fair Price Ledger: Where does every rupee go?
        </h2>
        <p className="text-sm md:text-base text-[#3E4F44] leading-relaxed font-claude-sans">
          Traditional supermarkets commoditize agricultural labor through 4 layers of brokers, wholesale auctions, and terminal cold depots—paying independent family growers as little as 22 paise per rupee. Stillfield guarantees an 88.5% net payout disbursed within 24 hours of harvest.
        </p>
      </div>

      {/* Interactive Value Comparison Calculator */}
      <div className="p-6 md:p-8 bg-white rounded-3xl border border-[#16221A]/10 shadow-[0_12px_32px_-8px_rgba(20,40,29,0.06)] space-y-8">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <label htmlFor="basket-slider" className="font-claude-serif font-semibold text-lg text-[#16221A]">
              Simulate Harvest Basket Total:
            </label>
            <div className="font-mono-nums font-bold text-2xl text-[#14281D] bg-[#F7F6F2] px-5 py-2 rounded-2xl border border-[#16221A]/10 w-fit">
              ₹{basketValue.toLocaleString()}
            </div>
          </div>

          <input
            id="basket-slider"
            type="range"
            min={1500}
            max={15000}
            step={250}
            value={basketValue}
            onChange={(e) => setBasketValue(Number(e.target.value))}
            className="w-full h-2.5 bg-[#EFEDE6] rounded-lg appearance-none cursor-pointer accent-[#14281D]"
          />
          <div className="flex justify-between text-xs text-[#6F7F75] mt-1.5 font-mono-nums">
            <span>₹1,500 (Single Table)</span>
            <span>₹4,500 (Weekly Household)</span>
            <span>₹8,500 (Estate Chef Crate)</span>
            <span>₹15,000 (Bulk Artisan)</span>
          </div>
        </div>

        {/* Side-by-Side Visual Model Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card A: Traditional Supermarket */}
          <div className="p-6 rounded-2xl bg-[#F7F6F2] border border-[#16221A]/10 space-y-4">
            <div className="flex items-center justify-between border-b border-[#16221A]/10 pb-3">
              <div>
                <span className="text-xs uppercase font-bold text-[#6F7F75]">Traditional Supermarket</span>
                <h3 className="font-claude-serif font-bold text-xl text-[#16221A]">4-Tier Broker Chain</h3>
              </div>
              <span className="text-xs text-[#BA1A1A] font-semibold bg-[#BA1A1A]/10 px-2.5 py-1 rounded-full">
                22% to Grower
              </span>
            </div>

            {/* Visual Breakdown Stack */}
            <div className="space-y-3.5 text-xs">
              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span className="text-[#8C5332]">Grower Payout (net after mandi deductions)</span>
                  <span className="font-mono-nums font-bold text-[#16221A]">₹{Math.round(traditionalFarmer).toLocaleString()}</span>
                </div>
                <div className="w-full h-2.5 bg-[#EFEDE6] rounded-full overflow-hidden">
                  <div className="bg-[#8C5332] h-full" style={{ width: '22%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span className="text-[#6F7F75]">Wholesalers, Brokers & Middle Cold Storage</span>
                  <span className="font-mono-nums text-[#3E4F44]">₹{Math.round(traditionalIntermediaries).toLocaleString()}</span>
                </div>
                <div className="w-full h-2.5 bg-[#EFEDE6] rounded-full overflow-hidden">
                  <div className="bg-[#6F7F75] h-full" style={{ width: '48%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span className="text-[#6F7F75]">Supermarket Markup & In-Store Spoilage</span>
                  <span className="font-mono-nums text-[#3E4F44]">₹{Math.round(traditionalRetail).toLocaleString()}</span>
                </div>
                <div className="w-full h-2.5 bg-[#EFEDE6] rounded-full overflow-hidden">
                  <div className="bg-[#DBDAD5] h-full" style={{ width: '30%' }} />
                </div>
              </div>
            </div>

            <p className="text-xs text-[#6F7F75] pt-2 border-t border-[#16221A]/5 italic">
              Commercial payment terms average Net-60 to Net-90 days, with growers bearing all spoilage risk.
            </p>
          </div>

          {/* Card B: Stillfield Direct Market Access */}
          <div className="p-6 rounded-2xl bg-[#14281D] text-white space-y-4 shadow-lg">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-xs uppercase font-bold text-[#95FB71]">Stillfield Direct Model</span>
                <h3 className="font-claude-serif font-bold text-xl text-white">Direct-to-Grower Ledger</h3>
              </div>
              <span className="text-xs text-[#0A1710] font-bold bg-[#95FB71] px-2.5 py-1 rounded-full">
                88.5% to Grower
              </span>
            </div>

            {/* Visual Breakdown Stack */}
            <div className="space-y-3.5 text-xs">
              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span className="text-[#95FB71] font-semibold">Direct Grower Disbursement</span>
                  <span className="font-mono-nums font-bold text-[#95FB71] text-base">₹{Math.round(directFarmer).toLocaleString()}</span>
                </div>
                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="bg-[#4F9D2D] h-full" style={{ width: '88.5%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span className="text-white/80">Cold-Chain Electric Transit</span>
                  <span className="font-mono-nums text-white/90">₹{Math.round(directLogistics).toLocaleString()}</span>
                </div>
                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="bg-white/40 h-full" style={{ width: '7.5%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span className="text-white/80">Stillfield Platform Upkeep</span>
                  <span className="font-mono-nums text-white/90">₹{Math.round(directPlatform).toLocaleString()}</span>
                </div>
                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="bg-[#8C5332] h-full" style={{ width: '4%' }} />
                </div>
              </div>
            </div>

            {/* Highlighted Delta Box */}
            <div className="p-3.5 bg-white/10 rounded-xl border border-white/15 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#95FB71]" />
                <span className="text-xs font-semibold">Extra Delivered to Grower:</span>
              </div>
              <span className="font-mono-nums font-bold text-base text-[#95FB71]">
                +₹{Math.round(extraToFarmer).toLocaleString()} extra!
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Concrete Farm Reinvestment Case Studies */}
      <div className="space-y-4">
        <h3 className="font-claude-serif font-bold text-2xl text-[#16221A]">
          What Direct Payouts Fund on Stillfield Partner Farms
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-[#16221A]/10 space-y-2.5 shadow-sm">
            <span className="text-xs font-mono-nums text-[#8C5332] font-semibold block">Stillfield River Basin</span>
            <h4 className="font-claude-serif font-bold text-lg text-[#16221A]">Solar Rainwater Catchment</h4>
            <p className="text-xs text-[#3E4F44] leading-relaxed">
              Elena & Mateo constructed a 2.4-million-liter rainwater catchment basin with solar pumping, ensuring 100% drought resilience for their Romanesco plots.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs text-[#1D6D00] font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Funded by 3,200 direct household crates</span>
            </div>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-[#16221A]/10 space-y-2.5 shadow-sm">
            <span className="text-xs font-mono-nums text-[#8C5332] font-semibold block">Cruz Heirloom Groves</span>
            <h4 className="font-claude-serif font-bold text-lg text-[#16221A]">Perennial San Marzano Root Bank</h4>
            <p className="text-xs text-[#3E4F44] leading-relaxed">
              Alejandro preserved 30-year-old deep-root dry-farmed vines that draw mineral water from underground aquifers rather than switching to water-bloated hybrid seeds.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs text-[#1D6D00] font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Historic seed lineage preserved</span>
            </div>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-[#16221A]/10 space-y-2.5 shadow-sm">
            <span className="text-xs font-mono-nums text-[#8C5332] font-semibold block">Sunstone Heritage Mill</span>
            <h4 className="font-claude-serif font-bold text-lg text-[#16221A]">Austrian Granite Cold-Mill</h4>
            <p className="text-xs text-[#3E4F44] leading-relaxed">
              Devon invested in a genuine Austrian stone grain mill running under 30°C, ensuring vital wheat germ vitamins and volatile aroma oils are never destroyed by heat.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs text-[#1D6D00] font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Live enzyme vitality certified</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
