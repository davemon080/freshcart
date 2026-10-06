import React from 'react';
import { 
  ShoppingBag, 
  Store, 
  Bike, 
  ShieldAlert, 
  BookOpen, 
  MapPin, 
  Clock, 
  Zap, 
  Wallet,
  AlertTriangle
} from 'lucide-react';

export function Header({ 
  activeRole, 
  setActiveRole, 
  isPeakHour, 
  setIsPeakHour, 
  activeLGA, 
  setActiveLGA, 
  walletBalance, 
  onTopUpWallet,
  openBlueprint,
  ordersCount
}) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top Banner: Emergency / Peak Mode Alert */}
      {isPeakHour && (
        <div className="bg-amber-500 text-white text-xs font-semibold px-4 py-1.5 flex items-center justify-between transition-all">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
            <AlertTriangle className="w-4 h-4 animate-bounce" />
            <span>
              <strong>PEAK HOUR PROTOCOL ACTIVE (4:00 PM – 7:30 PM):</strong> Geofence radius dynamically scaled down from 10km to 5km to preserve 45-min delivery SLA. 1.25x Peak Dispatch Multiplier enabled.
            </span>
          </div>
        </div>
      )}

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Platform Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <span className="text-2xl">🛒</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">FreshCart</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                  FC-2026-V1
                </span>
                <span className="hidden sm:inline-block bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded">
                  Lead: Ujah Israel O.
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                Hyper-Local Food Logistics & Risk Mitigation Engine
              </p>
            </div>
          </div>

          {/* Quick Settings: LGA + Peak Simulator + Wallet */}
          <div className="flex items-center gap-3">
            
            {/* LGA Selector */}
            <div className="hidden md:flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-xs">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-slate-500 font-medium">LGA:</span>
              <select 
                value={activeLGA} 
                onChange={(e) => setActiveLGA(e.target.value)}
                className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="AMAC">AMAC (Abuja Central)</option>
                <option value="BWARI">Bwari (Kubwa Hub)</option>
                <option value="GWAGWALADA">Gwagwalada Area</option>
              </select>
            </div>

            {/* Peak Hours Toggle */}
            <button
              onClick={() => setIsPeakHour(!isPeakHour)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                isPeakHour 
                  ? 'bg-amber-100 text-amber-800 border-amber-300 shadow-sm' 
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
              title="Simulates 4:00 PM – 7:30 PM Peak Radius Shrinkage"
            >
              <Zap className={`w-3.5 h-3.5 ${isPeakHour ? 'text-amber-600 fill-amber-500 animate-pulse' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">{isPeakHour ? 'Peak 5km Active' : 'Normal 10km'}</span>
            </button>

            {/* In-App Escrow Wallet Badge */}
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs">
              <Wallet className="w-3.5 h-3.5 text-emerald-600" />
              <div>
                <span className="text-slate-500 text-[10px] block leading-none">Escrow Wallet</span>
                <span className="font-bold text-emerald-800 leading-none">₦{walletBalance.toLocaleString()}</span>
              </div>
              <button 
                onClick={onTopUpWallet}
                className="ml-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold w-4 h-4 rounded-full flex items-center justify-center text-[10px]"
                title="Top-up Escrow Wallet"
              >
                +
              </button>
            </div>

            {/* Blueprint Docs Button */}
            <button
              onClick={openBlueprint}
              className="flex items-center gap-1.5 bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all shadow-sm"
              title="View Operations Manual & Risk Framework Blueprint"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden lg:inline">Blueprint Specs</span>
            </button>
          </div>
        </div>

        {/* Multi-Role Switcher Navigation */}
        <div className="flex items-center justify-between border-t border-slate-100 py-2 overflow-x-auto no-scrollbar gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-2 hidden sm:inline">
              Live Role Views:
            </span>

            {/* Role 1: Buyer */}
            <button
              onClick={() => setActiveRole('buyer')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeRole === 'buyer'
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Buyer Marketplace</span>
              {ordersCount.buyerActive > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeRole === 'buyer' ? 'bg-emerald-800 text-white' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {ordersCount.buyerActive}
                </span>
              )}
            </button>

            {/* Role 2: Market Booth Agent */}
            <button
              onClick={() => setActiveRole('agent')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeRole === 'agent'
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Utako Market Booth Agent</span>
              {ordersCount.packing > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeRole === 'agent' ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800'
                }`}>
                  {ordersCount.packing}
                </span>
              )}
            </button>

            {/* Role 3: Dispatch Rider */}
            <button
              onClick={() => setActiveRole('rider')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeRole === 'rider'
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Bike className="w-3.5 h-3.5" />
              <span>Dispatch Rider (PIN Handshake)</span>
              {ordersCount.inTransit > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeRole === 'rider' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'
                }`}>
                  {ordersCount.inTransit}
                </span>
              )}
            </button>

            {/* Role 4: LGA Ops Command */}
            <button
              onClick={() => setActiveRole('ops')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeRole === 'ops'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
              <span>LGA Ops & Risk Command</span>
            </button>
          </div>

          {/* SLA Invariant Reminder */}
          <div className="hidden xl:flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
            <Clock className="w-3 h-3 text-emerald-600" />
            <span>Target Fulfillment SLA: <strong>45 Mins</strong> (Max 30–90 min)</span>
          </div>
        </div>
      </div>
    </header>
  );
}
