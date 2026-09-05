import React from 'react';
import { ScreenMode } from '../types';

interface MobileBottomNavProps {
  currentScreen: ScreenMode;
  onNavigate: (screen: ScreenMode, section?: string) => void;
  onBookClick: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentScreen,
  onNavigate,
  onBookClick,
}) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1b1c1c]/95 backdrop-blur-xl border-t border-white/10 text-white flex items-center justify-around py-2 px-1 shadow-2xl">
      {/* Home */}
      <button
        onClick={() => onNavigate('storefront', 'home')}
        className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
          currentScreen === 'storefront' ? 'text-[#ffdada] font-bold' : 'text-white/70 hover:text-white'
        }`}
      >
        <span className="material-symbols-outlined text-[22px]">home</span>
        <span className="text-[10px]">Home</span>
      </button>

      {/* Gallery */}
      <button
        onClick={() => onNavigate('gallery')}
        className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
          currentScreen === 'gallery' ? 'text-[#ffdada] font-bold' : 'text-white/70 hover:text-white'
        }`}
      >
        <span className="material-symbols-outlined text-[22px]">photo_library</span>
        <span className="text-[10px]">Gallery</span>
      </button>

      {/* Book Fitting CTA */}
      <button
        onClick={onBookClick}
        className="flex flex-col items-center gap-0.5 px-3.5 py-1 rounded-2xl bg-[#5c1d24] text-white font-bold shadow-md active:scale-95 transition-transform"
      >
        <span className="material-symbols-outlined text-[22px]">calendar_month</span>
        <span className="text-[10px]">Book Fit</span>
      </button>

      {/* Contact */}
      <button
        onClick={() => onNavigate('storefront', 'contact')}
        className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-white/70 hover:text-white"
      >
        <span className="material-symbols-outlined text-[22px]">call</span>
        <span className="text-[10px]">Contact</span>
      </button>

      {/* Admin removed from mobile bottom nav per request */}
    </div>
  );
};
