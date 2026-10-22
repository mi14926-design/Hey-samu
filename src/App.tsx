/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BIRTHDAY_CONFIG, MemoryPhoto } from './config/birthdayData';
import { WelcomeScreen } from './components/WelcomeScreen';
import { BirthdayHero } from './components/BirthdayHero';
import { MemoriesGallery } from './components/MemoriesGallery';
import { LittleThings } from './components/LittleThings';
import { FriendshipTimeline } from './components/FriendshipTimeline';
import { PersonalLetter } from './components/PersonalLetter';
import { BirthdayCake } from './components/BirthdayCake';
import { HiddenSurprises } from './components/HiddenSurprises';
import { FinalWish } from './components/FinalWish';
import { MusicPlayer } from './components/MusicPlayer';
import { audioEngine } from './utils/audioEngine';
import {
  X,
  Sparkles,
  Heart,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChapterMeta {
  id: number;
  title: string;
  shortTitle: string;
  icon: string;
  nextLabel: string;
}

const CHAPTERS: ChapterMeta[] = [
  {
    id: 1,
    title: "Birthday Celebration",
    shortTitle: "Celebration",
    icon: "🎉",
    nextLabel: "Our Favorite Memories 📸",
  },
  {
    id: 2,
    title: "Moments I'll Always Remember",
    shortTitle: "Memories",
    icon: "📸",
    nextLabel: "Little Things That Remind Me of You 🌸",
  },
  {
    id: 3,
    title: "Little Things I Still Remember",
    shortTitle: "Little Things",
    icon: "🌸",
    nextLabel: "Our Friendship Chapters 📖",
  },
  {
    id: 4,
    title: "Journey Through Our Friendship",
    shortTitle: "Timeline",
    icon: "📖",
    nextLabel: "Can I Tell You Something? 💌",
  },
  {
    id: 5,
    title: "Can I Tell You Something?",
    shortTitle: "Letter",
    icon: "💌",
    nextLabel: "Make Your Birthday Wish 🎂",
  },
  {
    id: 6,
    title: "Make a Birthday Wish",
    shortTitle: "Wish & Cake",
    icon: "🎂",
    nextLabel: "Hidden Surprises For You 🎁",
  },
  {
    id: 7,
    title: "Hidden Surprises For You",
    shortTitle: "Surprises",
    icon: "🎁",
    nextLabel: "Whatever Life Brings... ✨",
  },
  {
    id: 8,
    title: "Whatever Life Brings...",
    shortTitle: "Finale",
    icon: "✨",
    nextLabel: "Relive From Beginning ↺",
  },
];

export default function App() {
  const [isSurpriseOpened, setIsSurpriseOpened] = useState<boolean>(false);
  const [bgIntensity, setBgIntensity] = useState<'vivid' | 'soft' | 'clean'>('vivid');
  const [showFullPhotoModal, setShowFullPhotoModal] = useState<boolean>(false);

  // Multi-Page Storybook Navigation State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageDirection, setPageDirection] = useState<number>(1);

  const [friendName, setFriendName] = useState<string>(() => {
    return localStorage.getItem('birthday_friend_name') || BIRTHDAY_CONFIG.friendName;
  });

  const [memories, setMemories] = useState<MemoryPhoto[]>(() => {
    const saved = localStorage.getItem('birthday_custom_memories_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === BIRTHDAY_CONFIG.memories.length) {
          return BIRTHDAY_CONFIG.memories.map((m) => {
            const match = parsed.find((p: MemoryPhoto) => p.id === m.id);
            return match && match.url ? { ...m, url: match.url } : m;
          });
        }
      } catch {
        return BIRTHDAY_CONFIG.memories;
      }
    }
    return BIRTHDAY_CONFIG.memories;
  });

  const handleUpdateFriendName = (name: string) => {
    setFriendName(name);
    localStorage.setItem('birthday_friend_name', name);
  };

  const handleUpdatePhoto = (id: string, newUrl: string) => {
    const updated = memories.map((m) => (m.id === id ? { ...m, url: newUrl } : m));
    setMemories(updated);
    localStorage.setItem('birthday_custom_memories_v2', JSON.stringify(updated));
  };

  const handleResetAll = () => {
    setFriendName(BIRTHDAY_CONFIG.friendName);
    setMemories(BIRTHDAY_CONFIG.memories);
    localStorage.removeItem('birthday_friend_name');
    localStorage.removeItem('birthday_custom_memories');
    localStorage.removeItem('birthday_custom_memories_v2');
  };

  const handleToggleBgIntensity = () => {
    setBgIntensity((prev) => {
      if (prev === 'vivid') return 'soft';
      if (prev === 'soft') return 'clean';
      return 'vivid';
    });
  };

  const handleGoToPage = (newPage: number) => {
    if (newPage < 1 || newPage > CHAPTERS.length) return;
    setPageDirection(newPage >= currentPage ? 1 : -1);
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestartJourney = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(1);
    setIsSurpriseOpened(false);
    audioEngine.pause();
  };

  // Keyboard navigation between separate pages
  useEffect(() => {
    if (!isSurpriseOpened) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'ArrowRight' && currentPage < CHAPTERS.length) {
        handleGoToPage(currentPage + 1);
      } else if (e.key === 'ArrowLeft' && currentPage > 1) {
        handleGoToPage(currentPage - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSurpriseOpened, currentPage]);

  const currentChapter = CHAPTERS[currentPage - 1];

  return (
    <div className="relative min-h-screen text-[#343039] selection:bg-[#FFDDE7] overflow-x-hidden">
      {/* Global Fixed Photo Background - High Definition & Prominent */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-stone-900">
        <img
          src="/assets/aistudio/IMG-20251020-WA0246_389f9e48.jpg"
          alt="Birthday Friend Background"
          className={`w-full h-full object-cover object-[center_20%] sm:object-[center_25%] transition-all duration-700 ${
            bgIntensity === 'vivid'
              ? 'opacity-90 scale-100'
              : bgIntensity === 'soft'
              ? 'opacity-65 scale-100'
              : 'opacity-25 scale-100'
          }`}
        />
        {/* Soft atmospheric gradient scrim so cards & text stand out cleanly */}
        <div
          className={`absolute inset-0 transition-all duration-700 ${
            bgIntensity === 'vivid'
              ? 'bg-gradient-to-b from-black/30 via-transparent to-black/45'
              : bgIntensity === 'soft'
              ? 'bg-black/40 backdrop-blur-[1px]'
              : 'bg-[#FFF9F3]/90'
          }`}
        />
      </div>

      {/* 1. Opening Surprise Screen */}
      {!isSurpriseOpened && (
        <WelcomeScreen
          friendName={friendName}
          birthdayDate={BIRTHDAY_CONFIG.birthdayDate}
          onOpenSurprise={() => {
            setIsSurpriseOpened(true);
            setCurrentPage(1);
          }}
        />
      )}

      {/* 2. Main Separate Pages Birthday Experience */}
      {isSurpriseOpened && (
        <div className="relative z-10 animate-in fade-in duration-700 pb-16">
          {/* Sticky Chapter Header / Page Stepper (Top Navigation) */}
          <header className="sticky top-0 z-30 px-3 sm:px-6 py-2.5 bg-white/90 backdrop-blur-md border-b border-rose-100/90 shadow-xs">
            <div className="max-w-5xl mx-auto flex flex-col gap-2">
              <div className="flex items-center justify-between gap-3">
                {/* Current Chapter Badge */}
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-500 text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-xs">
                    {currentPage}
                  </span>
                  <div className="text-left">
                    <span className="text-[11px] font-semibold text-rose-500 uppercase tracking-wider block">
                      Chapter {currentPage} of {CHAPTERS.length}
                    </span>
                    <h2 className="text-xs sm:text-sm font-bold text-[#343039] truncate max-w-[200px] sm:max-w-sm">
                      {currentChapter.title}
                    </h2>
                  </div>
                </div>

                {/* Quick Prev / Next Arrows */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleGoToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                      currentPage === 1
                        ? 'opacity-40 border-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-white hover:bg-rose-50 border-rose-200 text-[#343039] shadow-xs hover:scale-105'
                    }`}
                    title="Previous page (Left Arrow)"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleGoToPage(currentPage + 1)}
                    disabled={currentPage === CHAPTERS.length}
                    className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                      currentPage === CHAPTERS.length
                        ? 'opacity-40 border-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-rose-500 hover:bg-rose-600 border-rose-500 text-white shadow-xs hover:scale-105'
                    }`}
                    title="Next page (Right Arrow)"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Smooth Chapter Progress Bar */}
              <div className="w-full h-1.5 bg-rose-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentPage / CHAPTERS.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Horizontal Scrollable Chapter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs">
                {CHAPTERS.map((chapter) => {
                  const isActive = chapter.id === currentPage;
                  const isPassed = chapter.id < currentPage;

                  return (
                    <button
                      key={chapter.id}
                      onClick={() => handleGoToPage(chapter.id)}
                      className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all flex items-center gap-1 cursor-pointer select-none ${
                        isActive
                          ? 'bg-rose-500 text-white shadow-md font-bold scale-102 ring-2 ring-rose-200'
                          : isPassed
                          ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/60'
                          : 'bg-white/90 text-slate-600 hover:bg-white border border-slate-200/70 hover:text-slate-900'
                      }`}
                    >
                      <span>{chapter.icon}</span>
                      <span>{chapter.shortTitle}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </header>

          {/* Main Chapter Content Area with Slide & Fade Transitions */}
          <main className="relative pt-4 sm:pt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{
                  opacity: 0,
                  x: pageDirection > 0 ? 35 : -35,
                  filter: 'blur(3px)',
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  filter: 'blur(0px)',
                }}
                exit={{
                  opacity: 0,
                  x: pageDirection > 0 ? -35 : 35,
                  filter: 'blur(3px)',
                }}
                transition={{ duration: 0.38, ease: [0.25, 1, 0.5, 1] }}
                className="min-h-[70vh]"
              >
                {/* Page 1: Birthday Celebration Hero */}
                {currentPage === 1 && (
                  <BirthdayHero
                    friendName={friendName}
                    onExploreMore={() => handleGoToPage(2)}
                  />
                )}

                {/* Page 2: Memories Scrapbook & Photo Gallery */}
                {currentPage === 2 && (
                  <div id="memories">
                    <MemoriesGallery
                      memories={memories}
                      onUpdatePhoto={handleUpdatePhoto}
                      onResetPhotos={handleResetAll}
                    />
                  </div>
                )}

                {/* Page 3: Little Things I Still Remember & Meme */}
                {currentPage === 3 && (
                  <div id="little-things">
                    <LittleThings items={BIRTHDAY_CONFIG.littleThings} />
                  </div>
                )}

                {/* Page 4: Friendship Timeline */}
                {currentPage === 4 && (
                  <div id="timeline">
                    <FriendshipTimeline milestones={BIRTHDAY_CONFIG.timeline} />
                  </div>
                )}

                {/* Page 5: Personal Heartfelt Letter */}
                {currentPage === 5 && (
                  <div id="letter">
                    <PersonalLetter
                      paragraphs={BIRTHDAY_CONFIG.personalLetter.paragraphs}
                      closingQuote={BIRTHDAY_CONFIG.personalLetter.closingQuote}
                    />
                  </div>
                )}

                {/* Page 6: Birthday Cake & Wish */}
                {currentPage === 6 && (
                  <div id="wish">
                    <BirthdayCake
                      friendName={friendName}
                      blownMessages={BIRTHDAY_CONFIG.birthdayWish.blownMessage}
                    />
                  </div>
                )}

                {/* Page 7: Hidden Surprises & Easter Eggs */}
                {currentPage === 7 && (
                  <div id="surprises">
                    <HiddenSurprises surprises={BIRTHDAY_CONFIG.surprises} />
                  </div>
                )}

                {/* Page 8: Final Wishing Well & Farewell */}
                {currentPage === 8 && (
                  <FinalWish
                    friendName={friendName}
                    onRestart={handleRestartJourney}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Bottom Page Navigation (Back & Next Buttons on every page) */}
            <div className="max-w-2xl mx-auto px-4 pt-8 pb-12">
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 shadow-xl border border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                {/* Previous Button */}
                {currentPage > 1 ? (
                  <button
                    onClick={() => handleGoToPage(currentPage - 1)}
                    className="w-full sm:w-auto px-5 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs sm:text-sm shadow-xs border border-slate-200 flex items-center justify-center gap-2 transition-all hover:scale-102 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 text-slate-500" />
                    <span>Back: {CHAPTERS[currentPage - 2]?.shortTitle}</span>
                  </button>
                ) : (
                  <div className="hidden sm:block" />
                )}

                {/* Page Count Bubble */}
                <div className="text-center text-xs text-slate-500 font-semibold px-2">
                  <span>Page {currentPage} of {CHAPTERS.length}</span>
                </div>

                {/* Next Button with Eye-Catching Shimmer and Pulse */}
                {currentPage < CHAPTERS.length ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleGoToPage(currentPage + 1)}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-[#e11d48] via-rose-500 to-[#f43f5e] hover:from-[#be123c] hover:to-[#e11d48] text-white font-semibold text-xs sm:text-sm shadow-lg hover:shadow-xl flex items-center justify-center gap-2.5 transition-all cursor-pointer group"
                  >
                    <span>Next: {currentChapter.nextLabel}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform animate-pulse" />
                  </motion.button>
                ) : (
                  <button
                    onClick={handleRestartJourney}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 hover:scale-102 transition-all cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Relive From Beginning</span>
                  </button>
                )}
              </div>
            </div>
          </main>

          {/* Persistent Floating Music Player */}
          <MusicPlayer />
        </div>
      )}

      {/* Full Photo Modal */}
      <AnimatePresence>
        {showFullPhotoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-lg w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 text-center"
            >
              <button
                onClick={() => setShowFullPhotoModal(false)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full max-h-[70vh] rounded-2xl overflow-hidden shadow-inner mb-4">
                <img
                  src="/assets/aistudio/IMG-20251020-WA0246_389f9e48.jpg"
                  alt="Birthday Star"
                  className="w-full h-full object-cover"
                />
              </div>

              <h4 className="font-handwriting text-3xl text-[#343039] font-medium mb-1">
                The Birthday Star ✨
              </h4>
              <p className="text-xs text-slate-500">
                Looking radiant as always on October 23
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
