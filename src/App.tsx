import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, Sparkles, Sprout, ArrowRight, Check, MessageSquare, Award } from 'lucide-react';
import { FARMERS, PRODUCE_ITEMS, INITIAL_ACTIVE_DELIVERY } from './data/mockData';
import { ProduceItem, Farmer, CartItem, ActiveDelivery } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { FarmerCard } from './components/FarmerCard';
import { FarmerDetailModal } from './components/FarmerDetailModal';
import { FairPriceLedger } from './components/FairPriceLedger';
import { TerroirMap } from './components/TerroirMap';
import { CartDrawer } from './components/CartDrawer';
import { LiveRouteDrawer } from './components/LiveRouteDrawer';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { AgronomistChat } from './components/AgronomistChat';
import { LoginPage } from './components/LoginPage';
import { CuratedCrates, CuratedCrate } from './components/CuratedCrates';
import { ProvenanceCertificateModal } from './components/ProvenanceCertificateModal';
import { auth, db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function App() {
  // Navigation & View state
  const [activeTab, setActiveTab] = useState<'catalog' | 'crates' | 'farmers' | 'map' | 'ledger' | 'chat' | 'login'>('catalog');

  // Search & Catalog Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [maxDistance, setMaxDistance] = useState<number>(35); // km

  // Selected modals
  const [selectedProduct, setSelectedProduct] = useState<ProduceItem | null>(null);
  const [selectedFarmerId, setSelectedFarmerId] = useState<string | null>(null);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  // Cart & Drawers
  const [cart, setCart] = useState<CartItem[]>(() => [
    { produce: PRODUCE_ITEMS[0], quantity: 1 },
    { produce: PRODUCE_ITEMS[2], quantity: 1 }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLiveRouteOpen, setIsLiveRouteOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);

  // Active delivery state
  const [activeDelivery, setActiveDelivery] = useState<ActiveDelivery>(INITIAL_ACTIVE_DELIVERY);
  const [hasActiveDelivery, setHasActiveDelivery] = useState(true);

  // Notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Cart helpers
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.produce.price * item.quantity, 0),
    [cart]
  );
  const cartQuantities = useMemo(() => {
    const map: Record<string, number> = {};
    cart.forEach((item) => {
      map[item.produce.id] = item.quantity;
    });
    return map;
  }, [cart]);

  // Curated Crate Bundles (Standout Feature)
  const curatedCrates: CuratedCrate[] = useMemo(() => [
    {
      id: 'crate-dawn-terroir',
      title: 'The Stillfield Dawn Terroir Crate',
      subtitle: 'Estate Special · 4 Varieties',
      description: 'Morning-cut Fractal Romanesco, heritage San Marzano tomatoes, dew-cut Lacinato kale, and sweet alpine strawberries.',
      badge: 'Best Seller',
      bundlePriceRupees: 1240,
      originalPriceRupees: 1370,
      farmerPayoutRupees: 1100,
      imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
      produceItems: [PRODUCE_ITEMS[0], PRODUCE_ITEMS[1], PRODUCE_ITEMS[6], PRODUCE_ITEMS[7]],
    },
    {
      id: 'crate-forest-hearth',
      title: 'The Forest Fungi & Grain Hearth',
      subtitle: 'Artisan Reserve · 4 Varieties',
      description: 'Plump golden chanterelles, granite cold-milled Einkorn flour, raw wildflower honeycomb, and sweet Ligurian basil.',
      badge: 'Chef Selection',
      bundlePriceRupees: 1780,
      originalPriceRupees: 2040,
      farmerPayoutRupees: 1580,
      imageUrl: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80',
      produceItems: [PRODUCE_ITEMS[2], PRODUCE_ITEMS[4], PRODUCE_ITEMS[5], PRODUCE_ITEMS[9]],
    },
    {
      id: 'crate-orchard-roots',
      title: 'Heritage Roots & Highland Orchard',
      subtitle: 'Cellar Selection · 4 Varieties',
      description: 'Crisp pink pearl and Gravenstein apples, freshly dug purple fingerlings, Romanesco, and living root Genovese basil.',
      badge: 'Family Favorite',
      bundlePriceRupees: 980,
      originalPriceRupees: 1080,
      farmerPayoutRupees: 870,
      imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80',
      produceItems: [PRODUCE_ITEMS[3], PRODUCE_ITEMS[8], PRODUCE_ITEMS[0], PRODUCE_ITEMS[9]],
    },
  ], []);

  const handleAddCrateToCart = (crate: CuratedCrate) => {
    setCart((prev) => {
      const updated = [...prev];
      crate.produceItems.forEach((crop) => {
        const existing = updated.find((i) => i.produce.id === crop.id);
        if (existing) {
          existing.quantity += 1;
        } else {
          updated.push({ produce: crop, quantity: 1 });
        }
      });
      return updated;
    });
    showToast(`Added ${crate.title} to harvest basket!`);
  };

  const handleAddToCart = (produce: ProduceItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.produce.id === produce.id);
      if (existing) {
        return prev.map((i) =>
          i.produce.id === produce.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { produce, quantity: 1 }];
    });
    showToast(`Added ${produce.name} to harvest basket`);
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    setCart((prev) => {
      if (newQty <= 0) {
        return prev.filter((i) => i.produce.id !== itemId);
      }
      return prev.map((i) => (i.produce.id === itemId ? { ...i, quantity: newQty } : i));
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((i) => i.produce.id !== itemId));
  };

  const handleCheckout = async (address: string, slot: string, tip: number) => {
    const farmerPayoutTotal = cart.reduce(
      (sum, item) => sum + item.produce.priceBreakdown.farmerPayout * item.quantity,
      0
    ) + tip;

    const orderId = `STF-${Math.floor(1000 + Math.random() * 9000)}-DL`;

    const newDelivery: ActiveDelivery = {
      orderId,
      createdAt: 'Just now',
      estimatedArrivalMinutes: 20,
      courierName: 'Julian Morales (Electric Cargo Transit)',
      courierVehicle: 'Rivian Commercial Cold-Van #14',
      temperatureSensorReading: 4.4,
      currentRouteNodeIndex: 0,
      itemsCount: cartCount,
      totalPaid: cartTotal + (slot.includes('Express') ? 180 : 90) + 60 + tip,
      farmerPayoutTotal,
      destinationAddress: address,
      routeNodes: [
        {
          id: 'step-1',
          stepName: 'Dawn Harvest Lot Allocation',
          location: 'Stillfield River Basin & Cruz Groves',
          timestamp: 'Just Now',
          status: 'current',
          detail: 'Estate crates checked for peak turgor and sealed in breathable bio-packaging.',
          temperatureCelsius: 10.4
        },
        {
          id: 'step-2',
          stepName: 'Hydro-Cooling & Batch Certification',
          location: 'Stillfield Cold-Depot',
          timestamp: 'Est. +8 min',
          status: 'upcoming',
          detail: 'Rapid blast hydro-cooling to 4.5°C to preserve cellular crispness.',
          temperatureCelsius: 4.5
        },
        {
          id: 'step-3',
          stepName: 'Zero-Emission Route Dispatch',
          location: 'Express Electric Transit Corridor',
          timestamp: 'Est. +14 min',
          status: 'upcoming',
          detail: 'Active refrigerated van in transit to downtown drop zone.',
          temperatureCelsius: 4.4
        },
        {
          id: 'step-4',
          stepName: 'Doorstep Delivery Complete',
          location: address,
          timestamp: 'Est. +20 min',
          status: 'upcoming',
          detail: 'Placed in breathable returnable cellulose tote at doorstep.'
        }
      ]
    };

    if (auth.currentUser) {
      try {
        await setDoc(doc(db, 'orders', orderId), {
          id: orderId,
          userId: auth.currentUser.uid,
          userEmail: auth.currentUser.email,
          totalRupees: newDelivery.totalPaid,
          farmerPayoutRupees: farmerPayoutTotal,
          status: 'dispatched',
          destinationAddress: address,
          deliverySlot: slot,
          createdAt: new Date().toISOString(),
        });
      } catch (err) {
        console.warn('Could not persist order to Firestore:', err);
      }
    }

    setActiveDelivery(newDelivery);
    setHasActiveDelivery(true);
    setCart([]);
    setIsCartOpen(false);
    setIsOrderSuccessOpen(true);
  };

  const handleAdvanceStep = () => {
    setActiveDelivery((prev) => {
      const nextIndex = Math.min(prev.currentRouteNodeIndex + 1, prev.routeNodes.length - 1);
      const updatedNodes = prev.routeNodes.map((n, i) => {
        if (i < nextIndex) return { ...n, status: 'completed' as const };
        if (i === nextIndex) return { ...n, status: 'current' as const };
        return { ...n, status: 'upcoming' as const };
      });
      return {
        ...prev,
        currentRouteNodeIndex: nextIndex,
        routeNodes: updatedNodes,
        estimatedArrivalMinutes: Math.max(0, prev.estimatedArrivalMinutes - 6)
      };
    });
  };

  const handleResetSimulation = () => {
    setActiveDelivery(INITIAL_ACTIVE_DELIVERY);
  };

  // Filtered Produce List
  const filteredProduce = useMemo(() => {
    return PRODUCE_ITEMS.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.botanicalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.terroirTag.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      const matchesDistance = item.distanceKm <= maxDistance;

      return matchesSearch && matchesCategory && matchesDistance;
    });
  }, [searchQuery, selectedCategory, maxDistance]);

  const categories = [
    'All',
    'Vegetables',
    'Fruits',
    'Mushrooms',
    'Grains',
    'Dairy & Apiary',
    'Herbs'
  ];

  const activeFarmer = useMemo(
    () => FARMERS.find((f) => f.id === selectedFarmerId) || null,
    [selectedFarmerId]
  );

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#16221A] flex flex-col selection:bg-[#55B635]/25 selection:text-[#133E2B]">
      
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#14281D] text-white px-5 py-3 rounded-full shadow-2xl text-xs font-medium flex items-center gap-2 border border-[#95FB71]/30">
          <Check className="w-3.5 h-3.5 text-[#95FB71]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenLiveRoute={() => setIsLiveRouteOpen(true)}
        hasActiveDelivery={hasActiveDelivery}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'catalog' && (
          <div>
            {/* Hero Section */}
            <HeroSection
              onExploreHarvest={() => {
                const catalogEl = document.getElementById('catalog-grid');
                catalogEl?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenLedger={() => setActiveTab('ledger')}
              onOpenMap={() => setActiveTab('map')}
              onOpenChat={() => setActiveTab('chat')}
            />

            {/* Curated Crates Showcase (Standout Feature) */}
            <CuratedCrates
              crates={curatedCrates}
              onAddCrateToCart={handleAddCrateToCart}
              onSelectProduct={(p) => setSelectedProduct(p)}
            />

            {/* Catalog Discovery Section */}
            <section id="catalog-grid" className="max-w-[1360px] mx-auto px-4 md:px-8 py-12 space-y-10">
              
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#16221A]/10 pb-5">
                <div>
                  <span className="text-xs uppercase tracking-widest font-mono-nums text-[#8C5332] font-semibold block">
                    01 / Dawn Harvest Catalog
                  </span>
                  <h2 className="font-claude-serif text-3xl sm:text-4xl text-[#16221A] tracking-tight mt-1">
                    Fresh Harvest Registry
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsCertificateOpen(true)}
                    className="px-3.5 py-1.5 rounded-full bg-white text-[#14281D] border border-[#16221A]/15 text-xs font-semibold btn-3d-white flex items-center gap-1.5 cursor-pointer"
                  >
                    <Award className="w-3.5 h-3.5 text-[#4F9D2D]" />
                    <span>View Provenance Certificate</span>
                  </button>
                  <p className="text-xs text-[#6F7F75] font-mono-nums hidden sm:block">
                    14 local family estates · Cut at dawn today
                  </p>
                </div>
              </div>

              {/* Rapid Search Bar & Filter Controls */}
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="relative flex-1 max-w-xl">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6F7F75]" />
                    <input
                      type="text"
                      placeholder="Search heirloom varieties, volcanic soils, or partner estates..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-[52px] pl-12 pr-10 rounded-full bg-white border border-[#16221A]/14 text-sm text-[#16221A] placeholder:text-[#6F7F75] focus:outline-none focus:border-[#14281D] focus:ring-2 focus:ring-[#4F9D2D]/20 transition-all shadow-xs"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#6F7F75] hover:text-[#16221A] cursor-pointer"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-full border border-[#16221A]/10 text-xs shadow-xs">
                    <span className="text-[#6F7F75] font-medium flex items-center gap-1">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-[#14281D]" />
                      <span>Estate Radius:</span>
                    </span>
                    <div className="flex items-center gap-1">
                      {[15, 25, 35].map((dist) => (
                        <button
                          key={dist}
                          onClick={() => setMaxDistance(dist)}
                          className={`px-3 py-1 rounded-full font-mono-nums font-semibold transition-all cursor-pointer ${
                            maxDistance === dist
                              ? 'bg-[#14281D] text-white shadow-xs'
                              : 'text-[#3E4F44] hover:bg-[#F7F6F2]'
                          }`}
                        >
                          &lt;{dist}km
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-[#14281D] text-white shadow-xs'
                          : 'bg-white text-[#3E4F44] hover:bg-[#EFEDE6] border border-[#16221A]/10'
                      }`}
                    >
                      {cat === 'All' ? 'All Fresh Harvests' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Produce Catalog Grid with Scroll Reveal */}
              {filteredProduce.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-[#16221A]/10 max-w-md mx-auto space-y-3 shadow-xs">
                  <Sprout className="w-10 h-10 text-[#6F7F75] mx-auto" />
                  <h3 className="font-claude-serif font-bold text-lg text-[#16221A]">
                    No crops matching criteria
                  </h3>
                  <p className="text-xs text-[#3E4F44]">
                    Try clearing your search query or expanding the estate radius filter.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setMaxDistance(35);
                    }}
                    className="px-5 py-2.5 bg-[#14281D] text-white rounded-full text-xs font-semibold btn-3d-primary cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                  {filteredProduce.map((produce, idx) => (
                    <ProductCard
                      key={produce.id}
                      produce={produce}
                      quantityInCart={cartQuantities[produce.id] || 0}
                      onAddToCart={handleAddToCart}
                      onUpdateQuantity={handleUpdateQuantity}
                      onSelectProduct={(p) => setSelectedProduct(p)}
                      onSelectFarmer={(fId) => setSelectedFarmerId(fId)}
                      index={idx}
                    />
                  ))}
                </div>
              )}

              {/* Editorial Spotlight Banner in Rupees (₹) */}
              <div className="mt-14 p-8 md:p-10 rounded-3xl bg-[#14281D] text-white overflow-hidden relative shadow-xl">
                <div className="max-w-2xl space-y-3.5 relative z-10">
                  <span className="text-xs font-mono-nums uppercase tracking-widest text-[#95FB71] font-semibold block">
                    Direct Farm Access · 100% Transparent
                  </span>
                  <h3 className="font-claude-serif font-bold text-2xl md:text-4xl text-white tracking-tight">
                    Every Rupee Accounted For On Every Single Crate
                  </h3>
                  <p className="text-xs md:text-sm text-white/80 leading-relaxed font-claude-sans">
                    When you order through Stillfield, 88.5% of your basket total is disbursed straight into the grower's account within 24 hours. Compare our transparent ledger against the 4-tier supermarket supply chain.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <button
                      onClick={() => setActiveTab('ledger')}
                      className="px-5 py-3 bg-[#95FB71] hover:bg-[#7ADD58] text-[#0A1710] font-semibold text-xs rounded-full btn-3d-lime flex items-center gap-2 cursor-pointer"
                    >
                      <span>Explore the Fair Price Ledger</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#0A1710]" />
                    </button>
                    <button
                      onClick={() => setIsCertificateOpen(true)}
                      className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-full border border-white/20 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Award className="w-3.5 h-3.5 text-[#95FB71]" />
                      <span>Inspect Provenance Certificate</span>
                    </button>
                  </div>
                </div>
              </div>

            </section>
          </div>
        )}

        {/* Curated Crates Dedicated Tab */}
        {activeTab === 'crates' && (
          <div className="py-8">
            <CuratedCrates
              crates={curatedCrates}
              onAddCrateToCart={handleAddCrateToCart}
              onSelectProduct={(p) => setSelectedProduct(p)}
            />
          </div>
        )}

        {/* Partner Farms Directory */}
        {activeTab === 'farmers' && (
          <section className="max-w-[1360px] mx-auto px-4 md:px-8 py-12 space-y-8">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8C5332]/10 text-[#8C5332] text-xs font-semibold">
                <Sprout className="w-3.5 h-3.5" />
                <span>Verified Regenerative Growers</span>
              </div>
              <h2 className="font-claude-serif text-3xl sm:text-4xl text-[#16221A] tracking-tight">
                Our Regional Farm Partners
              </h2>
              <p className="text-sm md:text-base text-[#3E4F44] font-claude-sans">
                Meet the independent family growers cultivating exceptional heirloom varieties with complete pesticide elimination, certified organic matter tracking, and 100% direct revenue retention.
              </p>
            </div>

            <div className="space-y-6">
              {FARMERS.map((farmer, idx) => (
                <FarmerCard
                  key={farmer.id}
                  farmer={farmer}
                  produceList={PRODUCE_ITEMS}
                  onSelectFarmer={(id) => setSelectedFarmerId(id)}
                  onSelectProduct={(p) => setSelectedProduct(p)}
                  index={idx}
                />
              ))}
            </div>
          </section>
        )}

        {/* Terroir & Route Map */}
        {activeTab === 'map' && (
          <TerroirMap
            farmers={FARMERS}
            produceList={PRODUCE_ITEMS}
            onSelectFarmer={(id) => setSelectedFarmerId(id)}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}

        {/* Fair Price Ledger View */}
        {activeTab === 'ledger' && <FairPriceLedger />}

        {/* Gemini Multi-turn Chatbot Tab */}
        {activeTab === 'chat' && <AgronomistChat />}

        {/* Login / Patron Account Tab */}
        {activeTab === 'login' && (
          <LoginPage
            onBackToShopping={() => setActiveTab('catalog')}
            onOpenLiveRoute={() => setIsLiveRouteOpen(true)}
          />
        )}
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        produce={selectedProduct}
        farmer={FARMERS.find((f) => f.id === selectedProduct?.farmerId)}
        quantityInCart={selectedProduct ? cartQuantities[selectedProduct.id] || 0 : 0}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={handleUpdateQuantity}
        onSelectFarmer={(fId) => setSelectedFarmerId(fId)}
      />

      {/* Farmer Detail Modal */}
      <FarmerDetailModal
        farmer={activeFarmer}
        produceList={PRODUCE_ITEMS}
        cartQuantities={cartQuantities}
        onClose={() => setSelectedFarmerId(null)}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={handleUpdateQuantity}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      {/* Live Route & Delivery Drawer */}
      <LiveRouteDrawer
        isOpen={isLiveRouteOpen}
        onClose={() => setIsLiveRouteOpen(false)}
        delivery={activeDelivery}
        onAdvanceStep={handleAdvanceStep}
        onResetSimulation={handleResetSimulation}
      />

      {/* Order Confirmation Modal with Confetti & Provenance Certificate Link */}
      <OrderSuccessModal
        isOpen={isOrderSuccessOpen}
        delivery={activeDelivery}
        onTrackRoute={() => {
          setIsOrderSuccessOpen(false);
          setIsLiveRouteOpen(true);
        }}
        onViewCertificate={() => {
          setIsOrderSuccessOpen(false);
          setIsCertificateOpen(true);
        }}
        onClose={() => setIsOrderSuccessOpen(false)}
      />

      {/* Standout Feature: Digital Certificate of Provenance Modal */}
      <ProvenanceCertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        delivery={activeDelivery}
      />

      {/* Stillfield Editorial Footer */}
      <footer className="mt-20 bg-[#14281D] text-white border-t border-[#14281D]/10 py-12 px-4 md:px-8">
        <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/75">
          <div className="flex items-center gap-2">
            <span className="font-claude-serif font-bold text-base text-white">
              Stillfield
            </span>
            <span>·</span>
            <span>Direct Market Access & Regenerative Provenance</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => setActiveTab('catalog')} className="hover:text-white transition-colors cursor-pointer">
              Fresh Harvest
            </button>
            <button onClick={() => setActiveTab('crates')} className="hover:text-white transition-colors cursor-pointer">
              Curated Crates
            </button>
            <button onClick={() => setActiveTab('farmers')} className="hover:text-white transition-colors cursor-pointer">
              Partner Estates
            </button>
            <button onClick={() => setActiveTab('map')} className="hover:text-white transition-colors cursor-pointer">
              Terroir Map
            </button>
            <button onClick={() => setActiveTab('ledger')} className="hover:text-white transition-colors cursor-pointer">
              Fair Price Ledger
            </button>
            <button onClick={() => setActiveTab('chat')} className="hover:text-white transition-colors cursor-pointer">
              AI Agronomist
            </button>
            <button onClick={() => setIsCertificateOpen(true)} className="hover:text-white transition-colors cursor-pointer">
              Certificate
            </button>
          </div>

          <div className="text-right">
            <span className="font-mono-nums text-[#95FB71]">100% Direct Payout in Indian Rupees (₹)</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
