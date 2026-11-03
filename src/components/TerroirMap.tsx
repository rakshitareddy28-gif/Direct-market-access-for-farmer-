import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, ThermometerSnowflake, Navigation, Sprout, ArrowRight } from 'lucide-react';
import { Farmer, ProduceItem } from '../types';

interface TerroirMapProps {
  farmers: Farmer[];
  produceList: ProduceItem[];
  onSelectFarmer: (farmerId: string) => void;
  onSelectProduct: (produce: ProduceItem) => void;
}

export const TerroirMap: React.FC<TerroirMapProps> = ({
  farmers,
  produceList,
  onSelectFarmer,
  onSelectProduct
}) => {
  const [selectedFarmerId, setSelectedFarmerId] = useState<string>(farmers[0]?.id || '');

  const activeFarmer = farmers.find((f) => f.id === selectedFarmerId) || farmers[0];
  const activeProduce = produceList.filter((p) => p.farmerId === activeFarmer?.id);

  // Approximate relative 2D positions for SVG representation
  const hubPosition = { x: 50, y: 58 };

  const farmMapCoords: Record<string, { x: number; y: number }> = {
    'farmer-1': { x: 32, y: 34 }, // Sebastopol (NW)
    'farmer-2': { x: 74, y: 30 }, // Winters (NE)
    'farmer-3': { x: 26, y: 55 }, // Point Reyes (W)
    'farmer-4': { x: 38, y: 18 }, // Healdsburg (North)
    'farmer-5': { x: 44, y: 46 }  // Petaluma (Mid North)
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="py-10 md:py-14 max-w-[1360px] mx-auto px-4 md:px-8 space-y-8"
    >
      {/* Header */}
      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14281D]/5 text-[#14281D] text-xs font-semibold">
          <Navigation className="w-3.5 h-3.5 text-[#4F9D2D]" />
          <span>Regional Agronomic Geography</span>
        </div>
        <h2 className="font-claude-serif text-3xl sm:text-4xl text-[#16221A] tracking-tight">
          Stillfield Terroir Map & Cold-Chain Network
        </h2>
        <p className="text-sm md:text-base text-[#3E4F44] font-claude-sans">
          Every partner estate is located within a 35-kilometer radius of our central clean electric rapid transit hub, ensuring produce arrives crisp within hours of dawn cut.
        </p>
      </div>

      {/* Main Grid: Interactive Map + Farmer Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Interactive SVG Map Surface */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-[#16221A]/10 overflow-hidden shadow-sm relative">
          
          {/* Map Top Bar */}
          <div className="p-4 bg-[#F7F6F2] border-b border-[#16221A]/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 font-mono-nums font-semibold text-[#14281D]">
              <span className="w-2 h-2 rounded-full bg-[#4F9D2D] animate-ping" />
              <span>5 Active Micro-Terroirs Online</span>
            </div>
            <div className="flex items-center gap-4 text-[#6F7F75]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#14281D]" /> Partner Farm
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4F9D2D]" /> Central Cold Depot
              </span>
            </div>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative w-full aspect-[16/10] bg-[#F7F6F2] p-4 select-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(20, 40, 29, 0.05)" strokeWidth="0.5" />
                </pattern>
              </defs>

              <rect width="100" height="100" fill="url(#grid)" />

              {/* Coastal Pacific Ocean Representation */}
              <path
                d="M 0 0 Q 15 40 5 100 L 0 100 Z"
                fill="rgba(20, 40, 29, 0.06)"
              />
              <text x="3" y="50" fill="#6F7F75" fontSize="2.5" fontFamily="Plus Jakarta Sans" transform="rotate(-90 3,50)">
                COASTAL PACIFIC MARITIME FOG
              </text>

              {/* Transit Route Lines from each farm to Hub */}
              {farmers.map((farmer) => {
                const pos = farmMapCoords[farmer.id] || { x: 50, y: 50 };
                const isSelected = farmer.id === selectedFarmerId;

                return (
                  <g key={`route-${farmer.id}`}>
                    <line
                      x1={pos.x}
                      y1={pos.y}
                      x2={hubPosition.x}
                      y2={hubPosition.y}
                      stroke={isSelected ? '#4F9D2D' : 'rgba(20, 40, 29, 0.2)'}
                      strokeWidth={isSelected ? '0.9' : '0.4'}
                      strokeDasharray={isSelected ? '1.5 1' : '1 1'}
                      className={isSelected ? 'animate-pulse' : ''}
                    />
                  </g>
                );
              })}

              {/* Central Distribution Hub */}
              <circle
                cx={hubPosition.x}
                cy={hubPosition.y}
                r="3.2"
                fill="#14281D"
                stroke="#95FB71"
                strokeWidth="1"
              />
              <circle
                cx={hubPosition.x}
                cy={hubPosition.y}
                r="6"
                fill="none"
                stroke="#4F9D2D"
                strokeWidth="0.3"
                opacity="0.6"
              />
              <text
                x={hubPosition.x}
                y={hubPosition.y + 6}
                textAnchor="middle"
                fill="#14281D"
                fontSize="2.8"
                fontWeight="700"
                fontFamily="Newsreader"
              >
                Stillfield Central Depot (Node 01)
              </text>

              {/* Farm Nodes */}
              {farmers.map((farmer) => {
                const pos = farmMapCoords[farmer.id] || { x: 50, y: 50 };
                const isSelected = farmer.id === selectedFarmerId;

                return (
                  <g
                    key={`node-${farmer.id}`}
                    onClick={() => setSelectedFarmerId(farmer.id)}
                    className="cursor-pointer transition-transform"
                  >
                    {isSelected && (
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="5.5"
                        fill="rgba(79, 157, 45, 0.25)"
                        className="animate-ping"
                      />
                    )}

                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isSelected ? '3.5' : '2.5'}
                      fill={isSelected ? '#4F9D2D' : '#14281D'}
                      stroke="#FFFFFF"
                      strokeWidth="0.8"
                    />

                    <text
                      x={pos.x}
                      y={pos.y - 4}
                      textAnchor="middle"
                      fill={isSelected ? '#0A1710' : '#3E4F44'}
                      fontSize={isSelected ? '2.8' : '2.2'}
                      fontWeight={isSelected ? '700' : '500'}
                      fontFamily="Newsreader"
                    >
                      {farmer.name.split('&')[0]}
                    </text>
                    <text
                      x={pos.x}
                      y={pos.y + 4.5}
                      textAnchor="middle"
                      fill="#8C5332"
                      fontSize="1.9"
                      fontFamily="Space Mono"
                    >
                      {farmer.distanceKm} km
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Bottom Floating Hub Telemetry Overlay */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#16221A]/10 shadow-xs text-xs font-mono-nums flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-[#14281D]">
                <ThermometerSnowflake className="w-3.5 h-3.5 text-[#4F9D2D]" />
                <span>Depot Chiller: 4.2°C</span>
              </span>
              <span className="text-[#C8C5B9]">·</span>
              <span className="text-[#3E4F44]">Avg. Dispatch: 18 min</span>
            </div>
          </div>

          {/* Quick Farm Switcher Strip */}
          <div className="p-3.5 bg-[#F7F6F2] border-t border-[#16221A]/10 flex items-center gap-2 overflow-x-auto">
            {farmers.map((farmer) => (
              <button
                key={farmer.id}
                onClick={() => setSelectedFarmerId(farmer.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedFarmerId === farmer.id
                    ? 'bg-[#14281D] text-white shadow-xs'
                    : 'bg-white text-[#3E4F44] hover:bg-[#EFEDE6] border border-[#16221A]/10'
                }`}
              >
                {farmer.name.split('&')[0]} ({farmer.distanceKm} km)
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Selected Farm Inspector with Rupee prices */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-[#16221A]/10 p-6 space-y-4 shadow-sm">
          <div className="flex items-start justify-between border-b border-[#16221A]/10 pb-4">
            <div>
              <span className="text-xs uppercase font-bold text-[#8C5332] font-mono-nums tracking-wider">
                {activeFarmer.region}
              </span>
              <h3 className="font-claude-serif font-bold text-2xl text-[#16221A]">
                {activeFarmer.name}
              </h3>
              <p className="text-xs text-[#3E4F44] font-claude-sans">{activeFarmer.farmName}</p>
            </div>
            
            <img
              src={activeFarmer.portraitUrl}
              alt={activeFarmer.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-[#8C5332]/30 shadow-xs"
            />
          </div>

          {/* Terroir & Distance telemetry */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-[#F7F6F2] rounded-xl border border-[#16221A]/5">
              <span className="text-[#6F7F75] block text-[11px]">Distance to Depot</span>
              <span className="font-mono-nums font-bold text-[#14281D] text-base">{activeFarmer.distanceKm} km</span>
            </div>
            <div className="p-3 bg-[#F7F6F2] rounded-xl border border-[#16221A]/5">
              <span className="text-[#6F7F75] block text-[11px]">Soil pH</span>
              <span className="font-mono-nums font-bold text-[#14281D] text-base">{activeFarmer.soilMetrics.phLevel}</span>
            </div>
          </div>

          <p className="text-xs text-[#3E4F44] leading-relaxed font-claude-sans">
            {activeFarmer.bio}
          </p>

          {/* Harvest Crops Available in Rupees */}
          <div>
            <h4 className="text-xs uppercase font-bold text-[#6F7F75] tracking-wider mb-2.5 flex items-center gap-1.5">
              <Sprout className="w-3.5 h-3.5 text-[#4F9D2D]" />
              <span>Crops from this plot:</span>
            </h4>

            <div className="space-y-2">
              {activeProduce.map((p) => (
                <div
                  key={p.id}
                  onClick={() => onSelectProduct(p)}
                  className="p-2.5 bg-[#F7F6F2] hover:bg-[#EFEDE6] rounded-xl border border-[#16221A]/8 flex items-center justify-between cursor-pointer group transition-colors"
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-11 h-11 rounded-lg object-cover bg-white shrink-0"
                    />
                    <div className="truncate">
                      <p className="text-xs font-semibold text-[#16221A] group-hover:text-[#14281D] truncate">
                        {p.name}
                      </p>
                      <span className="text-[10px] text-[#4F9D2D] font-bold">
                        {p.harvestTimeAgo}
                      </span>
                    </div>
                  </div>

                  <span className="font-mono-nums font-bold text-xs text-[#16221A] shrink-0">
                    ₹{p.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onSelectFarmer(activeFarmer.id)}
            className="w-full py-3 bg-[#F7F6F2] hover:bg-[#14281D] hover:text-white text-[#14281D] font-semibold text-xs rounded-2xl border border-[#16221A]/15 btn-3d-white flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>View Farmer Profile & Soil Data</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
