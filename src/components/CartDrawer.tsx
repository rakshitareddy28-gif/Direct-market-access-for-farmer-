import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShieldCheck, Clock, ArrowRight, MapPin, Heart } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: (address: string, slot: string, tip: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const [address, setAddress] = useState('742 Heritage Lane, East Estate Hub');
  const [selectedSlot, setSelectedSlot] = useState<'express' | 'morning'>('express');
  const [growerTip, setGrowerTip] = useState<number>(200);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.produce.price * item.quantity, 0);
  const farmerPayoutTotal = cart.reduce(
    (sum, item) => sum + item.produce.priceBreakdown.farmerPayout * item.quantity,
    0
  );
  const coldLogisticsFee = selectedSlot === 'express' ? 180 : 90;
  const platformFee = 60;
  const finalTotal = subtotal + coldLogisticsFee + platformFee + growerTip;

  const uniqueFarmers = Array.from(new Set(cart.map((i) => i.produce.farmerName)));

  const handlePlaceOrder = () => {
    onCheckout(address, selectedSlot === 'express' ? '15-Min Express Cold Van' : 'Morning Fresh Crate', growerTip);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#0A1710]/50 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          className="w-screen max-w-md bg-[#F7F6F2] shadow-2xl border-l border-[#16221A]/15 flex flex-col"
        >
          {/* Header */}
          <div className="p-4 bg-white border-b border-[#16221A]/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-claude-serif font-bold text-xl text-[#16221A]">Harvest Basket</h2>
              <span className="font-mono-nums text-xs bg-[#14281D]/10 text-[#14281D] font-semibold px-2.5 py-0.5 rounded-full">
                {cart.reduce((sum, i) => sum + i.quantity, 0)} items
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#F7F6F2] hover:bg-[#EFEDE6] text-[#3E4F44] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#14281D]/5 flex items-center justify-center mb-4 text-[#14281D]">
                <Clock className="w-8 h-8 text-[#6F7F75]" />
              </div>
              <h3 className="font-claude-serif font-semibold text-xl text-[#16221A] mb-1">
                Your basket is empty
              </h3>
              <p className="text-xs text-[#3E4F44] max-w-xs mb-6">
                Explore today’s dawn-harvested heirloom produce directly from regional estate growers.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#14281D] text-white rounded-full text-xs font-semibold btn-3d-primary cursor-pointer"
              >
                Browse Fresh Harvest
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Direct Grower Payout Banner with Rupees (₹) */}
              <div className="p-4 bg-white rounded-2xl border border-[#4F9D2D]/30 shadow-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#14281D] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#1D6D00]" />
                    <span>Direct Grower Payout Guarantee</span>
                  </span>
                  <span className="font-mono-nums font-bold text-xs text-[#1D6D00]">
                    ₹{(farmerPayoutTotal + growerTip).toLocaleString()} Direct
                  </span>
                </div>
                <p className="text-[11px] text-[#3E4F44]">
                  100% of this amount goes straight to {uniqueFarmers.join(', ')} upon batch dispatch.
                </p>
              </div>

              {/* Items List in Rupees */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.produce.id}
                    className="p-3.5 bg-white rounded-2xl border border-[#16221A]/10 flex items-center justify-between gap-3 shadow-xs"
                  >
                    <img
                      src={item.produce.imageUrl}
                      alt={item.produce.name}
                      className="w-14 h-14 rounded-xl object-cover bg-[#EFEDE6] shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 text-[10px] text-[#4F9D2D] font-bold uppercase tracking-wider">
                        <span>{item.produce.harvestTimeAgo}</span>
                      </div>
                      <h4 className="font-claude-serif font-bold text-sm text-[#16221A] truncate">
                        {item.produce.name}
                      </h4>
                      <p className="text-[11px] text-[#8C5332] truncate">
                        {item.produce.farmerName}
                      </p>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="font-mono-nums font-bold text-xs text-[#16221A]">
                          ₹{(item.produce.price * item.quantity).toLocaleString()}
                        </span>
                        <span className="text-[10px] text-[#6F7F75]">
                          (₹{item.produce.price.toLocaleString()} each)
                        </span>
                      </div>
                    </div>

                    {/* Stepper + Delete */}
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <button
                        onClick={() => onRemoveItem(item.produce.id)}
                        className="text-[#6F7F75] hover:text-[#BA1A1A] p-0.5 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center bg-[#F7F6F2] border border-[#16221A]/20 rounded-full px-1 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.produce.id, item.quantity - 1)}
                          className="w-5 h-5 rounded-full bg-white text-[#14281D] flex items-center justify-center cursor-pointer shadow-xs"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="font-mono-nums font-bold text-xs px-2 min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.produce.id, item.quantity + 1)}
                          className="w-5 h-5 rounded-full bg-[#14281D] text-white flex items-center justify-center cursor-pointer shadow-xs"
                        >
                          <Plus className="w-2.5 h-2.5 text-[#95FB71]" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Speed Slot */}
              <div className="p-4 bg-white rounded-2xl border border-[#16221A]/10 space-y-2">
                <span className="text-xs uppercase font-bold text-[#6F7F75] block tracking-wide">
                  Cold-Chain Transit Slot
                </span>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setSelectedSlot('express')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedSlot === 'express'
                        ? 'border-[#14281D] bg-[#14281D]/5 font-semibold text-[#14281D]'
                        : 'border-[#16221A]/10 bg-[#F7F6F2] text-[#3E4F44]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <span className="w-2 h-2 rounded-full bg-[#4F9D2D]" />
                      <span>Express Cold Van</span>
                    </div>
                    <span className="text-[11px] text-[#6F7F75] block mt-0.5">15–25 min direct (₹180)</span>
                  </button>

                  <button
                    onClick={() => setSelectedSlot('morning')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedSlot === 'morning'
                        ? 'border-[#14281D] bg-[#14281D]/5 font-semibold text-[#14281D]'
                        : 'border-[#16221A]/10 bg-[#F7F6F2] text-[#3E4F44]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <Clock className="w-3.5 h-3.5 text-[#8C5332]" />
                      <span>Morning Crate</span>
                    </div>
                    <span className="text-[11px] text-[#6F7F75] block mt-0.5">Tomorrow 7:30 AM (₹90)</span>
                  </button>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="p-4 bg-white rounded-2xl border border-[#16221A]/10 space-y-1.5">
                <label className="text-xs uppercase font-bold text-[#6F7F75] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#14281D]" />
                  <span>Delivery Destination</span>
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl bg-[#F7F6F2] border border-[#16221A]/15 text-[#16221A] focus:outline-none focus:ring-2 focus:ring-[#14281D]/20"
                />
              </div>

              {/* Direct Grower Micro-Grant Tip in Rupees */}
              <div className="p-4 bg-white rounded-2xl border border-[#16221A]/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold text-[#8C5332] flex items-center gap-1">
                    <Heart className="w-3 h-3 text-[#8C5332]" />
                    <span>Grower Micro-Grant Tip</span>
                  </span>
                  <span className="text-[11px] text-[#6F7F75]">100% to farmers</span>
                </div>
                <div className="flex gap-2">
                  {[0, 100, 200, 500].map((tipVal) => (
                    <button
                      key={tipVal}
                      onClick={() => setGrowerTip(tipVal)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-mono-nums font-semibold transition-all cursor-pointer ${
                        growerTip === tipVal
                          ? 'bg-[#8C5332] text-white shadow-xs'
                          : 'bg-[#F7F6F2] text-[#3E4F44] border border-[#16221A]/10 hover:bg-[#EFEDE6]'
                      }`}
                    >
                      {tipVal === 0 ? 'None' : `₹${tipVal}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Footer Checkout Summary in Rupees with 3D Button */}
          {cart.length > 0 && (
            <div className="p-4 bg-white border-t border-[#16221A]/10 space-y-3">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-[#3E4F44]">
                  <span>Harvest Subtotal</span>
                  <span className="font-mono-nums">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#3E4F44]">
                  <span>Refrigerated Electric Van</span>
                  <span className="font-mono-nums">₹{coldLogisticsFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#3E4F44]">
                  <span>Stillfield Platform Maintenance</span>
                  <span className="font-mono-nums">₹{platformFee.toLocaleString()}</span>
                </div>
                {growerTip > 0 && (
                  <div className="flex justify-between text-[#8C5332] font-medium">
                    <span>Grower Micro-Grant</span>
                    <span className="font-mono-nums">+₹{growerTip.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#16221A] font-claude-serif font-bold text-base pt-2 border-t border-[#16221A]/10">
                  <span>Total Order</span>
                  <span className="font-mono-nums font-bold">₹{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full py-3.5 bg-[#14281D] hover:bg-[#243F2F] text-white font-semibold text-xs sm:text-sm rounded-full btn-3d-primary flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Confirm Direct Harvest Dispatch</span>
                <ArrowRight className="w-4 h-4 text-[#95FB71]" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
