import React, { useState } from 'react';
import { 
  Store, 
  Scale, 
  QrCode, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  ThermometerSnowflake, 
  Send, 
  RefreshCw,
  FileCheck,
  UserCheck,
  PackageCheck
} from 'lucide-react';

export function MarketAgentView({ 
  orders, 
  onUpdateOrderStatus, 
  onLogVendorStrike,
  vendorsList 
}) {
  const [selectedOrderId, setSelectedOrderId] = useState(orders.find(o => o.status === 'PACKING')?.id || orders[0]?.id);
  const [simulatedScaleWeight, setSimulatedScaleWeight] = useState(2520); // grams
  const [scaleCalibrated, setScaleCalibrated] = useState(true);
  const [isWeighed, setIsWeighed] = useState(false);
  const [isSealGenerated, setIsSealGenerated] = useState(false);
  const [generatedSealCode, setGeneratedSealCode] = useState('');
  const [morningPriceAuditDone, setMorningPriceAuditDone] = useState(true);
  const [stagingMinutes, setStagingMinutes] = useState(4); // Non-refrigerated staging timer (< 10 min cap)
  const [returnInspectionOrder, setReturnInspectionOrder] = useState(null);
  const [returnFindings, setReturnFindings] = useState('vendor_fault'); // 'vendor_fault' | 'rider_fault' | 'fraudulent_buyer'

  const activeOrder = orders.find(o => o.id === selectedOrderId) || orders[0];

  const handleWeighItem = () => {
    setIsWeighed(true);
  };

  const handleGenerateSeal = () => {
    const sealCode = `BC-AMAC-${Math.floor(10000 + Math.random() * 89999)}-SEALED`;
    setGeneratedSealCode(sealCode);
    setIsSealGenerated(true);
  };

  const handleReadyForPickup = () => {
    if (!isWeighed || !isSealGenerated) {
      alert("Quality Control Invariant: You must digitally weigh all items and affix the tamper-evident barcode seal before broadcasting for rider pickup!");
      return;
    }

    onUpdateOrderStatus(activeOrder.id, 'READY_FOR_PICKUP', {
      barcodeSealId: generatedSealCode,
      weighingCheckPassed: true,
      scaleCalibrationTimestamp: '06:30 AM'
    });

    setIsWeighed(false);
    setIsSealGenerated(false);
    setGeneratedSealCode('');
  };

  const handleProcessReturn = () => {
    if (!returnInspectionOrder) return;

    if (returnFindings === 'vendor_fault') {
      onLogVendorStrike('Mama Nkechi Veggie Hub (Stall 12, Utako)', 'Bruised & wilted produce supplied to booth');
      alert(`Return Confirmed: Vendor absorbs produce cost. Strike recorded for vendor (Mama Nkechi Veggie Hub).`);
    } else if (returnFindings === 'rider_fault') {
      alert(`Return Confirmed: Broken seal identified. Rider assessed 100% delivery penalty fine.`);
    } else {
      alert(`Return Confirmed: False quality claim detected. Buyer account flagged for mandatory PIN pre-validation.`);
    }

    onUpdateOrderStatus(returnInspectionOrder.id, 'RETURN_PROCESSED');
    setReturnInspectionOrder(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Booth Header & Operational Identity */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-2xl p-6 shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Store className="w-3 h-3" />
              LGA Aggregation Node
            </span>
            <span className="text-slate-400 text-xs">AMAC Zone A • Hub-and-Spoke Model</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Utako Market Central Agent Booth #01
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Direct physical aggregation booth inside Utako Market. Market agents verify partner stall produce, calibrate weights on digital scales, apply tamper-evident barcode seals, and maintain cold-chain integrity.
          </p>
        </div>

        {/* Quality Station Readiness Badges */}
        <div className="flex flex-row md:flex-col gap-2 flex-shrink-0">
          <div className="bg-white/10 rounded-xl px-3 py-1.5 border border-white/10 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <div>
              <span className="text-[10px] text-slate-400 block leading-tight">Digital Scale Status</span>
              <strong className="text-white text-xs">Calibrated (6:30 AM Audit)</strong>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl px-3 py-1.5 border border-white/10 text-xs flex items-center gap-2">
            <ThermometerSnowflake className="w-4 h-4 text-blue-400" />
            <div>
              <span className="text-[10px] text-slate-400 block leading-tight">Booth Cold Storage</span>
              <strong className="text-white text-xs">Chilled Ice Boxes @ 4°C</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 6:30 AM Daily Price Volatility Audit Notification (FC-OPS Section 12) */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold flex-shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-amber-950 flex items-center gap-2">
              <span>6:30 AM Daily Open-Air Market Price Volatility Audit</span>
              <span className="bg-amber-200 text-amber-900 text-[10px] px-1.5 py-0.2 rounded font-mono">
                Risk 1 Safeguard
              </span>
            </h4>
            <p className="text-xs text-amber-800 mt-0.5">
              Market wholesale prices audited at sunrise. Catalog retail spreads locked for today at 7:30 AM.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => {
              setMorningPriceAuditDone(true);
              alert("Price Audit Re-Verified: Utako Market wholesale rates confirmed. 10% gross retail margin protected.");
            }}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Re-Audit Stall Rates</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Orders to Pack vs Quality Control Digital Scale Station */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Live Packing Queue */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <span>Incoming LGA Order Queue</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {orders.filter(o => ['PACKING', 'PENDING_HUB'].includes(o.status)).length} Active
                </span>
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">Utako Hub #01</span>
            </div>

            <div className="mt-4 space-y-3">
              {orders.map((o) => (
                <div
                  key={o.id}
                  onClick={() => setSelectedOrderId(o.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedOrderId === o.id
                      ? 'bg-emerald-50 border-emerald-500 shadow-sm ring-1 ring-emerald-500'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-black text-xs text-slate-900">Order #{o.id}</span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      o.status === 'PACKING' 
                        ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                        : o.status === 'READY_FOR_PICKUP'
                          ? 'bg-blue-100 text-blue-800 border border-blue-300'
                          : o.status === 'DELIVERED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-200 text-slate-700'
                    }`}>
                      {o.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 font-medium">
                    Buyer: <strong>{o.buyer.name}</strong> • {o.buyer.landmark}
                  </p>
                  
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                    <span>{o.items.length} items to assemble</span>
                    <span className="font-bold text-slate-900">₦{o.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vetted Partner Stalls Health (Hub-and-Spoke Criteria) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h4 className="font-extrabold text-xs text-slate-900 mb-3 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>Vetted Utako Market Partner Vendors (3 Checks)</span>
            </h4>
            <div className="space-y-2">
              {vendorsList.map((vendor, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-800">{vendor.vendorName}</p>
                    <p className="text-[10px] text-slate-500">{vendor.category} • Hygiene: {vendor.hygieneRating}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      vendor.strikes === 0 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {vendor.strikes === 0 ? 'Verified' : `${vendor.strikes}/3 Strikes`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Digital Scale, Tamper Seal, & Dispatch Packing Station */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Quality Control Station
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">
                  Assembly & Barcode Seal: Order #{activeOrder?.id}
                </h3>
              </div>

              {/* Perishable Staging Timer Capping Under 10 Mins (FC-OPS Section 12 Risk 2) */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl px-3 py-1.5 flex items-center gap-2 text-xs">
                <Clock className="w-4 h-4 text-blue-600" />
                <div>
                  <span className="text-[10px] text-blue-600 font-bold block leading-tight">Non-Refrigerated Staging</span>
                  <span className="font-black text-blue-900">{stagingMinutes} min elapsed (Cap: 10m)</span>
                </div>
              </div>
            </div>

            {/* Assemble Checklist */}
            <div className="mt-4 space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Assemble Items From Vetted Stalls:
              </h4>
              <div className="space-y-2">
                {activeOrder?.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px]">
                        {idx + 1}
                      </span>
                      <div>
                        <span className="font-bold text-slate-800">{item.name}</span>
                        <span className="block text-[10px] text-emerald-700 font-mono">{item.standardUnit}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-slate-600">Qty: {item.qty}</span>
                      <span className="block text-[10px] font-bold text-slate-900">₦{(item.price * item.qty).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Digital Scale Weighing Routine Simulator (FC-RISK 2.1) */}
            <div className="mt-6 bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-emerald-400" />
                  <div>
                    <h4 className="font-black text-sm text-white">Calibrated Digital Scale Bench</h4>
                    <p className="text-[10px] text-slate-400">Zero-tolerance weight verification against digital metric standards</p>
                  </div>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30">
                  CALIBRATED
                </span>
              </div>

              {/* Digital LED Display */}
              <div className="bg-black/60 rounded-xl p-4 border border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Scale Net Weight</span>
                  <div className="font-mono text-3xl font-black text-emerald-400 tracking-wider">
                    {simulatedScaleWeight.toLocaleString()} <span className="text-sm font-sans text-emerald-600">g (2.52 kg)</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Tolerance Check</span>
                  <span className="font-bold text-xs text-emerald-400 flex items-center gap-1 justify-end">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Within 2% Spec
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-1">
                <button
                  onClick={handleWeighItem}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                    isWeighed 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  <Scale className="w-4 h-4" />
                  <span>{isWeighed ? '✓ Weight Verified & Certified' : 'Verify Produce Net Weight'}</span>
                </button>
              </div>
            </div>

            {/* Tamper-Evident Barcode Seal Generator (FC-RISK 2.1 & 2.2) */}
            <div className="mt-6 bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-emerald-700" />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Tamper-Evident Barcode Seal Printer</h4>
                    <p className="text-[10px] text-slate-500">Affixed over bio-bag closure before handover to dispatch rider</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">FC-RISK 2.1</span>
              </div>

              {isSealGenerated ? (
                <div className="bg-white rounded-xl p-3 border-2 border-emerald-500 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="font-mono text-xl font-black bg-slate-900 text-emerald-400 px-3 py-1.5 rounded tracking-widest">
                      ||| | |||| |
                    </div>
                    <div>
                      <p className="font-mono text-xs font-black text-slate-900">{generatedSealCode}</p>
                      <p className="text-[10px] text-slate-500">Applied & Logged at Utako Booth (6:30 AM Calibrated)</p>
                    </div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2 py-1 rounded">
                    SEALED
                  </span>
                </div>
              ) : (
                <button
                  onClick={handleGenerateSeal}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <QrCode className="w-4 h-4 text-emerald-400" />
                  <span>Generate & Affix Barcode Tamper Seal</span>
                </button>
              )}
            </div>

            {/* Ready for Pickup Action Button */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={handleReadyForPickup}
                disabled={activeOrder?.status === 'READY_FOR_PICKUP' || activeOrder?.status === 'IN_TRANSIT'}
                className={`w-full py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                  activeOrder?.status === 'READY_FOR_PICKUP' || activeOrder?.status === 'IN_TRANSIT'
                    ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>
                  {activeOrder?.status === 'READY_FOR_PICKUP'
                    ? 'Broadcasted to Riders within 2km'
                    : activeOrder?.status === 'IN_TRANSIT'
                      ? 'In Transit with Rider'
                      : 'Mark Ready for Pickup & Auto-Broadcast to Nearest Rider'}
                </span>
              </button>
            </div>
          </div>

          {/* Return-to-Booth Protocol Desk (FC-RISK 2.3) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <h4 className="font-extrabold text-xs text-slate-900">
                  Return-to-Booth Re-Inspection Desk (FC-RISK 2.3)
                </h4>
              </div>
              <span className="text-[10px] bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded font-bold">
                Zero-Tolerance Invariant
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-2">
              If a buyer rejects produce at doorstep, the rider must bring the sealed package back to this booth before any refund or replacement is authorized.
            </p>

            <div className="mt-3 flex items-center gap-3">
              <select
                value={returnInspectionOrder?.id || ''}
                onChange={(e) => setReturnInspectionOrder(orders.find(o => o.id === e.target.value) || null)}
                className="bg-slate-50 border border-slate-200 rounded-lg text-xs p-2 font-medium text-slate-800 flex-1"
              >
                <option value="">Select Returned Order for Audit...</option>
                {orders.map(o => (
                  <option key={o.id} value={o.id}>Order #{o.id} - {o.buyer.name}</option>
                ))}
              </select>

              <select
                value={returnFindings}
                onChange={(e) => setReturnFindings(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg text-xs p-2 font-medium text-slate-800"
              >
                <option value="vendor_fault">Vendor Strike: Produce Spoiled/Bruised</option>
                <option value="rider_fault">Rider Penalty: Broken Seal Tampering</option>
                <option value="fraudulent_buyer">Buyer Flag: False Claim</option>
              </select>

              <button
                onClick={handleProcessReturn}
                disabled={!returnInspectionOrder}
                className={`text-xs font-bold px-4 py-2 rounded-lg transition-all ${
                  returnInspectionOrder
                    ? 'bg-rose-600 hover:bg-rose-700 text-white'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Log Finding
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
