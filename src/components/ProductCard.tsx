import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Minus, Sprout, Info } from 'lucide-react';
import { ProduceItem } from '../types';

interface ProductCardProps {
  produce: ProduceItem;
  quantityInCart: number;
  onAddToCart: (item: ProduceItem) => void;
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onSelectProduct: (item: ProduceItem) => void;
  onSelectFarmer: (farmerId: string) => void;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  produce,
  quantityInCart,
  onAddToCart,
  onUpdateQuantity,
  onSelectProduct,
  onSelectFarmer,
  index = 0,
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-white rounded-3xl border border-[#16221A]/10 overflow-hidden shadow-[0_4px_16px_-4px_rgba(20,40,29,0.04)] hover:shadow-[0_16px_36px_-8px_rgba(20,40,29,0.08)] transition-all flex flex-col justify-between"
    >
      {/* Top Image Section with live harvest tag */}
      <div
        onClick={() => onSelectProduct(produce)}
        className="relative aspect-[4/3] w-full bg-[#EFEDE6] cursor-pointer overflow-hidden"
      >
        {!imageFailed ? (
          <img
            src={produce.imageUrl}
            alt={produce.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#F7F6F2] p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#14281D]/10 flex items-center justify-center mb-2">
              <Sprout className="w-6 h-6 text-[#14281D]" />
            </div>
            <span className="font-claude-serif font-semibold text-xs text-[#14281D]">{produce.name}</span>
            <span className="text-[11px] text-[#6F7F75] mt-0.5">{produce.farmName}</span>
          </div>
        )}

        {/* Top-Right: Live Harvest Tag with micro pulsing green dot indicator */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md border border-[#4F9D2D]/30 text-[#14281D] px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4F9D2D] animate-pulse" />
          <span className="whitespace-nowrap">{produce.harvestTimeAgo}</span>
        </div>

        {/* Top-Left: Terroir Tag */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-[#8C5332] px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-xs border border-[#8C5332]/20">
          {produce.terroirTag}
        </div>

        {/* Bottom bar on image: Batch ID & Temperature */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-white/95 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-lg">
          <span className="font-mono-nums">Lot: {produce.harvestBatchCode}</span>
          <span className="font-mono-nums">{produce.batchTempCelsius}°C Cold-Chain</span>
        </div>
      </div>

      {/* Content & Metadata Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Farmer attribution in clay brown */}
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectFarmer(produce.farmerId);
              }}
              className="text-xs font-semibold text-[#8C5332] hover:text-[#58331D] transition-colors flex items-center gap-1 cursor-pointer truncate max-w-[210px]"
            >
              <span>{produce.farmerName}</span>
              <span className="text-[#6F7F75]">·</span>
              <span className="text-[#6F7F75] font-normal">{produce.distanceKm} km</span>
            </button>

            <button
              onClick={() => onSelectProduct(produce)}
              aria-label="View product details"
              className="text-[#6F7F75] hover:text-[#14281D] transition-colors p-1 cursor-pointer"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>

          {/* Produce Title in Newsreader / Claude serif */}
          <h3
            onClick={() => onSelectProduct(produce)}
            className="font-claude-serif font-bold text-xl text-[#16221A] group-hover:text-[#14281D] transition-colors cursor-pointer line-clamp-1 leading-snug"
          >
            {produce.name}
          </h3>

          <p className="text-xs italic text-[#6F7F75] font-serif mb-2.5 line-clamp-1">
            {produce.botanicalName}
          </p>

          <p className="text-xs text-[#3E4F44] line-clamp-2 leading-relaxed mb-3">
            {produce.description}
          </p>

          {/* Flavor Notes */}
          <div className="text-[11px] text-[#3E4F44] flex flex-wrap items-center gap-1.5 mb-4">
            {produce.flavorNotes.map((note, idx) => (
              <React.Fragment key={note}>
                <span>{note}</span>
                {idx < produce.flavorNotes.length - 1 && (
                  <span className="text-[#C8C5B9]" aria-hidden="true">·</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Pricing in Rupees (₹) and 3D Quick-Add Stepper */}
        <div className="pt-3.5 border-t border-[#16221A]/8 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-mono-nums font-bold text-xl text-[#16221A]">
                ₹{produce.price.toLocaleString()}
              </span>
              <span className="text-[11px] text-[#6F7F75]">/ {produce.unit}</span>
            </div>
            <p className="text-[11px] text-[#1D6D00] font-medium font-mono-nums">
              ₹{produce.priceBreakdown.farmerPayout.toLocaleString()} direct to grower ({((produce.priceBreakdown.farmerPayout / produce.price) * 100).toFixed(0)}%)
            </p>
          </div>

          {/* 3D Quick-Add Stepper */}
          <div>
            {quantityInCart === 0 ? (
              <button
                onClick={() => onAddToCart(produce)}
                className="px-4 py-2 bg-[#14281D] hover:bg-[#243F2F] text-white font-semibold text-xs rounded-full btn-3d-primary flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#95FB71]" />
                <span>Add</span>
              </button>
            ) : (
              <div className="flex items-center bg-[#F7F6F2] border border-[#16221A]/15 rounded-full px-1.5 py-1 shadow-inner">
                <button
                  onClick={() => onUpdateQuantity(produce.id, quantityInCart - 1)}
                  aria-label="Decrease quantity"
                  className="w-6 h-6 rounded-full bg-white text-[#14281D] hover:bg-[#EFEDE6] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-mono-nums font-bold text-xs text-[#16221A] px-2.5 min-w-[24px] text-center">
                  {quantityInCart}
                </span>
                <button
                  onClick={() => onUpdateQuantity(produce.id, quantityInCart + 1)}
                  aria-label="Increase quantity"
                  className="w-6 h-6 rounded-full bg-[#14281D] text-white hover:bg-[#243F2F] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                >
                  <Plus className="w-3 h-3 text-[#95FB71]" />
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
};
