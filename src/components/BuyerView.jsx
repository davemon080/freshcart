import React, { useState } from 'react';
import { 
  ShoppingBag, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight, 
  Lock, 
  CreditCard, 
  Smartphone, 
  Banknote, 
  Info,
  Clock,
  Sparkles,
  Camera,
  RefreshCw,
  XCircle,
  ThermometerSnowflake,
  Wind
} from 'lucide-react';
import { PRODUCE_CATALOG, LGA_REGIONS } from '../data/freshcartData';

export function BuyerView({ 
  orders, 
  onCreateOrder, 
  activeLGA, 
  setActiveLGA, 
  isPeakHour, 
  walletBalance, 
  onTopUpWallet,
  onReportIssue
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [basket, setBasket] = useState([
    { ...PRODUCE_CATALOG[0], quantity: 2 }, // Ugu
    { ...PRODUCE_CATALOG[3], quantity: 1 }, // Jos Tomatoes
    { ...PRODUCE_CATALOG[6], quantity: 1 }  // Beef
  ]);
  const [activeTab, setActiveTab] = useState('shop'); // 'shop' | 'tracking'
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [selectedLandmark, setSelectedLandmark] = useState('Opposite Mobil Filling Station, Utako');
  const [customAddress, setCustomAddress] = useState('Plot 412, Mike Akhigbe Way, Utako District, Abuja');
  const [paymentMethod, setPaymentMethod] = useState('wallet'); // 'wallet' | 'card' | 'bank'
  const [showUnitEconomicsBreakdown, setShowUnitEconomicsBreakdown] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState(orders[0]?.id || 'FC-8924');
  const [inspectionState, setInspectionState] = useState({ sealChecked: false, produceChecked: false });
  const [disputeModalOrder, setDisputeModalOrder] = useState(null);
  const [disputeReason, setDisputeReason] = useState('bruised_spoiled');
  const [disputeNotes, setDisputeNotes] = useState('');

  const currentLGAData = LGA_REGIONS.find(r => r.id === activeLGA) || LGA_REGIONS[0];
  const distanceKm = 3.5; // Average hyper-local transit within AMAC LGA

  // Categories
  const categories = ['All', 'Fresh Vegetables', 'Raw Tomatoes / Peppers', 'Fresh Meat & Poultry', 'Grains & Staples', 'Tubers & Roots'];

  const filteredCatalog = selectedCategory === 'All' 
    ? PRODUCE_CATALOG 
    : PRODUCE_CATALOG.filter(item => item.category === selectedCategory);

  // Financial calculations
  const grossBasketValue = basket.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const baseDeliveryFee = 500;
  const distanceFee = Math.round((distanceKm - 3 > 0 ? (distanceKm - 3) * 100 : 0) + 600); // ₦1,100 for 3.5km
  const deliveryFee = isPeakHour ? Math.round(distanceFee * 1.25) : distanceFee;
  const packagingFee = 200; // Flat eco-friendly hygienic seal
  const totalCustomerPayment = grossBasketValue > 0 ? (grossBasketValue + deliveryFee + packagingFee) : 0;

  // Unit economics splits
  const vendorSettlement = Math.round(grossBasketValue * 0.80);
  const riderCompensation = Math.round(deliveryFee * 0.80);
  const packagingCost = 80;
  const paymentGatewayFee = Math.round(totalCustomerPayment * 0.015);
  const freshCartNetMargin = totalCustomerPayment - (vendorSettlement + riderCompensation + packagingCost + paymentGatewayFee);

  const addToBasket = (product) => {
    setBasket(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, delta) => {
    setBasket(prev => {
      return prev.map(item => {
        if (item.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromBasket = (productId) => {
    setBasket(prev => prev.filter(item => item.id !== productId));
  };

  const handleCheckout = () => {
    if (basket.length === 0) return;

    if (paymentMethod === 'wallet' && walletBalance < totalCustomerPayment) {
      alert(`Insufficient Escrow Wallet balance! Please top up ₦${(totalCustomerPayment - walletBalance).toLocaleString()} or choose another payment method.`);
      return;
    }

    const randomPin = Math.floor(1000 + Math.random() * 9000).toString();
    const newOrderId = `FC-${Math.floor(8930 + Math.random() * 70)}`;

    const newOrder = {
      id: newOrderId,
      buyer: {
        name: 'Dr. Amina Bello',
        phone: '+234 803 555 0192',
        lga: activeLGA,
        hub: currentLGAData.hubs[0].name,
        landmark: selectedLandmark,
        gpsCoords: '9.0642° N, 7.4435° E',
        deliveryAddress: customAddress
      },
      items: basket.map(b => ({
        id: b.id,
        name: b.name,
        qty: b.quantity,
        price: b.price,
        standardUnit: b.standardUnit
      })),
      produceTotal: grossBasketValue,
      deliveryFee,
      packagingFee,
      totalAmount: totalCustomerPayment,
      vendorShare: vendorSettlement,
      riderPayout: riderCompensation,
      platformMargin: freshCartNetMargin,
      paymentMethod: paymentMethod === 'wallet' 
        ? 'In-App Escrow Wallet' 
        : paymentMethod === 'card' 
          ? 'Debit Card (Paystack)' 
          : 'Bank Transfer (Virtual Account)',
      paymentStatus: 'Escrow Locked',
      orderPin: randomPin,
      status: 'PACKING',
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      slaTargetMinutes: 45,
      minutesElapsed: 2,
      rider: null,
      agent: {
        name: 'Fatima Garba',
        id: 'AGENT-UTAKO-01',
        scaleCalibrationTimestamp: '06:30 AM',
        weighingCheckPassed: true,
        barcodeSealId: `BC-AMAC-${Math.floor(10000 + Math.random() * 89999)}-SEALED`
      }
    };

    onCreateOrder(newOrder);
    setBasket([]);
    setIsBasketOpen(false);
    setTrackingOrderId(newOrderId);
    setActiveTab('tracking');
  };

  const activeTrackingOrder = orders.find(o => o.id === trackingOrderId) || orders[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Navigation Tabs: Marketplace vs Live Tracking */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>FreshCart Hyper-Local Market</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
              {currentLGAData.name}
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Standardized Nigerian open-air produce weighed on calibrated digital scales & delivered under 45 mins.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-slate-200/80 p-1 rounded-xl flex items-center gap-1 text-xs font-bold">
            <button
              onClick={() => setActiveTab('shop')}
              className={`px-4 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'shop' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
              <span>Browse Catalog</span>
            </button>
            <button
              onClick={() => setActiveTab('tracking')}
              className={`px-4 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'tracking' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Order Tracking & PIN</span>
              <span className="bg-emerald-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {orders.length}
              </span>
            </button>
          </div>

          {activeTab === 'shop' && (
            <button
              onClick={() => setIsBasketOpen(true)}
              className="relative flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md shadow-emerald-600/20 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">My Basket</span>
              <span>₦{grossBasketValue.toLocaleString()}</span>
              {basket.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow">
                  {basket.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      {activeTab === 'shop' ? (
        <div className="mt-6 space-y-6">
          
          {/* Landmark-Based Drop-Off Point & Geofence Notification */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900">Landmark-Based Drop-Off Point & GPS Pin</h3>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      Risk Rule 1.3
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    To eliminate lost riders and fuel waste in unnumbered LGA streets, orders lock to verified local landmarks.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="flex-1 min-w-[240px]">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Select Local Landmark ({activeLGA})
                  </label>
                  <select
                    value={selectedLandmark}
                    onChange={(e) => setSelectedLandmark(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold px-3 py-2 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    {currentLGAData.landmarks.map((landmark, idx) => (
                      <option key={idx} value={landmark}>{landmark}</option>
                    ))}
                  </select>
                </div>

                <div className="flex-1 min-w-[240px]">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Specific House / Flat Address
                  </label>
                  <input
                    type="text"
                    value={customAddress}
                    onChange={(e) => setCustomAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium px-3 py-2 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    placeholder="e.g., House 14, Vintage Crest Estate"
                  />
                </div>
              </div>
            </div>

            {/* Geofence Status Badge */}
            <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Primary LGA Hub: <strong>{currentLGAData.hubs[0].name}</strong></span>
                <span className="text-slate-300">•</span>
                <span>Distance: <strong>~{distanceKm} km</strong></span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>
                  Max Geofence Radius: <strong>{isPeakHour ? '5.0 km (Peak Lock)' : '10.0 km (Standard)'}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Unit Standardization Informational Banner */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 rounded-2xl p-4 border border-emerald-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 font-bold">
                ⚖️
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900 flex items-center gap-2">
                  <span>Standardized Local Produce Unit Framework</span>
                  <span className="bg-emerald-200 text-emerald-900 text-[10px] px-1.5 py-0.2 rounded font-mono">
                    FC-OPS Section 6
                  </span>
                </h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  No more bargaining or irregular sizes. Traditional measurements like <em>"Painter Bucket"</em>, <em>"Derica"</em>, and <em>"Tie"</em> are converted into strict digital metrics (2.5kg, 500g, 1kg vacuum sealed) with verified quality tolerances.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0 text-[11px] font-semibold text-emerald-800 bg-white/80 px-3 py-1.5 rounded-lg border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Weighed on Calibrated Booth Scales</span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Produce Catalog Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredCatalog.map((product) => {
              const inBasket = basket.find(item => item.id === product.id);
              const isCold = product.tempRequirement.includes('Cold');

              return (
                <div 
                  key={product.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="p-4">
                    {/* Header: Icon & Category Badges */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-3xl group-hover:scale-105 transition-transform">
                        {product.image}
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {product.category}
                        </span>
                        {isCold ? (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                            <ThermometerSnowflake className="w-2.5 h-2.5" />
                            Cold Pack (4°C)
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                            <Wind className="w-2.5 h-2.5" />
                            Ventilated Mesh
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-sm text-slate-900 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Metric Standardization Breakdown Card */}
                    <div className="mt-3 bg-slate-50 rounded-xl p-2.5 border border-slate-100 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 font-medium">Traditional Unit:</span>
                        <span className="font-semibold text-slate-700">{product.traditionalUnit}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-emerald-700 font-bold">Digital Metric:</span>
                        <span className="font-bold text-emerald-800">{product.standardUnit}</span>
                      </div>
                      <div className="pt-1 border-t border-slate-200/60 text-[10px] text-slate-500 leading-tight">
                        <strong className="text-slate-700">Quality Spec:</strong> {product.qualityTolerance}
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Add to Basket Footer */}
                  <div className="p-4 pt-2 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">Standard Retail</span>
                      <span className="font-extrabold text-base text-slate-900">
                        ₦{product.price.toLocaleString()}
                      </span>
                    </div>

                    {inBasket ? (
                      <div className="flex items-center bg-white border border-emerald-500 rounded-xl p-1 shadow-sm">
                        <button
                          onClick={() => updateQuantity(product.id, -1)}
                          className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600 font-bold"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-emerald-800">
                          {inBasket.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, 1)}
                          className="w-7 h-7 rounded-lg bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center text-white font-bold"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToBasket(product)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm shadow-emerald-600/20 transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Order Tracking & 4-Digit Handshake Panel */
        <div className="mt-6 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Active LGA Fulfillment Orders
                </span>
                <div className="flex items-center gap-3 mt-1">
                  <h2 className="text-xl font-black text-slate-900">
                    Order #{activeTrackingOrder.id}
                  </h2>
                  <span className={`text-xs font-extrabold px-2.5 py-1 rounded-full ${
                    activeTrackingOrder.status === 'DELIVERED' 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                      : activeTrackingOrder.status === 'IN_TRANSIT'
                        ? 'bg-blue-100 text-blue-800 border border-blue-300 animate-pulse'
                        : activeTrackingOrder.status === 'REJECTED'
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}>
                    {activeTrackingOrder.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Order selector tabs if multiple */}
              <div className="flex items-center gap-2 overflow-x-auto">
                {orders.map(o => (
                  <button
                    key={o.id}
                    onClick={() => setTrackingOrderId(o.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      trackingOrderId === o.id
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    #{o.id} ({o.status})
                  </button>
                ))}
              </div>
            </div>

            {/* 5-Stage Visual Delivery Progress Bar */}
            <div className="py-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                5-Stage End-to-End Operational Lifecycle (FC-OPS Section 3)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { step: 1, label: 'Geofence Lock & Payment', desc: 'Pre-paid escrow lock', done: true },
                  { step: 2, label: 'Booth Aggregation', desc: 'Digital scale & bio-bag seal', done: ['PACKING', 'READY_FOR_PICKUP', 'IN_TRANSIT', 'DELIVERED'].includes(activeTrackingOrder.status) },
                  { step: 3, label: 'Rider Broadcast', desc: '<2km pickup radius', done: ['READY_FOR_PICKUP', 'IN_TRANSIT', 'DELIVERED'].includes(activeTrackingOrder.status) },
                  { step: 4, label: 'Hyper-Local Transit', desc: 'Dual-box temperature control', done: ['IN_TRANSIT', 'DELIVERED'].includes(activeTrackingOrder.status) },
                  { step: 5, label: 'PIN Handshake', desc: 'Doorstep inspection & split', done: activeTrackingOrder.status === 'DELIVERED' }
                ].map((s) => (
                  <div 
                    key={s.step} 
                    className={`p-3 rounded-xl border transition-all ${
                      s.done 
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950' 
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                        s.done ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {s.step}
                      </span>
                      {s.done && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    </div>
                    <p className="font-bold text-xs">{s.label}</p>
                    <p className="text-[10px] opacity-80 mt-0.5">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Central Trust Mechanism: THE 4-DIGIT SECURITY PIN CARD */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute right-4 top-4 opacity-10 text-8xl font-black select-none pointer-events-none">
                PIN
              </div>

              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Zero-Friction Escrow Protocol
                  </span>
                  <span className="text-slate-400 text-xs">FC-OPS Section 4</span>
                </div>

                <h3 className="text-xl font-black text-white tracking-tight">
                  Your 4-Digit Handshake PIN
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Strict Compliance Rule: <strong>No PIN = No Handover.</strong> The rider cannot complete this order or claim payment until you verify the goods and provide this PIN.
                </p>

                {/* Big PIN Display */}
                <div className="my-5 flex items-center gap-4">
                  <div className="bg-black/40 border-2 border-emerald-500/50 rounded-2xl px-6 py-3 tracking-[0.4em] font-mono font-black text-4xl text-emerald-400 shadow-inner">
                    {activeTrackingOrder.orderPin}
                  </div>
                  <div className="text-xs text-slate-300">
                    <p className="font-bold text-white">Visible ONLY to Buyer</p>
                    <p className="text-[11px] text-slate-400">Keep secret until produce inspection passes.</p>
                  </div>
                </div>

                {/* Doorstep Inspection Verification Checklist */}
                <div className="bg-white/10 rounded-xl p-3.5 backdrop-blur-sm border border-white/10 space-y-2">
                  <p className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    Doorstep Buyer Inspection Routine:
                  </p>
                  <label className="flex items-center gap-2 text-xs text-slate-200 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={inspectionState.sealChecked}
                      onChange={(e) => setInspectionState(p => ({ ...p, sealChecked: e.target.checked }))}
                      className="rounded border-slate-600 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span>Tamper-Evident Barcode Seal is intact ({activeTrackingOrder.agent?.barcodeSealId || 'BC-AMAC-VERIFIED'})</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-200 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={inspectionState.produceChecked}
                      onChange={(e) => setInspectionState(p => ({ ...p, produceChecked: e.target.checked }))}
                      className="rounded border-slate-600 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span>Produce is fresh: Meat chilled at 4°C, vegetables crisp, zero rot or decay</span>
                  </label>
                </div>

                {/* Handover & Dispute Buttons */}
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <div className="text-xs text-emerald-300 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Satisfied? Read PIN to rider for instant escrow split settlement.</span>
                  </div>

                  <button
                    onClick={() => setDisputeModalOrder(activeTrackingOrder)}
                    className="ml-auto bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-md flex items-center gap-1.5"
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Report Produce Issue / Reject</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Order Details & Operational Parameters */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Basket Items List */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Order Manifest ({activeTrackingOrder.items.length} items)
                </h4>
                <div className="space-y-2">
                  {activeTrackingOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs bg-white p-2.5 rounded-lg border border-slate-100">
                      <div>
                        <p className="font-bold text-slate-800">{item.name}</p>
                        <p className="text-[10px] text-emerald-700 font-mono">{item.standardUnit}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-700">x{item.qty}</p>
                        <p className="font-bold text-slate-900">₦{(item.price * item.qty).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between text-slate-500">
                    <span>Produce Subtotal:</span>
                    <span>₦{activeTrackingOrder.produceTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Delivery Fee ({distanceKm}km LGA):</span>
                    <span>₦{activeTrackingOrder.deliveryFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Hygienic Bio-Bag Seal Fee:</span>
                    <span>₦{activeTrackingOrder.packagingFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-black text-slate-900 pt-1 border-t border-slate-200 text-sm">
                    <span>Total Pre-Paid Escrow:</span>
                    <span className="text-emerald-700">₦{activeTrackingOrder.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Assigned Agent & Dispatch Rider Details */}
              <div className="space-y-4">
                {/* Hub Agent Card */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <span>🏪 Utako Hub Market Agent:</span>
                      <strong className="text-emerald-700">{activeTrackingOrder.agent?.name || 'Fatima Garba'}</strong>
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      Verified
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    Digital scale calibration verified at <strong>{activeTrackingOrder.agent?.scaleCalibrationTimestamp || '06:30 AM'}</strong>. Barcode seal <strong>{activeTrackingOrder.agent?.barcodeSealId}</strong> affixed to bio-bag.
                  </p>
                </div>

                {/* Dispatch Rider Card */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <span>🛵 LGA Dispatch Rider:</span>
                      <strong className="text-emerald-700">{activeTrackingOrder.rider ? activeTrackingOrder.rider.name : 'Awaiting Hub Pickup'}</strong>
                    </span>
                    {activeTrackingOrder.rider && (
                      <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">
                        AMAC Zone A
                      </span>
                    )}
                  </div>
                  {activeTrackingOrder.rider ? (
                    <>
                      <p className="text-slate-600 text-[11px]">
                        Vehicle: <strong>{activeTrackingOrder.rider.vehicle}</strong> • Phone: <strong>{activeTrackingOrder.rider.phone}</strong>
                      </p>
                      <div className="flex items-center gap-2 text-[10px] bg-white p-2 rounded border border-slate-200 text-slate-600">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Thermal Box Status: <strong>Dual-Compartment Checked (Cold Meat & Mesh Veggies)</strong></span>
                      </div>
                    </>
                  ) : (
                    <p className="text-amber-700 text-[11px] bg-amber-50 p-2 rounded border border-amber-200">
                      Rider will be broadcasted once Market Agent finishes weighing and packaging.
                    </p>
                  )}
                </div>

                {/* Delivery Landmark Info */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs">
                  <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1 text-[10px]">
                    Delivery Destination & Landmark
                  </span>
                  <p className="font-bold text-slate-800">{activeTrackingOrder.buyer.deliveryAddress}</p>
                  <p className="text-slate-500 mt-0.5">Landmark: <strong>{activeTrackingOrder.buyer.landmark}</strong></p>
                  <p className="text-[10px] font-mono text-emerald-700 mt-1">GPS Pin: {activeTrackingOrder.buyer.gpsCoords}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide-Over Basket Drawer & Transparent Unit Economics */}
      {isBasketOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsBasketOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                    🛒
                  </div>
                  <div>
                    <h3 className="font-black text-base text-slate-900">Your FreshCart Basket</h3>
                    <p className="text-xs text-slate-500">{basket.length} unique produce items</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsBasketOpen(false)}
                  className="w-8 h-8 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600 flex items-center justify-center font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Basket Items List */}
              <div className="p-6 overflow-y-auto space-y-3 flex-1">
                {basket.length === 0 ? (
                  <div className="text-center py-12 text-slate-400">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-2 opacity-30" />
                    <p className="font-bold text-sm">Your basket is empty</p>
                    <p className="text-xs mt-1">Add standardized fresh food from the catalog</p>
                  </div>
                ) : (
                  basket.map((item) => (
                    <div key={item.id} className="bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-center justify-between gap-3">
                      <div className="text-2xl">{item.image}</div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-slate-900 truncate">{item.name}</h4>
                        <p className="text-[10px] text-emerald-700 font-mono">{item.standardUnit}</p>
                        <p className="text-xs font-extrabold text-slate-900 mt-0.5">
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-500 hover:bg-slate-100 rounded"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-slate-800">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-500 hover:bg-slate-100 rounded"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromBasket(item.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}

                {/* 100% Digital Pre-Payment / Escrow Selector */}
                {basket.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-slate-200 space-y-3">
                    <label className="block text-xs font-extrabold text-slate-900">
                      100% Pre-Payment Escrow Method:
                    </label>

                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setPaymentMethod('wallet')}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          paymentMethod === 'wallet'
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <Smartphone className="w-4 h-4 text-emerald-600 mb-1" />
                        <p className="font-bold text-[11px] leading-tight">In-App Wallet</p>
                        <p className="text-[9px] text-slate-500">Zero Risk Escrow</p>
                      </button>

                      <button
                        onClick={() => setPaymentMethod('card')}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          paymentMethod === 'card'
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <CreditCard className="w-4 h-4 text-emerald-600 mb-1" />
                        <p className="font-bold text-[11px] leading-tight">Debit Card</p>
                        <p className="text-[9px] text-slate-500">Paystack 3D-Sec</p>
                      </button>

                      <button
                        onClick={() => setPaymentMethod('bank')}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          paymentMethod === 'bank'
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <Banknote className="w-4 h-4 text-emerald-600 mb-1" />
                        <p className="font-bold text-[11px] leading-tight">Bank Transfer</p>
                        <p className="text-[9px] text-slate-500">Virtual Account</p>
                      </button>
                    </div>

                    {/* Cash on Delivery Disabled Warning (Problem 3.2 Mitigation) */}
                    <div className="bg-rose-50 border border-rose-200 rounded-xl p-2.5 flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-black text-rose-800 uppercase tracking-wide">
                          Cash-On-Delivery Disabled:
                        </span>
                        <p className="text-[10px] text-rose-700 leading-tight mt-0.5">
                          In accordance with FC-RISK Rule 3.2, COD is 100% disabled to eliminate rider robbery risks and fake SMS alert scams for raw fresh food.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Footer & Unit Economics Split */}
              {basket.length > 0 && (
                <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-3">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Gross Produce Value:</span>
                      <span>₦{grossBasketValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Delivery Fee ({distanceKm} km {isPeakHour ? '• Peak Multiplier' : ''}):</span>
                      <span>₦{deliveryFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Eco-Friendly Hygienic Bag Seal:</span>
                      <span>₦{packagingFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-black text-slate-900 text-sm pt-2 border-t border-slate-200">
                      <span>Total Payment (Escrow):</span>
                      <span className="text-emerald-700 text-base">₦{totalCustomerPayment.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Transparent Unit Economics Collapsible */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                    <button
                      onClick={() => setShowUnitEconomicsBreakdown(!showUnitEconomicsBreakdown)}
                      className="w-full px-3 py-2 text-left text-[11px] font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                    >
                      <span className="flex items-center gap-1 text-emerald-800">
                        <Info className="w-3.5 h-3.5 text-emerald-600" />
                        Automated Split Settlement Breakdown
                      </span>
                      <span>{showUnitEconomicsBreakdown ? '▲ Hide' : '▼ View'}</span>
                    </button>

                    {showUnitEconomicsBreakdown && (
                      <div className="p-3 bg-slate-50/70 border-t border-slate-200 text-[10px] space-y-1 font-mono text-slate-600">
                        <div className="flex justify-between">
                          <span>Vendor Settlement (80% produce):</span>
                          <span className="font-bold text-slate-800">₦{vendorSettlement.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rider Compensation (80% del):</span>
                          <span className="font-bold text-slate-800">₦{riderCompensation.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Packaging Bio-Bag COGS:</span>
                          <span className="font-bold text-slate-800">₦{packagingCost}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Gateway Fee (1.5%):</span>
                          <span className="font-bold text-slate-800">₦{paymentGatewayFee}</span>
                        </div>
                        <div className="flex justify-between text-emerald-700 font-bold pt-1 border-t border-slate-200">
                          <span>FreshCart Net Gross Profit:</span>
                          <span>₦{freshCartNetMargin.toLocaleString()} (10.2%)</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 text-sm transition-all"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Pay ₦{totalCustomerPayment.toLocaleString()} & Generate 4-Digit PIN</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Dispute & Spoilage Rejection Modal (Mandatory Return-to-Booth Protocol) */}
      {disputeModalOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                  ⚠️
                </div>
                <div>
                  <h3 className="font-black text-base text-slate-900">
                    Doorstep Produce Rejection Protocol
                  </h3>
                  <p className="text-xs text-slate-500">FC-RISK Section 2.3 & FC-OPS Section 13</p>
                </div>
              </div>
              <button 
                onClick={() => setDisputeModalOrder(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-800">
                <strong>Mandatory Return-to-Booth Protocol:</strong> Withhold your 4-digit PIN. The rider will immediately return the physical package to the Utako Market Agent booth for re-inspection.
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Reason for Rejection:
                </label>
                <select
                  value={disputeReason}
                  onChange={(e) => setDisputeReason(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold p-2.5 text-slate-800"
                >
                  <option value="bruised_spoiled">Bruised fruit / wilted vegetable leaves</option>
                  <option value="broken_seal">Tamper seal was broken or manipulated</option>
                  <option value="warm_meat">Meat not chilled at 4°C</option>
                  <option value="incorrect_unit">Missing item / incorrect measurement</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Photo Evidence (Simulated Upload):
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center bg-slate-50 hover:bg-slate-100 cursor-pointer">
                  <Camera className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                  <span className="text-xs font-semibold text-slate-600">Snap Photo of Produce at Doorstep</span>
                  <p className="text-[10px] text-slate-400 mt-0.5">Required to trigger vendor strike assessment</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Additional Notes:
                </label>
                <textarea
                  rows="2"
                  value={disputeNotes}
                  onChange={(e) => setDisputeNotes(e.target.value)}
                  placeholder="Specify details for Utako Market Agent review..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg text-xs p-2 text-slate-800"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  onClick={() => setDisputeModalOrder(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onReportIssue(disputeModalOrder.id, disputeReason, disputeNotes);
                    setDisputeModalOrder(null);
                    alert(`Dispute Filed for #${disputeModalOrder.id}. Rider instructed to return to Utako Market Booth. Instant replacement or wallet refund (+₦200 voucher) initialized.`);
                  }}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md"
                >
                  Confirm Rejection & Return Package
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
