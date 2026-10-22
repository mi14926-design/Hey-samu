import React, { useState } from 'react';
import { Heart, User, X, RotateCcw, Image, Sparkles } from 'lucide-react';

interface TopBarProps {
  friendName: string;
  onUpdateFriendName: (name: string) => void;
  onResetAll: () => void;
  bgIntensity: 'soft' | 'vivid' | 'clean';
  onToggleBgIntensity: () => void;
  onViewPhoto: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  friendName,
  onUpdateFriendName,
  onResetAll,
  bgIntensity,
  onToggleBgIntensity,
  onViewPhoto
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>(friendName);

  const handleSave = () => {
    if (tempName.trim()) {
      onUpdateFriendName(tempName.trim());
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-30 w-full bg-white/85 backdrop-blur-md border-b border-white/50 shadow-xs px-4 sm:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="text-base sm:text-lg font-serif-title font-bold text-[#343039] whitespace-nowrap shrink-0 flex items-center gap-2 hover:opacity-85 transition-opacity"
          >
            <span>Oct 23 · Birthday Surprise</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-300" />
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-600">
            <a href="#memories" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              Memories
            </a>
            <a href="#little-things" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              Little Things
            </a>
            <a href="#timeline" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              Our Journey
            </a>
            <a href="#letter" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              Letter
            </a>
            <a href="#wish" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              Make a Wish
            </a>
          </nav>

          {/* Zone 3: 1 primary action cluster */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Background Mood Toggle */}
            <button
              onClick={onToggleBgIntensity}
              className="px-2.5 py-1.5 text-xs font-medium text-[#343039] bg-white/80 border border-[#FFDDE7] rounded-full hover:bg-pink-50 transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-1 cursor-pointer"
              title="Change background photo intensity"
            >
              <Image className="w-3.5 h-3.5 text-pink-500" />
              <span className="hidden sm:inline">Backdrop:</span>
              <span className="capitalize font-semibold text-pink-600">{bgIntensity}</span>
            </button>

            {/* Friend Name Button */}
            <button
              onClick={() => {
                setTempName(friendName);
                setIsModalOpen(true);
              }}
              className="px-3.5 py-1.5 text-xs font-medium text-[#343039] bg-white border border-[#FFDDE7] rounded-full hover:bg-pink-50 transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <User className="w-3 h-3 text-pink-500" />
              <span>For: {friendName}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Personalize Friend Name Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="relative max-w-sm w-full bg-white rounded-3xl p-6 shadow-2xl border border-[#FFDDE7] text-[#343039]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif-title text-xl font-bold mb-2">
              Personalize Surprise 💝
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter your best friend's name. It will immediately update everywhere across the greetings, titles, cake, and wishes!
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                  Best Friend's Name
                </label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="e.g. Sarah, Alex, Sam..."
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                  autoFocus
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    onResetAll();
                    setIsModalOpen(false);
                  }}
                  className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Default</span>
                </button>

                <button
                  onClick={handleSave}
                  className="px-5 py-2 bg-[#343039] text-white text-xs font-semibold rounded-xl hover:bg-black transition-colors cursor-pointer"
                >
                  Save & Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
