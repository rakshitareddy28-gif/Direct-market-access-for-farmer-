import React from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle2, ThermometerSnowflake, Truck, MapPin, ShieldCheck, ArrowRight, RefreshCw, Home } from 'lucide-react';
import { ActiveDelivery } from '../types';

interface LiveRouteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  delivery: ActiveDelivery;
  onAdvanceStep: () => void;
  onResetSimulation: () => void;
}

export const LiveRouteDrawer: React.FC<LiveRouteDrawerProps> = ({
  isOpen,
  onClose,
  delivery,
  onAdvanceStep,
  onResetSimulation
}) => {
  if (!isOpen) return null;

  const currentStep = delivery.routeNodes[delivery.currentRouteNodeIndex];
  const isDelivered = delivery.currentRouteNodeIndex >= delivery.routeNodes.length - 1;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-end justify-center pointer-events-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#0A1710]/50 backdrop-blur-sm transition-opacity"
      />

      {/* Glassmorphic Slide-over Bottom Sheet with Framer Motion */}
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 240 }}
        className="relative w-full max-w-4xl max-h-[88vh] bg-white/90 backdrop-blur-[24px] saturate-[180%] rounded-t-3xl border-t border-x border-white/60 shadow-[0_24px_48px_-12px_rgba(20,40,29,0.22)] overflow-hidden flex flex-col z-10"
      >
        {/* Grab Handle */}
        <div className="pt-3 pb-1 flex justify-center">
          <div className="w-12 h-1.5 rounded-full bg-[#14281D]/20" />
        </div>

        {/* Sheet Header Bar */}
        <div className="px-6 py-3.5 border-b border-[#16221A]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#14281D] text-white flex items-center justify-center shadow-xs">
              <Truck className="w-4 h-4 text-[#95FB71]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-claude-serif font-bold text-base text-[#16221A]">
                  Farm Gate to Doorstep Live Route
                </span>
                <span className="font-mono-nums text-[11px] bg-[#95FB71]/30 text-[#14281D] font-bold px-2 py-0.5 rounded-full">
                  Order #{delivery.orderId}
                </span>
              </div>
              <p className="text-xs text-[#3E4F44]">
                Active zero-emission refrigerated link from Russian River Basin
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onResetSimulation}
              className="text-xs text-[#6F7F75] hover:text-[#16221A] flex items-center gap-1 px-3 py-1 rounded-full bg-[#F7F6F2] border border-[#16221A]/10 cursor-pointer"
              title="Reset simulation"
            >
              <RefreshCw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#F7F6F2] hover:bg-[#EFEDE6] text-[#3E4F44] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body with Rupees (₹) */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Real-time Telemetry Dashboard Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-white/90 rounded-2xl border border-[#16221A]/10 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-[#6F7F75] block">ETA Window</span>
              <span className="font-mono-nums font-bold text-xl text-[#14281D] block mt-0.5">
                {isDelivered ? 'Arrived!' : `${delivery.estimatedArrivalMinutes} min`}
              </span>
              <span className="text-[10px] text-[#4F9D2D] font-medium">
                {isDelivered ? 'Handed to patron' : 'Cold-drop guaranteed'}
              </span>
            </div>

            <div className="p-3.5 bg-white/90 rounded-2xl border border-[#16221A]/10 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-[#6F7F75] block">Cold-Chain Cargo</span>
              <span className="font-mono-nums font-bold text-xl text-[#1D6D00] flex items-center gap-1 mt-0.5">
                <ThermometerSnowflake className="w-4 h-4 text-[#4F9D2D]" />
                {delivery.temperatureSensorReading}°C
              </span>
              <span className="text-[10px] text-[#6F7F75]">Target: 2°C–6°C</span>
            </div>

            <div className="p-3.5 bg-white/90 rounded-2xl border border-[#16221A]/10 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-[#6F7F75] block">Direct Farmer Share</span>
              <span className="font-mono-nums font-bold text-xl text-[#8C5332] block mt-0.5">
                ₹{delivery.farmerPayoutTotal.toLocaleString()}
              </span>
              <span className="text-[10px] text-[#6F7F75]">88.5% of order</span>
            </div>

            <div className="p-3.5 bg-white/90 rounded-2xl border border-[#16221A]/10 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-[#6F7F75] block">Refrigerated Transit</span>
              <span className="font-semibold text-xs text-[#16221A] truncate block mt-1">
                {delivery.courierVehicle.split('#')[0]}
              </span>
              <span className="text-[10px] font-mono-nums text-[#6F7F75]">
                Vehicle #{delivery.courierVehicle.split('#')[1] || '14'}
              </span>
            </div>
          </div>

          {/* Interactive Route Journey Nodes with Animated Lime Pulse Nodes */}
          <div className="p-6 bg-white/90 rounded-3xl border border-[#16221A]/10 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-claude-serif font-bold text-base text-[#16221A] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#14281D]" />
                <span>Live Chain-of-Custody Log</span>
              </h3>
              <span className="text-xs font-mono-nums text-[#6F7F75]">
                RFID Calibrated & Monitored
              </span>
            </div>

            {/* Vertical Flow with Animated Green Pulse Nodes */}
            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#16221A]/15">
              {delivery.routeNodes.map((node, index) => {
                const isCompleted = index < delivery.currentRouteNodeIndex;
                const isCurrent = index === delivery.currentRouteNodeIndex;

                return (
                  <div key={node.id} className="relative">
                    {/* Node Dot / Marker */}
                    <div className="absolute -left-6 top-1">
                      {isCompleted ? (
                        <div className="w-5 h-5 rounded-full bg-[#14281D] text-white flex items-center justify-center ring-4 ring-white">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#95FB71]" />
                        </div>
                      ) : isCurrent ? (
                        <div className="relative w-5 h-5">
                          <span className="absolute inset-0 rounded-full bg-[#4F9D2D] animate-ping opacity-75" />
                          <div className="relative w-5 h-5 rounded-full bg-[#4F9D2D] ring-4 ring-white shadow-xs flex items-center justify-center">
                            <span className="w-2 h-2 rounded-full bg-[#0A1710]" />
                          </div>
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-[#F7F6F2] border-2 border-[#C8C5B9] ring-4 ring-white" />
                      )}
                    </div>

                    {/* Node Content Card */}
                    <div
                      className={`p-4 rounded-2xl border transition-all ${
                        isCurrent
                          ? 'bg-[#14281D]/5 border-[#4F9D2D] shadow-xs'
                          : isCompleted
                          ? 'bg-white border-[#16221A]/10 opacity-90'
                          : 'bg-[#F7F6F2]/70 border-dashed border-[#C8C5B9] opacity-60'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-claude-serif font-bold text-sm text-[#16221A]">
                            {node.stepName}
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] bg-[#4F9D2D] text-white font-bold uppercase px-2 py-0.5 rounded-full">
                              In Progress
                            </span>
                          )}
                        </div>

                        <span className="font-mono-nums text-xs text-[#6F7F75]">
                          {node.timestamp}
                        </span>
                      </div>

                      <div className="text-xs text-[#3E4F44] flex items-center gap-1.5 mb-1">
                        <MapPin className="w-3 h-3 text-[#8C5332]" />
                        <span>{node.location}</span>
                        {node.temperatureCelsius && (
                          <>
                            <span className="text-[#C8C5B9]">·</span>
                            <span className="font-mono-nums text-[#1D6D00] font-medium">
                              {node.temperatureCelsius}°C
                            </span>
                          </>
                        )}
                      </div>

                      <p className="text-xs text-[#6F7F75] leading-relaxed">
                        {node.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Hand-off Info & 3D Simulation Button */}
          <div className="p-4 bg-[#F7F6F2] rounded-2xl border border-[#16221A]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white border border-[#16221A]/15 flex items-center justify-center text-[#14281D]">
                <Home className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-[#16221A] block">Drop-off Destination</span>
                <span className="text-[#6F7F75]">{delivery.destinationAddress}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!isDelivered ? (
                <button
                  onClick={onAdvanceStep}
                  className="px-5 py-2.5 bg-[#14281D] hover:bg-[#243F2F] text-white rounded-full font-semibold text-xs btn-3d-primary flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Simulate Next Transit Step</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#95FB71]" />
                </button>
              ) : (
                <div className="px-4 py-2 bg-[#4F9D2D]/20 text-[#14281D] font-bold rounded-full flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1D6D00]" />
                  <span>Harvest Successfully Delivered</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
