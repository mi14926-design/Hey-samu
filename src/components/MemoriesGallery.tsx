import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, ChevronLeft, ChevronRight, X, Upload, Sparkles, Heart, ZoomIn, Calendar, MapPin } from 'lucide-react';
import { MemoryPhoto } from '../config/birthdayData';
import { getMemoryArtSvg } from '../utils/memoryArt';
import { audioEngine } from '../utils/audioEngine';

interface MemoriesGalleryProps {
  memories: MemoryPhoto[];
  onUpdatePhoto: (id: string, newUrl: string) => void;
  onResetPhotos: () => void;
}

export const MemoriesGallery: React.FC<MemoriesGalleryProps> = ({
  memories,
  onUpdatePhoto,
  onResetPhotos
}) => {
  const [activePhoto, setActivePhoto] = useState<MemoryPhoto | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [customUrlInput, setCustomUrlInput] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Subtle natural polaroid tilt rotations
  const rotations = [-2.2, 1.8, -1.5, 2.0, -1.8, 1.4, -2.1, 1.9, -1.3, 1.5];

  // Active photo index for lightbox navigation
  const activeIndex = activePhoto ? memories.findIndex((m) => m.id === activePhoto.id) : -1;

  const handleOpenLightbox = (photo: MemoryPhoto) => {
    setActivePhoto(photo);
    if (audioEngine.getCurrentTrack() !== 'memories') {
      audioEngine.playTrack('memories');
    }
  };

  const handlePrevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeIndex > 0) {
      setActivePhoto(memories[activeIndex - 1]);
    } else {
      setActivePhoto(memories[memories.length - 1]);
    }
  };

  const handleNextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeIndex < memories.length - 1) {
      setActivePhoto(memories[activeIndex + 1]);
    } else {
      setActivePhoto(memories[0]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activePhoto) return;
      if (e.key === 'Escape') setActivePhoto(null);
      if (e.key === 'ArrowLeft') handlePrevPhoto();
      if (e.key === 'ArrowRight') handleNextPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto, activeIndex, memories]);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const result = loadEvent.target?.result as string;
        if (result) {
          onUpdatePhoto(id, result);
          setEditingId(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = (id: string) => {
    if (customUrlInput.trim()) {
      onUpdatePhoto(id, customUrlInput.trim());
      setCustomUrlInput('');
      setEditingId(null);
    }
  };

  return (
    <section id="memories" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 max-w-xl mx-auto shadow-xl border border-white/80">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#FFDDE7] rounded-full text-xs font-semibold text-[#343039]/80 mb-3">
            <Camera className="w-3.5 h-3.5 text-pink-500" />
            <span>Digital Scrapbook</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-title font-bold text-[#343039] tracking-tight mb-2">
            A Few Moments I'll Always Remember 📸
          </h2>
          <p className="text-sm sm:text-base text-[#343039]/75 max-w-lg mx-auto">
            Some memories are etched in time — each photo holds a story, a laugh, and a special moment.
          </p>

          <div className="mt-3 flex items-center justify-center gap-3">
            <span className="text-xs text-rose-500 font-medium">
              ✨ Tap any photo to expand · {memories.length} Special Moments
            </span>
          </div>
        </div>

        {/* Mobile Swipe Carousel + Desktop Grid */}
        <div className="relative">
          {/* Left/Right scroll arrows for horizontal strip */}
          <div className="hidden md:flex items-center justify-between absolute -top-14 right-2 gap-2">
            <button
              onClick={handleScrollLeft}
              className="w-9 h-9 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
              title="Previous photos"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleScrollRight}
              className="w-9 h-9 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
              title="Next photos"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Polaroid Strip */}
          <div
            ref={scrollContainerRef}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8 overflow-x-auto pb-8 pt-4 px-2 no-scrollbar snap-x snap-mandatory"
          >
            {memories.map((photo, index) => {
              const rot = rotations[index % rotations.length];
              const imageSrc = photo.url || getMemoryArtSvg(photo.id);

              return (
                <motion.div
                  key={photo.id}
                  whileHover={{ y: -8, scale: 1.02, rotate: 0 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0 w-[280px] sm:w-[320px] md:w-auto snap-center"
                  style={{ transform: `rotate(${rot}deg)` }}
                >
                  {/* Polaroid Frame */}
                  <div className="relative bg-white p-3.5 pb-5 rounded-2xl shadow-lg hover:shadow-2xl border border-slate-200/90 transition-all group flex flex-col h-full">
                    {/* Washi Tape Accent */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 washi-tape -rotate-1 rounded-xs pointer-events-none z-10 opacity-85" />

                    {/* Photo Container - 4:5 aspect ratio for portrait elegance */}
                    <div
                      onClick={() => handleOpenLightbox(photo)}
                      className="relative w-full aspect-[4/5] bg-stone-100 rounded-xl overflow-hidden cursor-pointer shadow-inner group/photo"
                    >
                      <img
                        src={imageSrc}
                        alt={photo.caption}
                        className="w-full h-full object-cover object-[center_top] transition-transform duration-700 group-hover/photo:scale-105"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover/photo:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-800 opacity-0 group-hover/photo:opacity-100 transition-all scale-75 group-hover/photo:scale-100 shadow-lg">
                          <ZoomIn className="w-5 h-5 text-rose-500" />
                        </div>
                      </div>

                      {/* Date Badge over Photo */}
                      <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full text-[11px] font-medium text-white flex items-center gap-1 shadow-sm">
                        <Calendar className="w-3 h-3 text-pink-300" />
                        <span>{photo.dateOrYear}</span>
                      </div>
                    </div>

                    {/* Polaroid Bottom Label Area */}
                    <div className="mt-4 px-1.5 flex flex-col justify-between flex-1">
                      <div>
                        {/* Album / Caption written to match photo look */}
                        <h3 className="font-handwriting text-2xl sm:text-3xl text-[#343039] font-medium leading-snug">
                          "{photo.caption}"
                        </h3>

                        {/* Location Tag */}
                        {photo.location && (
                          <div className="flex items-center gap-1 text-[11px] font-semibold text-rose-500 mt-1">
                            <MapPin className="w-3 h-3 shrink-0" />
                            <span>{photo.location}</span>
                          </div>
                        )}

                        {/* Photo Context Story */}
                        {photo.description && (
                          <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {photo.description}
                          </p>
                        )}
                      </div>

                      <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-slate-500">#{index + 1} Memory</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenLightbox(photo);
                            }}
                            className="text-slate-600 hover:text-slate-900 font-medium hover:underline inline-flex items-center gap-1 cursor-pointer"
                          >
                            <ZoomIn className="w-3 h-3" />
                            <span>View</span>
                          </button>
                          <span className="text-slate-300">·</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingId(photo.id);
                            }}
                            className="text-pink-600 hover:text-pink-700 font-medium hover:underline inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Upload className="w-3 h-3" />
                            <span>Replace</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox Modal with Next/Previous Controls */}
      <AnimatePresence>
        {activePhoto && (
          <div
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 max-h-[92vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-slate-800 transition-colors cursor-pointer"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next Floating Arrow Buttons */}
              <button
                onClick={handlePrevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center text-slate-800 transition-all hover:scale-105 cursor-pointer"
                title="Previous Memory (Left Arrow)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center text-slate-800 transition-all hover:scale-105 cursor-pointer"
                title="Next Memory (Right Arrow)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* High Definition Image Container - Shows Full Native Aspect Ratio without cut */}
              <div className="w-full flex-1 min-h-[260px] max-h-[56vh] bg-stone-900/10 rounded-2xl overflow-hidden flex items-center justify-center shadow-inner relative">
                <img
                  src={activePhoto.url || getMemoryArtSvg(activePhoto.id)}
                  alt={activePhoto.caption}
                  className="max-h-[56vh] w-auto max-w-full object-contain rounded-xl shadow-md"
                />

                {/* Counter Tag */}
                <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-medium text-white flex items-center gap-1.5 shadow-sm">
                  <span>Photo {activeIndex + 1} of {memories.length}</span>
                </div>
              </div>

              {/* Details & Story */}
              <div className="px-2 pt-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 font-semibold flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {activePhoto.dateOrYear}
                  </span>
                  {activePhoto.location && (
                    <span className="font-medium text-slate-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-500" />
                      {activePhoto.location}
                    </span>
                  )}
                </div>

                <h3 className="font-handwriting text-3xl sm:text-4xl text-[#343039] font-medium mt-1 mb-1.5">
                  "{activePhoto.caption}"
                </h3>

                {activePhoto.description && (
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">
                    {activePhoto.description}
                  </p>
                )}

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 italic">
                    Use arrow keys or swipe to view memories
                  </span>
                  <button
                    onClick={() => {
                      setEditingId(activePhoto.id);
                      setActivePhoto(null);
                    }}
                    className="px-3 py-1.5 bg-[#FFDDE7] text-[#343039] rounded-xl text-xs font-semibold hover:bg-pink-200 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Change Photo</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Photo Replace Modal */}
      <AnimatePresence>
        {editingId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-[#343039]"
            >
              <button
                onClick={() => setEditingId(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>

              <h4 className="text-lg font-bold font-serif-title mb-1">
                Customize Friendship Photo 📸
              </h4>
              <p className="text-xs text-slate-500 mb-5">
                Upload a photo from your device or paste an image URL. It will be stored in your browser so you can show your best friend!
              </p>

              {/* Upload file button */}
              <div className="mb-4">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, editingId)}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 px-4 border-2 border-dashed border-[#FFDDE7] hover:border-pink-400 rounded-xl bg-[#FFF9F3] text-sm font-medium text-[#343039] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Upload className="w-4 h-4 text-pink-500" />
                  <span>Choose Photo from Device</span>
                </button>
              </div>

              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-2 text-xs text-slate-400 uppercase">or URL</span>
              </div>

              {/* URL Input */}
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/our-photo.jpg"
                  value={customUrlInput}
                  onChange={(e) => setCustomUrlInput(e.target.value)}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
                <button
                  onClick={() => handleUrlSubmit(editingId)}
                  className="px-4 py-2 bg-[#343039] text-white text-xs font-medium rounded-xl hover:bg-black transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
