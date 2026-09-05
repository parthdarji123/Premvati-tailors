import React from 'react';
import { ScreenMode } from '../types';

interface FooterProps {
  onNavigate: (screen: ScreenMode, section?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#f6f3f2] py-16 border-t border-[#e4e2e1]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-3 gap-10 text-[#534343]">
        {/* Col 1 */}
        <div className="flex flex-col gap-3">
          <span className="font-serif text-[24px] text-[#400710] font-bold">
            Premvati Ladies Tailor
          </span>
          <p className="text-[13px] leading-relaxed text-[#534343]">
            Bespoke womenswear, bridal couture, and personalized tailoring in the heart of Mumbai. Celebrating craftsmanship, hand-finished silhouettes, and custom cuts since 2000.
          </p>
          {/* Admin access removed from footer per request */}
        </div>

        {/* Col 2 */}
        <div className="flex flex-col gap-2">
          <span className="font-serif text-[18px] text-[#1b1c1c] font-semibold">
            Atelier Locations
          </span>
          <p className="text-[13px] leading-relaxed">
            <strong className="text-[#1b1c1c]">Studio 1 (Main Workshop):</strong><br />
            Mahavir Darshan, Goraswadi, S.V. Road, Malad West, Mumbai 400064
          </p>
          <p className="text-[13px] font-medium text-[#400710] mt-1">
            Direct Line: +91 97696 55856
          </p>
        </div>

        {/* Col 3 */}
        <div className="flex flex-col gap-3">
          <span className="font-serif text-[18px] text-[#1b1c1c] font-semibold">
            Connect With Atelier
          </span>
          <p className="text-[13px] text-[#534343]">
            Follow our daily embroidery swatches, lehenga fittings, and bridal trials.
          </p>
          <div className="flex gap-4 mt-1 items-center">
            <button
              onClick={() => alert('Premvati Atelier URL copied to clipboard')}
              className="w-10 h-10 rounded-xl bg-white border border-[#d9c1c1] flex items-center justify-center text-[#400710] hover:bg-[#400710] hover:text-white transition-all shadow-xs"
              title="Share Atelier"
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
            </button>
            <a
              href="mailto:darji.parth0015@gmail.com"
              className="flex items-center gap-2 rounded-xl bg-white border border-[#d9c1c1] px-3 py-2 text-[#400710] hover:bg-[#400710] hover:text-white transition-all shadow-xs"
              title="Email Atelier"
              aria-label="Email Atelier"
            >
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">mail</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 mt-12 pt-6 border-t border-[#d9c1c1]/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#867273]">
        <p>Copyright 2000-present Premvati Ladies Tailor. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <button onClick={() => onNavigate('gallery')} className="hover:underline">
            Couture Gallery
          </button>
          <button onClick={() => onNavigate('storefront', 'appointment')} className="hover:underline">
            Book Appointment
          </button>
          {/* Admin Ledger link removed per request */}
        </div>
      </div>
    </footer>
  );
};
