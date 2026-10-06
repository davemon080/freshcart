# Ujah Israel Market App
## Master Technical Architecture, Developer Specification & Operational Blueprint
**Platform:** FreshCart Hyper-Local Food Logistics & Risk Mitigation Engine  
**Project Lead:** Ujah Israel O.  
**Document Reference:** `FC-OPS-2026-V1` & `FC-RISK-2026-V1`  
**Primary Target Region:** Abuja Municipal Area Council (AMAC) & FCT LGAs, Nigeria  

---

## 1. Quick Start for Developers (VS Code Setup)

This repository is ready to run and develop immediately. Follow these instructions to launch the project in Microsoft VS Code:

### 1.1 Open Project in VS Code
Open your terminal (PowerShell or Command Prompt) and execute:
```bash
code "C:\Users\hp\.gemini\antigravity\scratch\freshcart-app"
```
Or inside VS Code:
1. Click **File** > **Open Folder...**
2. Select: `C:\Users\hp\.gemini\antigravity\scratch\freshcart-app`

### 1.2 Running the Application
Ensure dependencies are installed and run the local development server:
```bash
# 1. Navigate to the project directory
cd "C:\Users\hp\.gemini\antigravity\scratch\freshcart-app"

# 2. Start the Vite development server
npm run dev
```
* **Local Web App URL:** `http://127.0.0.1:5173/`
* **Production Build Command:** `npm run build` (generates static bundle in `dist/`)

### 1.3 Recommended VS Code Extensions
* **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
* **ES7+ React/Redux/React-Native snippets** (`dsznajder.es7-react-js-snippets`)
* **Prettier - Code formatter** (`esbenp.prettier-vscode`)

---

## 2. Executive Summary & Market Problem

### 2.1 The Open-Air Traditional Market Friction
Urban households in Nigeria spend upwards of 8 to 12 hours monthly navigating congested open-air traditional markets (such as Utako Market, Garki Model Market, Wuse Market, and Kubwa Market). This manual process suffers from major structural drawbacks:
1. **Unpredictable Retail Markups:** Inconsistent street-level pricing and heavy bargaining friction.
2. **Produce Degradation:** Extreme tropical heat wilt leafy vegetables and degrades fresh meats during slow multi-stop transport across city traffic.
3. **Lack of Measurement Standards:** "Painter buckets", "ties", and "heaps" vary wildly in quality and net weight.

### 2.2 FreshCart Solution Architecture
FreshCart solves this by establishing physical aggregation booths inside major traditional markets (starting at Utako Market), partnering with vetted stall traders, standardizing measurements into digital metrics, and locking logistics within autonomous LGA geofenced zones.

```
[Buyer App (AMAC)] 
       │ (1) 100% Pre-Paid Escrow Order (Generates Secret 4-Digit PIN)
       ▼
[Utako Market Booth Agent #01]
       │ (2) 6:30 AM Price Audit → Digital Scale Weighing → Tamper Barcode Seal
       ▼
[Dispatch Rider (< 2km Broadcast)]
       │ (3) Dual-Compartment Thermal Box (Cold 4°C Meats / Ventilated Greens)
       ▼
[Doorstep Handover & 4-Digit PIN Handshake]
       │ (4) Buyer Inspects Seal → Releases 4-Digit PIN to Rider Keypad
       ▼
[Automated Split Settlement Engine]
       ├─► 80% Delivery Fee Share to Rider App Wallet (Instant)
       ├─► 80% Vendor Share to Trader Bank Account (Twice-Daily Batches: 12PM / 6PM)
       └─► 10.2% Net Gross Profit retained by FreshCart
```

---

## 3. Core Operational Invariants & Rules Engine

