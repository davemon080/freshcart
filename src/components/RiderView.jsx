import React, { useState } from 'react';
import { 
  Bike, 
  MapPin, 
  ShieldCheck, 
  ThermometerSnowflake, 
  Wind, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  Navigation, 
  Wallet, 
  KeyRound, 
  Zap,
  PhoneCall,
  Clock,
  RotateCcw
} from 'lucide-react';

export function RiderView({ 
  orders, 
  onAcceptOrder, 
  onVerifyPinAndDeliver, 
  onReportOffRoute 
}) {
  const [pinInput, setPinInput] = useState('');
  const [pinAttemptsLeft, setPinAttemptsLeft] = useState(3);
  const [isLockedOut, setIsLockedOut] = useState(false);
  const [pinErrorMsg, setPinErrorMsg] = useState('');
  const [riderWallet, setRiderWallet] = useState(14250); // NGN
  const [thermalBoxChecked, setThermalBoxChecked] = useState(true);
  const [offRouteAlertActive, setOffRouteAlertActive] = useState(false);
  const [activeTransitOrder, setActiveTransitOrder] = useState(
    orders.find(o => o.status === 'IN_TRANSIT') || orders.find(o => o.status === 'READY_FOR_PICKUP') || orders[0]
  );

  // Keypad inputs
  const handleDigit = (digit) => {
    if (pinInput.length < 4 && !isLockedOut) {
      setPinInput(prev => prev + digit);
      setPinErrorMsg('');
    }
  };

  const handleBackspace = () => {
    if (!isLockedOut) {
      setPinInput(prev => prev.slice(0, -1));
      setPinErrorMsg('');
    }
  };

  const handleClear = () => {
    if (!isLockedOut) {
      setPinInput('');
      setPinErrorMsg('');
    }
  };

  const handleSubmitPin = () => {
    if (!activeTransitOrder || isLockedOut) return;

    if (pinInput.length !== 4) {
      setPinErrorMsg('Please enter all 4 digits of the buyer PIN.');
      return;
    }

    if (pinInput === activeTransitOrder.orderPin) {
      // Success! Instant Escrow Release to Rider Wallet
      const riderFee = activeTransitOrder.riderPayout || 880;
      setRiderWallet(prev => prev + riderFee);
      onVerifyPinAndDeliver(activeTransitOrder.id);
      setPinInput('');
      setPinAttemptsLeft(3);
      alert(`PIN Verified Successfully! Handover approved. ₦${riderFee.toLocaleString()} has been instantly credited to your Rider Wallet.`);
    } else {
      const remaining = pinAttemptsLeft - 1;
      setPinAttemptsLeft(remaining);
      setPinInput('');

      if (remaining <= 0) {
        setIsLockedOut(true);
        setPinErrorMsg('TRANSACTION LOCKED: 3 consecutive incorrect PIN entries. LGA Operations Lead alerted for investigation.');
      } else {
        setPinErrorMsg(`INCORRECT PIN! ${remaining} attempt${remaining > 1 ? 's' : ''} remaining before transaction lockout.`);
      }
    }
  };

  const handleSimulateOffRoute = () => {
    setOffRouteAlertActive(true);
    onReportOffRoute(activeTransitOrder.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Rider Profile & Status Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Bike className="w-3 h-3" />
              Verified Dispatch Fleet
            </span>
            <span className="text-slate-400 text-xs">AMAC Zone A Locked • SLA Target: &lt;45 Mins</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Chinedu Okafor (Rider #AMAC-04)
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Assigned Zone: <strong>AMAC Zone A (Utako, Wuse, Maitama)</strong> • TVS Neo 125cc (Plate: ABJ-482-KU)
          </p>
        </div>

        {/* Rider Wallet & Acceptance Metrics */}
        <div className="flex items-center gap-3">
          <div className="bg-white/10 rounded-xl p-3 border border-white/10 text-xs">
            <span className="text-[10px] text-slate-400 block font-semibold">Today's Earnings</span>
            <span className="font-mono text-lg font-black text-emerald-400">₦{riderWallet.toLocaleString()}</span>
            <span className="text-[9px] text-emerald-300 block">Instant Split Payouts</span>
          </div>

          <div className="bg-white/10 rounded-xl p-3 border border-white/10 text-xs">
            <span className="text-[10px] text-slate-400 block font-semibold">Acceptance Rate</span>
            <span className="font-mono text-lg font-black text-blue-400">96.4%</span>
            <span className="text-[9px] text-blue-300 block">≥90% Bonus Eligible</span>
          </div>
        </div>
      </div>

      {/* Zone Isolation & Thermal Box Compliance Banner (FC-OPS Section 7 & 8) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Zone Isolation Rule */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold flex-shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-slate-900 flex items-center gap-2">
              <span>LGA Geofence Zone Isolation Rule</span>
              <span className="bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0.2 rounded font-mono">
                FC-OPS Sec 7
              </span>
            </h4>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              Your fleet is strictly locked to AMAC Zone A. You cannot receive Bwari or Gwagwalada jobs to preserve deep local street knowledge and short transit times (&lt;7km).
            </p>
          </div>
        </div>

        {/* Dual Compartment Thermal Box */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold flex-shrink-0">
            <ThermometerSnowflake className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-xs text-slate-900 flex items-center gap-2">
              <span>Dual-Compartment Insulated Thermal Box</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.2 rounded font-mono">
                Risk 1.2
              </span>
            </h4>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
              <span className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 font-semibold text-blue-700">
                <ThermometerSnowflake className="w-3 h-3" /> Cold Ice-Pack (4°C Raw Meat)
              </span>
              <span className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 font-semibold text-emerald-700">
                <Wind className="w-3 h-3" /> Ventilated Mesh (Leafy Greens)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Off-Route Alert Trigger (if triggered) */}
      {offRouteAlertActive && (
        <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-4 flex items-center justify-between gap-3 animate-pulse">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            <div>
              <p className="font-extrabold text-xs text-rose-900">
                CRITICAL GPS ALERT: Off-Route Stoppage &gt; 10 Minutes Detected!
              </p>
              <p className="text-xs text-rose-700">
                FreshCart Risk Matrix: Rider flagged for investigation. Ops Lead contacted. Deliver directly to destination immediately.
              </p>
            </div>
          </div>
          <button
            onClick={() => setOffRouteAlertActive(false)}
            className="text-xs font-bold bg-white text-rose-700 px-3 py-1.5 rounded-lg border border-rose-200 shadow-sm"
          >
            Clear Stoppage Alert
          </button>
        </div>
      )}

      {/* Main Grid: Active Transit Navigation vs 4-Digit Handshake Keypad */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Active Order & Route Navigation */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Active Dispatch Mission
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">
                  Order #{activeTransitOrder?.id}
                </h3>
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs font-extrabold px-3 py-1 rounded-full border border-blue-300">
                {activeTransitOrder?.status}
              </span>
            </div>

            {/* Hub Pickup vs Doorstep Destination */}
            <div className="mt-4 space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Origin Hub</span>
                <p className="font-bold text-slate-800">Utako Market Central Booth #01</p>
                <p className="text-slate-500 text-[11px]">Tamper Barcode: <strong>{activeTransitOrder?.agent?.barcodeSealId || 'BC-AMAC-99201-OK'}</strong></p>
              </div>

              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 text-xs space-y-1">
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Destination Landmark (Problem 1.3)</span>
                <p className="font-bold text-slate-900">{activeTransitOrder?.buyer?.deliveryAddress}</p>
                <p className="text-emerald-800 font-semibold">Landmark: {activeTransitOrder?.buyer?.landmark}</p>
                <p className="text-slate-500 text-[10px] font-mono">GPS Pin: {activeTransitOrder?.buyer?.gpsCoords}</p>
              </div>
            </div>

            {/* Buyer Contact & Transit Metrics */}
            <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-800">Recipient: {activeTransitOrder?.buyer?.name}</p>
                <p className="text-slate-500 font-mono text-[11px]">{activeTransitOrder?.buyer?.phone}</p>
              </div>
              <button 
                onClick={() => alert(`Calling Buyer ${activeTransitOrder?.buyer?.name} at ${activeTransitOrder?.buyer?.phone}...`)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3 py-2 rounded-lg flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Buyer</span>
              </button>
            </div>

            {/* Rider Delivery Compensation Box */}
            <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-emerald-800 font-bold block uppercase">Rider Payout on PIN Handshake</span>
                <span className="font-extrabold text-base text-emerald-900">₦{(activeTransitOrder?.riderPayout || 880).toLocaleString()}</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold bg-white px-2 py-1 rounded border border-emerald-200">
                80% Delivery Split
              </span>
            </div>

            {/* GPS Simulation Controls */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
              {activeTransitOrder?.status === 'READY_FOR_PICKUP' && (
                <button
                  onClick={() => onAcceptOrder(activeTransitOrder.id)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Bike className="w-4 h-4" />
                  <span>Scan Barcode Seal & Start Delivery Ride</span>
                </button>
              )}

              {activeTransitOrder?.status === 'IN_TRANSIT' && (
                <button
                  onClick={handleSimulateOffRoute}
                  className="bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-semibold text-xs px-3 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
                  title="Simulates Risk Mitigation Rule: GPS alerts if rider stops > 10 mins off-route"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                  <span>Test 10-Min Stoppage Alert</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: The 4-Digit Security PIN Handshake Keypad */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-black text-base text-white">
                    4-Digit Security PIN Handshake Terminal
                  </h3>
                </div>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
                  FC-OPS SEC 4
                </span>
              </div>

              {/* Strict Handover Rule Banner */}
              <div className="mt-3 bg-rose-500/20 border border-rose-500/30 rounded-xl p-3 text-xs text-rose-200 leading-tight">
                <strong>STRICT RULE: NO PIN = NO HANDOVER.</strong>
                <p className="text-[11px] text-rose-300 mt-0.5">
                  Do not release goods until the buyer gives you their 4-digit PIN. Never leave packages unattended.
                </p>
              </div>

              {/* PIN Code Display Boxes */}
              <div className="my-6">
                <div className="flex justify-center gap-3">
                  {[0, 1, 2, 3].map((idx) => {
                    const char = pinInput[idx];
                    return (
                      <div
                        key={idx}
                        className={`w-14 h-16 rounded-2xl border-2 flex items-center justify-center font-mono text-3xl font-black transition-all ${
                          char 
                            ? 'border-emerald-500 bg-emerald-950/40 text-emerald-400 shadow-lg shadow-emerald-500/10' 
                            : 'border-slate-700 bg-slate-800/60 text-slate-500'
                        }`}
                      >
                        {char ? '•' : ''}
                      </div>
                    );
                  })}
                </div>

                {/* Status / Error Message */}
                {pinErrorMsg && (
                  <div className={`mt-3 text-center text-xs font-bold px-3 py-1.5 rounded-lg ${
                    isLockedOut ? 'bg-rose-900/60 text-rose-300 border border-rose-700' : 'bg-amber-900/50 text-amber-300'
                  }`}>
                    {pinErrorMsg}
                  </div>
                )}
              </div>

              {/* Interactive Numeric Keypad */}
              <div className="grid grid-cols-3 gap-2.5 max-w-xs mx-auto">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleDigit(num.toString())}
                    disabled={isLockedOut || activeTransitOrder?.status === 'DELIVERED'}
                    className="h-12 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 disabled:opacity-30 rounded-xl font-mono text-xl font-bold text-white transition-all shadow-sm flex items-center justify-center"
                  >
                    {num}
                  </button>
                ))}

                <button
                  onClick={handleClear}
                  disabled={isLockedOut || activeTransitOrder?.status === 'DELIVERED'}
                  className="h-12 bg-slate-800/60 hover:bg-slate-700 disabled:opacity-30 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-all flex items-center justify-center"
                >
                  Clear
                </button>

                <button
                  onClick={() => handleDigit('0')}
                  disabled={isLockedOut || activeTransitOrder?.status === 'DELIVERED'}
                  className="h-12 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 disabled:opacity-30 rounded-xl font-mono text-xl font-bold text-white transition-all shadow-sm flex items-center justify-center"
                >
                  0
                </button>

                <button
                  onClick={handleBackspace}
                  disabled={isLockedOut || activeTransitOrder?.status === 'DELIVERED'}
                  className="h-12 bg-slate-800/60 hover:bg-slate-700 disabled:opacity-30 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-all flex items-center justify-center"
                >
                  ⌫
                </button>
              </div>
            </div>

            {/* Handshake Verification Action */}
            <div className="mt-6 pt-4 border-t border-slate-800">
              <button
                onClick={handleSubmitPin}
                disabled={isLockedOut || pinInput.length !== 4 || activeTransitOrder?.status === 'DELIVERED'}
                className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-black text-sm py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {activeTransitOrder?.status === 'DELIVERED'
                    ? 'Delivered & Escrow Settled'
                    : 'Verify PIN & Unlock Split Settlement'}
                </span>
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
