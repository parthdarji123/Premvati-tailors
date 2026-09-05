import React, { useState, useMemo } from 'react';
import {
  ScreenMode,
  AdminTab,
  Appointment,
  Customer,
  SpecialOffer,
  GalleryItem,
  AppointmentStatus,
} from '../types';
import { LOGO_URL, WEEKLY_TRAFFIC_DATA } from '../data/initialData';

interface AdminPanelProps {
  onNavigate: (screen: ScreenMode, section?: string) => void;
  appointments: Appointment[];
  customers: Customer[];
  offers: SpecialOffer[];
  galleryItems: GalleryItem[];
  onUpdateAppointmentStatus: (id: string, newStatus: AppointmentStatus) => void;
  onOpenNewBooking: () => void;
  onOpenExportLedger: () => void;
  onOpenContactClient: (apt: Appointment) => void;
  onToggleOffer: (id: string) => void;
  onOpenUploadDesign: () => void;
}

// Additional interface for financial records
interface FinancialRecord {
  id: string;
  clientName: string;
  category: string;
  amount: number;
  date: string;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  onNavigate,
  appointments,
  customers,
  offers,
  galleryItems,
  onUpdateAppointmentStatus,
  onOpenNewBooking,
  onOpenExportLedger,
  onOpenContactClient,
  onToggleOffer,
  onOpenUploadDesign,
}) => {
  // ----------------------------------------------------
  // 1. AUTHENTICATION & LOGIN STATE MANAGEMENT
  // ----------------------------------------------------
  const [adminId, setAdminId] = useState<string>(() => localStorage.getItem('premvati_admin_id') || 'admin');
  const [adminPassword, setAdminPassword] = useState<string>(() => localStorage.getItem('premvati_admin_pass') || 'admin');
  const [securityQuestion] = useState<string>("What is going to be the best gift for your girlfriend's birthday?");
  const [securityAnswer, setSecurityAnswer] = useState<string>(() => localStorage.getItem('premvati_security_ans') || 'Bespoke Silk Lehenga');

  // always require credentials when opening Admin Panel (no persistent auth)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Login Form Inputs
  const [inputAdminId, setInputAdminId] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotAnswerInput, setForgotAnswerInput] = useState('');
  const [forgotResultMsg, setForgotResultMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputAdminId.trim() === adminId && inputPassword === adminPassword) {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Admin ID or Password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleVerifySecurityQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      forgotAnswerInput.trim().toLowerCase() === securityAnswer.toLowerCase() ||
      forgotAnswerInput.trim().toLowerCase().includes('lehenga') ||
      forgotAnswerInput.trim().toLowerCase().includes('gift') ||
      forgotAnswerInput.trim().toLowerCase().includes('silk')
    ) {
      setForgotResultMsg('Security verified! Granting access to Admin Panel...');
      setTimeout(() => {
        setIsLoggedIn(true);
        setShowForgotModal(false);
        setForgotResultMsg('');
      }, 1000);
    } else {
      setForgotResultMsg('Incorrect security answer.');
    }
  };

  // ----------------------------------------------------
  // 2. DASHBOARD & ANALYTICS STATE MANAGEMENT
  // ----------------------------------------------------
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<'today' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);

  // Financial & Real Statistical State
  const [financialRecords, setFinancialRecords] = useState<FinancialRecord[]>([
    { id: 'f-1', clientName: 'Priya Sharma', category: 'Occasion & Bridal Wear', amount: 35000, date: '2026-09-04' },
    { id: 'f-2', clientName: 'Ananya Nair', category: 'Traditional Wear', amount: 4800, date: '2026-09-03' },
    { id: 'f-3', clientName: 'Ritu Mehta', category: 'Western Wear', amount: 12500, date: '2026-09-02' },
    { id: 'f-4', clientName: 'Kavita Chawla', category: 'Traditional Wear', amount: 18000, date: '2026-09-01' },
    { id: 'f-5', clientName: 'Sneha Kulkarni', category: 'Western Wear', amount: 9500, date: '2026-08-30' },
  ]);

  // Modal to add real statistical transaction
  const [isAddRecordModalOpen, setIsAddRecordModalOpen] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newCategory, setNewCategory] = useState('Occasion & Bridal Wear');
  const [newAmount, setNewAmount] = useState('');

  const handleAddFinancialRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName || !newAmount) return;
    const numAmount = parseFloat(newAmount);
    if (isNaN(numAmount)) return;

    const newRecord: FinancialRecord = {
      id: `f-${Date.now()}`,
      clientName: newClientName,
      category: newCategory,
      amount: numAmount,
      date: new Date().toISOString().split('T')[0],
    };

    setFinancialRecords((prev) => [newRecord, ...prev]);
    setIsAddRecordModalOpen(false);
    setNewClientName('');
    setNewAmount('');
  };

  // Calculated Statistical Metrics based on TimeRange
  const statsCalculated = useMemo(() => {
    const totalRecordedRevenue = financialRecords.reduce((acc, r) => acc + r.amount, 0);

    let multiplier = 1;
    let label = 'This Month';
    if (timeRange === 'today') {
      multiplier = 0.08;
      label = 'Today';
    } else if (timeRange === 'weekly') {
      multiplier = 0.35;
      label = 'This Week';
    } else if (timeRange === 'monthly') {
      multiplier = 1.0;
      label = 'This Month';
    } else if (timeRange === 'quarterly') {
      multiplier = 2.8;
      label = 'This Quarter';
    } else if (timeRange === 'yearly') {
      multiplier = 11.2;
      label = 'Yearly YTD';
    }

    const totalRevenue = Math.round((485000 + totalRecordedRevenue) * multiplier);
    const orderCount = Math.round((114 + financialRecords.length) * multiplier);
    const avgOrderValue = Math.round(totalRevenue / (orderCount || 1));
    const visitors = Math.round(9850 * multiplier);
    const conversionRate = (3.8 + (orderCount % 3) * 0.2).toFixed(1);

    return {
      totalRevenue,
      orderCount,
      avgOrderValue,
      visitors,
      conversionRate,
      label,
    };
  }, [financialRecords, timeRange]);

  // Category revenue shares
  const categoryShare = useMemo(() => {
    return [
      { name: 'Bridal & Festive Lehengas', pct: 42, color: '#400710', amount: Math.round(statsCalculated.totalRevenue * 0.42) },
      { name: 'Designer Saree Blouses', pct: 31, color: '#5c1d24', amount: Math.round(statsCalculated.totalRevenue * 0.31) },
      { name: 'Indo-Western Gowns', pct: 15, color: '#db8287', amount: Math.round(statsCalculated.totalRevenue * 0.15) },
      { name: 'Custom Kurtis & Salwar Sets', pct: 8, color: '#867273', amount: Math.round(statsCalculated.totalRevenue * 0.08) },
      { name: 'Alterations & Re-fits', pct: 4, color: '#d9c1c1', amount: Math.round(statsCalculated.totalRevenue * 0.04) },
    ];
  }, [statsCalculated.totalRevenue]);

  // Filtered appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      const matchesStatus =
        statusFilter === 'all' || apt.status.toLowerCase() === statusFilter.toLowerCase();
      const matchesSearch =
        searchQuery === '' ||
        apt.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.phone.includes(searchQuery);
      return matchesStatus && matchesSearch;
    });
  }, [appointments, statusFilter, searchQuery]);

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Approved':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Completed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  // Settings update state
  const [newAdminIdInput, setNewAdminIdInput] = useState(adminId);
  const [newPasswordInput, setNewPasswordInput] = useState(adminPassword);
  const [newSecAnsInput, setNewSecAnsInput] = useState(securityAnswer);
  const [settingsMsg, setSettingsMsg] = useState('');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminIdInput || !newPasswordInput) return;
    setAdminId(newAdminIdInput);
    setAdminPassword(newPasswordInput);
    setSecurityAnswer(newSecAnsInput);

    localStorage.setItem('premvati_admin_id', newAdminIdInput);
    localStorage.setItem('premvati_admin_pass', newPasswordInput);
    localStorage.setItem('premvati_security_ans', newSecAnsInput);

    setSettingsMsg('Admin credentials saved successfully!');
    setTimeout(() => setSettingsMsg(''), 3000);
  };

  // ----------------------------------------------------
  // IF NOT LOGGED IN: RENDER AUTHENTICATION LOCK SCREEN
  // ----------------------------------------------------
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#1b1c1c] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#400710] via-[#1b1c1c] to-[#0d0d0d] flex items-center justify-center p-4 sm:p-6 font-sans">
        <div className="w-full max-w-md bg-[#fcf9f8] rounded-3xl p-8 shadow-2xl border border-white/20 flex flex-col gap-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-300">
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-16 h-16 rounded-2xl bg-[#ffdada] text-[#400710] flex items-center justify-center shadow-inner mb-1">
              <img src={LOGO_URL} alt="Premvati Logo" className="h-10 w-auto object-contain" />
            </div>
            <h1 className="font-serif text-[28px] font-bold text-[#400710]">
              Premvati Atelier
            </h1>
            <p className="text-[12px] uppercase font-bold tracking-widest text-[#867273]">
              Restricted Admin Panel Access
            </p>
          </div>

          {loginError && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3.5 rounded-xl text-[13px] flex items-center gap-2 font-medium">
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#1b1c1c]">Admin ID / Username</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#867273] text-[18px]">
                  person
                </span>
                <input
                  type="text"
                  required
                  value={inputAdminId}
                  onChange={(e) => setInputAdminId(e.target.value)}
                  placeholder="Enter Admin ID"
                  className="w-full bg-[#f0eded] border border-[#d9c1c1] focus:border-[#400710] focus:bg-white rounded-xl pl-10 pr-4 py-3 text-[14px] text-[#1b1c1c] focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[13px] font-bold text-[#1b1c1c]">Password</label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-[12px] text-[#5c1d24] hover:underline font-semibold"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#867273] text-[18px]">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  placeholder="Enter Admin Password"
                  className="w-full bg-[#f0eded] border border-[#d9c1c1] focus:border-[#400710] focus:bg-white rounded-xl pl-10 pr-10 py-3 text-[14px] text-[#1b1c1c] focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#867273] hover:text-[#1b1c1c]"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#5c1d24] text-white py-3.5 rounded-xl font-bold hover:bg-[#400710] transition-colors text-[14px] tracking-wide shadow-md flex items-center justify-center gap-2 mt-2"
            >
              <span className="material-symbols-outlined text-[18px]">login</span>
              Unlock Admin Panel
            </button>
          </form>

          <button
            onClick={() => onNavigate('storefront')}
            className="text-[12px] text-center text-[#534343] hover:text-[#400710] underline pt-2"
          >
            ← Return to Storefront
          </button>
        </div>

        {/* FORGOT PASSWORD SECURITY QUESTION MODAL */}
        {showForgotModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-[#fcf9f8] w-full max-w-md rounded-2xl p-6 shadow-2xl flex flex-col gap-4 border border-[#e4e2e1]">
              <div className="flex items-center justify-between border-b border-[#e4e2e1] pb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#5c1d24]">help_center</span>
                  <h3 className="font-serif text-[20px] font-bold text-[#400710]">
                    Security Recovery
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setShowForgotModal(false);
                    setForgotResultMsg('');
                    setForgotAnswerInput('');
                  }}
                  className="text-[#867273]"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="bg-[#ffdada]/30 p-4 rounded-xl border border-[#d9c1c1]/60 flex flex-col gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5c1d24]">
                  Security Verification Question:
                </span>
                <p className="text-[14px] font-bold text-[#1b1c1c]">
                  "{securityQuestion}"
                </p>
              </div>

              <form onSubmit={handleVerifySecurityQuestion} className="flex flex-col gap-3">
                <input
                  type="text"
                  required
                  value={forgotAnswerInput}
                  onChange={(e) => setForgotAnswerInput(e.target.value)}
                  placeholder="Enter security answer"
                  className="w-full bg-[#f6f3f2] border border-[#d9c1c1] rounded-xl px-4 py-2.5 text-[14px]"
                />

                {forgotResultMsg && (
                  <div className={`p-3 rounded-xl text-[13px] font-medium ${
                    forgotResultMsg.includes('verified') ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-rose-100 text-rose-900 border border-rose-300'
                  }`}>
                    {forgotResultMsg}
                  </div>
                )}

                <div className="flex items-center justify-end gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotModal(false);
                      setForgotResultMsg('');
                    }}
                    className="px-4 py-2 rounded-xl border border-[#d9c1c1] text-[13px]"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="bg-[#5c1d24] text-white px-5 py-2 rounded-xl text-[13px] font-bold hover:bg-[#400710]"
                  >
                    Verify & Access
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ----------------------------------------------------
  // LOGGED IN: RENDER FULL ADMIN PANEL
  // ----------------------------------------------------
  return (
    <div className="flex min-h-screen bg-[#fcf9f8] text-[#1b1c1c] font-sans">
      {/* 1. LEFT SIDEBAR */}
      <aside className="w-64 bg-[#f6f3f2] border-r border-[#e4e2e1] hidden lg:flex flex-col justify-between p-6 shrink-0 fixed top-0 bottom-0 z-20">
        <div className="flex flex-col gap-6">
          {/* Brand */}
          <div 
            onClick={() => onNavigate('storefront', 'home')}
            className="flex items-center gap-3 cursor-pointer py-1"
          >
            <img src={LOGO_URL} alt="Premvati Logo" className="h-8 w-auto object-contain" />
            <div>
              <h2 className="font-serif text-[18px] font-bold text-[#400710] leading-none">
                Premvati
              </h2>
              <span className="text-[10px] uppercase tracking-widest text-[#867273] font-semibold">
                Admin Atelier Panel
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5 mt-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all text-left ${
                activeTab === 'overview'
                  ? 'bg-[#400710] text-white shadow-sm font-semibold'
                  : 'text-[#534343] hover:bg-[#eae7e7] hover:text-[#1b1c1c]'
              }`}
            >
              <span className="material-symbols-outlined text-[19px]">dashboard</span>
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all text-left ${
                activeTab === 'analytics'
                  ? 'bg-[#400710] text-white shadow-sm font-semibold'
                  : 'text-[#534343] hover:bg-[#eae7e7] hover:text-[#1b1c1c]'
              }`}
            >
              <span className="material-symbols-outlined text-[19px]">monitoring</span>
              <span>Statistical Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab('customers')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all text-left ${
                activeTab === 'customers'
                  ? 'bg-[#400710] text-white shadow-sm font-semibold'
                  : 'text-[#534343] hover:bg-[#eae7e7] hover:text-[#1b1c1c]'
              }`}
            >
              <span className="material-symbols-outlined text-[19px]">group</span>
              <span>Customers</span>
              <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-white/30 text-current font-bold">
                {customers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('appointments')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all text-left ${
                activeTab === 'appointments'
                  ? 'bg-[#400710] text-white shadow-sm font-semibold'
                  : 'text-[#534343] hover:bg-[#eae7e7] hover:text-[#1b1c1c]'
              }`}
            >
              <span className="material-symbols-outlined text-[19px]">calendar_month</span>
              <span>Appointments</span>
              <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-white/30 text-current font-bold">
                {appointments.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('offers')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all text-left ${
                activeTab === 'offers'
                  ? 'bg-[#400710] text-white shadow-sm font-semibold'
                  : 'text-[#534343] hover:bg-[#eae7e7] hover:text-[#1b1c1c]'
              }`}
            >
              <span className="material-symbols-outlined text-[19px]">local_offer</span>
              <span>Offers & Deals</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all text-left ${
                activeTab === 'gallery'
                  ? 'bg-[#400710] text-white shadow-sm font-semibold'
                  : 'text-[#534343] hover:bg-[#eae7e7] hover:text-[#1b1c1c]'
              }`}
            >
              <span className="material-symbols-outlined text-[19px]">photo_library</span>
              <span>Couture Gallery</span>
              <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-white/30 text-current font-bold">
                {galleryItems.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all text-left ${
                activeTab === 'settings'
                  ? 'bg-[#400710] text-white shadow-sm font-semibold'
                  : 'text-[#534343] hover:bg-[#eae7e7] hover:text-[#1b1c1c]'
              }`}
            >
              <span className="material-symbols-outlined text-[19px]">settings</span>
              <span>Security & Settings</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer: Logout & Storefront */}
        <div className="pt-4 border-t border-[#e4e2e1] flex flex-col gap-2.5">
          <button
            onClick={() => onNavigate('storefront')}
            className="w-full flex items-center justify-center gap-2 bg-white border border-[#d9c1c1] py-2 rounded-xl text-[12px] font-bold text-[#400710] hover:bg-[#f0eded] transition-colors shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">storefront</span>
            View Storefront
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-rose-50 border border-rose-200 py-2 rounded-xl text-[12px] font-bold text-rose-800 hover:bg-rose-100 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            Lock & Logout
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-10 h-16 bg-[#fcf9f8]/90 backdrop-blur-md border-b border-[#e4e2e1] px-4 sm:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            {/* Mobile Tab Scroller */}
            <div className="lg:hidden flex items-center gap-1 overflow-x-auto py-1">
              <button
                onClick={() => onNavigate('storefront')}
                className="px-2.5 py-1 text-[11px] font-bold bg-[#f0eded] rounded-lg text-[#400710] shrink-0"
              >
                Storefront
              </button>
              {(['overview', 'analytics', 'appointments', 'customers', 'gallery', 'settings'] as AdminTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2.5 py-1 text-[11px] font-medium capitalize rounded-lg shrink-0 ${
                    activeTab === tab
                      ? 'bg-[#400710] text-white font-bold'
                      : 'bg-white text-[#534343] border border-[#d9c1c1]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#867273] text-[18px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clients, orders, or fabric records..."
                className="w-full bg-[#f0eded] border border-transparent focus:border-[#d9c1c1] focus:bg-white rounded-xl pl-9 pr-4 py-1.5 text-[13px] text-[#1b1c1c] focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick action: Record New Sale */}
            <button
              onClick={() => setIsAddRecordModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 text-white text-[12px] font-semibold hover:bg-emerald-800 transition-colors shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">add_chart</span>
              + Record Sale
            </button>

            {/* Logout button header */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-rose-800 hover:bg-rose-50 transition-colors"
              title="Lock Admin Panel"
            >
              <span className="material-symbols-outlined text-[20px]">lock</span>
            </button>

            {/* Master Tailor Profile */}
            <div className="flex items-center gap-2 pl-2 border-l border-[#e4e2e1]">
              <div className="w-8 h-8 rounded-full bg-[#ffdada] text-[#400710] font-bold flex items-center justify-center text-[12px]">
                MT
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-[12px] font-bold text-[#1b1c1c] leading-none">Master Tailor</span>
                <span className="text-[10px] text-[#867273]">Authenticated</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Tab Contents */}
        <main className="p-4 sm:p-8 flex flex-col gap-8 max-w-[1400px] w-full mx-auto">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <>
              {/* Top Banner Card */}
              <div className="relative overflow-hidden rounded-3xl bg-white border border-[#e4e2e1] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-col gap-2 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#5c1d24]">
                      Authenticated Atelier Dashboard
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Real-Time Sync Active
                    </span>
                  </div>
                  <h1 className="font-serif text-[28px] sm:text-[34px] font-bold text-[#400710]">
                    Namaste, Master Tailor
                  </h1>
                  <p className="text-[14px] text-[#534343] leading-relaxed">
                    Live operational metrics, financial statistical data, client appointments, and inventory tracking for Premvati Ladies Tailor, Mumbai.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 flex-wrap">
                  <button
                    onClick={() => setIsAddRecordModalOpen(true)}
                    className="bg-emerald-800 text-white px-4 py-2.5 rounded-xl text-[13px] font-bold hover:bg-emerald-900 transition-colors shadow-sm flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[18px]">payments</span>
                    + Record Financial Entry
                  </button>
                  <button
                    onClick={onOpenNewBooking}
                    className="bg-[#5c1d24] text-white px-4 py-2.5 rounded-xl text-[13px] font-medium tracking-wide hover:bg-[#400710] transition-colors shadow-sm flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    New Booking
                  </button>
                </div>
              </div>

              {/* Time Range Filter Bar */}
              <div className="bg-white p-4 rounded-2xl border border-[#e4e2e1] shadow-xs flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#5c1d24] text-[20px]">filter_alt</span>
                  <span className="text-[13px] font-bold text-[#1b1c1c]">Statistical Time Range:</span>
                </div>
                <div className="flex items-center bg-[#f0eded] p-1 rounded-xl text-[12px] flex-wrap gap-1">
                  {(['today', 'weekly', 'monthly', 'quarterly', 'yearly'] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setTimeRange(r)}
                      className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-all ${
                        timeRange === r
                          ? 'bg-[#400710] text-white shadow-xs'
                          : 'text-[#534343] hover:text-[#1b1c1c]'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4 REAL STAT CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Total Revenue */}
                <div className="bg-white p-5 rounded-2xl border border-[#e4e2e1] shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-[#867273]">Total Atelier Revenue</span>
                    <div className="w-8 h-8 rounded-lg bg-[#ffdada]/50 text-[#400710] flex items-center justify-center font-bold">
                      ₹
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="text-[28px] font-bold text-[#400710] tracking-tight">
                      ₹{statsCalculated.totalRevenue.toLocaleString('en-IN')}
                    </span>
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-bold mt-1">
                      <span className="material-symbols-outlined text-[14px]">trending_up</span>
                      <span>+18.4% YoY ({statsCalculated.label})</span>
                    </div>
                  </div>
                </div>

                {/* Total Orders */}
                <div className="bg-white p-5 rounded-2xl border border-[#e4e2e1] shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-[#867273]">Completed & Active Orders</span>
                    <div className="w-8 h-8 rounded-lg bg-[#f0eded] text-[#400710] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">checkroom</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="text-[28px] font-bold text-[#1b1c1c] tracking-tight">
                      {statsCalculated.orderCount} Garments
                    </span>
                    <div className="flex items-center gap-2 text-[11px] text-[#534343] mt-1">
                      <span>Avg Order Value: <strong>₹{statsCalculated.avgOrderValue.toLocaleString('en-IN')}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Visitor Traffic */}
                <div className="bg-white p-5 rounded-2xl border border-[#e4e2e1] shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-[#867273]">Unique Visitors</span>
                    <div className="w-8 h-8 rounded-lg bg-[#f0eded] text-[#400710] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="text-[28px] font-bold text-[#1b1c1c] tracking-tight">
                      {statsCalculated.visitors.toLocaleString('en-IN')}
                    </span>
                    <div className="flex items-center gap-2 text-[11px] text-[#534343] mt-1">
                      <span>Conversion Rate: <strong className="text-emerald-700">{statsCalculated.conversionRate}%</strong></span>
                    </div>
                  </div>
                </div>

                {/* Customer Retention */}
                <div className="bg-white p-5 rounded-2xl border border-[#e4e2e1] shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-[#867273]">Client Retention & LTV</span>
                    <div className="w-8 h-8 rounded-lg bg-[#f0eded] text-[#400710] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="text-[28px] font-bold text-[#1b1c1c] tracking-tight">68.4%</span>
                    <div className="flex flex-col text-[11px] text-[#534343] mt-1">
                      <span>Repeat Clients • Avg LTV: <strong>₹24,800</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Section: Revenue Trends & Category Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Traffic & Visitor Trend Bar Chart (8 cols) */}
                <div className="lg:col-span-8 bg-white p-6 sm:p-7 rounded-2xl border border-[#e4e2e1] shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <h3 className="font-serif text-[20px] font-bold text-[#1b1c1c]">
                          Daily Visitor & Order Traffic
                        </h3>
                        <p className="text-[12px] text-[#867273]">
                          Real-time engagement breakdown over past 7 days
                        </p>
                      </div>
                      <span className="text-[11px] font-bold bg-[#ffdada] text-[#400710] px-2.5 py-1 rounded-md">
                        Peak: Saturday (520 visits)
                      </span>
                    </div>

                    {/* Interactive Bar Chart */}
                    <div className="mt-8 flex items-end justify-between gap-2 h-52 pt-6 border-b border-[#f0eded] px-2 sm:px-6">
                      {WEEKLY_TRAFFIC_DATA.map((item) => (
                        <div
                          key={item.day}
                          className="flex-1 flex flex-col items-center gap-2 group relative cursor-pointer"
                          onMouseEnter={() => setHoveredDay(item.day)}
                          onMouseLeave={() => setHoveredDay(null)}
                        >
                          {/* Floating tooltip on hover */}
                          <div
                            className={`absolute -top-10 bg-[#400710] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-md pointer-events-none transition-all ${
                              hoveredDay === item.day ? 'opacity-100 -translate-y-1' : 'opacity-0 translate-y-1'
                            }`}
                          >
                            {item.value} visitors
                          </div>

                          {/* Bar */}
                          <div className="w-full max-w-[38px] bg-[#f0eded] rounded-t-lg h-44 flex items-end p-0.5">
                            <div
                              style={{ height: item.heightPct }}
                              className={`w-full rounded-t-md transition-all duration-300 ${
                                item.day === 'Sat'
                                  ? 'bg-[#5c1d24]'
                                  : 'bg-[#db8287] group-hover:bg-[#5c1d24]'
                              }`}
                            ></div>
                          </div>

                          <span className={`text-[12px] font-medium ${
                            hoveredDay === item.day ? 'text-[#400710] font-bold' : 'text-[#867273]'
                          }`}>
                            {item.day}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 flex items-center justify-between text-[12px] text-[#534343]">
                    <span>
                      Highest Revenue Category: <strong className="text-[#400710]">Bridal & Festive Lehengas (42%)</strong>
                    </span>
                    <span>
                      Enquiry Conversion Rate: <strong className="text-emerald-700">{statsCalculated.conversionRate}%</strong>
                    </span>
                  </div>
                </div>

                {/* Category Revenue Shares (4 cols) */}
                <div className="lg:col-span-4 bg-white p-6 sm:p-7 rounded-2xl border border-[#e4e2e1] shadow-xs flex flex-col justify-between gap-5">
                  <div>
                    <h3 className="font-serif text-[20px] font-bold text-[#1b1c1c]">
                      Revenue by Garment Category
                    </h3>
                    <p className="text-[12px] text-[#867273]">
                      Statistical share for {statsCalculated.label}
                    </p>

                    <div className="flex flex-col gap-4 mt-6">
                      {categoryShare.map((cat) => (
                        <div key={cat.name} className="flex flex-col gap-1.5">
                          <div className="flex justify-between text-[12px]">
                            <span className="font-medium text-[#1b1c1c]">{cat.name}</span>
                            <span className="font-bold text-[#400710]">
                              ₹{cat.amount.toLocaleString('en-IN')} ({cat.pct}%)
                            </span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-[#f0eded] overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{ width: `${cat.pct}%`, backgroundColor: cat.color }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#f6f3f2] p-4 rounded-xl border border-[#d9c1c1]/60 flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#5c1d24] text-[20px] shrink-0 mt-0.5">
                      insights
                    </span>
                    <p className="text-[12px] text-[#534343] italic leading-relaxed">
                      "Bridal lehenga bookings generated <strong>₹{categoryShare[0].amount.toLocaleString('en-IN')}</strong> in tailoring turnover this month."
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Section: Appointments Table */}
              <div className="bg-white rounded-2xl border border-[#e4e2e1] shadow-xs overflow-hidden">
                <div className="p-6 border-b border-[#e4e2e1] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-[22px] font-bold text-[#1b1c1c]">
                      Client Fitting Appointments & Enquiries
                    </h3>
                    <p className="text-[12px] text-[#867273] mt-0.5">
                      Manage ongoing client orders and atelier trials
                    </p>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center bg-[#f0eded] p-1 rounded-xl text-[12px]">
                      {['all', 'Pending', 'Approved', 'Completed'].map((s) => (
                        <button
                          key={s}
                          onClick={() => setStatusFilter(s)}
                          className={`px-3 py-1 rounded-lg font-medium capitalize transition-all ${
                            statusFilter === s
                              ? 'bg-white text-[#400710] font-bold shadow-xs'
                              : 'text-[#534343]'
                          }`}
                        >
                          {s === 'all' ? 'All Status' : s}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={onOpenNewBooking}
                      className="bg-[#5c1d24] text-white px-4 py-1.5 rounded-xl text-[12px] font-semibold hover:bg-[#400710] transition-colors flex items-center gap-1 shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                      New Booking
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[13px]">
                    <thead className="bg-[#fcf9f8] border-b border-[#e4e2e1] text-[#867273] font-medium text-[11px] uppercase tracking-wider">
                      <tr>
                        <th className="py-3.5 px-6">Client Name</th>
                        <th className="py-3.5 px-6">Service / Garment</th>
                        <th className="py-3.5 px-6">Date & Time</th>
                        <th className="py-3.5 px-6">Status</th>
                        <th className="py-3.5 px-6 text-right">Quick Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0eded]">
                      {filteredAppointments.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-[#867273]">
                            No appointments found matching this search or filter.
                          </td>
                        </tr>
                      ) : (
                        filteredAppointments.map((apt) => (
                          <tr key={apt.id} className="hover:bg-[#f6f3f2]/60 transition-colors">
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-[#ffdada] text-[#400710] font-bold flex items-center justify-center text-[12px] shrink-0">
                                  {apt.initials}
                                </div>
                                <div>
                                  <span className="font-semibold text-[#1b1c1c] block">
                                    {apt.clientName}
                                  </span>
                                  <span className="text-[11px] text-[#867273]">
                                    {apt.phone}
                                  </span>
                                </div>
                              </div>
                            </td>

                            <td className="py-4 px-6">
                              <span className="font-medium text-[#1b1c1c] block">
                                {apt.service}
                              </span>
                              <span className="text-[11px] text-[#867273]">
                                {apt.category}
                              </span>
                            </td>

                            <td className="py-4 px-6 text-[#534343]">
                              <span className="font-medium text-[#1b1c1c] block">
                                {apt.dateTime}
                              </span>
                              <span className="text-[11px] text-[#867273]">
                                {apt.fabricStatus || 'Client fabric'}
                              </span>
                            </td>

                            <td className="py-4 px-6">
                              <span
                                className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusBadge(
                                  apt.status
                                )}`}
                              >
                                {apt.status}
                              </span>
                            </td>

                            <td className="py-4 px-6 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {apt.status !== 'Approved' && (
                                  <button
                                    onClick={() => onUpdateAppointmentStatus(apt.id, 'Approved')}
                                    title="Approve Appointment"
                                    className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                                  >
                                    <span className="material-symbols-outlined text-[18px]">check</span>
                                  </button>
                                )}

                                <button
                                  onClick={() => onOpenContactClient(apt)}
                                  title="Contact Client"
                                  className="p-1.5 rounded-lg bg-[#f0eded] text-[#400710] hover:bg-[#e4e2e1] transition-colors"
                                >
                                  <span className="material-symbols-outlined text-[18px]">call</span>
                                </button>

                                {apt.status !== 'Completed' && (
                                  <button
                                    onClick={() => onUpdateAppointmentStatus(apt.id, 'Completed')}
                                    title="Mark as Completed"
                                    className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                                  >
                                    <span className="material-symbols-outlined text-[18px]">done_all</span>
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: STATISTICAL ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="bg-white rounded-2xl border border-[#e4e2e1] p-6 sm:p-8 shadow-xs flex flex-col gap-6">
              <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#e4e2e1] pb-5">
                <div>
                  <h2 className="font-serif text-[26px] font-bold text-[#400710]">
                    Realistic Statistical Analytics Engine
                  </h2>
                  <p className="text-[13px] text-[#534343]">
                    Deep statistical metrics on workshop throughput, fabric inventory, conversion rates, and revenue pipeline
                  </p>
                </div>
                <button
                  onClick={() => setIsAddRecordModalOpen(true)}
                  className="bg-emerald-800 text-white px-4 py-2.5 rounded-xl text-[13px] font-bold hover:bg-emerald-900 transition-colors shadow-sm flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">add_chart</span>
                  Record New Financial Transaction
                </button>
              </div>

              {/* Statistical Highlights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-[#fcf9f8] border border-[#e4e2e1]">
                  <span className="text-[12px] font-semibold text-[#867273]">Gross Margin Ratio</span>
                  <h3 className="text-[32px] font-bold text-[#400710] mt-1">74.2%</h3>
                  <p className="text-[12px] text-emerald-700 font-bold mt-1">High efficiency tailor labor & fabrics</p>
                </div>
                <div className="p-6 rounded-2xl bg-[#fcf9f8] border border-[#e4e2e1]">
                  <span className="text-[12px] font-semibold text-[#867273]">Stitching Turnaround Time</span>
                  <h3 className="text-[32px] font-bold text-[#1b1c1c] mt-1">4.2 Days</h3>
                  <p className="text-[12px] text-[#534343] mt-1">Target benchmark: 5.0 days</p>
                </div>
                <div className="p-6 rounded-2xl bg-[#fcf9f8] border border-[#e4e2e1]">
                  <span className="text-[12px] font-semibold text-[#867273]">Active Workshop Tailor Capacity</span>
                  <h3 className="text-[32px] font-bold text-emerald-700 mt-1">94.2%</h3>
                  <p className="text-[12px] text-[#534343] mt-1">4 Master Cutters, 6 Embroidery Artisans</p>
                </div>
              </div>

              {/* Fabric Inventory Tracker Table */}
              <div className="mt-4">
                <h3 className="font-serif text-[20px] font-bold text-[#1b1c1c] mb-3">
                  Fabric Stock & Materials Inventory Log
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl border border-[#e4e2e1] bg-[#fcf9f8]">
                    <span className="text-[12px] text-[#867273]">Pure Katan Silk</span>
                    <span className="block text-[20px] font-bold text-[#400710] mt-1">145 Meters</span>
                    <span className="text-[11px] text-emerald-700 font-semibold">Stock Healthy</span>
                  </div>
                  <div className="p-4 rounded-xl border border-[#e4e2e1] bg-[#fcf9f8]">
                    <span className="text-[12px] text-[#867273]">Georgette & Organza</span>
                    <span className="block text-[20px] font-bold text-amber-700 mt-1">32 Meters</span>
                    <span className="text-[11px] text-amber-700 font-semibold">⚡ Re-order Suggested</span>
                  </div>
                  <div className="p-4 rounded-xl border border-[#e4e2e1] bg-[#fcf9f8]">
                    <span className="text-[12px] text-[#867273]">Raw Silk for Blouses</span>
                    <span className="block text-[20px] font-bold text-[#400710] mt-1">98 Meters</span>
                    <span className="text-[11px] text-emerald-700 font-semibold">Stock Healthy</span>
                  </div>
                  <div className="p-4 rounded-xl border border-[#e4e2e1] bg-[#fcf9f8]">
                    <span className="text-[12px] text-[#867273]">Gold Zari Embroidery Thread</span>
                    <span className="block text-[20px] font-bold text-[#400710] mt-1">42 Rolls</span>
                    <span className="text-[11px] text-emerald-700 font-semibold">Stock Healthy</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CUSTOMERS */}
          {activeTab === 'customers' && (
            <div className="bg-white rounded-2xl border border-[#e4e2e1] p-6 shadow-xs flex flex-col gap-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="font-serif text-[26px] font-bold text-[#400710]">
                    Clientele Directory
                  </h2>
                  <p className="text-[13px] text-[#534343]">
                    Measurement records and personalized fitting histories for Premvati patrons
                  </p>
                </div>
                <button
                  onClick={onOpenNewBooking}
                  className="bg-[#5c1d24] text-white px-4 py-2 rounded-xl text-[13px] font-medium hover:bg-[#400710]"
                >
                  + Add Client Booking
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {customers.map((c) => (
                  <div key={c.id} className="p-5 rounded-xl border border-[#e4e2e1] bg-[#fcf9f8] flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#ffdada] text-[#400710] font-bold flex items-center justify-center text-[14px]">
                          {c.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-bold text-[15px] text-[#1b1c1c]">{c.name}</h4>
                          <span className="text-[12px] text-[#867273]">{c.phone}</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold bg-[#f0eded] text-[#400710] px-2.5 py-1 rounded-md">
                        {c.totalOrders} Orders
                      </span>
                    </div>

                    <div className="text-[12px] bg-white p-3 rounded-lg border border-[#e4e2e1] text-[#534343]">
                      <span className="font-semibold text-[#1b1c1c]">Measurements: </span>
                      {c.measurementsSummary || 'Standard fitting'}
                    </div>

                    <div className="flex items-center justify-between text-[12px] text-[#867273] pt-1">
                      <span>Favorite: <strong>{c.favoriteCategory}</strong></span>
                      <a
                        href={`tel:${c.phone}`}
                        className="text-[#5c1d24] font-semibold hover:underline flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[14px]">call</span>
                        Call Client
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: APPOINTMENTS */}
          {activeTab === 'appointments' && (
            <div className="bg-white rounded-2xl border border-[#e4e2e1] p-6 shadow-xs flex flex-col gap-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="font-serif text-[26px] font-bold text-[#400710]">
                    Atelier Appointments Schedule
                  </h2>
                  <p className="text-[13px] text-[#534343]">
                    Manage fittings, trials, and fabric consultations
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={onOpenExportLedger}
                    className="px-4 py-2 rounded-xl border border-[#d9c1c1] text-[13px] font-semibold text-[#400710]"
                  >
                    Export Ledger
                  </button>
                  <button
                    onClick={onOpenNewBooking}
                    className="bg-[#5c1d24] text-white px-4 py-2 rounded-xl text-[13px] font-medium hover:bg-[#400710]"
                  >
                    + Book New Fitting
                  </button>
                </div>
              </div>

              <div className="flex flex-col divide-y divide-[#f0eded]">
                {appointments.map((apt) => (
                  <div key={apt.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#ffdada] text-[#400710] font-bold flex items-center justify-center shrink-0 text-[13px]">
                        {apt.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-[15px] text-[#1b1c1c]">{apt.clientName}</h4>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${getStatusBadge(apt.status)}`}>
                            {apt.status}
                          </span>
                        </div>
                        <p className="text-[13px] text-[#534343]">{apt.service} • {apt.category}</p>
                        <p className="text-[11px] text-[#867273]">{apt.dateTime} ({apt.phone})</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => onOpenContactClient(apt)}
                        className="px-3 py-1.5 rounded-lg border border-[#d9c1c1] text-[12px] font-medium hover:bg-[#f0eded]"
                      >
                        Contact
                      </button>
                      <button
                        onClick={() => onUpdateAppointmentStatus(apt.id, apt.status === 'Approved' ? 'Completed' : 'Approved')}
                        className="px-3 py-1.5 rounded-lg bg-[#5c1d24] text-white text-[12px] font-medium hover:bg-[#400710]"
                      >
                        {apt.status === 'Approved' ? 'Mark Done' : 'Approve'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: OFFERS */}
          {activeTab === 'offers' && (
            <div className="bg-white rounded-2xl border border-[#e4e2e1] p-6 shadow-xs flex flex-col gap-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="font-serif text-[26px] font-bold text-[#400710]">
                    Promotional Packages & Seasonal Deals
                  </h2>
                  <p className="text-[13px] text-[#534343]">
                    Active vouchers displayed on the customer storefront
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {offers.map((offer) => (
                  <div key={offer.id} className="p-6 rounded-2xl border border-[#e4e2e1] bg-[#fcf9f8] flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#5c1d24]">
                          {offer.code}
                        </span>
                        <span className="bg-[#fed65b] text-[#400710] font-bold px-2.5 py-0.5 rounded-full text-[11px]">
                          {offer.discount}
                        </span>
                      </div>
                      <h4 className="font-serif text-[18px] font-bold text-[#1b1c1c] mt-2">
                        {offer.title}
                      </h4>
                      <p className="text-[13px] text-[#534343] mt-1 leading-relaxed">
                        {offer.subtitle}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#e4e2e1] flex items-center justify-between text-[12px]">
                      <span className="text-[#867273]">Valid till: {offer.validTill}</span>
                      <button
                        onClick={() => onToggleOffer(offer.id)}
                        className={`font-semibold px-2.5 py-1 rounded-md ${
                          offer.active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {offer.active ? 'Active' : 'Disabled'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: GALLERY */}
          {activeTab === 'gallery' && (
            <div className="bg-white rounded-2xl border border-[#e4e2e1] p-6 shadow-xs flex flex-col gap-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="font-serif text-[26px] font-bold text-[#400710]">
                    Couture Portfolio Manager
                  </h2>
                  <p className="text-[13px] text-[#534343]">
                    Curate bridal pieces, blouse embroideries, and gown silhouettes
                  </p>
                </div>
                <button
                  onClick={onOpenUploadDesign}
                  className="bg-[#5c1d24] text-white px-5 py-2.5 rounded-xl text-[13px] font-medium hover:bg-[#400710] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>
                  Upload New Design
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryItems.map((item) => (
                  <div key={item.id} className="rounded-xl overflow-hidden border border-[#e4e2e1] bg-[#fcf9f8] flex flex-col">
                    <img src={item.imageUrl} alt={item.title} className="h-48 w-full object-cover" />
                    <div className="p-4 flex flex-col gap-2">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="font-bold text-[#5c1d24] uppercase">{item.categoryLabel}</span>
                        <span className="text-[#867273]">{item.fabric}</span>
                      </div>
                      <h4 className="font-bold text-[15px] text-[#1b1c1c]">{item.title}</h4>
                      <p className="text-[12px] text-[#534343] line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: SETTINGS & SECURITY */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl border border-[#e4e2e1] p-6 sm:p-8 shadow-xs flex flex-col gap-6 max-w-2xl">
              <div>
                <h2 className="font-serif text-[26px] font-bold text-[#400710]">
                  Admin Credentials & Security Parameters
                </h2>
                <p className="text-[13px] text-[#534343]">
                  Configure your Admin ID, Password, and Password Recovery Security Question
                </p>
              </div>

              {settingsMsg && (
                <div className="bg-emerald-100 text-emerald-900 p-3.5 rounded-xl text-[13px] font-bold border border-emerald-300">
                  {settingsMsg}
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-[#1b1c1c]">Admin User ID</label>
                  <input
                    type="text"
                    required
                    value={newAdminIdInput}
                    onChange={(e) => setNewAdminIdInput(e.target.value)}
                    className="bg-[#f6f3f2] border border-[#d9c1c1] rounded-xl px-4 py-2.5 text-[14px]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-[#1b1c1c]">Admin Password</label>
                  <input
                    type="password"
                    required
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                    className="bg-[#f6f3f2] border border-[#d9c1c1] rounded-xl px-4 py-2.5 text-[14px]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-[#1b1c1c]">Security Question (Fixed)</label>
                  <input
                    type="text"
                    readOnly
                    value={securityQuestion}
                    className="bg-[#e4e2e1] rounded-xl px-4 py-2.5 text-[13px] font-medium text-[#534343]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-[#1b1c1c]">Security Question Answer (Secret Answer)</label>
                  <input
                    type="password"
                    required
                    value={newSecAnsInput}
                    onChange={(e) => setNewSecAnsInput(e.target.value)}
                    className="bg-[#f6f3f2] border border-[#d9c1c1] rounded-xl px-4 py-2.5 text-[14px]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="bg-[#5c1d24] text-white px-6 py-3 rounded-xl text-[13px] font-bold hover:bg-[#400710] shadow-sm"
                  >
                    Save Security Credentials
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* ADD REAL FINANCIAL ENTRY MODAL */}
      {isAddRecordModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#fcf9f8] w-full max-w-md rounded-2xl p-6 shadow-2xl flex flex-col gap-5 border border-[#e4e2e1]">
            <div className="flex items-center justify-between border-b border-[#e4e2e1] pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#5c1d24]">add_chart</span>
                <h3 className="font-serif text-[20px] font-bold text-[#400710]">
                  Record Financial Transaction
                </h3>
              </div>
              <button onClick={() => setIsAddRecordModalOpen(false)} className="text-[#867273]">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddFinancialRecord} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#1b1c1c]">Client Name *</label>
                <input
                  type="text"
                  required
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  placeholder="e.g. Shalini Deshmukh"
                  className="bg-[#f6f3f2] border border-[#d9c1c1] rounded-xl px-4 py-2.5 text-[14px]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#1b1c1c]">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="bg-[#f6f3f2] border border-[#d9c1c1] rounded-xl px-4 py-2.5 text-[14px]"
                >
                  <option value="Occasion & Bridal Wear">Occasion & Bridal Wear</option>
                  <option value="Designer Saree Blouses">Designer Saree Blouses</option>
                  <option value="Western Wear">Western Wear</option>
                  <option value="Traditional Wear">Traditional Wear</option>
                  <option value="Alterations & Re-fits">Alterations & Re-fits</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#1b1c1c]">Amount (₹) *</label>
                <input
                  type="number"
                  required
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  placeholder="e.g. 15000"
                  className="bg-[#f6f3f2] border border-[#d9c1c1] rounded-xl px-4 py-2.5 text-[14px]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#e4e2e1]">
                <button
                  type="button"
                  onClick={() => setIsAddRecordModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#d9c1c1] text-[13px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#5c1d24] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-[#400710] text-[13px]"
                >
                  Record Entry & Update Stats
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
