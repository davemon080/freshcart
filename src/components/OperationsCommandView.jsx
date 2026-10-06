import React, { useState } from 'react';
import { 
  ShieldAlert, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  Scale, 
  Banknote, 
  MapPin, 
  Zap, 
  ListChecks, 
  FileText,
  Building,
  RefreshCw,
  XCircle,
  Award
} from 'lucide-react';
import { RISK_ENFORCEMENT_RULES } from '../data/freshcartData';

export function OperationsCommandView({ 
  orders, 
  vendorsList, 
  onLogVendorStrike, 
  onResetVendorStrike,
  isPeakHour, 
  setIsPeakHour 
}) {
  const [activeTab, setActiveTab] = useState('kpis'); // 'kpis' | 'settlement' | 'risk_rules' | 'roadmap'
  const [batchSettlementRun, setBatchSettlementRun] = useState(false);
  const [lastBatchTime, setLastBatchTime] = useState('12:00 PM Mid-Day Run');

  // Completed orders for settlement
  const pinCompletedOrders = orders.filter(o => o.status === 'DELIVERED');
  const totalSettlementPending = pinCompletedOrders.reduce((sum, o) => sum + (o.vendorShare || 0), 0);

  const handleRunBatchPayout = () => {
    setBatchSettlementRun(true);
    setLastBatchTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Manual Batch Run');
    alert(`Twice-Daily Batch Payout Triggered! ₦${totalSettlementPending.toLocaleString()} successfully disbursed across vetted Utako Market partner bank accounts.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Ops Command Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              LGA Operations Command Center
            </span>
            <span className="text-slate-400 text-xs">Reference: FC-OPS-2026-V1 & FC-RISK-2026-V1</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Abuja LGA Operations & Risk Engine (AMAC)
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Real-time monitoring of LGA micro-hubs, 4-digit PIN verification compliance, automated twice-daily batch payouts, and zero-tolerance produce quality enforcement.
          </p>
        </div>

        {/* Lead Identity & Peak Simulator */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="bg-white/10 px-3 py-2 rounded-xl border border-white/10 text-xs">
            <span className="text-[10px] text-slate-400 block font-semibold">Project Lead</span>
            <span className="font-extrabold text-white">Ujah Israel O.</span>
          </div>

          <button
            onClick={() => setIsPeakHour(!isPeakHour)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              isPeakHour
                ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{isPeakHour ? 'Peak 5km Geofence ACTIVE' : 'Toggle 4PM Peak Lock'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar">
        {[
          { id: 'kpis', label: 'Master KPIs & SLA Targets' },
          { id: 'settlement', label: 'Twice-Daily Automated Payouts' },
          { id: 'risk_rules', label: 'Trust & Risk Matrix Enforcement' },
          { id: 'roadmap', label: 'Pilot Pre-Launch & Phased Roadmap' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: MASTER KPIS & SLA TARGETS (FC-OPS Section 2) */}
      {activeTab === 'kpis' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* KPI 1: Delivery Velocity */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-extrabold text-slate-400 uppercase tracking-wider text-[10px]">
                    Target 1: Velocity
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    SLA: &lt;45 Mins
                  </span>
                </div>
                <div className="font-mono text-3xl font-black text-slate-900">
                  38.4 <span className="text-sm font-sans font-bold text-slate-500">mins</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Average fulfillment time across AMAC LGA orders today.</p>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
                <span>100% within 30–90m window</span>
              </div>
            </div>

            {/* KPI 2: Produce Integrity */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-extrabold text-slate-400 uppercase tracking-wider text-[10px]">
                    Target 2: Integrity
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    Goal: &lt;1.5%
                  </span>
                </div>
                <div className="font-mono text-3xl font-black text-emerald-600">
                  0.72%
                </div>
                <p className="text-xs text-slate-500 mt-1">Produce rejection rate upon buyer doorstep inspection.</p>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero rot tolerance compliant</span>
              </div>
            </div>

            {/* KPI 3: PIN Handshake Compliance */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-extrabold text-slate-400 uppercase tracking-wider text-[10px]">
                    Target 3: Handshake
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    Mandatory 100%
                  </span>
                </div>
                <div className="font-mono text-3xl font-black text-slate-900">
                  100.0%
                </div>
                <p className="text-xs text-slate-500 mt-1">Riders entering 4-digit PIN before releasing package.</p>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero unauthorized handovers</span>
              </div>
            </div>

            {/* KPI 4: LGA Density */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-extrabold text-slate-400 uppercase tracking-wider text-[10px]">
                    Target 4: LGA Liquidity
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    Min 15 Agents / 20 Riders
                  </span>
                </div>
                <div className="font-mono text-3xl font-black text-slate-900">
                  15 <span className="text-xs font-sans text-slate-400">Agents</span> / 22 <span className="text-xs font-sans text-slate-400">Riders</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Active fleet density stationed in AMAC Zone A.</p>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
                <span>Pre-Launch Liquidity Met</span>
              </div>
            </div>

          </div>

          {/* Active LGA Micro-Hubs Overview */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-black text-base text-slate-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <span>LGA Micro-Hubs Deployment Architecture (FC-OPS Section 7)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-emerald-950">Utako Market Booth #01</span>
                  <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-bold">PRIMARY HUB</span>
                </div>
                <p className="text-xs text-slate-600">AMAC Zone A • 4 Market Agents • 15 Riders Stationed</p>
                <div className="text-[11px] text-slate-500 pt-2 border-t border-emerald-200/60 flex justify-between">
                  <span>Coverage: Utako, Wuse 2, Maitama, Jabi</span>
                  <span className="font-bold text-emerald-800">&lt; 5.2 km</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">Garki Model Market Booth #02</span>
                  <span className="text-[10px] bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-bold">SECONDARY HUB</span>
                </div>
                <p className="text-xs text-slate-600">AMAC Zone A • 3 Market Agents • 10 Riders Stationed</p>
                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200 flex justify-between">
                  <span>Coverage: Garki 1 & 2, Area 1–11, Guzape</span>
                  <span className="font-bold text-slate-800">&lt; 4.8 km</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">Kubwa Market Booth #03</span>
                  <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">PHASE 3 EXPANSION</span>
                </div>
                <p className="text-xs text-slate-600">Bwari Area Council (Zone B) • 2 Market Agents • 8 Riders</p>
                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200 flex justify-between">
                  <span>Coverage: Kubwa, PW, Phase 4</span>
                  <span className="font-bold text-slate-800">Zone Locked</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AUTOMATED TWICE-DAILY BATCH PAYOUTS (FC-RISK 3.3) */}
      {activeTab === 'settlement' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <Banknote className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-black text-lg text-slate-900">
                    Automated Twice-Daily Batch Payouts Engine
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  FC-RISK Rule 3.3: Market traders operate on tight daily cash flow. FreshCart executes automated bank payouts twice daily (12:00 PM mid-day batch & 6:00 PM evening batch) for all PIN-completed orders.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right text-xs">
                  <span className="text-slate-400 block text-[10px] font-semibold">Last Batch Execution</span>
                  <strong className="text-slate-800">{lastBatchTime}</strong>
                </div>

                <button
                  onClick={handleRunBatchPayout}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Execute Automated Batch Run Now</span>
                </button>
              </div>
            </div>

            {/* Payout Batches Summary Cards */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Mid-Day Batch (12:00 PM)
                </span>
                <span className="font-mono text-2xl font-black text-slate-900 mt-1 block">₦148,200</span>
                <span className="text-[11px] text-emerald-700 font-semibold">Disbursed to 14 Traders • Success</span>
              </div>

              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                  Evening Batch (6:00 PM Pending)
                </span>
                <span className="font-mono text-2xl font-black text-emerald-950 mt-1 block">
                  ₦{totalSettlementPending.toLocaleString()}
                </span>
                <span className="text-[11px] text-emerald-800 font-semibold">
                  {pinCompletedOrders.length} PIN-Verified Orders Queued
                </span>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Rider Instant Split Wallet
                </span>
                <span className="font-mono text-2xl font-black text-slate-900 mt-1 block">₦28,400</span>
                <span className="text-[11px] text-blue-700 font-semibold">Settled Instantly upon 4-digit PIN Entry</span>
              </div>
            </div>

            {/* Payment Mode Matrix (FC-RISK Page 3) */}
            <div className="mt-6">
              <h4 className="font-black text-xs text-slate-700 uppercase tracking-wider mb-3">
                Comprehensive Payment System Risk Matrix (FC-RISK Sec 3)
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
                  <thead className="bg-slate-100 text-slate-700 font-extrabold uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Payment Mode</th>
                      <th className="p-3">Risk Profile</th>
                      <th className="p-3">FreshCart Control System</th>
                      <th className="p-3">Settlement SLA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr className="bg-white">
                      <td className="p-3 font-bold text-slate-900">In-App Escrow Wallet</td>
                      <td className="p-3"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">ZERO RISK</span></td>
                      <td className="p-3 text-slate-600">Pre-funded balance; instant escrow lock on order placement.</td>
                      <td className="p-3 font-semibold text-emerald-700">Instant upon PIN entry</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-3 font-bold text-slate-900">Debit Card (Paystack)</td>
                      <td className="p-3"><span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold text-[10px]">LOW RISK</span></td>
                      <td className="p-3 text-slate-600">3D-Secure authentication; auto-charge before booth picking.</td>
                      <td className="p-3 font-semibold text-slate-700">T+1 or Instant via Gateway</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-3 font-bold text-slate-900">Bank Transfer</td>
                      <td className="p-3"><span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold text-[10px]">MEDIUM RISK</span></td>
                      <td className="p-3 text-slate-600">Dedicated dynamic virtual account per transaction.</td>
                      <td className="p-3 font-semibold text-slate-700">Within 30 seconds</td>
                    </tr>
                    <tr className="bg-rose-50/50">
                      <td className="p-3 font-bold text-rose-900">Cash on Delivery</td>
                      <td className="p-3"><span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-bold text-[10px]">HIGH RISK</span></td>
                      <td className="p-3 text-rose-700 font-semibold">DISABLED to eliminate rider safety risks & non-payment.</td>
                      <td className="p-3 text-rose-700 font-bold">N/A (Not Supported)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TRUST & RISK MATRIX ENFORCEMENT (FC-RISK Section 2) */}
      {activeTab === 'risk_rules' && (
        <div className="space-y-6">
          {/* Trust Enforcement Table */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-black text-base text-slate-900 mb-2">
              Trust & Quality Enforcement Invariants (FC-RISK Table 2)
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Automated safeguards that govern vendors, riders, and buyers across all LGA micro-hubs.
            </p>

            <div className="space-y-3">
              {RISK_ENFORCEMENT_RULES.map((rule, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-extrabold text-sm text-slate-900 block">{rule.riskVector}</span>
                    <span className="text-slate-500 block mt-0.5">
                      <strong>Detection:</strong> {rule.detectionMechanism}
                    </span>
                  </div>
                  <div className="md:text-right">
                    <span className="font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded inline-block">
                      {rule.penalty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vendor 3-Strike Discipline Desk */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h4 className="font-black text-sm text-slate-900">
                  Utako Market Partner Vendor 3-Strike Governance Desk
                </h4>
                <p className="text-xs text-slate-500">FC-RISK 2.1: 3 strikes on spoiled or bait-and-switch produce results in permanent platform ban.</p>
              </div>
            </div>

            <div className="space-y-3">
              {vendorsList.map((vendor, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-slate-800">{vendor.vendorName}</p>
                    <p className="text-[11px] text-slate-500">{vendor.category} • Hygiene Rating: {vendor.hygieneRating}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3].map((strikeIndex) => (
                        <span
                          key={strikeIndex}
                          className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                            vendor.strikes >= strikeIndex
                              ? 'bg-rose-600 text-white'
                              : 'bg-slate-200 text-slate-400'
                          }`}
                        >
                          ✕
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => onLogVendorStrike(vendor.vendorName, 'Sub-standard produce flagged at doorstep inspection')}
                      className="text-[10px] font-bold bg-rose-100 hover:bg-rose-200 text-rose-800 px-2.5 py-1 rounded"
                    >
                      + Add Strike
                    </button>

                    {vendor.strikes > 0 && (
                      <button
                        onClick={() => onResetVendorStrike(vendor.vendorName)}
                        className="text-[10px] font-bold bg-slate-200 hover:bg-slate-300 text-slate-700 px-2 py-1 rounded"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PILOT READINESS & MASTER PHASED ROADMAP (FC-OPS Section 15 & 16) */}
      {activeTab === 'roadmap' && (
        <div className="space-y-6">
          {/* Phased Execution Roadmap */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-black text-base text-slate-900 mb-4">
              Master Phased Execution Roadmap (FC-OPS Section 15)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl border-2 border-emerald-500 bg-emerald-50/40 space-y-2">
                <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  Phase 1 (Months 1–2) • CURRENT
                </span>
                <h4 className="font-bold text-sm text-slate-900">Pilot Setup in AMAC</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Establish primary booth inside Utako Market. Onboard 10 partner vendors, train 4 market agents, recruit 15 dedicated riders. Closed beta in Garki, Wuse, Maitama.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <span className="text-[10px] font-black uppercase text-slate-500 bg-slate-200 px-2 py-0.5 rounded">
                  Phase 2 (Months 3–5)
                </span>
                <h4 className="font-bold text-sm text-slate-900">AMAC Full Launch</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Open secondary booth inside Garki Model Market. Scale estate entrance flyers, household campaigns. Target volume: 250 daily orders.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <span className="text-[10px] font-black uppercase text-slate-500 bg-slate-200 px-2 py-0.5 rounded">
                  Phase 3 (Months 6–9)
                </span>
                <h4 className="font-bold text-sm text-slate-900">FCT Expansion</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Replicate model in Bwari Area Council (Kubwa Market) and Gwagwalada. Launch scheduled weekly bulk subscriptions ("Family Fruit Basket").
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <span className="text-[10px] font-black uppercase text-slate-500 bg-slate-200 px-2 py-0.5 rounded">
                  Phase 4 (Months 10–12)
                </span>
                <h4 className="font-bold text-sm text-slate-900">Multi-State Rollout</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Expand platform operations to high-density commercial centers in Lagos (Ikeja, Lekki LGAs) and Port Harcourt. Direct farm-to-agent sourcing.
                </p>
              </div>
            </div>
          </div>

          {/* Pilot Readiness Pre-Launch Checklist */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-black text-base text-slate-900 mb-4 flex items-center gap-2">
              <ListChecks className="w-5 h-5 text-emerald-600" />
              <span>Pilot Readiness Pre-Launch Checklist (FC-OPS Section 16)</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 font-extrabold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Operational Area</th>
                    <th className="p-3">Key Milestone Task</th>
                    <th className="p-3">Owner</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="bg-white">
                    <td className="p-3 font-bold text-slate-900">Market Infrastructure</td>
                    <td className="p-3 text-slate-600">Secure physical agent booth space inside Utako Market & install digital weighing scales.</td>
                    <td className="p-3 font-semibold text-slate-700">Ujah Israel O.</td>
                    <td className="p-3"><span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold text-[10px]">IN PROGRESS</span></td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 font-bold text-slate-900">Vendor Partnerships</td>
                    <td className="p-3 text-slate-600">Sign MOU with 10 core vendors across Meat, Vegetables, Fruits, and Grains.</td>
                    <td className="p-3 font-semibold text-slate-700">Ops Manager</td>
                    <td className="p-3"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">READY</span></td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 font-bold text-slate-900">Rider Fleet</td>
                    <td className="p-3 text-slate-600">Onboard and train 15 riders; distribute thermal delivery boxes and branded gear.</td>
                    <td className="p-3 font-semibold text-slate-700">Logistics Lead</td>
                    <td className="p-3"><span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold text-[10px]">IN PROGRESS</span></td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 font-bold text-slate-900">Quality Supplies</td>
                    <td className="p-3 text-slate-600">Procure 5,000 branded eco-friendly bags and 2,000 tamper-evident barcode seals.</td>
                    <td className="p-3 font-semibold text-slate-700">Procurement Lead</td>
                    <td className="p-3"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">READY</span></td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 font-bold text-slate-900">Legal & Compliance</td>
                    <td className="p-3 text-slate-600">Finalize Terms of Service, Privacy Policy, and Local Government Business Permits.</td>
                    <td className="p-3 font-semibold text-slate-700">Legal Counsel</td>
                    <td className="p-3"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">READY</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
