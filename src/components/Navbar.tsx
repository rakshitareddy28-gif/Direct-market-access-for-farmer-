import React, { useEffect, useState } from 'react';
import { ShoppingBag, Sprout, User, MessageSquare, PackageCheck } from 'lucide-react';
import { auth } from '../firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

interface NavbarProps {
  activeTab: 'catalog' | 'crates' | 'farmers' | 'map' | 'ledger' | 'chat' | 'login';
  setActiveTab: (tab: 'catalog' | 'crates' | 'farmers' | 'map' | 'ledger' | 'chat' | 'login') => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenLiveRoute: () => void;
  hasActiveDelivery: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenLiveRoute,
  hasActiveDelivery
}) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#F7F6F2]/90 backdrop-blur-md border-b border-[#16221A]/10 px-4 md:px-8 py-3.5 transition-all">
      <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-6">
        
        {/* Zone 1: Brand Wordmark (Stillfield Estate & Direct Market Access) */}
        <button
          onClick={() => setActiveTab('catalog')}
          className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0 focus:outline-none cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-[#14281D] text-white flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs">
            <Sprout className="w-4 h-4 text-[#95FB71]" />
          </div>
          <div>
            <span className="font-claude-serif font-bold text-lg md:text-xl tracking-tight text-[#16221A] block leading-none">
              Stillfield
            </span>
            <span className="text-[10px] font-mono-nums text-[#6F7F75] tracking-wider uppercase">
              Direct Farmer Access
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-[#3E4F44]">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeTab === 'catalog'
                ? 'text-[#14281D] font-bold border-b-2 border-[#14281D]'
                : 'hover:text-[#14281D]'
            }`}
          >
            Fresh Harvest
          </button>
          <button
            onClick={() => setActiveTab('crates')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'crates'
                ? 'text-[#14281D] font-bold border-b-2 border-[#14281D]'
                : 'hover:text-[#14281D]'
            }`}
          >
            <PackageCheck className="w-3.5 h-3.5 text-[#4F9D2D]" />
            <span>Curated Crates</span>
          </button>
          <button
            onClick={() => setActiveTab('farmers')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeTab === 'farmers'
                ? 'text-[#14281D] font-bold border-b-2 border-[#14281D]'
                : 'hover:text-[#14281D]'
            }`}
          >
            Partner Farms
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeTab === 'map'
                ? 'text-[#14281D] font-bold border-b-2 border-[#14281D]'
                : 'hover:text-[#14281D]'
            }`}
          >
            Terroir Map
          </button>
          <button
            onClick={() => setActiveTab('ledger')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeTab === 'ledger'
                ? 'text-[#14281D] font-bold border-b-2 border-[#14281D]'
                : 'hover:text-[#14281D]'
            }`}
          >
            Fair Price Ledger
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'chat'
                ? 'text-[#14281D] font-bold border-b-2 border-[#14281D]'
                : 'hover:text-[#14281D]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#4F9D2D]" />
            <span>AI Agronomist</span>
          </button>
          {hasActiveDelivery && (
            <button
              onClick={onOpenLiveRoute}
              className="whitespace-nowrap shrink-0 transition-colors py-1 text-[#1D6D00] font-bold hover:text-[#14281D] flex items-center gap-1.5 cursor-pointer"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-[#4F9D2D] animate-pulse" />
              Live Route
            </button>
          )}
        </nav>

        {/* Zone 3: Actions (Login & Cart) */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Sign In / Patron Profile 3D Button */}
          <button
            onClick={() => setActiveTab('login')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              currentUser
                ? 'bg-[#14281D]/5 text-[#14281D] border border-[#14281D]/15 hover:bg-[#14281D]/10'
                : 'bg-white hover:bg-[#F7F6F2] text-[#16221A] border border-[#16221A]/20 btn-3d-white'
            }`}
          >
            {currentUser?.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt="Patron"
                className="w-5 h-5 rounded-full object-cover"
              />
            ) : (
              <User className="w-3.5 h-3.5 text-[#14281D]" />
            )}
            <span className="hidden sm:inline">
              {currentUser ? currentUser.displayName?.split(' ')[0] || 'Account' : 'Sign In'}
            </span>
          </button>

          {/* Cart 3D Button with Rupee price */}
          <button
            onClick={onOpenCart}
            aria-label="View Harvest Basket"
            className="flex items-center gap-2 px-4 py-2 bg-[#14281D] hover:bg-[#243F2F] text-white rounded-full transition-all text-xs font-semibold btn-3d-primary cursor-pointer whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#95FB71]" />
            <span className="hidden sm:inline">Basket</span>
            <span className="font-mono-nums bg-[#95FB71] text-[#0A1710] text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-5 text-center">
              {cartCount}
            </span>
            {cartCount > 0 && (
              <span className="font-mono-nums font-semibold border-l border-white/20 pl-2">
                ₹{cartTotal.toLocaleString()}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
