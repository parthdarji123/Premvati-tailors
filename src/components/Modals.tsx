import React, { useState } from 'react';
import { GalleryItem, Appointment } from '../types';

interface LightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
  onBookDesign: (item: GalleryItem) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose, onBookDesign }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#fcf9f8] w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] border border-[#e4e2e1]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 z-20 bg-white/90 text-[#1b1c1c] p-2 rounded-full hover:bg-white transition-colors shadow-md flex items-center justify-center"
          onClick={onClose}
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Left / Top Image */}
        <div className="w-full md:w-1/2 h-72 md:h-auto bg-cover bg-center relative bg-[#f0eded]">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#400710] px-3.5 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider shadow-sm">
            {item.categoryLabel}
          </span>
        </div>

        {/* Right / Content */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="flex flex-col gap-3">
            <span className="text-[11px] text-[#5c1d24] uppercase tracking-widest font-bold">
              Atelier Bespoke Creation
            </span>
            <h2 className="font-serif text-[26px] md:text-[30px] leading-tight text-[#1b1c1c] font-bold">
              {item.title}
            </h2>
            <p className="text-[14px] leading-relaxed text-[#534343]">
              {item.description}
            </p>

            <div className="flex flex-col gap-2.5 mt-3 pt-4 border-t border-[#e4e2e1] text-[13px]">
              <div className="flex justify-between">
                <span className="text-[#867273]">Primary Fabric:</span>
                <span className="text-[#1b1c1c] font-semibold">{item.fabric}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#867273]">Estimated Tailoring Time:</span>
                <span className="text-[#1b1c1c] font-semibold">{item.fittingTime || '3-5 Working Days'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#867273]">Customization Scope:</span>
                <span className="text-[#1b1c1c] font-medium">{item.customization || 'Available in studio'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#867273]">Atelier Studio:</span>
                <span className="text-[#1b1c1c] font-medium">Mahavir Darshan, Malad West</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[#e4e2e1]">
            <button
              className="flex-1 text-center bg-[#5c1d24] text-white py-3.5 rounded-xl font-medium hover:bg-[#400710] transition-colors text-[13px] tracking-wide shadow-sm"
              onClick={() => {
                onClose();
                onBookDesign(item);
              }}
            >
              Book Fitting for this Design
            </button>
            <button
              className="px-5 py-3.5 rounded-xl border border-[#d9c1c1] text-[#1b1c1c] hover:bg-[#f0eded] transition-colors text-[13px]"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface UploadDesignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (newItem: Omit<GalleryItem, 'id'>) => void;
}

export const UploadDesignModal: React.FC<UploadDesignModalProps> = ({
  isOpen,
  onClose,
  onUpload,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'blouses' | 'traditional' | 'western' | 'party' | 'custom'>('traditional');
  const [description, setDescription] = useState('');
  const [fabric, setFabric] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [fittingTime, setFittingTime] = useState('3-5 Working Days');

  if (!isOpen) return null;

  const sampleImages = [
    { label: 'Crimson Lehenga', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFF9Fk7cj-F2ISngFqTSbxzpAsuIu7EX2VGALUQi1RfkiY2miusSo2PNNGJIxLnXVeMvxQsoxEXUp7Yd6JcXAaRUvhXIajE_-rcOBaV1bcCtJwBha_56dtRvz17xTkmXZhDvi-M72kJKVvy9ej02TVB31k_NF1qkb5euwC2-3wNAD0qXiXisawhfayCwipdopDakpAfekxNMFVahpjn1rhqkyJh4NX57eAaFc4j_yyelhZxlVhsdXO' },
    { label: 'Emerald Blouse', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKrRe2lHxsGHRfjPXzbip5SH5yTjKmCUNzLnluFYrRPX48gDuDOa__lETsUn6NvwzGoQB-MIsnvYi50qoWMBk5vqUjC0ORnf6G5fl8G1UtDyvZFrhjsegtOZLwuHMXiLdCD6QrUepIgVyp7GNc_tDJS6VPqjWzFIHfC1vTU_-6MQM1oZAeY-vvdcxCBKA6KjFjjFoq_U76rUfKZrFfLsMbx0JPSpamw5nt9dvMFX68_9fy69Xho2uz' },
    { label: 'Ivory Gown', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqIICQS0ktQVHj7gmq6dHsypI4AUyZBa8rse-1zvmcCs-YzHI-7b6JVdp25uwVGuguqaNfUsunU0iZX1u_PY4-FbACJmMwOt6FZfiu8MW4EgNKZnIB9OKxy49-blnb2JFTxWVXYkLgSR1e86ToPEiXvtmynbCtrYezt0KFj5-EMXiaLwOes4gYvPwrJx2Z2QB3YAaQkJ0gQsLFIgChzcTABF-bwVol79JAuKTopaEa88n63rM13WIy' },
    { label: 'Pink Anarkali', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDE9Q9UQAIL38JGaMQcVunh96B-eY13NJn1dLmDy-Qc_5ioFEohSe4tSgLg8sfvNRPuwHAvQBIXWXHLj95ZoetaCiJ1bU2ItUADCAzjnN7efJ18SIfzxkVjefpeUfp3f6nh_KwEimRY7Ru2_SrgK5fzoNkyS9VW3hWlhP48YNbSVx9oyRpYfO9AT3r8pIP5QYhkX3g2dY2iBdy2d2BQgzQP5d_Y1d41b_wd0RtZpEiBSmc0fhKlpEGh' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    const categoryMap: Record<string, string> = {
      blouses: 'Blouses',
      traditional: 'Traditional',
      western: 'Western',
      party: 'Party Wear',
      custom: 'Custom Designs',
    };

    onUpload({
      title,
      category,
      categoryLabel: categoryMap[category],
      description,
      fabric: fabric || 'Pure Silk / Cotton',
      imageUrl: imageUrl || sampleImages[0].url,
      fittingTime,
      customization: 'Bespoke customization available at studio',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-[#fcf9f8] w-full max-w-lg rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col gap-5 relative border border-[#e4e2e1] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#e4e2e1] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#5c1d24]">add_photo_alternate</span>
            <h3 className="font-serif text-[22px] text-[#400710] font-bold">
              Upload New Atelier Design
            </h3>
          </div>
          <button className="text-[#867273] hover:text-[#1b1c1c]" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] text-[#1b1c1c] font-medium">
              Design Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Royal Organza Saree Blouse with Maggam Work"
              className="bg-[#f6f3f2] border border-[#d9c1c1] rounded-xl px-4 py-2.5 text-[14px] text-[#1b1c1c] focus:outline-none focus:border-[#400710]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] text-[#1b1c1c] font-medium">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="bg-[#f6f3f2] border border-[#d9c1c1] rounded-xl px-4 py-2.5 text-[14px] text-[#1b1c1c] focus:outline-none focus:border-[#400710]"
              >
                <option value="traditional">Traditional</option>
                <option value="blouses">Blouses</option>
                <option value="western">Western</option>
                <option value="party">Party Wear</option>
                <option value="custom">Custom Designs</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] text-[#1b1c1c] font-medium">
                Primary Fabric
              </label>
              <input
                type="text"
                value={fabric}
                onChange={(e) => setFabric(e.target.value)}
                placeholder="e.g. Pure Katan Silk"
                className="bg-[#f6f3f2] border border-[#d9c1c1] rounded-xl px-4 py-2.5 text-[14px] text-[#1b1c1c] focus:outline-none focus:border-[#400710]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] text-[#1b1c1c] font-medium">
              Garment Description *
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe neckline, embroidery motifs, back details, and tailoring craftsmanship..."
              className="bg-[#f6f3f2] border border-[#d9c1c1] rounded-xl px-4 py-2.5 text-[14px] text-[#1b1c1c] focus:outline-none focus:border-[#400710]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] text-[#1b1c1c] font-medium">
              Tailoring Time
            </label>
            <input
              type="text"
              value={fittingTime}
              onChange={(e) => setFittingTime(e.target.value)}
              placeholder="e.g. 3-5 Working Days"
              className="bg-[#f6f3f2] border border-[#d9c1c1] rounded-xl px-4 py-2.5 text-[14px] text-[#1b1c1c] focus:outline-none focus:border-[#400710]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] text-[#1b1c1c] font-medium">
              Photo Image URL or Select Sample
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://... or choose below"
              className="bg-[#f6f3f2] border border-[#d9c1c1] rounded-xl px-4 py-2 text-[13px] text-[#1b1c1c] focus:outline-none focus:border-[#400710]"
            />
            <div className="flex gap-2 flex-wrap">
              {sampleImages.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setImageUrl(s.url)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                    imageUrl === s.url
                      ? 'bg-[#5c1d24] text-white border-[#5c1d24]'
                      : 'bg-white border-[#d9c1c1] text-[#534343] hover:bg-[#f0eded]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-4 pt-3 border-t border-[#e4e2e1]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-[#d9c1c1] text-[#1b1c1c] hover:bg-[#f0eded] text-[13px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#5c1d24] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#400710] transition-colors text-[13px] shadow-sm"
            >
              Publish to Couture Gallery
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface NewBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBooking: (booking: Omit<Appointment, 'id' | 'createdAt' | 'initials'>) => void;
  defaultCategory?: string;
  defaultService?: string;
}

export const NewBookingModal: React.FC<NewBookingModalProps> = ({
  isOpen,
  onClose,
  onAddBooking,
  defaultCategory = 'Traditional Wear',
  defaultService = 'Bespoke Tailoring Fitting',
}) => {
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState(defaultCategory);
  const [service, setService] = useState(defaultService);
  const [dateTime, setDateTime] = useState('');
  const [fabricStatus, setFabricStatus] = useState('I will bring my own fabric');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !phone) return;

    onAddBooking({
      clientName,
      phone,
      email,
      service: service || 'Tailoring Fitting',
      category: category || 'Custom Tailoring',
      dateTime: dateTime || 'Tomorrow, 03:00 PM',
      dateStr: dateTime ? dateTime.split('T')[0] || 'Upcoming' : 'Upcoming',
      timeStr: dateTime ? dateTime.split('T')[1] || '03:00 PM' : '03:00 PM',
      status: 'Pending',
      fabricStatus,
      notes,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-[#fcf9f8] w-full max-w-lg rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col gap-5 relative border border-[#e4e2e1] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#e4e2e1] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#5c1d24]">calendar_add_on</span>
            <h3 className="font-serif text-[22px] text-[#400710] font-bold">
              New Atelier Booking
            </h3>
          </div>
          <button className="text-[#867273] hover:text-[#1b1c1c]" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] text-[#1b1c1c] font-medium">
                Client Name *
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Shalini Deshmukh"
                className="bg-[#f6f3f2] border border-[#d9c1c1] rounded-xl px-4 py-2.5 text-[14px] text-[#1b1c1c] focus:outline-none focus:border-[#400710]"
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
                className="bg-[#f6f3f2] border border-[#d9c1c1] rounded-xl px-4 py-2.5 text-[14px] text-[#1b1c1c] focus:outline-none focus:border-[#400710]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] text-[#1b1c1c] font-medium">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@gmail.com"
                className="bg-[#f6f3f2] border border-[#d9c1c1] rounded-xl px-4 py-2.5 text-[14px] text-[#1b1c1c] focus:outline-none focus:border-[#400710]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] text-[#1b1c1c] font-medium">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-[#f6f3f2] border border-[#d9c1c1] rounded-xl px-4 py-2.5 text-[14px] text-[#1b1c1c] focus:outline-none focus:border-[#400710]"
              >
                <option value="Traditional Wear">Traditional Wear</option>
                <option value="Designer Blouses">Designer Blouses</option>
                <option value="Western Wear">Western Wear</option>
                <option value="Occasion & Bridal Wear">Occasion & Bridal Wear</option>
                <option value="Festive Anarkali">Festive Anarkali</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] text-[#1b1c1c] font-medium">
                Service / Garment Name
              </label>
              <input
                type="text"
                value={service}
                onChange={(e) => setService(e.target.value)}
                placeholder="e.g. Saree Blouse Fitting"
                className="bg-[#f6f3f2] border border-[#d9c1c1] rounded-xl px-4 py-2.5 text-[14px] text-[#1b1c1c] focus:outline-none focus:border-[#400710]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] text-[#1b1c1c] font-medium">
                Preferred Date & Time
              </label>
              <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="bg-[#f6f3f2] border border-[#d9c1c1] rounded-xl px-4 py-2.5 text-[14px] text-[#1b1c1c] focus:outline-none focus:border-[#400710]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] text-[#1b1c1c] font-medium">
              Fabric Status
            </label>
            <select
              value={fabricStatus}
              onChange={(e) => setFabricStatus(e.target.value)}
              className="bg-[#f6f3f2] border border-[#d9c1c1] rounded-xl px-4 py-2.5 text-[14px] text-[#1b1c1c] focus:outline-none focus:border-[#400710]"
            >
              <option value="I will bring my own fabric">Client bringing own fabric</option>
              <option value="Need advice / sourcing assistance">Need atelier advice & fabric sourcing</option>
              <option value="Fabric already at studio">Fabric already in studio inventory</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] text-[#1b1c1c] font-medium">
              Client Notes & Measurements Details
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Design preferences, wedding deadline, neckline requests..."
              className="bg-[#f6f3f2] border border-[#d9c1c1] rounded-xl px-4 py-2.5 text-[14px] text-[#1b1c1c] focus:outline-none focus:border-[#400710]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 mt-4 pt-3 border-t border-[#e4e2e1]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-[#d9c1c1] text-[#1b1c1c] hover:bg-[#f0eded] text-[13px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#5c1d24] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#400710] transition-colors text-[13px] shadow-sm"
            >
              Confirm Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface ExportLedgerModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
}

export const ExportLedgerModal: React.FC<ExportLedgerModalProps> = ({
  isOpen,
  onClose,
  appointments,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const downloadCSV = () => {
    const headers = ['Client Name', 'Service', 'Date & Time', 'Status', 'Phone', 'Fabric Status', 'Notes'];
    const rows = appointments.map((a) => [
      `"${a.clientName}"`,
      `"${a.service}"`,
      `"${a.dateTime}"`,
      `"${a.status}"`,
      `"${a.phone}"`,
      `"${a.fabricStatus || ''}"`,
      `"${(a.notes || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Premvati_Ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = () => {
    const text = appointments.map(a => `${a.clientName} | ${a.service} | ${a.dateTime} | ${a.status} | ${a.phone}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-[#fcf9f8] w-full max-w-lg rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col gap-5 relative border border-[#e4e2e1]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#e4e2e1] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#5c1d24]">download</span>
            <h3 className="font-serif text-[22px] text-[#400710] font-bold">
              Export Daily Atelier Ledger
            </h3>
          </div>
          <button className="text-[#867273] hover:text-[#1b1c1c]" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="bg-[#f6f3f2] p-4 rounded-xl border border-[#d9c1c1]/60 flex flex-col gap-3">
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-[#534343]">Atelier Unit:</span>
            <span className="font-semibold text-[#1b1c1c]">Premvati Ladies Tailor, Malad West</span>
          </div>
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-[#534343]">Active Appointments Logged:</span>
            <span className="font-bold text-[#5c1d24]">{appointments.length} Records</span>
          </div>
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-[#534343]">Format:</span>
            <span className="font-medium text-[#1b1c1c]">CSV / Printable Plain Text</span>
          </div>
        </div>

        <p className="text-[13px] text-[#534343] leading-relaxed">
          The export ledger packages all customer appointments, fitting timelines, custom garment requests, and master tailoring notes for accounting and workshop coordination.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={downloadCSV}
            className="flex-1 bg-[#5c1d24] text-white py-3 rounded-xl font-medium hover:bg-[#400710] transition-colors text-[13px] flex items-center justify-center gap-2 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">table_view</span>
            Download CSV Spreadsheet
          </button>
          <button
            onClick={copyToClipboard}
            className="px-4 py-3 rounded-xl border border-[#d9c1c1] text-[#1b1c1c] hover:bg-[#f0eded] text-[13px] font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">
              {copied ? 'done' : 'content_copy'}
            </span>
            {copied ? 'Copied!' : 'Copy Summary'}
          </button>
        </div>
      </div>
    </div>
  );
};

interface ContactClientModalProps {
  appointment: Appointment | null;
  onClose: () => void;
  onStatusChange: (id: string, newStatus: any) => void;
}

export const ContactClientModal: React.FC<ContactClientModalProps> = ({
  appointment,
  onClose,
  onStatusChange,
}) => {
  if (!appointment) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-[#fcf9f8] w-full max-w-md rounded-2xl p-6 shadow-2xl flex flex-col gap-5 relative border border-[#e4e2e1]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#e4e2e1] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#5c1d24]">support_agent</span>
            <h3 className="font-serif text-[20px] text-[#400710] font-bold">
              Client Quick Contact
            </h3>
          </div>
          <button className="text-[#867273] hover:text-[#1b1c1c]" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#ffdada] text-[#400710] font-bold flex items-center justify-center text-[16px]">
            {appointment.initials}
          </div>
          <div>
            <h4 className="font-semibold text-[#1b1c1c] text-[16px]">{appointment.clientName}</h4>
            <p className="text-[13px] text-[#534343]">{appointment.service}</p>
          </div>
        </div>

        <div className="bg-[#f6f3f2] p-4 rounded-xl flex flex-col gap-2 text-[13px]">
          <div className="flex justify-between">
            <span className="text-[#867273]">Phone:</span>
            <span className="font-semibold text-[#1b1c1c]">{appointment.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#867273]">Appointment Time:</span>
            <span className="font-medium text-[#1b1c1c]">{appointment.dateTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#867273]">Current Status:</span>
            <span className="font-bold text-[#5c1d24]">{appointment.status}</span>
          </div>
          {appointment.notes && (
            <div className="pt-2 border-t border-[#d9c1c1]/40 text-[#534343] italic">
              "{appointment.notes}"
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <a
            href={`tel:${appointment.phone}`}
            className="flex items-center justify-center gap-2 bg-[#5c1d24] text-white py-2.5 rounded-xl font-medium text-[13px] hover:bg-[#400710] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            Call Client
          </a>
          <a
            href={`https://wa.me/${appointment.phone.replace(/[^0-9]/g, '')}?text=Namaste%20${encodeURIComponent(appointment.clientName)},%20this%20is%20Premvati%20Ladies%20Tailor%20regarding%20your%20${encodeURIComponent(appointment.service)}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 rounded-xl font-medium text-[13px] hover:brightness-105 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            WhatsApp
          </a>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#e4e2e1] text-[12px]">
          <span className="text-[#867273]">Update Status:</span>
          <div className="flex gap-1.5">
            <button
              onClick={() => {
                onStatusChange(appointment.id, 'Approved');
                onClose();
              }}
              className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold hover:bg-emerald-200"
            >
              Approve
            </button>
            <button
              onClick={() => {
                onStatusChange(appointment.id, 'Completed');
                onClose();
              }}
              className="px-2.5 py-1 rounded bg-blue-100 text-blue-800 font-bold hover:bg-blue-200"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
