import React, { useState } from 'react';
import { ScreenMode } from '../types';
import { LOGO_URL } from '../data/initialData';

interface HeaderProps {
  currentScreen: ScreenMode;
  onNavigate: (screen: ScreenMode, section?: string) => void;
  activeNav?: string;
  onBookClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  activeNav = 'home',
  onBookClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (section: string) => {
    if (section === 'gallery') {
      onNavigate('gallery');
    } else {
      onNavigate('storefront', section);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#fcf9f8]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#e4e2e1]/60">
      <div className="h-20 max-w-[1280px] mx-auto px-4 sm:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => onNavigate('storefront', 'home')}
        >
          <img
            alt="Premvati Logo"
            className="h-8 w-auto object-contain"
            src={LOGO_URL}
          />
          <div className="flex flex-col">
            <span className="font-serif text-[22px] leading-tight text-[#400710] font-bold tracking-tight">
              Premvati
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#867273] font-medium hidden sm:inline-block">
              Ladies Tailor • Mumbai
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          <button
            onClick={() => handleNavClick('home')}
            className={`text-[14px] transition-colors ${
              currentScreen === 'storefront' && activeNav === 'home'
                ? 'bg-[#5c1d24] text-white font-semibold rounded-lg px-3.5 py-1.5 shadow-sm'
                : 'text-[#534343] hover:text-[#1b1c1c] font-medium'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('dresses')}
            className={`text-[14px] transition-colors ${
              currentScreen === 'storefront' && activeNav === 'dresses'
                ? 'bg-[#5c1d24] text-white font-semibold rounded-lg px-3.5 py-1.5 shadow-sm'
                : 'text-[#534343] hover:text-[#1b1c1c] font-medium'
            }`}
          >
            Dresses
          </button>
          <button
            onClick={() => handleNavClick('western')}
            className={`text-[14px] transition-colors ${
              currentScreen === 'storefront' && activeNav === 'western'
                ? 'bg-[#5c1d24] text-white font-semibold rounded-lg px-3.5 py-1.5 shadow-sm'
                : 'text-[#534343] hover:text-[#1b1c1c] font-medium'
            }`}
          >
            Western
          </button>
          <button
            onClick={() => handleNavClick('traditional')}
            className={`text-[14px] transition-colors ${
              currentScreen === 'storefront' && activeNav === 'traditional'
                ? 'bg-[#5c1d24] text-white font-semibold rounded-lg px-3.5 py-1.5 shadow-sm'
                : 'text-[#534343] hover:text-[#1b1c1c] font-medium'
            }`}
          >
            Traditional
          </button>
          <button
            onClick={() => handleNavClick('gallery')}
            className={`text-[14px] transition-colors ${
              currentScreen === 'gallery'
                ? 'bg-[#5c1d24] text-white font-semibold rounded-lg px-3.5 py-1.5 shadow-sm'
                : 'text-[#534343] hover:text-[#1b1c1c] font-medium'
            }`}
          >
            Gallery
          </button>
          <button
            onClick={() => handleNavClick('offers')}
            className={`text-[14px] transition-colors ${
              currentScreen === 'storefront' && activeNav === 'offers'
                ? 'bg-[#5c1d24] text-white font-semibold rounded-lg px-3.5 py-1.5 shadow-sm'
                : 'text-[#534343] hover:text-[#1b1c1c] font-medium'
            }`}
          >
            Offers
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`text-[14px] transition-colors ${
              currentScreen === 'storefront' && activeNav === 'contact'
                ? 'bg-[#5c1d24] text-white font-semibold rounded-lg px-3.5 py-1.5 shadow-sm'
                : 'text-[#534343] hover:text-[#1b1c1c] font-medium'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            className="hidden md:flex items-center gap-1.5 text-[#400710] font-semibold text-[14px] hover:text-[#5c1d24] transition-colors"
            href="tel:9769655856"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span>9769655856</span>
          </a>

          <button
            onClick={onBookClick}
            className="bg-[#5c1d24] text-white px-4 py-2 rounded-xl text-[13px] font-medium tracking-wide transition-all hover:bg-[#400710] shadow-sm active:scale-95"
          >
            Book Appointment
          </button>

          {/* Admin Panel removed from header navigation per request */}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#400710] hover:bg-[#f0eded]"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fcf9f8] border-b border-[#e4e2e1] px-6 py-4 flex flex-col gap-2 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => handleNavClick('home')}
            className="text-left py-2 px-3 rounded-lg text-[#1b1c1c] font-medium hover:bg-[#f0eded]"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('dresses')}
            className="text-left py-2 px-3 rounded-lg text-[#1b1c1c] font-medium hover:bg-[#f0eded]"
          >
            Dresses
          </button>
          <button
            onClick={() => handleNavClick('western')}
            className="text-left py-2 px-3 rounded-lg text-[#1b1c1c] font-medium hover:bg-[#f0eded]"
          >
            Western Wear
          </button>
          <button
            onClick={() => handleNavClick('traditional')}
            className="text-left py-2 px-3 rounded-lg text-[#1b1c1c] font-medium hover:bg-[#f0eded]"
          >
            Traditional Wear
          </button>
          <button
            onClick={() => handleNavClick('gallery')}
            className="text-left py-2 px-3 rounded-lg text-[#1b1c1c] font-medium hover:bg-[#f0eded]"
          >
            The Couture Gallery
          </button>
          <button
            onClick={() => handleNavClick('offers')}
            className="text-left py-2 px-3 rounded-lg text-[#1b1c1c] font-medium hover:bg-[#f0eded]"
          >
            Special Offers
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="text-left py-2 px-3 rounded-lg text-[#1b1c1c] font-medium hover:bg-[#f0eded]"
          >
            Contact & Atelier Location
          </button>
          <div className="pt-2 border-t border-[#e4e2e1] flex flex-col gap-2">
            <a
              href="tel:9769655856"
              className="flex items-center gap-2 py-2 px-3 text-[#400710] font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span>+91 97696 55856</span>
            </a>
            {/* Admin access removed from mobile menu per request */}
          </div>
        </div>
      )}
    </header>
  );
};
