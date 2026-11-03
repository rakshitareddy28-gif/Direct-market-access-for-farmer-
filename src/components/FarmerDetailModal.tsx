import React from 'react';
import { motion } from 'motion/react';
import { X, MapPin, ShieldCheck, Sprout, Plus, Minus, Droplets, Mountain } from 'lucide-react';
import { Farmer, ProduceItem } from '../types';

interface FarmerDetailModalProps {
  farmer: Farmer | null;
  produceList: ProduceItem[];
  cartQuantities: Record<string, number>;
  onClose: () => void;
  onAddToCart: (item: ProduceItem) => void;
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onSelectProduct: (item: ProduceItem) => void;
}

export const FarmerDetailModal: React.FC<FarmerDetailModalProps> = ({
  farmer,
  produceList,
  cartQuantities,
  onClose,
  onAddToCart,
  onUpdateQuantity,
  onSelectProduct
}) => {
  if (!farmer) return null;

  const farmerCrops = produceList.filter((p) => p.farmerId === farmer.id);

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
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-4xl bg-[#F7F6F2] rounded-3xl shadow-2xl border border-[#16221A]/15 overflow-hidden z-10 max-h-[92vh] flex flex-col"
      >
        {/* Cover Image Header */}
        <div className="relative h-48 sm:h-64 w-full bg-[#14281D] overflow-hidden">
          <img
            src={farmer.coverImageUrl}
            alt={farmer.farmName}
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top GPS Tag */}
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-mono-nums flex items-center gap-1.5 border border-white/10">
            <MapPin className="w-3.5 h-3.5 text-[#95FB71]" />
            <span>GPS: {farmer.gpsCoords.lat.toFixed(4)}° N, {farmer.gpsCoords.lng.toFixed(4)}° W</span>
          </div>

          {/* Bottom Title on Cover */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between text-white">
            <div className="flex items-center gap-4">
              <img
                src={farmer.portraitUrl}
                alt={farmer.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white object-cover shadow-lg"
              />
              <div>
                <span className="text-xs font-mono-nums uppercase tracking-wider text-[#95FB71]">
                  {farmer.region} · {farmer.distanceKm} km from hub
                </span>
                <h2 className="font-claude-serif font-bold text-xl sm:text-3xl text-white">
                  {farmer.name}
                </h2>
                <p className="text-xs sm:text-sm text-white/90 font-claude-sans">{farmer.farmName}</p>
              </div>
            </div>

            <div className="hidden sm:block text-right">
              <span className="text-xs text-white/80 block uppercase tracking-wider">Direct Guarantee</span>
              <span className="font-mono-nums font-bold text-lg text-[#95FB71]">
                {farmer.payoutPercentage}% Payout
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* Bio & Philosophy */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <h3 className="font-claude-serif font-bold text-xl text-[#16221A]">
                Grower Provenance & Terroir
              </h3>
              <p className="text-sm text-[#3E4F44] leading-relaxed font-claude-sans">
                {farmer.bio}
              </p>
              <div className="p-3.5 bg-white rounded-2xl border border-[#16221A]/10">
                <span className="text-xs uppercase font-bold text-[#8C5332] block mb-1">
                  Stewardship Philosophy
                </span>
                <p className="text-xs text-[#16221A] italic font-claude-serif">
                  "{farmer.farmingPhilosophy}"
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs uppercase font-bold text-[#6F7F75] tracking-wider">
                Farm Credentials
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-white rounded-xl border border-[#16221A]/10 flex items-center justify-between">
                  <span className="text-[#6F7F75]">Farm Size</span>
                  <span className="font-mono-nums font-bold text-[#16221A]">{farmer.acreage} Acres</span>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-[#16221A]/10 flex items-center justify-between">
                  <span className="text-[#6F7F75]">Stewardship</span>
                  <span className="font-mono-nums font-bold text-[#16221A]">{farmer.generationsFarming} Generations</span>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-[#16221A]/10 flex items-center justify-between">
                  <span className="text-[#6F7F75]">Direct Payout</span>
                  <span className="font-mono-nums font-bold text-[#1D6D00]">{farmer.payoutPercentage}% of Ledger</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {farmer.certifications.map((cert) => (
                  <span key={cert} className="text-[10px] font-medium bg-[#14281D]/5 text-[#14281D] px-2.5 py-1 rounded-md border border-[#16221A]/10">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Soil & Climate Telemetry */}
          <div className="p-5 bg-white rounded-2xl border border-[#16221A]/10 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-claude-serif font-bold text-base text-[#16221A] flex items-center gap-2">
                <Sprout className="w-4 h-4 text-[#4F9D2D]" />
                <span>Verified Soil & Agronomic Metrics</span>
              </h4>
              <span className="text-xs text-[#8C5332] font-semibold">
                Lab Tested Q1 2026
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-[#F7F6F2] rounded-xl border border-[#16221A]/5">
                <span className="text-[#6F7F75] block text-[11px]">Soil Series</span>
                <span className="font-semibold text-[#16221A] mt-0.5 block">{farmer.soilMetrics.soilType}</span>
              </div>
              <div className="p-3 bg-[#F7F6F2] rounded-xl border border-[#16221A]/5">
                <span className="text-[#6F7F75] block text-[11px]">Organic Matter</span>
                <span className="font-mono-nums font-bold text-[#14281D] text-base mt-0.5 block">
                  {farmer.soilMetrics.organicMatterPercentage}%
                </span>
                <span className="text-[10px] text-[#6F7F75]">(Regional avg: 2.1%)</span>
              </div>
              <div className="p-3 bg-[#F7F6F2] rounded-xl border border-[#16221A]/5">
                <span className="text-[#6F7F75] block text-[11px]">Acidity / pH</span>
                <span className="font-mono-nums font-bold text-[#16221A] text-base mt-0.5 block">
                  {farmer.soilMetrics.phLevel} pH
                </span>
                <span className="text-[10px] text-[#4F9D2D]">Microbiologically Active</span>
              </div>
              <div className="p-3 bg-[#F7F6F2] rounded-xl border border-[#16221A]/5">
                <span className="text-[#6F7F75] block text-[11px]">Topography</span>
                <span className="font-mono-nums font-bold text-[#16221A] text-base mt-0.5 block flex items-center gap-1">
                  <Mountain className="w-3.5 h-3.5 text-[#8C5332]" />
                  {farmer.soilMetrics.elevationMeters}m MSL
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
              <div className="flex items-start gap-2 text-[#3E4F44]">
                <Droplets className="w-4 h-4 text-[#4F9D2D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#16221A]">Water & Irrigation: </span>
                  {farmer.soilMetrics.irrigationMethod}
                </div>
              </div>
              <div className="flex items-start gap-2 text-[#3E4F44]">
                <ShieldCheck className="w-4 h-4 text-[#8C5332] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#16221A]">Seed Provenance: </span>
                  {farmer.soilMetrics.seedLineage}
                </div>
              </div>
            </div>
          </div>

          {/* Crops from this farm in today's harvest with Rupee prices */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-claude-serif font-bold text-xl text-[#16221A]">
                  Harvested Today from {farmer.farmName}
                </h3>
                <p className="text-xs text-[#3E4F44]">
                  Add crops directly from this estate plot to your basket.
                </p>
              </div>
              <span className="text-xs font-mono-nums text-[#14281D] bg-[#14281D]/10 px-3 py-1 rounded-full font-semibold">
                {farmerCrops.length} Crops Available
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {farmerCrops.map((crop) => {
                const qty = cartQuantities[crop.id] || 0;
                return (
                  <div
                    key={crop.id}
                    className="p-3.5 bg-white rounded-2xl border border-[#16221A]/10 flex items-center justify-between gap-3 shadow-sm hover:border-[#14281D]/30 transition-all"
                  >
                    <div 
                      onClick={() => onSelectProduct(crop)}
                      className="flex items-center gap-3 cursor-pointer overflow-hidden flex-1"
                    >
                      <img
                        src={crop.imageUrl}
                        alt={crop.name}
                        className="w-14 h-14 rounded-xl object-cover bg-[#EFEDE6] shrink-0"
                      />
                      <div className="truncate">
                        <span className="text-[10px] text-[#4F9D2D] font-bold uppercase tracking-wider block">
                          {crop.harvestTimeAgo}
                        </span>
                        <h4 className="font-claude-serif font-bold text-sm text-[#16221A] truncate">
                          {crop.name}
                        </h4>
                        <span className="font-mono-nums font-bold text-xs text-[#16221A]">
                          ₹{crop.price.toLocaleString()} <span className="font-normal text-[#6F7F75] text-[10px]">/ {crop.unit}</span>
                        </span>
                      </div>
                    </div>

                    {/* Stepper with 3D buttons */}
                    <div className="shrink-0">
                      {qty === 0 ? (
                        <button
                          onClick={() => onAddToCart(crop)}
                          className="px-3.5 py-1.5 bg-[#14281D] hover:bg-[#243F2F] text-white text-xs font-semibold rounded-full btn-3d-primary flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3 text-[#95FB71]" />
                          <span>Add</span>
                        </button>
                      ) : (
                        <div className="flex items-center bg-[#F7F6F2] border border-[#16221A]/20 rounded-full px-1.5 py-1">
                          <button
                            onClick={() => onUpdateQuantity(crop.id, qty - 1)}
                            className="w-6 h-6 rounded-full bg-white text-[#14281D] flex items-center justify-center cursor-pointer shadow-xs"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono-nums font-bold text-xs px-2">{qty}</span>
                          <button
                            onClick={() => onUpdateQuantity(crop.id, qty + 1)}
                            className="w-6 h-6 rounded-full bg-[#14281D] text-white flex items-center justify-center cursor-pointer shadow-xs"
                          >
                            <Plus className="w-3 h-3 text-[#95FB71]" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#16221A]/10 flex items-center justify-between">
          <span className="text-xs text-[#3E4F44]">
            Direct grower payout processed immediately upon delivery dispatch.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#14281D] hover:bg-[#243F2F] text-white rounded-full text-xs font-semibold btn-3d-primary cursor-pointer"
          >
            Done Browsing
          </button>
        </div>

      </motion.div>
    </div>
  );
};