### 3.1 The LGA Geofence Invariant & Dynamic Radius Scaling (FC-OPS Sec 7 & FC-RISK 1.1)
* **Zone Isolation Rule:** Deliveries are strictly locked within an LGA zone (< 7km transit radius). A rider registered in AMAC Zone A cannot accept orders originating from Bwari Zone B (Kubwa) or Gwagwalada.
* **Peak Hour Dynamic Scaling:** During morning and evening peak traffic hours (4:00 PM – 7:30 PM), the maximum order placement distance inside an LGA automatically shrinks from 10km to 5km to preserve the 45-minute delivery SLA.
* **Peak Multiplier:** Auto-dispatch applies a 1.25x peak bonus to ensure 100% rider acceptance.

### 3.2 Standardized Local Produce Unit Metric Framework (FC-OPS Sec 6)
FreshCart standardizes traditional open-air measurements into verifiable digital metrics:

| Category | Traditional Unit | FreshCart Digital Standard | Quality Tolerance & Temperature Invariant |
| :--- | :--- | :--- | :--- |
| **Fresh Vegetables** | "Tie" / Bunch (Ugu, Waterleaf, Scent leaf) | Standard 500g Cleaned & Tied Bundle | Washed, root-trimmed, zero yellowing leaves. Ambient ventilated mesh compartment. |
| **Raw Tomatoes / Peppers** | "Painter Bucket" / "Basket" | Exact Weight (2.5kg / 5.0kg Bucket) | Firm skin, maximum 2% softness tolerance, zero decay. Dry insulated box. |
| **Fresh Meat & Poultry** | "Kilo" / "Quarter" | Net Weight (1.0kg / 5.0kg Vacuum-Sealed) | Hygienically slaughtered same-day, kept chilled at 4°C in ice-pack compartment. |
| **Grains & Staples** | "Mudu" / "Derica" (Rice, Beans, Garri) | Standardized 1.5kg Sealed Pouch | De-stoned, machine-cleaned, moisture < 12%. Dry sealed pouch. |
| **Tubers & Roots** | "Heap of 5" (Yam, Sweet Potato) | Weight Grade (Large Yam Tuber 3.0kg+) | Unbroken skin, firm endpoints, zero rot or mold. Dry insulated section. |

### 3.3 The 4-Digit Security PIN Handshake Protocol (FC-OPS Sec 4 & FC-RISK 2.2)
* **Secret Generation:** System generates a unique 4-digit numeric code upon pre-payment, visible **only** on the buyer's smartphone screen.
* **Strict Compliance Rule:** `No PIN = No Handover`. Dispatch riders are strictly forbidden from leaving packages or handing over bags without inputting this PIN into their app keypad.
* **3-Attempt Lockout Security:** Entering an incorrect PIN three consecutive times immediately locks the transaction, flags the rider queue, and triggers an alert to the LGA Operations Lead.
* **Doorstep Buyer Inspection Routine:** Buyers inspect the tamper-evident barcode seal and examine food freshness before revealing their PIN.

### 3.4 100% Pre-Payment Escrow & Unit Economics Split Engine (FC-OPS Sec 10 & 11)
Cash-on-Delivery is 100% disabled for raw fresh food to eliminate driver robbery risks and fake SMS bank transfer scams.

#### Sample ₦10,000 Basket Breakdown (AMAC Hub):
$$\begin{array}{|l|r|r|l|}
\hline
\textbf{Financial Component} & \textbf{Amount (NGN)} & \textbf{\% of Total} & \textbf{Recipient / Allocation} \\
\hline
\text{Gross Basket Value (Produce)} & \text{₦10,000.00} & 88.5\% & \text{Customer Food Subtotal} \\
\text{Delivery Fee (3.5 km within LGA)} & \text{₦1,100.00} & 9.7\% & \text{Customer Delivery Fee (Base ₦500 + ₦100/km)} \\
\text{Hygienic Bio-Bag Packaging Fee} & \text{₦200.00} & 1.8\% & \text{Bio-degradable bags + barcode tamper seal} \\
\hline
\textbf{TOTAL CUSTOMER PAYMENT (ESCROW)} & \textbf{₦11,300.00} & \textbf{100.0\%} & \textbf{Inflow via Paystack / Virtual Account} \\
\hline
\text{Vendor Settlement (Wholesale Value)} & -\text{₦9,000.00} & 79.6\% & \text{Remitted to Partner Vendor (80\% produce share)} \\
\text{Rider Delivery Compensation} & -\text{₦900.00} & 8.0\% & \text{Credited to Rider App Wallet (80\% delivery fee)} \\
\text{Packaging Bag Direct Cost (COGS)} & -\text{₦80.00} & 0.7\% & \text{Direct packaging material cost} \\
\text{Payment Gateway Fee (1.5\%)} & -\text{₦169.50} & 1.5\% & \text{Paystack / Flutterwave transaction fee} \\
\hline
\textbf{FRESHCART NET GROSS PROFIT} & \textbf{₦1,150.50} & \textbf{10.2\%} & \textbf{Net Platform Gross Margin per Order} \\
\hline
\end{array}$$

