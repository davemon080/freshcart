import React, { useState, useEffect } from 'react';
import './App.css';
import { Header } from './components/Header';
import { BuyerView } from './components/BuyerView';
import { MarketAgentView } from './components/MarketAgentView';
import { RiderView } from './components/RiderView';
import { OperationsCommandView } from './components/OperationsCommandView';
import { BlueprintModal } from './components/BlueprintModal';
import { INITIAL_ORDERS, VENDOR_STRIKE_LIST } from './data/freshcartData';

export function App() {
  const [activeRole, setActiveRole] = useState('buyer'); // 'buyer' | 'agent' | 'rider' | 'ops'
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [vendorsList, setVendorsList] = useState(VENDOR_STRIKE_LIST);
  const [activeLGA, setActiveLGA] = useState('AMAC');
  const [isPeakHour, setIsPeakHour] = useState(false);
  const [walletBalance, setWalletBalance] = useState(35000);
  const [blueprintOpen, setBlueprintOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToastMessage({ msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleCreateOrder = (newOrder) => {
    if (newOrder.paymentMethod === 'In-App Escrow Wallet') {
      setWalletBalance(prev => prev - newOrder.totalAmount);
    }
    setOrders(prev => [newOrder, ...prev]);
    showToast(`Order #${newOrder.id} created! Escrow locked. 4-Digit PIN: ${newOrder.orderPin}`, 'success');
  };

  const handleUpdateOrderStatus = (orderId, newStatus, extraData = {}) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: newStatus,
          agent: {
            ...o.agent,
            ...extraData
          }
        };
      }
      return o;
    }));

    if (newStatus === 'READY_FOR_PICKUP') {
      showToast(`Order #${orderId} marked Ready for Pickup! Nearest rider within 2km alerted.`, 'info');
    }
  };

  const handleAcceptOrder = (orderId) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: 'IN_TRANSIT',
          rider: {
            name: 'Chinedu Okafor',
            phone: '+234 814 333 4455',
            id: 'RIDER-AMAC-04',
            vehicle: 'TVS Neo 125cc (Plate: ABJ-482-KU)',
            thermalBoxChecked: true,
            currentLocation: 'En route to customer doorstep',
            offRouteDriftMinutes: 0
          }
        };
      }
      return o;
    }));
    showToast(`Order #${orderId} accepted! Rider en route to Utako Market Booth for pickup.`, 'info');
  };

  const handleVerifyPinAndDeliver = (orderId) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: 'DELIVERED',
          paymentStatus: 'Settled to Vendors & Rider'
        };
      }
      return o;
    }));
    showToast(`Order #${orderId} Delivered! 4-Digit Handshake Verified. Escrow released to rider & vendor.`, 'success');
  };

  const handleReportIssue = (orderId, reason, notes) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: 'REJECTED',
          dispute: {
            reason,
            notes,
            reportedAt: new Date().toLocaleTimeString()
          }
        };
      }
      return o;
    }));
    // Credit buyer wallet with refund + ₦200 goodwill voucher
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setWalletBalance(prev => prev + order.totalAmount + 200);
    }
    showToast(`Order #${orderId} rejected. Return-to-Booth Protocol triggered. Instant wallet refund + ₦200 goodwill voucher credited.`, 'warning');
  };

  const handleLogVendorStrike = (vendorName, reason) => {
    setVendorsList(prev => prev.map(v => {
      if (v.vendorName === vendorName) {
        const nextStrikes = v.strikes + 1;
        return {
          ...v,
          strikes: nextStrikes,
          status: nextStrikes >= 3 ? 'BANNED (3 Strikes - Quality Invariant)' : `Warning Notice (${nextStrikes}/3)`
        };
      }
      return v;
    }));
    showToast(`Quality Strike logged for ${vendorName}! 3 strikes = Permanent ban.`, 'warning');
  };

  const handleResetVendorStrike = (vendorName) => {
    setVendorsList(prev => prev.map(v => {
      if (v.vendorName === vendorName) {
        return {
          ...v,
          strikes: 0,
          status: 'Active Verified'
        };
      }
      return v;
    }));
    showToast(`Strikes cleared for ${vendorName}.`, 'info');
  };

  const handleReportOffRoute = (orderId) => {
    showToast(`CRITICAL: Rider for #${orderId} stopped > 10 mins off route! Ops Lead flagged.`, 'error');
  };

  const handleTopUpWallet = () => {
    const amount = 10000;
    setWalletBalance(prev => prev + amount);
    showToast(`₦${amount.toLocaleString()} credited to your In-App Escrow Wallet!`, 'success');
  };

  const ordersCount = {
    buyerActive: orders.filter(o => ['PACKING', 'READY_FOR_PICKUP', 'IN_TRANSIT'].includes(o.status)).length,
    packing: orders.filter(o => ['PACKING', 'PENDING_HUB'].includes(o.status)).length,
    inTransit: orders.filter(o => o.status === 'IN_TRANSIT').length
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-4 right-4 z-50 max-w-md p-4 rounded-2xl shadow-2xl text-xs font-bold border transition-all animate-bounce ${
          toastMessage.type === 'success' 
            ? 'bg-emerald-900 text-emerald-100 border-emerald-700' 
            : toastMessage.type === 'warning'
              ? 'bg-amber-900 text-amber-100 border-amber-700'
              : toastMessage.type === 'error'
                ? 'bg-rose-900 text-rose-100 border-rose-700'
                : 'bg-slate-900 text-white border-slate-700'
        }`}>
          {toastMessage.msg}
        </div>
      )}

      {/* Main Header with Role Switcher */}
      <Header
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        isPeakHour={isPeakHour}
        setIsPeakHour={setIsPeakHour}
        activeLGA={activeLGA}
        setActiveLGA={setActiveLGA}
        walletBalance={walletBalance}
        onTopUpWallet={handleTopUpWallet}
        openBlueprint={() => setBlueprintOpen(true)}
        ordersCount={ordersCount}
      />

      {/* Active Role Content */}
      <main className="flex-1 pb-16">
        {activeRole === 'buyer' && (
          <BuyerView
            orders={orders}
            onCreateOrder={handleCreateOrder}
            activeLGA={activeLGA}
            setActiveLGA={setActiveLGA}
            isPeakHour={isPeakHour}
            walletBalance={walletBalance}
            onTopUpWallet={handleTopUpWallet}
            onReportIssue={handleReportIssue}
          />
        )}

        {activeRole === 'agent' && (
          <MarketAgentView
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onLogVendorStrike={handleLogVendorStrike}
            vendorsList={vendorsList}
          />
        )}

        {activeRole === 'rider' && (
          <RiderView
            orders={orders}
            onAcceptOrder={handleAcceptOrder}
            onVerifyPinAndDeliver={handleVerifyPinAndDeliver}
            onReportOffRoute={handleReportOffRoute}
          />
        )}

        {activeRole === 'ops' && (
          <OperationsCommandView
            orders={orders}
            vendorsList={vendorsList}
            onLogVendorStrike={handleLogVendorStrike}
            onResetVendorStrike={handleResetVendorStrike}
            isPeakHour={isPeakHour}
            setIsPeakHour={setIsPeakHour}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800">FreshCart Systems</span>
            <span>•</span>
            <span>Lead: Ujah Israel O.</span>
            <span>•</span>
            <span className="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              AMAC & FCT LGAs (FC-OPS-2026-V1 & FC-RISK-2026-V1)
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <button 
              onClick={() => setBlueprintOpen(true)} 
              className="text-emerald-700 hover:text-emerald-800"
            >
              Operational Blueprint Docs
            </button>
            <span className="text-slate-300">|</span>
            <button 
              onClick={() => setIsPeakHour(!isPeakHour)} 
              className="text-amber-700 hover:text-amber-800"
            >
              {isPeakHour ? 'Disable Peak Hour' : 'Simulate Peak Hour'}
            </button>
          </div>
        </div>
      </footer>

      {/* Operational Blueprint & Risk Specification Modal */}
      <BlueprintModal
        isOpen={blueprintOpen}
        onClose={() => setBlueprintOpen(false)}
      />

    </div>
  );
}

export default App;
