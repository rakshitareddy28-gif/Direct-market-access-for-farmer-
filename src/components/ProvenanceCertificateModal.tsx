import React from 'react';
import { motion } from 'motion/react';
import { X, ShieldCheck, QrCode, Award, ThermometerSnowflake, MapPin, Printer, Share2 } from 'lucide-react';
import { ActiveDelivery } from '../types';

interface ProvenanceCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  delivery: ActiveDelivery | null;
}

export const ProvenanceCertificateModal: React.FC<ProvenanceCertificateModalProps> = ({
  isOpen,
  onClose,
  delivery,
}) => {
  if (!isOpen || !delivery) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Stillfield Harvest Provenance Certificate #${delivery.orderId}`,
        text: `Verified 88.5% direct farmer payout and 4.5°C cold chain dispatch from Stillfield Estate.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Certificate link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#0A1710]/70 backdrop-blur-md transition-opacity"
      />

      {/* Certificate Surface */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl bg-[#FAF9F5] rounded-3xl shadow-2xl border-4 border-[#14281D] overflow-hidden z-10 p-6 sm:p-10 space-y-6 max-h-[92vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#EFEDE6] hover:bg-[#E3E0D4] text-[#16221A] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Certificate Header */}
        <div className="text-center space-y-2 border-b-2 border-[#14281D]/20 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14281D]/10 text-[#14281D] text-[11px] font-bold font-mono-nums uppercase tracking-widest">
            <Award className="w-3.5 h-3.5 text-[#4F9D2D]" />
            Official Registry of Provenance
          </div>
          <h2 className="font-claude-serif font-bold text-3xl sm:text-4xl text-[#16221A] tracking-tight">
            Stillfield Harvest Certificate
          </h2>
          <p className="text-xs text-[#6F7F75] font-mono-nums">
            Batch Authentication Code: STF-ROC-{delivery.orderId}
          </p>
        </div>

        {/* Verification Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-white rounded-xl border border-[#16221A]/10 text-center">
            <span className="text-[10px] text-[#6F7F75] uppercase font-bold block">Grower Share</span>
            <span className="font-mono-nums font-bold text-base text-[#1D6D00] block mt-0.5">88.5% Direct</span>
            <span className="text-[10px] text-[#4F9D2D]">Instant Settlement</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-[#16221A]/10 text-center">
            <span className="text-[10px] text-[#6F7F75] uppercase font-bold block">Cold Chain Integrity</span>
            <span className="font-mono-nums font-bold text-base text-[#14281D] block mt-0.5">
              {delivery.temperatureSensorReading}°C Target
            </span>
            <span className="text-[10px] text-[#6F7F75]">Active Refrigeration</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-[#16221A]/10 text-center">
            <span className="text-[10px] text-[#6F7F75] uppercase font-bold block">Chemical Residue</span>
            <span className="font-mono-nums font-bold text-base text-[#14281D] block mt-0.5">0.00 PPM</span>
            <span className="text-[10px] text-[#4F9D2D]">Pesticide Zero</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-[#16221A]/10 text-center">
            <span className="text-[10px] text-[#6F7F75] uppercase font-bold block">Transport Mode</span>
            <span className="font-semibold text-xs text-[#14281D] block mt-1">Zero-Emission EV</span>
            <span className="text-[10px] text-[#6F7F75]">Rivian Commercial #14</span>
          </div>
        </div>

        {/* Direct Financial Ledger Proof */}
        <div className="p-5 bg-white rounded-2xl border border-[#16221A]/12 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-claude-serif font-bold text-sm text-[#16221A] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#1D6D00]" />
              <span>Direct Bank Settlement Attestation</span>
            </span>
            <span className="text-xs font-mono-nums text-[#6F7F75]">
              Disbursed on Cut Handover
            </span>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between py-1 border-b border-[#16221A]/6">
              <span className="text-[#3E4F44]">Net Direct Grower Payout (Elena, Mateo & Alejandro)</span>
              <span className="font-mono-nums font-bold text-[#1D6D00]">₹{delivery.farmerPayoutTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#16221A]/6">
              <span className="text-[#3E4F44]">Active Refrigerated Electric Transport</span>
              <span className="font-mono-nums text-[#6F7F75]">₹180</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#16221A]/6">
              <span className="text-[#3E4F44]">Platform Infrastructure & Lab Assay</span>
              <span className="font-mono-nums text-[#6F7F75]">₹60</span>
            </div>
            <div className="flex justify-between pt-1.5 font-bold text-[#16221A] text-sm font-claude-serif">
              <span>Total Patron Payment</span>
              <span className="font-mono-nums">₹{delivery.totalPaid.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Origin Signature & QR Attestation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#16221A]/10 text-xs text-[#6F7F75]">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-[#14281D] rounded-xl flex items-center justify-center text-white shrink-0">
              <QrCode className="w-10 h-10 text-[#95FB71]" />
            </div>
            <div>
              <p className="font-semibold text-[#16221A]">Stillfield Regional Trust Registry</p>
              <p className="text-[11px]">Cryptographic proof of soil cut and cold transit.</p>
              <p className="text-[10px] text-[#4F9D2D] font-mono-nums mt-0.5">Status: Certified & Bound</p>
            </div>
          </div>

          <div className="text-right sm:border-l border-[#16221A]/10 sm:pl-6">
            <span className="text-[10px] uppercase font-bold text-[#6F7F75] block">Authorized Signature</span>
            <span className="font-claude-serif italic font-bold text-base text-[#14281D] block mt-0.5">
              Mateo Vance & Dr. Arthur Chen
            </span>
            <span className="text-[10px] text-[#6F7F75]">Head of Regenerative Agronomy</span>
          </div>
        </div>

        {/* Print / Share Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={handleShare}
            className="px-4 py-2 rounded-full bg-white hover:bg-[#EFEDE6] text-[#16221A] text-xs font-semibold border border-[#16221A]/15 btn-3d-white flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Certificate</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-5 py-2 rounded-full bg-[#14281D] hover:bg-[#243F2F] text-white text-xs font-semibold btn-3d-primary flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#95FB71]" />
            <span>Print Official Receipt</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