### 3.5 Trust Breach & Risk Mitigation Enforcement Rules (FC-RISK Table 2)
1. **Damaged Produce:** Detected via buyer doorstep photo upload + market agent return check. Vendor absorbs item cost; 3 strikes = permanent vendor ban.
2. **Broken Package Seal:** Detected via doorstep buyer inspection. Rider fined 100% of delivery compensation.
3. **False Quality Claim:** Detected via booth re-inspection desk. Buyer account flagged for mandatory PIN pre-validation.
4. **Rider Off-Route Drift:** GPS telemetry tracking triggers alerts if rider stops $>10$ minutes off designated route. Rider flagged for investigation and queue hold.
5. **Mandatory Return-to-Booth Protocol:** If a buyer rejects an order, the rider must return the physical package to the Utako Market booth immediately. No refund or replacement is authorized without physical agent inspection.

---

## 4. System Component Hierarchy

The application source code is structured modularly in `src/`:

```
freshcart-app/
├── index.html                   # HTML5 Entry, Tailwind CSS CDN & Fonts
├── package.json                 # Node dependencies (React 19, Lucide, Vite)
├── vite.config.js               # Vite build configuration
├── UJAH_ISRAEL_MARKET_APP.md    # Master Architecture & Developer Blueprint
├── src/
│   ├── main.jsx                 # React root DOM mounting
│   ├── App.jsx                  # Master App shell, state provider & toast manager
│   ├── App.css                  # Custom scrollbar & layout utility overrides
│   ├── index.css                # Base reset & typography rules
│   ├── data/
│   │   └── freshcartData.js     # Master produce catalog, LGA specs, initial mock orders
│   └── components/
│       ├── Header.jsx           # Multi-role navigation, peak hour toggle & escrow wallet
│       ├── BuyerView.jsx        # Produce catalog, unit metrics, landmark selector & PIN display
│       ├── MarketAgentView.jsx  # Utako booth aggregation, digital scale & barcode seal printer
│       ├── RiderView.jsx        # Geofenced transit, thermal check & 4-digit numeric keypad
│       ├── OperationsCommandView.jsx # KPIs, 12PM/6PM automated payouts, 3-strike vendor desk
│       └── BlueprintModal.jsx   # Built-in interactive reader for FC-OPS and FC-RISK manuals
```

---

## 5. Detailed Component Documentation

### 5.1 `src/components/Header.jsx`
* **Role Switcher:** Provides one-click instant navigation across all four operational surfaces:
  * `buyer`: Customer marketplace and order tracking.
  * `agent`: Utako Market booth aggregation and quality control.
  * `rider`: Dispatch transit and 4-digit PIN doorstep handshake keypad.
  * `ops`: LGA Operations and Risk Command Center.
* **Peak Hour Protocol Toggle:** Allows developers and testers to toggle the 4:00 PM – 7:30 PM peak lockdown, immediately shrinking the geofence radius to 5km and updating dispatch pricing.
* **Escrow Wallet Display:** Displays live buyer wallet balance with quick top-up functionality.

