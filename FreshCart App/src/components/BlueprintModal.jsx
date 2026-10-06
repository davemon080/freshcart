import React, { useState } from 'react';
import { 
  BookOpen, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  X, 
  Layers, 
  ArrowRight,
  Scale,
  Bike,
  Lock,
  Banknote,
  AlertTriangle
} from 'lucide-react';

export function BlueprintModal({ isOpen, onClose }) {
  const [activeDoc, setActiveDoc] = useState('ops'); // 'ops' | 'risk'

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Official Blueprint Specification
              </span>
              <span className="text-slate-400 text-xs">Author & Lead: Ujah Israel O.</span>
            </div>
            <h2 className="text-xl font-black text-white mt-1">
              FreshCart Master System Blueprint & Risk Mitigation Framework
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-sm transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Document Switcher Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 py-2 gap-2">
          <button
            onClick={() => setActiveDoc('ops')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeDoc === 'ops'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Operations Manual (FC-OPS-2026-V1)</span>
          </button>

          <button
            onClick={() => setActiveDoc('risk')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeDoc === 'risk'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Risk Mitigation Framework (FC-RISK-2026-V1)</span>
          </button>
        </div>

        {/* Document Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700 text-xs leading-relaxed">
          
          {activeDoc === 'ops' ? (
            <div className="space-y-6">
              {/* Section 1 & 2 */}
              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 space-y-2">
                <span className="font-extrabold text-emerald-800 text-[10px] uppercase tracking-wider block">
                  1. Executive Summary & Core Strategic Differentiation
                </span>
                <h3 className="font-black text-base text-slate-900">The LGA Geofence Invariant</h3>
                <p>
                  FreshCart is a hyper-local mobile marketplace engineered to eliminate the friction, physical strain, and spoilage risks of buying fresh groceries in urban Nigerian LGAs (AMAC, Bwari, Gwagwalada). 
                </p>
                <p className="bg-white p-3 rounded-xl border border-slate-200 font-medium text-slate-800">
                  <strong>The Rule:</strong> Unlike traditional e-commerce shipping goods across city borders through centralized hubs, FreshCart enforces a strict LGA-Bounded Fulfillment Rule. Orders are routed exclusively to market traders and riders stationed inside that same LGA (&lt;7km radius).
                </p>
              </div>

              {/* Section 4: PIN Protocol */}
              <div className="border border-slate-200 rounded-2xl p-5 space-y-3">
                <span className="font-extrabold text-emerald-800 text-[10px] uppercase tracking-wider block">
                  4. The 4-Digit Security PIN Verification Protocol
                </span>
                <h3 className="font-black text-base text-slate-900">Zero-Friction Doorstep Escrow</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-bold text-slate-900">Perfect Order</p>
                    <p className="text-[11px] text-slate-500 mt-1">Buyer inspects bag, releases PIN to rider. Escrow releases funds immediately.</p>
                  </div>
                  <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
                    <p className="font-bold text-rose-900">Damaged / Spoiled Item</p>
                    <p className="text-[11px] text-rose-700 mt-1">Buyer withholds PIN. Rider returns item to market booth immediately.</p>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                    <p className="font-bold text-amber-900">Incorrect Unit / Quantity</p>
                    <p className="text-[11px] text-amber-700 mt-1">Market Agent approves bypass or dispatches rider replacement within 20 mins.</p>
                  </div>
                </div>
              </div>

              {/* Section 6: Unit Standardization Table */}
              <div className="border border-slate-200 rounded-2xl p-5 space-y-3">
                <span className="font-extrabold text-emerald-800 text-[10px] uppercase tracking-wider block">
                  6. Local Produce Unit Standardization Framework
                </span>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border border-slate-200 rounded-xl overflow-hidden">
                    <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="p-2.5">Category</th>
                        <th className="p-2.5">Traditional Unit</th>
                        <th className="p-2.5">Digital Metric Standard</th>
                        <th className="p-2.5">Tolerance & Quality</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="p-2.5 font-bold">Fresh Vegetables</td>
                        <td className="p-2.5">"Tie" / Bunch</td>
                        <td className="p-2.5 font-semibold text-emerald-800">Standard 500g Cleaned Bundle</td>
                        <td className="p-2.5">Washed, root-trimmed, zero yellowing</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold">Tomatoes / Peppers</td>
                        <td className="p-2.5">"Painter Bucket" / "Basket"</td>
                        <td className="p-2.5 font-semibold text-emerald-800">Exact Weight (2.5kg / 5.0kg)</td>
                        <td className="p-2.5">Firm skin, max 2% softness tolerance</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold">Fresh Meat & Poultry</td>
                        <td className="p-2.5">"Kilo" / "Quarter"</td>
                        <td className="p-2.5 font-semibold text-emerald-800">Net Weight 1.0kg Vacuum-Sealed</td>
                        <td className="p-2.5">Slaughtered same-day, chilled at 4°C</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold">Grains & Staples</td>
                        <td className="p-2.5">"Mudu" / "Derica"</td>
                        <td className="p-2.5 font-semibold text-emerald-800">Standardized 1.5kg Sealed Pouch</td>
                        <td className="p-2.5">De-stoned, machine-cleaned, moisture &lt; 12%</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold">Tubers & Roots</td>
                        <td className="p-2.5">"Heap of 5"</td>
                        <td className="p-2.5 font-semibold text-emerald-800">Weight Grade (3.0kg+ Tuber)</td>
                        <td className="p-2.5">Unbroken skin, firm endpoints, zero rot</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 11: Unit Economics Table */}
              <div className="border border-slate-200 rounded-2xl p-5 bg-emerald-50/40 space-y-3">
                <span className="font-extrabold text-emerald-800 text-[10px] uppercase tracking-wider block">
                  11. Sample Order Unit Economics Breakdown (₦10,000 Basket)
                </span>
                <div className="overflow-x-auto">
                  <table className="w-full text-left bg-white border border-emerald-200 rounded-xl overflow-hidden font-mono">
                    <thead className="bg-emerald-100/70 text-emerald-950 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="p-2.5">Component</th>
                        <th className="p-2.5">Amount (NGN)</th>
                        <th className="p-2.5">% Total</th>
                        <th className="p-2.5 font-sans">Recipient / Purpose</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-emerald-100">
                      <tr>
                        <td className="p-2.5">Gross Basket Value (Produce)</td>
                        <td className="p-2.5 font-bold">₦10,000</td>
                        <td className="p-2.5">88.5%</td>
                        <td className="p-2.5 font-sans">Customer Food Subtotal</td>
                      </tr>
                      <tr>
                        <td className="p-2.5">Delivery Fee (3.5km LGA)</td>
                        <td className="p-2.5 font-bold">₦1,100</td>
                        <td className="p-2.5">9.7%</td>
                        <td className="p-2.5 font-sans">Customer Paid Delivery</td>
                      </tr>
                      <tr>
                        <td className="p-2.5">Hygienic Packaging Fee</td>
                        <td className="p-2.5 font-bold">₦200</td>
                        <td className="p-2.5">1.8%</td>
                        <td className="p-2.5 font-sans">Bio-Bag & Barcode Seal</td>
                      </tr>
                      <tr className="bg-emerald-100 font-bold">
                        <td className="p-2.5 font-sans">TOTAL CUSTOMER PAYMENT</td>
                        <td className="p-2.5">₦11,300</td>
                        <td className="p-2.5">100.0%</td>
                        <td className="p-2.5 font-sans">Inflow via Online Gateway</td>
                      </tr>
                      <tr className="text-slate-600">
                        <td className="p-2.5">Vendor Settlement (Wholesale)</td>
                        <td className="p-2.5 font-bold text-rose-700">- ₦9,000</td>
                        <td className="p-2.5">79.6%</td>
                        <td className="p-2.5 font-sans">Remitted to Partner Vendor</td>
                      </tr>
                      <tr className="text-slate-600">
                        <td className="p-2.5">Rider Delivery Compensation</td>
                        <td className="p-2.5 font-bold text-rose-700">- ₦900</td>
                        <td className="p-2.5">8.0%</td>
                        <td className="p-2.5 font-sans">Pushed to Rider App Wallet</td>
                      </tr>
                      <tr className="text-slate-600">
                        <td className="p-2.5">Packaging Bag Direct Cost</td>
                        <td className="p-2.5 font-bold text-rose-700">- ₦80</td>
                        <td className="p-2.5">0.7%</td>
                        <td className="p-2.5 font-sans">Cost of Goods Sold (Materials)</td>
                      </tr>
                      <tr className="text-slate-600">
                        <td className="p-2.5">Payment Gateway Fee (1.5%)</td>
                        <td className="p-2.5 font-bold text-rose-700">- ₦169.50</td>
                        <td className="p-2.5">1.5%</td>
                        <td className="p-2.5 font-sans">Paystack / Flutterwave Fee</td>
                      </tr>
                      <tr className="bg-emerald-600 text-white font-bold text-sm">
                        <td className="p-3 font-sans">FRESHCART NET GROSS PROFIT</td>
                        <td className="p-3">₦1,150.50</td>
                        <td className="p-3">10.2%</td>
                        <td className="p-3 font-sans">Net Platform Margin / Order</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Risk Blueprint Sections */}
              <div className="space-y-4">
                <span className="font-extrabold text-emerald-800 text-[10px] uppercase tracking-wider block">
                  FC-RISK-2026-V1 Problem-Solution Blueprint
                </span>

                <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-3">
                  <h4 className="font-black text-sm text-slate-900">1. Logistics & Delivery Bottlenecks</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <p className="font-bold text-rose-700">Problem 1.1: Traffic Congestion & Unpredictable Delivery Delays</p>
                      <p className="mt-1 text-slate-600"><strong>Solution:</strong> LGA Micro-Zoning & Motorbike/Bicycle Fleet. Deliveries strictly locked within LGA (&lt;7km radius).</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <p className="font-bold text-rose-700">Problem 1.2: Food Spoilage & Melting During Transit</p>
                      <p className="mt-1 text-slate-600"><strong>Solution:</strong> Dual-Compartment Insulated Thermal Boxes. Ice-pack lining for meats/dairy; ventilated mesh for greens.</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <p className="font-bold text-rose-700">Problem 1.3: Inaccurate Delivery Addresses & Poor Street Labeling</p>
                      <p className="mt-1 text-slate-600"><strong>Solution:</strong> Landmark-Based Drop-Off Points & Map Pinning before checkout.</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <p className="font-bold text-rose-700">Problem 1.4: Rider Order Refusal & Fleet Shortages Peak Hours</p>
                      <p className="mt-1 text-slate-600"><strong>Solution:</strong> Dynamic Peak Multipliers & Mandatory Dispatch Acceptance.</p>
                    </div>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-3">
                  <h4 className="font-black text-sm text-slate-900">2. Trust Breach & Fraud Risk Mitigations</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <p className="font-bold text-rose-700">Problem 2.1: Vendor "Bait & Switch" Quality Substitution</p>
                      <p className="mt-1 text-slate-600"><strong>Solution:</strong> Agent Weighing & Barcode Tamper Seals at central market booth.</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <p className="font-bold text-rose-700">Problem 2.2: Rider Theft & Package Content Pilferage</p>
                      <p className="mt-1 text-slate-600"><strong>Solution:</strong> 4-Digit Delivery PIN & Sealed Bag Inspection before release.</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <p className="font-bold text-rose-700">Problem 2.3: Fraudulent Buyer Rejection & Free Food Claims</p>
                      <p className="mt-1 text-slate-600"><strong>Solution:</strong> Mandatory Return-to-Booth Protocol before any refund is processed.</p>
                    </div>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-3">
                  <h4 className="font-black text-sm text-slate-900">3. Payment Mode & System Failure Mitigations</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <p className="font-bold text-rose-700">Problem 3.1: Network Failures & Delayed Bank Transfer Confirmations</p>
                      <p className="mt-1 text-slate-600"><strong>Solution:</strong> In-App Escrow Wallet & Instant Virtual Accounts.</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <p className="font-bold text-rose-700">Problem 3.2: Fake Bank Transfer Alerts & Cash-on-Delivery Scams</p>
                      <p className="mt-1 text-slate-600"><strong>Solution:</strong> 100% Digital Pre-Payment / Escrow System. Cash-on-Delivery is disabled.</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <p className="font-bold text-rose-700">Problem 3.3: Delayed Payouts to Market Vendors & Traders</p>
                      <p className="mt-1 text-slate-600"><strong>Solution:</strong> Automated Twice-Daily Batch Payouts (12:00 PM and 6:00 PM).</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Target Deployment: AMAC & FCT LGAs, Nigeria</span>
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all"
          >
            Close Blueprint
          </button>
        </div>

      </div>
    </div>
  );
}
