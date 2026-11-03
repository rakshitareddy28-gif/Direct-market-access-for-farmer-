import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, ShieldCheck, ThermometerSnowflake, Clock, MapPin, ArrowRight } from 'lucide-react';
import { ProduceItem, Farmer } from '../types';

interface ProductDetailModalProps {
  produce: ProduceItem | null;
  farmer?: Farmer;
  quantityInCart: number;
  onClose: () => void;
  onAddToCart: (item: ProduceItem) => void;
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onSelectFarmer: (farmerId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  produce,
  farmer,
  quantityInCart,
  onClose,
  onAddToCart,
  onUpdateQuantity,
  onSelectFarmer
}) => {
  if (!produce) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#0A1710]/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Surface */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-3xl bg-[#F7F6F2] rounded-3xl shadow-2xl border border-[#16221A]/15 overflow-hidden z-10 max-h-[90vh] flex flex-col"
      >
        {/* Header Bar */}
        <div className="p-4 bg-white/90 backdrop-blur-md border-b border-[#16221A]/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4F9D2D] animate-pulse" />
            <span className="text-xs font-mono-nums font-semibold uppercase text-[#14281D]">
              Lot: {produce.harvestBatchCode}
            </span>
            <span className="text-[#C8C5B9]">·</span>
            <span className="text-xs text-[#6F7F75]">{produce.harvestTimeAgo}</span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F7F6F2] hover:bg-[#EFEDE6] text-[#3E4F44] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Top Split: Image + Primary Provenance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="rounded-2xl overflow-hidden bg-[#EFEDE6] border border-[#16221A]/10 aspect-[4/3] relative">
              <img
                src={produce.imageUrl}
                alt={produce.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#8C5332] px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border border-[#8C5332]/20">
                {produce.terroirTag}
              </div>
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-xs font-mono-nums flex items-center gap-1.5">
                <ThermometerSnowflake className="w-3.5 h-3.5 text-[#4F9D2D]" />
                <span>Core: {produce.batchTempCelsius}°C</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-serif italic text-[#6F7F75]">{produce.botanicalName}</p>
                <h2 className="font-claude-serif font-bold text-2xl sm:text-3xl text-[#16221A] mt-0.5">{produce.name}</h2>
              </div>

              {/* Farmer link box */}
              <div 
                onClick={() => {
                  onClose();
                  onSelectFarmer(produce.farmerId);
                }}
                className="p-3 bg-white rounded-2xl border border-[#16221A]/10 hover:border-[#14281D]/30 transition-all cursor-pointer group flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {farmer && (
                    <img
                      src={farmer.portraitUrl}
                      alt={farmer.name}
                      className="w-10 h-10 rounded-full object-cover border border-[#8C5332]/20"
                    />
                  )}
                  <div>
                    <p className="text-xs text-[#8C5332] font-semibold flex items-center gap-1">
                      <span>{produce.farmerName}</span>
                    </p>
                    <p className="text-xs text-[#3E4F44] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#14281D]" />
                      <span>{produce.farmName} ({produce.distanceKm} km away)</span>
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#8C5332] transition-transform group-hover:translate-x-1" />
              </div>

              {/* Flavor Profile */}
              <div>
                <h4 className="text-[11px] uppercase font-bold text-[#6F7F75] tracking-wider mb-1.5">Flavor Profile</h4>
                <div className="flex flex-wrap gap-1.5 text-xs text-[#14281D]">
                  {produce.flavorNotes.map((note) => (
                    <span key={note} className="px-2.5 py-1 bg-white rounded-lg border border-[#16221A]/10">
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-xs text-[#3E4F44] leading-relaxed">
                <span className="font-semibold text-[#16221A]">Tasting Notes: </span>
                {produce.tastingNotes}
              </div>
            </div>
          </div>

          {/* Transparent Ledger Breakdown Section with Indian Rupees (₹) */}
          <div className="p-5 bg-white rounded-2xl border border-[#16221A]/10 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-claude-serif font-bold text-base text-[#16221A] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1D6D00]" />
                <span>100% Direct Price Ledger</span>
              </h4>
              <span className="text-xs font-mono-nums font-bold text-[#1D6D00]">
                ₹{produce.priceBreakdown.farmerPayout.toLocaleString()} to Grower
              </span>
            </div>

            <p className="text-xs text-[#3E4F44]">
              Unlike retail chains that withhold supplier margins up to 90 days, every rupee of our direct ledger is settled within 24 hours of morning harvest dispatch.
            </p>

            {/* Visual ratio bar */}
            <div className="w-full h-3 bg-[#EFEDE6] rounded-full overflow-hidden flex">
              <div 
                style={{ width: `${(produce.priceBreakdown.farmerPayout / produce.price) * 100}%` }} 
                className="bg-[#14281D] h-full" 
                title="Direct Farmer Payout"
              />
              <div 
                style={{ width: `${(produce.priceBreakdown.coldChainLogistics / produce.price) * 100}%` }} 
                className="bg-[#4F9D2D] h-full" 
                title="Cold-Chain Electric Transport"
              />
              <div 
                style={{ width: `${(produce.priceBreakdown.platformFee / produce.price) * 100}%` }} 
                className="bg-[#8C5332] h-full" 
                title="Stillfield Platform Upkeep"
              />
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs pt-1">
              <div>
                <span className="text-[#14281D] font-bold block font-mono-nums">₹{produce.priceBreakdown.farmerPayout.toLocaleString()} (88%)</span>
                <span className="text-[#6F7F75] text-[11px]">Direct to Grower</span>
              </div>
              <div>
                <span className="text-[#1D6D00] font-bold block font-mono-nums">₹{produce.priceBreakdown.coldChainLogistics.toLocaleString()} (7%)</span>
                <span className="text-[#6F7F75] text-[11px]">Refrigerated Transit</span>
              </div>
              <div>
                <span className="text-[#8C5332] font-bold block font-mono-nums">₹{produce.priceBreakdown.platformFee.toLocaleString()} (5%)</span>
                <span className="text-[#6F7F75] text-[11px]">Stillfield Platform</span>
              </div>
            </div>
          </div>

          {/* Soil & Agronomic Metrics */}
          {farmer && (
            <div className="p-4 bg-[#EFEDE6] rounded-2xl border border-[#16221A]/8 space-y-2">
              <h4 className="text-xs uppercase font-bold tracking-wider text-[#8C5332]">Terroir & Agronomy</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-[#6F7F75] block text-[11px]">Soil Type</span>
                  <span className="font-semibold text-[#16221A]">{farmer.soilMetrics.soilType.split(' ')[0]} {farmer.soilMetrics.soilType.split(' ')[1] || 'Loam'}</span>
                </div>
                <div>
                  <span className="text-[#6F7F75] block text-[11px]">Organic Matter</span>
                  <span className="font-mono-nums font-bold text-[#14281D]">{farmer.soilMetrics.organicMatterPercentage}% OM</span>
                </div>
                <div>
                  <span className="text-[#6F7F75] block text-[11px]">Soil pH</span>
                  <span className="font-mono-nums font-bold text-[#16221A]">{farmer.soilMetrics.phLevel} (Optimal)</span>
                </div>
                <div>
                  <span className="text-[#6F7F75] block text-[11px]">Elevation</span>
                  <span className="font-mono-nums text-[#16221A]">{farmer.soilMetrics.elevationMeters}m MSL</span>
                </div>
              </div>
            </div>
          )}

          {/* Nutrition & Storage Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-white rounded-xl border border-[#16221A]/8">
              <span className="font-semibold text-[#16221A] block mb-1">Nutritional Highlights</span>
              <p className="text-[#3E4F44] mb-1 font-mono-nums">{produce.nutrition.calories}</p>
              <div className="flex flex-wrap gap-1 text-[#14281D]">
                {produce.nutrition.highlights.map((h) => (
                  <span key={h} className="bg-[#F7F6F2] px-1.5 py-0.5 rounded border border-[#16221A]/5 text-[11px]">
                    {h}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-[#16221A]/8">
              <span className="font-semibold text-[#16221A] block mb-1">Harvest Shelf Life</span>
              <p className="text-[#3E4F44] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#4F9D2D]" />
                <span>Peak vitality for {produce.nutrition.shelfLifeDays} days refrigerated</span>
              </p>
              <p className="text-[11px] text-[#6F7F75] mt-1">
                Store unwashed in produce crisper with breathable liner.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Purchase Footer with 3D Button */}
        <div className="p-4 bg-white border-t border-[#16221A]/10 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-mono-nums font-bold text-2xl text-[#16221A]">
                ₹{produce.price.toLocaleString()}
              </span>
              <span className="text-xs text-[#6F7F75]">/ {produce.unit}</span>
            </div>
            <p className="text-xs text-[#1D6D00] font-medium font-mono-nums">
              Inventory: {produce.inventoryKg} available from dawn cut
            </p>
          </div>

          <div className="flex items-center gap-3">
            {quantityInCart === 0 ? (
              <button
                onClick={() => onAddToCart(produce)}
                className="px-6 py-3 bg-[#14281D] hover:bg-[#243F2F] text-white font-semibold text-xs sm:text-sm rounded-full btn-3d-primary flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#95FB71]" />
                <span>Add to Harvest Basket</span>
              </button>
            ) : (
              <div className="flex items-center bg-[#F7F6F2] border border-[#16221A]/20 rounded-full px-2 py-1.5 shadow-inner">
                <button
                  onClick={() => onUpdateQuantity(produce.id, quantityInCart - 1)}
                  className="w-8 h-8 rounded-full bg-white text-[#14281D] hover:bg-[#EFEDE6] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-mono-nums font-bold text-sm text-[#16221A] px-4 min-w-[32px] text-center">
                  {quantityInCart} in Basket
                </span>
                <button
                  onClick={() => onUpdateQuantity(produce.id, quantityInCart + 1)}
                  className="w-8 h-8 rounded-full bg-[#14281D] text-white hover:bg-[#243F2F] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#95FB71]" />
                </button>
              </div>
            )}
          </div>
        </div>

      </motion.div>
    </div>
  );
};