### 5.2 `src/components/BuyerView.jsx`
* **Landmark-Based Drop-Off:** Allows buyers in AMAC to pick verified landmarks (*e.g., "Opposite Mobil Filling Station, Utako"*, *"Estate Gate B, Mabushi Junction"*) plus specific house address to prevent lost riders.
* **Unit Standardization Display:** Renders both the traditional market measurement and the strict digital standard (*e.g., "Painter Bucket" $\rightarrow$ "Exact 2.5kg Bucket"*).
* **Transparent Unit Economics Collapsible:** Displays the real-time financial split of their cart across vendor, rider, packaging, gateway, and platform profit.
* **Secret 4-Digit PIN Card:** Securely displays the order's unique handshake PIN with explicit instructions to withhold it until doorstep inspection passes.

### 5.3 `src/components/MarketAgentView.jsx`
* **Station Location:** Utako Market Central Booth #01 (AMAC Zone A).
* **6:30 AM Daily Price Volatility Audit:** Interactive tool allowing agents to verify open-air wholesale prices and freeze catalog margins before the 7:30 AM consumer opening.
* **Calibrated Digital Scale Bench:** Interactive simulator with digital LED readouts verifying produce weight in grams against quality specifications.
* **Non-Refrigerated Staging Timer:** Live timer that caps packing time to under 10 minutes to protect meat and greens from ambient tropical heat.
* **Tamper-Evident Barcode Seal Printer:** Generates stamped barcode strings (*e.g., `BC-AMAC-99201-SEALED`*) affixed over biodegradable bio-bags before rider dispatch.
* **Return-to-Booth Re-Inspection Desk:** Station to audit returned items and log strikes against vendors.

### 5.4 `src/components/RiderView.jsx`
* **Assigned Rider:** Chinedu Okafor (AMAC Zone A • TVS Neo 125cc).
* **Zone Isolation Invariant:** Prevents out-of-zone orders from entering the dispatch queue.
* **Dual-Compartment Verification:** Interactive check for the cold ice-box compartment (4°C for meats) and ventilated mesh (for vegetables).
* **10-Minute Stoppage Simulator:** Triggers the Risk Engine GPS alert when an off-route stoppage exceeds 10 minutes.
* **4-Digit Handshake Numeric Keypad:**
  * Implements `No PIN = No Handover`.
  * Real keypad with 3-attempt lockout security.
  * Upon correct PIN verification, marks order `DELIVERED` and instantly transfers the 80% delivery fee split directly to the rider's wallet.

### 5.5 `src/components/OperationsCommandView.jsx`
* **Master KPIs (FC-OPS Section 2):**
  * Target 1: Delivery Velocity (45 min SLA window gauge).
  * Target 2: Produce Integrity (< 1.5% rejection rate).
  * Target 3: PIN Handshake Compliance (100% verified entry).
  * Target 4: LGA Density (minimum 15 agents, 20 riders).
* **Automated Twice-Daily Batch Payouts Engine (FC-RISK 3.3):** Simulates executing 12:00 PM and 6:00 PM automated bank transfers to partner traders.
* **Vendor 3-Strike Governance Desk:** Tracks vendor strikes; provides options to add strikes, reset strikes, or execute permanent bans.
* **Pilot Readiness Checklist:** Interactive tracking of key pre-launch tasks across market booths, vendor MOUs, rider training, and permits.

---

## 6. Suggested Backend & Database Schema (PostgreSQL / Supabase Ready)

For production deployment with a backend (Node.js/Express, NestJS, or Supabase), use the following relational schema:

