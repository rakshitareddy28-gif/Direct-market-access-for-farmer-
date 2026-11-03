import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { CheckCircle2, ShieldCheck, ArrowRight, Truck, Award } from 'lucide-react';
import { ActiveDelivery } from '../types';

interface OrderSuccessModalProps {
  isOpen: boolean;
  delivery: ActiveDelivery | null;
  onTrackRoute: () => void;
  onViewCertificate: () => void;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  delivery,
  onTrackRoute,
  onViewCertificate,
  onClose
}) => {
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#4F9D2D', '#14281D', '#95FB71', '#8C5332'],
      });
    }
  }, [isOpen]);

  if (!isOpen || !delivery) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#0A1710]/60 backdrop-blur-sm transition-opacity"
      />

      {/* Surface */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md bg-[#F7F6F2] rounded-3xl shadow-2xl border border-[#16221A]/15 overflow-hidden z-10 p-7 space-y-6 text-center"
      >
        {/* Animated Check */}
        <div className="w-16 h-16 rounded-full bg-[#4F9D2D]/20 text-[#1D6D00] flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-10 h-10 text-[#1D6D00]" />
        </div>

        <div className="space-y-1">
          <span className="font-mono-nums text-xs text-[#6F7F75] uppercase tracking-wider block">
            Order #{delivery.orderId} Confirmed
          </span>
          <h2 className="font-claude-serif font-bold text-2xl sm:text-3xl text-[#16221A]">
            Harvest Dispatched!
          </h2>
          <p className="text-xs text-[#3E4F44] max-w-xs mx-auto font-claude-sans">
            Your crops are being packed in breathable cellulose crates and loaded onto electric cold van #14.
          </p>
        </div>

        {/* Payout Assurance Badge in Rupees */}
        <div className="p-4 bg-white rounded-2xl border border-[#16221A]/10 text-left space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#14281D] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#1D6D00]" />
              <span>Direct Payout Executed</span>
            </span>
            <span className="font-mono-nums font-bold text-base text-[#1D6D00]">
              ₹{delivery.farmerPayoutTotal.toLocaleString()}
            </span>
          </div>
          <p className="text-[11px] text-[#6F7F75]">
            Funds transferred straight to your local growers' ledger with zero broker deductions.
          </p>
        </div>

        {/* Action Buttons with 3D Tactile Styling */}
        <div className="space-y-2.5 pt-2">
          <button
            onClick={onTrackRoute}
            className="w-full py-3.5 bg-[#14281D] hover:bg-[#243F2F] text-white font-semibold text-xs sm:text-sm rounded-full btn-3d-primary flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Truck className="w-4 h-4 text-[#95FB71]" />
            <span>Track Live Cold-Chain Route</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#95FB71]" />
          </button>

          {/* Standout Feature: View Provenance Certificate */}
          <button
            onClick={onViewCertificate}
            className="w-full py-3 bg-white hover:bg-[#FAF9F5] text-[#16221A] font-semibold text-xs rounded-full border border-[#16221A]/15 btn-3d-white flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Award className="w-4 h-4 text-[#4F9D2D]" />
            <span>View Provenance Certificate</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 text-xs text-[#3E4F44] hover:text-[#16221A] font-medium transition-colors cursor-pointer"
          >
            Continue Browsing Catalog
          </button>
        </div>
      </motion.div>
    </div>
  );
};
