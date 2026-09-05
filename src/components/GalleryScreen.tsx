import React, { useState, useMemo } from 'react';
import { GalleryItem, GalleryCategory, ScreenMode } from '../types';

interface GalleryScreenProps {
  items: GalleryItem[];
  onOpenItem: (item: GalleryItem) => void;
  onOpenUpload: () => void;
  onNavigate: (screen: ScreenMode, section?: string) => void;
}

export const GalleryScreen: React.FC<GalleryScreenProps> = ({
  items,
  onOpenItem,
  onOpenUpload,
  onNavigate,
}) => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all' as GalleryCategory, label: 'All Designs' },
    { id: 'blouses' as GalleryCategory, label: 'Blouses' },
    { id: 'traditional' as GalleryCategory, label: 'Traditional' },
    { id: 'western' as GalleryCategory, label: 'Western' },
    { id: 'party' as GalleryCategory, label: 'Party Wear' },
    { id: 'custom' as GalleryCategory, label: 'Custom Designs' },
  ];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [items, activeCategory, searchQuery]);

  return (
    <div className="w-full pt-28 pb-20 bg-[#fcf9f8] min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Gallery Top Hero Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#e4e2e1] pb-8">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="text-[12px] font-bold uppercase tracking-widest text-[#5c1d24]">
              Atelier Portfolio
            </span>
            <h1 className="font-serif text-[36px] sm:text-[44px] leading-tight text-[#400710] font-bold">
              The Couture Gallery
            </h1>
            <p className="text-[15px] leading-relaxed text-[#534343]">
              Explore our curated collection of bespoke bridal lehengas, hand-embroidered blouses, and tailored evening wear crafted with immaculate Mumbai artistry.
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Atelier Manager View removed from gallery per request */}

            <button
              onClick={onOpenUpload}
              className="bg-[#5c1d24] text-white px-5 py-2.5 rounded-xl text-[13px] font-medium tracking-wide transition-all hover:bg-[#400710] shadow-sm flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>
              Upload New Design
            </button>
          </div>
        </div>

        {/* Filter and Search Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-8">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-[13px] px-4 py-2 rounded-xl transition-all whitespace-nowrap font-medium ${
                  activeCategory === cat.id
                    ? 'bg-[#400710] text-white shadow-sm font-semibold'
                    : 'bg-[#f0eded] text-[#534343] hover:bg-[#eae7e7] hover:text-[#1b1c1c]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#867273] text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search design or fabric..."
              className="w-full bg-[#f6f3f2] border border-[#d9c1c1] rounded-xl pl-10 pr-4 py-2 text-[13px] text-[#1b1c1c] focus:outline-none focus:border-[#400710]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#867273] hover:text-[#1b1c1c]"
              >
                <span className="material-symbols-outlined text-[16px]">cancel</span>
              </button>
            )}
          </div>
        </div>

        {/* Item Counter */}
        <div className="mt-4 flex items-center justify-between text-[12px] text-[#867273]">
          <span>
            Showing <strong className="text-[#1b1c1c]">{filteredItems.length}</strong> creations
          </span>
          <span className="hidden sm:inline-block">Click any garment to inspect fabric & booking options</span>
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-[#f6f3f2] rounded-2xl p-12 text-center my-12 border border-[#d9c1c1]/60">
            <span className="material-symbols-outlined text-[#867273] text-[48px]">checkroom</span>
            <h3 className="font-serif text-[20px] text-[#1b1c1c] font-bold mt-2">No designs match your filter</h3>
            <p className="text-[13px] text-[#534343] mt-1">Try selecting another category or clear your search terms.</p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 bg-[#5c1d24] text-white rounded-xl text-[13px] font-medium"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenItem(item)}
                className="group bg-[#fcf9f8] rounded-2xl overflow-hidden border border-[#e4e2e1] hover:border-[#d9c1c1] transition-all duration-300 hover:shadow-xl cursor-pointer flex flex-col"
              >
                {/* Image Container with Hover zoom */}
                <div className="w-full h-80 overflow-hidden relative bg-[#f0eded]">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#400710] px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider shadow-sm">
                    {item.categoryLabel}
                  </span>

                  {/* Quick View overlay button */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/95 text-[#400710] px-4 py-2 rounded-xl text-[12px] font-bold tracking-wide shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                      Inspect Garment
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 bg-white">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#5c1d24] tracking-wider uppercase">
                        {item.fabric}
                      </span>
                    </div>
                    <h3 className="font-serif text-[19px] sm:text-[21px] text-[#1b1c1c] font-bold group-hover:text-[#400710] transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-[#534343] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#f0eded] flex items-center justify-between text-[12px]">
                    <span className="text-[#867273] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">schedule</span>
                      {item.fittingTime || '3-5 Days'}
                    </span>
                    <span className="text-[#5c1d24] font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                      View Details & Fitting
                      <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