```sql
-- 1. LGA Hubs Table
CREATE TABLE lga_hubs (
    id VARCHAR(32) PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    zone VARCHAR(16) NOT NULL,
    center_latitude DECIMAL(9, 6) NOT NULL,
    center_longitude DECIMAL(9, 6) NOT NULL,
    max_radius_km DECIMAL(4, 2) DEFAULT 10.0,
    peak_radius_km DECIMAL(4, 2) DEFAULT 5.0,
    is_active BOOLEAN DEFAULT TRUE
);

-- 2. Partner Market Vendors Table (3-Strike Invariant)
CREATE TABLE partner_vendors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hub_id VARCHAR(32) REFERENCES lga_hubs(id),
    stall_number VARCHAR(64) NOT NULL,
    business_name VARCHAR(128) NOT NULL,
    category VARCHAR(64) NOT NULL,
    hygiene_score DECIMAL(4, 2) DEFAULT 95.0,
    strikes_count INT DEFAULT 0,
    is_banned BOOLEAN DEFAULT FALSE,
    bank_account_number VARCHAR(10),
    bank_code VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Produce Catalog Table (Digital Metric Standardization)
CREATE TABLE produce_catalog (
    id VARCHAR(32) PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    category VARCHAR(64) NOT NULL,
    traditional_unit VARCHAR(64) NOT NULL,
    standard_digital_unit VARCHAR(64) NOT NULL,
    tolerance_spec TEXT NOT NULL,
    retail_price DECIMAL(10, 2) NOT NULL,
    wholesale_price DECIMAL(10, 2) NOT NULL,
    temp_requirement VARCHAR(64) NOT NULL,
    is_in_stock BOOLEAN DEFAULT TRUE
);

-- 4. Orders & Escrow Table (4-Digit Handshake PIN)
CREATE TABLE orders (
    id VARCHAR(32) PRIMARY KEY,
    lga_id VARCHAR(32) REFERENCES lga_hubs(id),
    buyer_id UUID NOT NULL,
    delivery_landmark VARCHAR(255) NOT NULL,
    delivery_address TEXT NOT NULL,
    gps_coordinates POINT NOT NULL,
    gross_basket_value DECIMAL(10, 2) NOT NULL,
    delivery_fee DECIMAL(10, 2) NOT NULL,
    packaging_fee DECIMAL(10, 2) DEFAULT 200.0,
    total_escrow_payment DECIMAL(10, 2) NOT NULL,
    vendor_split DECIMAL(10, 2) NOT NULL,
    rider_split DECIMAL(10, 2) NOT NULL,
    platform_net_margin DECIMAL(10, 2) NOT NULL,
    handshake_pin VARCHAR(4) NOT NULL,
    pin_attempts INT DEFAULT 0,
    is_locked_out BOOLEAN DEFAULT FALSE,
    barcode_seal_id VARCHAR(64),
    status VARCHAR(32) DEFAULT 'PACKING', -- 'PACKING', 'READY_FOR_PICKUP', 'IN_TRANSIT', 'DELIVERED', 'REJECTED'
    assigned_rider_id UUID,
    assigned_agent_id UUID,
    placed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    delivered_at TIMESTAMP WITH TIME ZONE
);
```

---

## 7. Phased Execution Roadmap Summary

* **Phase 1: AMAC Pilot Setup (Months 1–2) [Current Phase]**
  * Establish primary booth inside Utako Market.
  * Onboard 10 partner vendors, train 4 market agents, recruit 15 dedicated riders.
  * Conduct closed-beta across Garki, Wuse, and Maitama districts.
* **Phase 2: AMAC Full Launch & Volume Scale (Months 3–5)**
  * Open secondary market booth inside Garki Model Market.
  * Target volume: 250 daily orders.
* **Phase 3: FCT Area Council Expansion (Months 6–9)**
  * Replicate model in Bwari Area Council (Kubwa Market) and Gwagwalada Area Council.
  * Launch weekly bulk subscription boxes (*"Family Fruit Basket"*).
* **Phase 4: Multi-State Rollout (Months 10–12)**
  * Expand platform operations to high-density commercial centers in Lagos (Ikeja, Lekki LGAs) and Port Harcourt.

---

## 8. Author & Lead Endorsement

This document and the associated code repository serve as the official, executable technical blueprint for FreshCart. All operational software, mobile applications, market aggregation agents, and dispatch logistics personnel must strictly adhere to the invariants and protocols outlined herein.

**Project Lead:** Ujah Israel O.  
**Reference Codes:** `FC-OPS-2026-V1` / `FC-RISK-2026-V1`  
**Primary Region:** Abuja Municipal Area Council (AMAC) & FCT LGAs, Nigeria
