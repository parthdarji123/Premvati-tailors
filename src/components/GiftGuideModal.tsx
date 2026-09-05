import React, { useState } from 'react';

interface GiftGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookGiftExperience: (giftTitle: string) => void;
}

export const GiftGuideModal: React.FC<GiftGuideModalProps> = ({
  isOpen,
  onClose,
  onBookGiftExperience,
}) => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'vouchers' | 'custom'>('quiz');

  // Quiz state
  const [stylePreference, setStylePreference] = useState<string>('traditional');
  const [budgetRange, setBudgetRange] = useState<string>('mid');
  const [occasion, setOccasion] = useState<string>('birthday');
  const [quizResult, setQuizResult] = useState<any>(null);

  // Custom Voucher State
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [voucherAmount, setVoucherAmount] = useState('₹10,000');
  const [birthdayMessage, setBirthdayMessage] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);

  if (!isOpen) return null;

  const handleRunQuiz = () => {
    let result = {
      title: 'The Royal Bespoke Silk Lehenga Experience',
      tagline: 'The Ultimate Romantic Gesture of Heritage & Luxury',
      description: 'A dedicated 1-on-1 atelier session where she designs her dream handcrafted silk lehenga with master embroiderers, custom threadwork, and personal fitting trials.',
      price: '₹25,000 – ₹45,000',
      rating: '5.0 ★★★★★ (Top Rated Birthday Gift for Her)',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFF9Fk7cj-F2ISngFqTSbxzpAsuIu7EX2VGALUQi1RfkiY2miusSo2PNNGJIxLnXVeMvxQsoxEXUp7Yd6JcXAaRUvhXIajE_-rcOBaV1bcCtJwBha_56dtRvz17xTkmXZhDvi-M72kJKVvy9ej02TVB31k_NF1qkb5euwC2-3wNAD0qXiXisawhfayCwipdopDakpAfekxNMFVahpjn1rhqkyJh4NX57eAaFc4j_yyelhZxlVhsdXO',
    };

    if (stylePreference === 'blouse') {
      result = {
        title: 'Haute Couture Designer Blouse Duo Box',
        tagline: 'Timeless Elegance Tailored to Her Signature Style',
        description: 'Two bespoke handcrafted saree blouses featuring custom cutwork necklines, freshwater pearl accents, and 3-day express master trial.',
        price: '₹7,500 – ₹12,000',
        rating: '4.9 ★★★★★ (Most Popular Gift Choice)',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKrRe2lHxsGHRfjPXzbip5SH5yTjKmCUNzLnluFYrRPX48gDuDOa__lETsUn6NvwzGoQB-MIsnvYi50qoWMBk5vqUjC0ORnf6G5fl8G1UtDyvZFrhjsegtOZLwuHMXiLdCD6QrUepIgVyp7GNc_tDJS6VPqjWzFIHfC1vTU_-6MQM1oZAeY-vvdcxCBKA6KjFjjFoq_U76rUfKZrFfLsMbx0JPSpamw5nt9dvMFX68_9fy69Xho2uz',
      };
    } else if (stylePreference === 'western') {
      result = {
        title: 'Bespoke Crepe Evening Gown & Atelier Trial',
        tagline: 'Modern High Fashion Custom Fit Just For Her',
        description: 'An exclusive Italian crepe gown styled precisely to her measurements, with custom structural darts, fluid drape, and velvet gift box delivery.',
        price: '₹15,000 – ₹22,000',
        rating: '5.0 ★★★★★ (Sensational & Glamorous)',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqIICQS0ktQVHj7gmq6dHsypI4AUyZBa8rse-1zvmcCs-YzHI-7b6JVdp25uwVGuguqaNfUsunU0iZX1u_PY4-FbACJmMwOt6FZfiu8MW4EgNKZnIB9OKxy49-blnb2JFTxWVXYkLgSR1e86ToPEiXvtmynbCtrYezt0KFj5-EMXiaLwOes4gYvPwrJx2Z2QB3YAaQkJ0gQsLFIgChzcTABF-bwVol79JAuKTopaEa88n63rM13WIy',
      };
    }

    setQuizResult(result);
  };

  const handleGenerateVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName) return;
    setIsGenerated(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-[#fcf9f8] w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] border border-[#e4e2e1]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#400710] via-[#5c1d24] to-[#732731] text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition-colors flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
          
          <div className="flex items-center gap-2 text-rose-200 text-[11px] font-bold uppercase tracking-widest">
            <span className="material-symbols-outlined text-[16px]">card_giftcard</span>
            <span>Premvati Birthday Gift Guide</span>
          </div>

          <h2 className="font-serif text-[26px] sm:text-[32px] font-bold mt-1 text-white leading-tight">
            What is the best gift for your girlfriend's birthday?
          </h2>
          <p className="text-white/80 text-[13px] sm:text-[14px] mt-2 max-w-xl leading-relaxed">
            Give her an unforgettable experience: custom couture tailoring where she chooses her fabrics, custom embroideries, and enjoys a royal atelier fitting session!
          </p>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 bg-black/20 p-1.5 rounded-2xl w-fit backdrop-blur-sm border border-white/10 text-[13px]">
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                activeTab === 'quiz' ? 'bg-white text-[#400710] font-bold shadow-md' : 'text-white/80 hover:text-white'
              }`}
            >
              🎁 Gift Recommender Quiz
            </button>
            <button
              onClick={() => setActiveTab('vouchers')}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                activeTab === 'vouchers' ? 'bg-white text-[#400710] font-bold shadow-md' : 'text-white/80 hover:text-white'
              }`}
            >
              👑 Top 3 Curated Packages
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                activeTab === 'custom' ? 'bg-white text-[#400710] font-bold shadow-md' : 'text-white/80 hover:text-white'
              }`}
            >
              💌 Create Gift Certificate
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-[#fcf9f8]">
          {/* TAB 1: QUIZ */}
          {activeTab === 'quiz' && (
            <div className="flex flex-col gap-6">
              {!quizResult ? (
                <div className="flex flex-col gap-5">
                  <div className="bg-white p-5 rounded-2xl border border-[#e4e2e1] shadow-xs">
                    <label className="text-[14px] font-bold text-[#1b1c1c] block mb-2">
                      1. What is her favorite outfit style?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setStylePreference('traditional')}
                        className={`p-3.5 rounded-xl border text-left text-[13px] transition-all ${
                          stylePreference === 'traditional'
                            ? 'border-[#5c1d24] bg-[#ffdada]/30 text-[#400710] font-bold'
                            : 'border-[#e4e2e1] hover:bg-[#f6f3f2] text-[#534343]'
                        }`}
                      >
                        🏰 Royal Lehenga & Anarkalis
                      </button>
                      <button
                        type="button"
                        onClick={() => setStylePreference('blouse')}
                        className={`p-3.5 rounded-xl border text-left text-[13px] transition-all ${
                          stylePreference === 'blouse'
                            ? 'border-[#5c1d24] bg-[#ffdada]/30 text-[#400710] font-bold'
                            : 'border-[#e4e2e1] hover:bg-[#f6f3f2] text-[#534343]'
                        }`}
                      >
                        🥻 Handcrafted Saree Blouses
                      </button>
                      <button
                        type="button"
                        onClick={() => setStylePreference('western')}
                        className={`p-3.5 rounded-xl border text-left text-[13px] transition-all ${
                          stylePreference === 'western'
                            ? 'border-[#5c1d24] bg-[#ffdada]/30 text-[#400710] font-bold'
                            : 'border-[#e4e2e1] hover:bg-[#f6f3f2] text-[#534343]'
                        }`}
                      >
                        👗 Designer Evening Gowns
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#e4e2e1] shadow-xs">
                    <label className="text-[14px] font-bold text-[#1b1c1c] block mb-2">
                      2. What is your gift budget range?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setBudgetRange('low')}
                        className={`p-3.5 rounded-xl border text-left text-[13px] transition-all ${
                          budgetRange === 'low'
                            ? 'border-[#5c1d24] bg-[#ffdada]/30 text-[#400710] font-bold'
                            : 'border-[#e4e2e1] hover:bg-[#f6f3f2] text-[#534343]'
                        }`}
                      >
                        ₹5,000 – ₹10,000
                      </button>
                      <button
                        type="button"
                        onClick={() => setBudgetRange('mid')}
                        className={`p-3.5 rounded-xl border text-left text-[13px] transition-all ${
                          budgetRange === 'mid'
                            ? 'border-[#5c1d24] bg-[#ffdada]/30 text-[#400710] font-bold'
                            : 'border-[#e4e2e1] hover:bg-[#f6f3f2] text-[#534343]'
                        }`}
                      >
                        ₹10,000 – ₹25,000 (Recommended)
                      </button>
                      <button
                        type="button"
                        onClick={() => setBudgetRange('high')}
                        className={`p-3.5 rounded-xl border text-left text-[13px] transition-all ${
                          budgetRange === 'high'
                            ? 'border-[#5c1d24] bg-[#ffdada]/30 text-[#400710] font-bold'
                            : 'border-[#e4e2e1] hover:bg-[#f6f3f2] text-[#534343]'
                        }`}
                      >
                        ₹25,000+ Luxury Experience
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleRunQuiz}
                    className="w-full bg-[#5c1d24] text-white py-4 rounded-2xl font-bold hover:bg-[#400710] transition-colors text-[15px] shadow-lg flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined">auto_awesome</span>
                    Find Her Best Birthday Gift Now
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-[#e4e2e1] p-6 shadow-md flex flex-col md:flex-row gap-6 animate-in zoom-in-95 duration-200">
                  <img
                    src={quizResult.imageUrl}
                    alt={quizResult.title}
                    className="w-full md:w-56 h-56 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex flex-col justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-bold text-[#5c1d24] uppercase tracking-wider bg-[#ffdada]/40 px-2.5 py-1 rounded-md">
                        {quizResult.rating}
                      </span>
                      <h3 className="font-serif text-[22px] font-bold text-[#400710] mt-2">
                        {quizResult.title}
                      </h3>
                      <p className="text-[13px] font-medium text-[#5c1d24] italic">
                        "{quizResult.tagline}"
                      </p>
                      <p className="text-[13px] text-[#534343] mt-2 leading-relaxed">
                        {quizResult.description}
                      </p>
                      <div className="mt-3 text-[14px] font-bold text-[#1b1c1c]">
                        Tailoring Experience Package: <span className="text-[#5c1d24]">{quizResult.price}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={() => {
                          onBookGiftExperience(quizResult.title);
                          onClose();
                        }}
                        className="bg-[#5c1d24] text-white px-5 py-2.5 rounded-xl font-semibold text-[13px] hover:bg-[#400710] shadow-sm flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[18px]">card_giftcard</span>
                        Book This Gift Package
                      </button>
                      <button
                        onClick={() => setQuizResult(null)}
                        className="px-4 py-2.5 rounded-xl border border-[#d9c1c1] text-[13px] font-medium text-[#534343] hover:bg-[#f0eded]"
                      >
                        Retake Quiz
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: TOP 3 VOUCHERS */}
          {activeTab === 'vouchers' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Option 1 */}
              <div className="bg-white p-5 rounded-2xl border border-[#e4e2e1] shadow-xs flex flex-col justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#5c1d24] tracking-widest bg-rose-50 px-2 py-0.5 rounded">
                    #1 Romantic Choice
                  </span>
                  <h4 className="font-serif text-[18px] font-bold text-[#1b1c1c] mt-2">
                    The Royal Bespoke Silk Lehenga Box
                  </h4>
                  <p className="text-[12px] text-[#534343] mt-2 leading-relaxed">
                    Custom fitted lehenga set with pure Katan silk, zari hand embroidery, and a personal studio appointment.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#f0eded] flex items-center justify-between">
                  <span className="text-[13px] font-bold text-[#400710]">₹28,500</span>
                  <button
                    onClick={() => {
                      onBookGiftExperience('The Royal Bespoke Silk Lehenga Box');
                      onClose();
                    }}
                    className="bg-[#5c1d24] text-white px-3 py-1.5 rounded-lg text-[12px] font-semibold hover:bg-[#400710]"
                  >
                    Select Gift
                  </button>
                </div>
              </div>

              {/* Option 2 */}
              <div className="bg-white p-5 rounded-2xl border border-[#e4e2e1] shadow-xs flex flex-col justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#5c1d24] tracking-widest bg-rose-50 px-2 py-0.5 rounded">
                    #2 Chic & Stylish
                  </span>
                  <h4 className="font-serif text-[18px] font-bold text-[#1b1c1c] mt-2">
                    Handcrafted Designer Blouse Duo
                  </h4>
                  <p className="text-[12px] text-[#534343] mt-2 leading-relaxed">
                    Two bespoke saree blouses with pearl cutwork, custom backline shaping, and 3-day express turnaround.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#f0eded] flex items-center justify-between">
                  <span className="text-[13px] font-bold text-[#400710]">₹7,500</span>
                  <button
                    onClick={() => {
                      onBookGiftExperience('Handcrafted Designer Blouse Duo');
                      onClose();
                    }}
                    className="bg-[#5c1d24] text-white px-3 py-1.5 rounded-lg text-[12px] font-semibold hover:bg-[#400710]"
                  >
                    Select Gift
                  </button>
                </div>
              </div>

              {/* Option 3 */}
              <div className="bg-white p-5 rounded-2xl border border-[#e4e2e1] shadow-xs flex flex-col justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#5c1d24] tracking-widest bg-rose-50 px-2 py-0.5 rounded">
                    #3 Haute Couture
                  </span>
                  <h4 className="font-serif text-[18px] font-bold text-[#1b1c1c] mt-2">
                    Bespoke Crepe Gown Fitting Voucher
                  </h4>
                  <p className="text-[12px] text-[#534343] mt-2 leading-relaxed">
                    Custom fitted Italian crepe gown for her birthday dinner, complete with garment bag and fitting.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#f0eded] flex items-center justify-between">
                  <span className="text-[13px] font-bold text-[#400710]">₹14,000</span>
                  <button
                    onClick={() => {
                      onBookGiftExperience('Bespoke Crepe Gown Fitting Voucher');
                      onClose();
                    }}
                    className="bg-[#5c1d24] text-white px-3 py-1.5 rounded-lg text-[12px] font-semibold hover:bg-[#400710]"
                  >
                    Select Gift
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CUSTOM GIFT CERTIFICATE */}
          {activeTab === 'custom' && (
            <div className="flex flex-col gap-6">
              {!isGenerated ? (
                <form onSubmit={handleGenerateVoucher} className="bg-white p-6 rounded-2xl border border-[#e4e2e1] flex flex-col gap-4">
                  <h3 className="font-serif text-[20px] font-bold text-[#400710]">
                    Customize Her Birthday Gift Card
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-medium text-[#1b1c1c]">Girlfriend's Name *</label>
                      <input
                        type="text"
                        required
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        placeholder="e.g. Ananya"
                        className="bg-[#f6f3f2] border border-[#d9c1c1] rounded-xl px-4 py-2 text-[14px]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-medium text-[#1b1c1c]">Your Name *</label>
                      <input
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="e.g. Rohan"
                        className="bg-[#f6f3f2] border border-[#d9c1c1] rounded-xl px-4 py-2 text-[14px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-medium text-[#1b1c1c]">Voucher Amount</label>
                      <select
                        value={voucherAmount}
                        onChange={(e) => setVoucherAmount(e.target.value)}
                        className="bg-[#f6f3f2] border border-[#d9c1c1] rounded-xl px-4 py-2 text-[14px]"
                      >
                        <option value="₹5,000">₹5,000 Gift Voucher</option>
                        <option value="₹10,000">₹10,000 Gift Voucher</option>
                        <option value="₹25,000">₹25,000 Royal Bespoke Voucher</option>
                        <option value="₹50,000">₹50,000 Luxury Couture Pass</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-medium text-[#1b1c1c]">Birthday Note</label>
                      <input
                        type="text"
                        value={birthdayMessage}
                        onChange={(e) => setBirthdayMessage(e.target.value)}
                        placeholder="Happy Birthday my love! Pick your dream outfit!"
                        className="bg-[#f6f3f2] border border-[#d9c1c1] rounded-xl px-4 py-2 text-[14px]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-[#5c1d24] text-white py-3 rounded-xl font-bold hover:bg-[#400710] transition-colors mt-2 text-[14px]"
                  >
                    Generate Custom Birthday Certificate
                  </button>
                </form>
              ) : (
                <div className="flex flex-col gap-5 items-center">
                  {/* Visual Gift Card */}
                  <div className="w-full max-w-md bg-gradient-to-br from-[#400710] via-[#5c1d24] to-[#2b0308] text-white p-7 rounded-3xl shadow-2xl border-2 border-[#ffdada]/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-[20px] text-white tracking-tight">Premvati Atelier</span>
                      <span className="text-[10px] uppercase font-bold tracking-widest bg-white/20 text-rose-100 px-2.5 py-1 rounded-full">
                        Birthday Gift Pass
                      </span>
                    </div>

                    <div className="my-6">
                      <span className="text-[11px] uppercase tracking-wider text-rose-200 font-semibold block">Crafted Especially For</span>
                      <h3 className="font-serif text-[28px] font-bold text-[#ffdada] leading-tight">
                        {recipientName}
                      </h3>
                      <p className="text-[12px] text-white/90 italic mt-1">
                        "{birthdayMessage || 'Happy Birthday! Enjoy your bespoke tailoring experience at Premvati.'}"
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/20 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-white/70">From</span>
                        <span className="block font-semibold text-[13px]">{senderName || 'With Love'}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase tracking-wider text-white/70">Value</span>
                        <span className="block font-bold text-[22px] text-[#ffd65b]">{voucherAmount}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        onBookGiftExperience(`Birthday Voucher for ${recipientName} (${voucherAmount})`);
                        onClose();
                      }}
                      className="bg-[#5c1d24] text-white px-6 py-3 rounded-xl font-bold text-[14px] hover:bg-[#400710] shadow-md flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                      Book Atelier Appointment with Voucher
                    </button>
                    <button
                      onClick={() => setIsGenerated(false)}
                      className="px-4 py-3 rounded-xl border border-[#d9c1c1] text-[13px] text-[#534343] hover:bg-[#f0eded]"
                    >
                      Edit Certificate
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
