import React from 'react';
import { motion } from 'motion/react';
import { MapPin, ShieldCheck, ArrowRight, Sprout } from 'lucide-react';
import { Farmer, ProduceItem } from '../types';
import { GrowerVoiceDispatch } from './GrowerVoiceDispatch';

interface FarmerCardProps {
  farmer: Farmer;
  produceList: ProduceItem[];
  onSelectFarmer: (farmerId: string) => void;
  onSelectProduct: (produce: ProduceItem) => void;
  index?: number;
}

export const FarmerCard: React.FC<FarmerCardProps> = ({
  farmer,
  produceList,
  onSelectFarmer,
  onSelectProduct,
  index = 0,
}) => {
  const farmerProduce = produceList.filter((p) => p.farmerId === farmer.id);

  const voiceTranscripts: Record<string, { time: string; text: string }> = {
    'farmer-1': {
      time: '05:15 AM Dawn',
      text: 'Morning fog is clearing over the Russian River beds. The Romanesco florets tightened overnight and locked in sweet nutty sugars. Loading them into cold crates now.',
    },
    'farmer-2': {
      time: '04:45 AM Dawn',
      text: 'The dry-farmed San Marzano vines reached deep color today without water stress. Solid meaty walls, minimal seed pulp, perfect for slow roasting.',
    },
    'farmer-3': {
      time: '05:40 AM Dawn',
      text: 'Maritime fog chambers ran cool at 12°C. Plump golden chanterelles gathered with fresh apricot aromatics and silky texture intact.',
    },
    'farmer-4': {
      time: '05:00 AM Dawn',
      text: 'Gravenstein orchard air smells like wild cider. We gathered pink pearl apples with razor crisp snap alongside treatment-free comb honey.',
    },
    'farmer-5': {
      time: '04:15 AM Dawn',
      text: 'Slow granite milling running at 28°C this morning. The Einkorn wheat germ oils remain cold and biologically alive for your kitchen.',
    },
  };

  const currentVoice = voiceTranscripts[farmer.id] || {
    time: '05:00 AM Dawn',
    text: 'Harvest conditions were optimal this morning. Produce cut at peak cellular hydration and dispatched directly to the clean hub.',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-3xl border border-[#16221A]/10 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row"
    >
      {/* Left Editorial Split: Portrait & Terroir Overview */}
      <div className="md:w-5/12 relative aspect-[4/3] md:aspect-auto bg-[#EFEDE6] overflow-hidden">
        <img
          src={farmer.portraitUrl}
          alt={farmer.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

        {/* GPS Badge Top-Left */}
        <div className="absolute top-3.5 left-3.5 bg-black/60 backdrop-blur-sm text-white/95 px-2.5 py-1 rounded-lg text-[11px] font-mono-nums flex items-center gap-1.5 border border-white/10">
          <MapPin className="w-3 h-3 text-[#95FB71]" />
          <span>{farmer.gpsCoords.lat.toFixed(4)}° N, {Math.abs(farmer.gpsCoords.lng).toFixed(4)}° W</span>
        </div>

        {/* Payout Guarantee Top-Right */}
        <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-sm text-[#14281D] px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow-xs border border-[#4F9D2D]/30">
          <ShieldCheck className="w-3.5 h-3.5 text-[#1D6D00]" />
          <span>{farmer.payoutPercentage}% Direct Payout</span>
        </div>

        {/* Bottom Details on Image */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <p className="text-[11px] uppercase tracking-wider text-[#95FB71] font-mono-nums font-semibold">
            {farmer.region} · {farmer.distanceKm} km from hub
          </p>
          <h3 className="font-claude-serif font-bold text-xl md:text-2xl text-white">
            {farmer.name}
          </h3>
          <p className="text-xs text-white/80 line-clamp-1 font-claude-sans">{farmer.farmName}</p>
        </div>
      </div>

      {/* Right Content Section: Soil Metrics, Audio Dispatch & Active Harvests */}
      <div className="md:w-7/12 p-6 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            {farmer.certifications.map((cert) => (
              <span key={cert} className="text-[10px] font-semibold uppercase tracking-wide bg-[#F7F6F2] text-[#14281D] px-2.5 py-0.5 rounded-md border border-[#16221A]/10">
                {cert}
              </span>
            ))}
          </div>

          <p className="text-xs text-[#3E4F44] leading-relaxed line-clamp-2 mb-3.5 font-claude-sans">
            {farmer.bio}
          </p>

          {/* Standout Feature: Grower Dawn Audio Dispatch */}
          <GrowerVoiceDispatch
            farmerName={farmer.name.split('&')[0]}
            farmName={farmer.farmName}
            recordedTime={currentVoice.time}
            transcript={currentVoice.text}
          />

          {/* Soil Metrics Box */}
          <div className="p-3 bg-[#F7F6F2] rounded-2xl border border-[#16221A]/8 grid grid-cols-3 gap-2 text-center text-xs mt-3">
            <div className="border-r border-[#16221A]/8 pr-1">
              <span className="text-[10px] uppercase font-bold text-[#6F7F75] block">Soil Series</span>
              <span className="text-[#16221A] font-medium truncate block text-[11px] mt-0.5">
                {farmer.soilMetrics.soilType.split(' ')[0]} {farmer.soilMetrics.soilType.split(' ')[1] || ''}
              </span>
            </div>
            <div className="border-r border-[#16221A]/8 px-1">
              <span className="text-[10px] uppercase font-bold text-[#6F7F75] block">Organic Matter</span>
              <span className="font-mono-nums font-bold text-[#14281D] block mt-0.5">
                {farmer.soilMetrics.organicMatterPercentage}% OM
              </span>
            </div>
            <div className="pl-1">
              <span className="text-[10px] uppercase font-bold text-[#6F7F75] block">Soil pH</span>
              <span className="font-mono-nums font-bold text-[#16221A] block mt-0.5">
                {farmer.soilMetrics.phLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Current Dawn Harvest Batches in Rupees (₹) */}
        <div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-[#16221A] flex items-center gap-1">
              <Sprout className="w-3.5 h-3.5 text-[#4F9D2D]" />
              <span>Crops in Today’s Delivery:</span>
            </span>
            <span className="text-[11px] text-[#6F7F75]">
              {farmerProduce.length} varieties ready
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {farmerProduce.map((p) => (
              <button
                key={p.id}
                onClick={() => onSelectProduct(p)}
                className="text-left px-3 py-1.5 bg-white rounded-xl border border-[#16221A]/10 hover:border-[#14281D]/30 hover:bg-[#F7F6F2] transition-all text-xs flex items-center gap-2 cursor-pointer group shadow-2xs"
              >
                <span className="font-medium text-[#16221A] group-hover:text-[#14281D] truncate max-w-[140px]">
                  {p.name}
                </span>
                <span className="font-mono-nums text-[11px] text-[#1D6D00] font-bold">
                  ₹{p.price.toLocaleString()}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Farmer Full Story Button */}
        <div className="pt-3 border-t border-[#16221A]/8 flex items-center justify-between">
          <span className="text-xs text-[#8C5332] font-mono-nums">
            {farmer.acreage} Acres · {farmer.generationsFarming} Generations
          </span>
          <button
            onClick={() => onSelectFarmer(farmer.id)}
            className="text-xs font-semibold text-[#14281D] hover:text-[#0A1710] flex items-center gap-1 group cursor-pointer"
          >
            <span>View Full Terroir Story</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </motion.div>
  );
};
