import React, { useState } from 'react';
import {
  ScreenMode,
  Appointment,
  GalleryItem,
  Customer,
  SpecialOffer,
  AppointmentStatus,
} from './types';
import {
  INITIAL_APPOINTMENTS,
  INITIAL_GALLERY,
  INITIAL_CUSTOMERS,
  INITIAL_OFFERS,
} from './data/initialData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Storefront } from './components/Storefront';
import { GalleryScreen } from './components/GalleryScreen';
import { AdminPanel } from './components/AdminPanel';
import { MobileBottomNav } from './components/MobileBottomNav';
import {
  LightboxModal,
  UploadDesignModal,
  NewBookingModal,
  ExportLedgerModal,
  ContactClientModal,
} from './components/Modals';

export default function App() {
  // Navigation & Screen View
  const [currentScreen, setCurrentScreen] = useState<ScreenMode>('storefront');
  const [activeNav, setActiveNav] = useState<string>('home');

  // Shared Data State
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [offers, setOffers] = useState<SpecialOffer[]>(INITIAL_OFFERS);

  // Modals
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false);
  const [isExportLedgerModalOpen, setIsExportLedgerModalOpen] = useState(false);
  const [selectedContactApt, setSelectedContactApt] = useState<Appointment | null>(null);
  const [preselectedCategory, setPreselectedCategory] = useState<string>('Traditional Wear');
  const [preselectedService, setPreselectedService] = useState<string>('Bespoke Tailoring Fitting');

  // Screen Switcher handler
  const handleNavigate = (screen: ScreenMode, section?: string) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (section) {
      setActiveNav(section);
      if (screen === 'storefront') {
        setTimeout(() => {
          if (section === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (section === 'offers' || section === 'contact') {
            const el = document.getElementById('appointment-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          } else {
            const el = document.getElementById(section);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  };

  // Add Booking
  const handleAddBooking = (bookingData: Omit<Appointment, 'id' | 'createdAt' | 'initials'>) => {
    const initials = bookingData.clientName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'CL';

    const newAppointment: Appointment = {
      ...bookingData,
      id: `apt-${Date.now().toString().slice(-4)}`,
      initials,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };

    setAppointments((prev) => [newAppointment, ...prev]);

    // Also update or add to customers list
    setCustomers((prev) => {
      const existing = prev.find((c) => c.name.toLowerCase() === bookingData.clientName.toLowerCase());
      if (existing) {
        return prev.map((c) =>
          c.id === existing.id
            ? { ...c, totalOrders: c.totalOrders + 1, lastVisit: 'Today' }
            : c
        );
      } else {
        const newCustomer: Customer = {
          id: `c-${Date.now().toString().slice(-4)}`,
          name: bookingData.clientName,
          phone: bookingData.phone,
          email: bookingData.email || '',
          totalOrders: 1,
          lastVisit: 'Today',
          favoriteCategory: bookingData.category,
          measurementsSummary: bookingData.notes || 'First measurement session',
        };
        return [newCustomer, ...prev];
      }
    });
  };

  // Update Status
  const handleUpdateAppointmentStatus = (id: string, newStatus: AppointmentStatus) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
    );
  };

  // Upload Design
  const handleUploadDesign = (newItem: Omit<GalleryItem, 'id'>) => {
    const newGalleryItem: GalleryItem = {
      ...newItem,
      id: `gal-${Date.now().toString().slice(-4)}`,
    };
    setGalleryItems((prev) => [newGalleryItem, ...prev]);
  };

  // Toggle Offer
  const handleToggleOffer = (id: string) => {
    setOffers((prev) =>
      prev.map((off) => (off.id === id ? { ...off, active: !off.active } : off))
    );
  };

  // Book Fitting from Gallery
  const handleBookDesign = (item: GalleryItem) => {
    setPreselectedCategory(item.categoryLabel);
    setPreselectedService(`${item.title} Fitting`);
    setIsNewBookingModalOpen(true);
  };

  const handleMobileBookClick = () => {
    if (currentScreen === 'storefront') {
      const el = document.getElementById('appointment-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else setIsNewBookingModalOpen(true);
    } else {
      setIsNewBookingModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf9f8] flex flex-col font-sans selection:bg-[#5c1d24] selection:text-white pb-16 lg:pb-0">
      {/* Floating screen switcher removed per request */}

      {/* RENDER STOREFRONT SCREEN */}
      {currentScreen === 'storefront' && (
        <>
          <Header
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
            activeNav={activeNav}
            onBookClick={handleMobileBookClick}
          />
          <main className="flex-1">
            <Storefront
              onNavigate={handleNavigate}
              onAddBooking={handleAddBooking}
              preselectedCategory={preselectedCategory}
              offers={offers}
            />
          </main>
          <Footer onNavigate={handleNavigate} />
        </>
      )}

      {/* RENDER COUTURE GALLERY SCREEN */}
      {currentScreen === 'gallery' && (
        <>
          <Header
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
            activeNav="gallery"
            onBookClick={() => setIsNewBookingModalOpen(true)}
          />
          <main className="flex-1">
            <GalleryScreen
              items={galleryItems}
              onOpenItem={(item) => setSelectedGalleryItem(item)}
              onOpenUpload={() => setIsUploadModalOpen(true)}
              onNavigate={handleNavigate}
            />
          </main>
          <Footer onNavigate={handleNavigate} />
        </>
      )}

      {/* RENDER ATELIER ADMIN DASHBOARD */}
      {currentScreen === 'admin' && (
        <AdminPanel
          onNavigate={handleNavigate}
          appointments={appointments}
          customers={customers}
          offers={offers}
          galleryItems={galleryItems}
          onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
          onOpenNewBooking={() => setIsNewBookingModalOpen(true)}
          onOpenExportLedger={() => setIsExportLedgerModalOpen(true)}
          onOpenContactClient={(apt) => setSelectedContactApt(apt)}
          onToggleOffer={handleToggleOffer}
          onOpenUploadDesign={() => setIsUploadModalOpen(true)}
        />
      )}

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <MobileBottomNav
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onBookClick={handleMobileBookClick}
      />

      {/* ALL MODALS */}
      <LightboxModal
        item={selectedGalleryItem}
        onClose={() => setSelectedGalleryItem(null)}
        onBookDesign={handleBookDesign}
      />

      <UploadDesignModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUploadDesign}
      />

      <NewBookingModal
        isOpen={isNewBookingModalOpen}
        onClose={() => setIsNewBookingModalOpen(false)}
        onAddBooking={handleAddBooking}
        defaultCategory={preselectedCategory}
        defaultService={preselectedService}
      />

      <ExportLedgerModal
        isOpen={isExportLedgerModalOpen}
        onClose={() => setIsExportLedgerModalOpen(false)}
        appointments={appointments}
      />

      <ContactClientModal
        appointment={selectedContactApt}
        onClose={() => setSelectedContactApt(null)}
        onStatusChange={handleUpdateAppointmentStatus}
      />
    </div>
  );
}
