import React, { useState } from 'react';
import { ScreenMode, Appointment } from '../types';
import {
  HERO_STUDIO_IMG,
  TRADITIONAL_CATEGORY_IMG,
  WESTERN_CATEGORY_IMG,
  OCCASION_CATEGORY_IMG,
  TAILOR_MEASURING_IMG,
  MAP_IMG,
} from '../data/initialData';

interface StorefrontProps {
  onNavigate: (screen: ScreenMode, section?: string) => void;
  onAddBooking: (booking: Omit<Appointment, 'id' | 'createdAt' | 'initials'>) => void;
  preselectedCategory?: string;
  offers?: {
    id: string;
    title: string;
    subtitle: string;
    code: string;
    discount: string;
    validTill?: string;
    active: boolean;
  }[];
}

export const Storefront: React.FC<StorefrontProps> = ({
  onNavigate,
  onAddBooking,
  preselectedCategory,
  offers = [],
}) => {
  // Appointment Form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState(preselectedCategory || 'Traditional Wear');
  const [dateTime, setDateTime] = useState('');
  const [fabricStatus, setFabricStatus] = useState('I will bring my own fabric');
  const [message, setMessage] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    onAddBooking({
      clientName: fullName,
      phone,
      email,
      service: `${category} Consultation`,
      category,
      dateTime: dateTime || 'Tomorrow, 04:00 PM',
      dateStr: dateTime ? dateTime.split('T')[0] || 'Upcoming' : 'Upcoming',
      timeStr: dateTime ? dateTime.split('T')[1] || '04:00 PM' : '04:00 PM',
      status: 'Pending',
      fabricStatus,
      notes: message,
    });

    setBookingSuccess(true);
    setFullName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

  const scrollToAppointment = (cat?: string) => {
    if (cat) setCategory(cat);
    const el = document.getElementById('appointment-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-[#fcf9f8] min-h-screen text-[#1b1c1c] overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 border-b border-[#e4e2e1]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0eded] border border-[#d9c1c1]/70 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#400710] animate-pulse"></span>
              <span className="text-[12px] uppercase font-bold tracking-widest text-[#400710]">
                Bespoke Atelier • Mumbai
              </span>
            </div>

            <h1 className="font-serif text-[42px] sm:text-[56px] lg:text-[62px] leading-[1.08] text-[#400710] font-bold tracking-tight">
              Your Style. <br />
              Your Fit. <br />
              <span className="italic font-normal">Your Premvati.</span>
            </h1>

            <p className="text-[16px] sm:text-[18px] leading-relaxed text-[#534343] max-w-xl">
              Expert ladies' tailoring crafted specially for you. From bridal lehengas to everyday elegance, we bring your fashion visions to life with immaculate Mumbai fitting.
            </p>

            {/* Checkmark badges */}
            <div className="flex flex-wrap gap-4 pt-1 text-[13px] text-[#1b1c1c] font-medium">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#400710] text-[18px]">verified</span>
                <span>Custom Tailoring</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#400710] text-[18px]">verified</span>
                <span>Perfect Fit Guaranteed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#400710] text-[18px]">verified</span>
                <span>Personal Attention</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('gallery')}
                className="bg-[#5c1d24] text-white px-7 py-3.5 rounded-xl font-medium tracking-wide hover:bg-[#400710] transition-all shadow-md active:scale-95 text-center text-[14px]"
              >
                Explore Our Designs
              </button>

              <button
                onClick={() => scrollToAppointment()}
                className="px-7 py-3.5 rounded-xl border border-[#400710] text-[#400710] font-semibold hover:bg-[#400710] hover:text-white transition-all text-center text-[14px]"
              >
                Book an Appointment
              </button>
            </div>
          </div>

          {/* Right Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-[#f0eded]">
              <img
                src={HERO_STUDIO_IMG}
                alt="Premvati Atelier Studio"
                className="w-full h-full object-cover"
              />
              {/* Floating Atelier Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#e4e2e1] shadow-lg flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#400710] text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">checkroom</span>
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-[#1b1c1c] leading-tight">
                    Master Tailor Studio
                  </h4>
                  <p className="text-[11px] text-[#534343] mt-0.5">
                    Mahavir Darshan, Malad West • Crafting perfection since 2000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SPECIAL OFFER BANNER */}
      <section className="py-8 bg-[#fcf9f8]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#400710] via-[#5c1d24] to-[#400710] text-white p-6 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#fed65b]/20">
            <div className="flex flex-col gap-2 max-w-2xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 self-center md:self-start bg-[#fed65b] text-[#400710] px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[14px]">local_activity</span>
                Special Offer
              </div>
              {offers && offers.length > 0 ? (
                <>
                  <h3 className="font-serif text-[24px] sm:text-[28px] font-bold text-white">
                    Save {offers[0].discount} with code <span className="font-mono">{offers[0].code}</span> — Book a consultation
                  </h3>
                  <p className="text-[14px] text-white/85 leading-relaxed">
                    {offers[0].subtitle}
                  </p>
                </>
              ) : (
                <>
                  <h3 className="font-serif text-[24px] sm:text-[28px] font-bold text-white">
                    Get your favourite outfit perfectly tailored for your next special occasion.
                  </h3>
                  <p className="text-[14px] text-white/85 leading-relaxed">
                    Visit our Malad West atelier or book a consultation to unlock exclusive seasonal tailoring packages & express fitting benefits.
                  </p>
                </>
              )}
            </div>

            <button
              onClick={() => scrollToAppointment()}
              className="bg-[#fed65b] text-[#400710] font-bold px-7 py-3 rounded-xl hover:bg-white transition-all shadow-md whitespace-nowrap text-[14px]"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES ("Why Choose Premvati? The Premvati Standard") */}
      <section id="dresses" className="py-20 border-b border-[#e4e2e1]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
            <span className="text-[12px] font-bold uppercase tracking-widest text-[#5c1d24]">
              Signature Collections
            </span>
            <h2 className="font-serif text-[34px] sm:text-[42px] text-[#400710] font-bold">
              Tailored For Every Silhouette
            </h2>
            <p className="text-[15px] text-[#534343]">
              From classic handloom heirlooms to sleek modern silhouettes, every cut is customized to your exact body measurements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Card 1: Traditional */}
            <div 
              id="traditional" 
              className="group bg-white rounded-2xl overflow-hidden border border-[#e4e2e1] hover:border-[#d9c1c1] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="h-64 overflow-hidden relative bg-[#f0eded]">
                <img
                  src={TRADITIONAL_CATEGORY_IMG}
                  alt="Traditional Wear"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-white/95 text-[#400710] text-[11px] font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow-sm">
                  Ethnic Couture
                </span>
              </div>
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-serif text-[22px] font-bold text-[#1b1c1c]">
                    Traditional Wear
                  </h3>
                  <p className="text-[13px] text-[#534343] mt-2 leading-relaxed">
                    Blouse, Saree Blouse, Kurti, Salwar Suit, Anarkali, Lehenga, Chaniya Choli, Dupatta border handwork.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#f0eded] flex items-center justify-between">
                  <span className="text-[12px] text-[#867273]">Bespoke Tailoring</span>
                  <button
                    onClick={() => scrollToAppointment('Traditional Wear')}
                    className="text-[13px] font-bold text-[#5c1d24] hover:underline flex items-center gap-1"
                  >
                    Enquire Now
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2: Western */}
            <div 
              id="western" 
              className="group bg-white rounded-2xl overflow-hidden border border-[#e4e2e1] hover:border-[#d9c1c1] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="h-64 overflow-hidden relative bg-[#f0eded]">
                <img
                  src={WESTERN_CATEGORY_IMG}
                  alt="Western Wear"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-white/95 text-[#400710] text-[11px] font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow-sm">
                  Modern Cuts
                </span>
              </div>
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-serif text-[22px] font-bold text-[#1b1c1c]">
                    Western Wear
                  </h3>
                  <p className="text-[13px] text-[#534343] mt-2 leading-relaxed">
                    Dresses, Gowns, Tops, Skirts, Jumpsuits, Co-ord Sets, Tailored Trousers, Cocktail Blazers.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#f0eded] flex items-center justify-between">
                  <span className="text-[12px] text-[#867273]">Custom Fitting</span>
                  <button
                    onClick={() => scrollToAppointment('Western Wear')}
                    className="text-[13px] font-bold text-[#5c1d24] hover:underline flex items-center gap-1"
                  >
                    Enquire Now
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3: Occasion */}
            <div 
              className="group bg-white rounded-2xl overflow-hidden border border-[#e4e2e1] hover:border-[#d9c1c1] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="h-64 overflow-hidden relative bg-[#f0eded]">
                <img
                  src={OCCASION_CATEGORY_IMG}
                  alt="Occasion Wear"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-white/95 text-[#400710] text-[11px] font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow-sm">
                  Bridal & Gala
                </span>
              </div>
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-serif text-[22px] font-bold text-[#1b1c1c]">
                    Occasion Wear
                  </h3>
                  <p className="text-[13px] text-[#534343] mt-2 leading-relaxed">
                    Party Wear, Wedding Outfits, Festive Wear, Reception Wear, Haldi & Sangeet Ensembles, Red Carpet Silhouettes.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#f0eded] flex items-center justify-between">
                  <span className="text-[12px] text-[#867273]">Bridal Fitting</span>
                  <button
                    onClick={() => scrollToAppointment('Occasion & Bridal Wear')}
                    className="text-[13px] font-bold text-[#5c1d24] hover:underline flex items-center gap-1"
                  >
                    Enquire Now
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 5. THE PREMVATI STANDARD (4 Pillars) */}
      <section className="py-20 border-b border-[#e4e2e1]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[12px] font-bold uppercase tracking-widest text-[#5c1d24]">
              Why Choose Premvati?
            </span>
            <h2 className="font-serif text-[32px] sm:text-[40px] text-[#400710] font-bold mt-1">
              The Premvati Standard
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="p-6 bg-white rounded-2xl border border-[#e4e2e1] flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#f0eded] text-[#400710] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">straighten</span>
              </div>
              <h3 className="font-bold text-[17px] text-[#1b1c1c]">Custom Fit</h3>
              <p className="text-[13px] text-[#534343] leading-relaxed">
                Tailored to your unique measurements — no compromises on fit, drape, or comfort.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#e4e2e1] flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#f0eded] text-[#400710] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">auto_fix_high</span>
              </div>
              <h3 className="font-bold text-[17px] text-[#1b1c1c]">Made For You</h3>
              <p className="text-[13px] text-[#534343] leading-relaxed">
                Every piece is one-of-a-kind, designed around your style, silhouette, and occasion.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#e4e2e1] flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#f0eded] text-[#400710] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">diamond</span>
              </div>
              <h3 className="font-bold text-[17px] text-[#1b1c1c]">Attention To Detail</h3>
              <p className="text-[13px] text-[#534343] leading-relaxed">
                From hand-pressed seams to intricate piping and neckline linings, nothing is overlooked.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#e4e2e1] flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#f0eded] text-[#400710] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">favorite</span>
              </div>
              <h3 className="font-bold text-[17px] text-[#1b1c1c]">Personal Service</h3>
              <p className="text-[13px] text-[#534343] leading-relaxed">
                One-on-one consultations with our master tailor to guide and refine your ideas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS (4 Steps) */}
      <section className="py-20 bg-[#f6f3f2] border-b border-[#e4e2e1]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[12px] font-bold uppercase tracking-widest text-[#5c1d24]">
              Seamless Process
            </span>
            <h2 className="font-serif text-[32px] sm:text-[40px] text-[#400710] font-bold mt-1">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-white p-6 rounded-2xl border border-[#e4e2e1] relative">
              <span className="text-[32px] font-serif font-bold text-[#db8287]/40 block">01</span>
              <h3 className="font-bold text-[16px] text-[#1b1c1c] mt-2">Share Your Idea</h3>
              <p className="text-[13px] text-[#534343] mt-2 leading-relaxed">
                Tell us your vision, bring fabric or reference photos, and explore styling options with our master tailor.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#e4e2e1] relative">
              <span className="text-[32px] font-serif font-bold text-[#db8287]/40 block">02</span>
              <h3 className="font-bold text-[16px] text-[#1b1c1c] mt-2">Choose Your Design</h3>
              <p className="text-[13px] text-[#534343] mt-2 leading-relaxed">
                Finalize the pattern, neckline, sleeves, embellishments, and lining preferences together.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#e4e2e1] relative">
              <span className="text-[32px] font-serif font-bold text-[#db8287]/40 block">03</span>
              <h3 className="font-bold text-[16px] text-[#1b1c1c] mt-2">Measurements & Tailoring</h3>
              <p className="text-[13px] text-[#534343] mt-2 leading-relaxed">
                We record your precise measurements and handcraft your outfit in our Mumbai atelier.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#e4e2e1] relative">
              <span className="text-[32px] font-serif font-bold text-[#db8287]/40 block">04</span>
              <h3 className="font-bold text-[16px] text-[#1b1c1c] mt-2">Perfect Fit</h3>
              <p className="text-[13px] text-[#534343] mt-2 leading-relaxed">
                Visit for a trial fitting. We fine-tune every seam so your garment drapes like a dream.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. APPOINTMENT BOOKING & ENQUIRY FORM */}
      <section id="appointment-section" className="py-20 border-b border-[#e4e2e1]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#e4e2e1]">
            <div className="text-center mb-8">
              <span className="text-[12px] font-bold uppercase tracking-widest text-[#5c1d24]">
                Book A Consultation
              </span>
              <h2 className="font-serif text-[32px] sm:text-[38px] text-[#400710] font-bold mt-1">
                Schedule Your Atelier Fitting
              </h2>
              <p className="text-[14px] text-[#534343] mt-2">
                Fill in your details below. Our master tailor will confirm your fitting session and prepare fabric swatches.
              </p>
            </div>

            {bookingSuccess && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between animate-in fade-in">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-emerald-600">check_circle</span>
                  <span className="text-[14px] font-medium">
                    Thank you! Your appointment request has been scheduled in the atelier ledger.
                  </span>
                </div>
                <button
                  onClick={() => setBookingSuccess(false)}
                  className="text-emerald-700 hover:text-emerald-900 text-[12px] font-bold"
                >
                  Dismiss
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] text-[#1b1c1c] font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Shalini Deshmukh"
                    className="bg-[#f6f3f2] border border-[#d9c1c1] rounded-xl px-4 py-3 text-[14px] text-[#1b1c1c] focus:outline-none focus:border-[#400710]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] text-[#1b1c1c] font-medium">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="bg-[#f6f3f2] border border-[#d9c1c1] rounded-xl px-4 py-3 text-[14px] text-[#1b1c1c] focus:outline-none focus:border-[#400710]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] text-[#1b1c1c] font-medium">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="shalini@gmail.com"
                    className="bg-[#f6f3f2] border border-[#d9c1c1] rounded-xl px-4 py-3 text-[14px] text-[#1b1c1c] focus:outline-none focus:border-[#400710]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] text-[#1b1c1c] font-medium">
                    Dress Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-[#f6f3f2] border border-[#d9c1c1] rounded-xl px-4 py-3 text-[14px] text-[#1b1c1c] focus:outline-none focus:border-[#400710]"
                  >
                    <option value="Traditional Wear">Traditional Wear (Lehenga, Saree Blouse, Suit)</option>
                    <option value="Western Wear">Western Wear (Gown, Dress, Jumpsuit)</option>
                    <option value="Occasion & Bridal Wear">Occasion & Bridal Wear</option>
                    <option value="Custom Tailoring">Custom Design / Restyling</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] text-[#1b1c1c] font-medium">
                    Preferred Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    className="bg-[#f6f3f2] border border-[#d9c1c1] rounded-xl px-4 py-3 text-[14px] text-[#1b1c1c] focus:outline-none focus:border-[#400710]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] text-[#1b1c1c] font-medium">
                    Fabric Status
                  </label>
                  <select
                    value={fabricStatus}
                    onChange={(e) => setFabricStatus(e.target.value)}
                    className="bg-[#f6f3f2] border border-[#d9c1c1] rounded-xl px-4 py-3 text-[14px] text-[#1b1c1c] focus:outline-none focus:border-[#400710]"
                  >
                    <option value="I will bring my own fabric">I will bring my own fabric</option>
                    <option value="Need advice / sourcing assistance">Need atelier advice & fabric selection</option>
                    <option value="Fabric already at studio">Fabric already in studio inventory</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] text-[#1b1c1c] font-medium">
                  Message / Special Instructions
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about neckline cut, wedding timeline, or any reference ideas you have in mind..."
                  className="bg-[#f6f3f2] border border-[#d9c1c1] rounded-xl px-4 py-3 text-[14px] text-[#1b1c1c] focus:outline-none focus:border-[#400710]"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                <button
                  type="submit"
                  className="w-full sm:flex-1 bg-[#5c1d24] text-white py-3.5 rounded-xl font-medium tracking-wide hover:bg-[#400710] transition-colors shadow-md text-[14px]"
                >
                  Request Appointment
                </button>

                <a
                  href="https://wa.me/919769655856?text=Namaste,%20I%20would%20like%20to%20enquire%20about%20tailoring%20an%20outfit%20at%20Premvati."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-[#25D366] text-[#25D366] font-semibold hover:bg-[#25D366] hover:text-white transition-all text-center text-[14px] flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  Chat on WhatsApp
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>



      {/* 8. CONTACT & LOCATION SECTION */}
      <section id="contact" className="py-20 bg-[#f6f3f2]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Info */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <span className="text-[12px] font-bold uppercase tracking-widest text-[#5c1d24]">
                Visit Our Atelier
              </span>
              <h2 className="font-serif text-[34px] sm:text-[42px] text-[#400710] font-bold">
                Contact & Location
              </h2>
              <p className="text-[15px] text-[#534343] leading-relaxed">
                Step into our boutique workshop in Malad West for personal fabric draping, measurement consultations, and hand-embroidery trials.
              </p>

              <div className="flex flex-col gap-4 mt-2">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#e4e2e1]">
                  <div className="w-10 h-10 rounded-xl bg-[#ffdada] text-[#400710] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">location_on</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[14px] text-[#1b1c1c]">Studio Address</h4>
                    <p className="text-[13px] text-[#534343] mt-0.5">
                      Mahavir Darshan, Goraswadi, S.V. Road, Malad West, Mumbai, Maharashtra 400064
                    </p>
                    <a
                      href="https://maps.google.com/?q=Mahavir+Darshan+Malad+West+Mumbai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[12px] font-bold text-[#5c1d24] hover:underline mt-1 inline-block"
                    >
                      Get Directions on Google Maps →
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#e4e2e1]">
                  <div className="w-10 h-10 rounded-xl bg-[#ffdada] text-[#400710] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">call</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[14px] text-[#1b1c1c]">Phone & WhatsApp</h4>
                    <p className="text-[13px] text-[#534343] mt-0.5">
                      Direct line: +91 97696 55856
                    </p>
                    <div className="flex items-center gap-4 mt-1 text-[12px] font-bold">
                      <a href="tel:9769655856" className="text-[#5c1d24] hover:underline">
                        Call Now
                      </a>
                      <span className="text-[#d9c1c1]">•</span>
                      <a
                        href="https://wa.me/919769655856"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#25D366] hover:underline"
                      >
                        WhatsApp Us
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#e4e2e1]">
                  <div className="w-10 h-10 rounded-xl bg-[#ffdada] text-[#400710] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">schedule</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[14px] text-[#1b1c1c]">Atelier Timings</h4>
                    <p className="text-[13px] text-[#534343] mt-0.5">
                      Monday – Saturday: 10:30 AM – 8:30 PM <br />
                      Sunday: By prior appointment only
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Map Image */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] bg-[#f0eded] relative">
                <img
                  src={MAP_IMG}
                  alt="Premvati Atelier Location Map"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <span className="bg-[#5c1d24] px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider">
                      Malad West Atelier
                    </span>
                    <h4 className="font-serif text-[18px] font-bold mt-1">
                      Premvati Ladies Tailor Studio
                    </h4>
                    <p className="text-[12px] text-white/80">
                      Easily accessible from S.V. Road & Malad Station
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/919769655856?text=Namaste%20Premvati%20Tailors,%20I%20would%20like%20to%20book%20an%20appointment."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all"
        title="Chat on WhatsApp"
      >
        <span className="material-symbols-outlined text-[32px]">chat</span>
      </a>

      {/* SPECIAL OFFER MODAL */}
      {showOfferModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#fed65b]/40 relative">
            <button
              onClick={() => setShowOfferModal(false)}
              className="absolute top-4 right-4 text-[#867273] hover:text-[#1b1c1c]"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="w-12 h-12 rounded-2xl bg-[#fed65b]/30 text-[#400710] flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[28px]">local_activity</span>
            </div>
            {offers && offers.length > 0 ? (
              <>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#5c1d24]">
                  {offers[0].title}
                </span>
                <h3 className="font-serif text-[24px] font-bold text-[#400710] mt-1">
                  {offers[0].subtitle}
                </h3>
                <p className="text-[13px] text-[#534343] mt-2 leading-relaxed">
                  Use code <strong className="font-mono">{offers[0].code}</strong> to get {offers[0].discount} at booking. Valid till {offers[0].validTill || 'while stocks last'}.
                </p>
                <div className="mt-4 p-3 bg-[#f6f3f2] rounded-xl border border-dashed border-[#5c1d24] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#867273]">Promo Code</span>
                    <p className="font-mono font-bold text-[#400710] text-[15px]">{offers[0].code}</p>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(offers[0].code);
                      alert(`Coupon code ${offers[0].code} copied!`);
                    }}
                    className="bg-[#5c1d24] text-white px-3 py-1.5 rounded-lg text-[12px] font-semibold hover:bg-[#400710]"
                  >
                    Copy Code
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#5c1d24]">
                  Exclusive Seasonal Coupon
                </span>
                <h3 className="font-serif text-[24px] font-bold text-[#400710] mt-1">
                  Festive Bridal & Blouse Package
                </h3>
                <p className="text-[13px] text-[#534343] mt-2 leading-relaxed">
                  Enjoy 15% OFF on custom lehenga tailoring or complimentary express 3-day turnaround on designer saree blouses when booking online.
                </p>
                <div className="mt-4 p-3 bg-[#f6f3f2] rounded-xl border border-dashed border-[#5c1d24] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#867273]">Promo Code</span>
                    <p className="font-mono font-bold text-[#400710] text-[15px]">FESTIVEBRIDE</p>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('FESTIVEBRIDE');
                      alert('Coupon code FESTIVEBRIDE copied!');
                    }}
                    className="bg-[#5c1d24] text-white px-3 py-1.5 rounded-lg text-[12px] font-semibold hover:bg-[#400710]"
                  >
                    Copy Code
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
