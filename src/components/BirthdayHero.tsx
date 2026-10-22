import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';

interface BirthdayHeroProps {
  friendName: string;
  onExploreMore: () => void;
}

export const BirthdayHero: React.FC<BirthdayHeroProps> = ({
  friendName,
  onExploreMore
}) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-8 pb-16 px-4 text-center overflow-hidden">

      {/* Floating balloons background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Balloon 1: Pastel Pink */}
        <motion.div
          className="absolute top-12 left-4 sm:left-12 opacity-80"
          animate={{ y: [0, -18, 0], x: [0, 6, 0], rotate: [-2, 3, -2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-16 h-20 bg-gradient-to-br from-[#FFDDE7] to-[#f472b6] rounded-full shadow-md relative">
            <div className="w-1.5 h-1.5 bg-white/70 rounded-full absolute top-3 left-3" />
            <div className="w-1.5 h-1.5 bg-rose-400 absolute -bottom-1 left-1/2 -translate-x-1/2" />
            <div className="w-0.5 h-12 bg-[#343039]/20 absolute -bottom-12 left-1/2 -translate-x-1/2" />
          </div>
        </motion.div>

        {/* Balloon 2: Lavender */}
        <motion.div
          className="absolute top-20 right-6 sm:right-16 opacity-80"
          animate={{ y: [0, -22, 0], x: [0, -8, 0], rotate: [2, -4, 2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <div className="w-14 h-18 bg-gradient-to-br from-[#E9DFFF] to-[#c084fc] rounded-full shadow-md relative">
            <div className="w-1.5 h-1.5 bg-white/70 rounded-full absolute top-3 left-2.5" />
            <div className="w-1.5 h-1.5 bg-purple-400 absolute -bottom-1 left-1/2 -translate-x-1/2" />
            <div className="w-0.5 h-14 bg-[#343039]/20 absolute -bottom-14 left-1/2 -translate-x-1/2" />
          </div>
        </motion.div>

        {/* Balloon 3: Warm Peach */}
        <motion.div
          className="absolute bottom-24 left-8 sm:left-24 hidden sm:block opacity-70"
          animate={{ y: [0, -15, 0], x: [0, 5, 0], rotate: [-1, 2, -1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <div className="w-14 h-18 bg-gradient-to-br from-[#FFE6D5] to-[#fb923c] rounded-full shadow-md relative">
            <div className="w-1.5 h-1.5 bg-white/70 rounded-full absolute top-3 left-2.5" />
            <div className="w-1.5 h-1.5 bg-orange-400 absolute -bottom-1 left-1/2 -translate-x-1/2" />
            <div className="w-0.5 h-10 bg-[#343039]/20 absolute -bottom-10 left-1/2 -translate-x-1/2" />
          </div>
        </motion.div>

        {/* Little floating hearts and sparkles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-300/40"
            style={{
              top: `${20 + i * 12}%`,
              left: `${15 + ((i * 23) % 70)}%`
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [0.9, 1.1, 0.9]
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          >
            {i % 2 === 0 ? <Heart className="w-4 h-4 fill-current" /> : <Sparkles className="w-4 h-4" />}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/80 my-4">
        {/* Small top badge tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 border border-[#FFDDE7] rounded-full shadow-xs text-xs font-medium text-[#343039]/80 mb-6 backdrop-blur-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>October 23 · Today is All About You</span>
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-300" />
        </motion.div>

        {/* Birthday Star Portrait & Animated Cake Lockup */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-6">
          {/* Framed Photo Portrait */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="relative"
          >
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-pink-400 via-rose-300 to-amber-300 rounded-full blur-sm opacity-70 animate-pulse" />
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1 bg-white shadow-xl overflow-hidden border-2 border-[#FFDDE7]">
              <img
                src="/assets/aistudio/IMG-20251020-WA0246_389f9e48.jpg"
                alt="Birthday Star"
                className="w-full h-full object-cover object-top rounded-full hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xs px-3 py-0.5 rounded-full border border-pink-200 shadow-xs flex items-center gap-1 text-[11px] font-semibold text-[#e11d48] whitespace-nowrap">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Birthday Star</span>
            </div>
          </motion.div>

          {/* Animated Cake Art */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: 'spring', delay: 0.15 }}
            className="relative"
          >
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
              {/* Glowing aura */}
              <div className="absolute inset-0 bg-[#FFDDE7] rounded-full blur-xl opacity-60" />

              {/* Cake SVG Illustration */}
              <svg viewBox="0 0 120 120" className="w-full h-full relative z-10 drop-shadow-md">
                {/* Plate */}
                <ellipse cx="60" cy="100" rx="46" ry="10" fill="#FFE6D5" stroke="#fcd34d" strokeWidth="1.5" />
                {/* Bottom Tier */}
                <rect x="26" y="65" width="68" height="30" rx="8" fill="#FFF9F3" stroke="#FFDDE7" strokeWidth="2" />
                <path d="M 26 72 Q 34 82 43 72 Q 52 82 60 72 Q 68 82 77 72 Q 86 82 94 72" fill="#FFDDE7" stroke="none" />
                {/* Top Tier */}
                <rect x="36" y="42" width="48" height="25" rx="6" fill="#FFF9F3" stroke="#E9DFFF" strokeWidth="2" />
                <path d="M 36 48 Q 44 55 52 48 Q 60 55 68 48 Q 76 55 84 48" fill="#E9DFFF" stroke="none" />
                {/* Candle */}
                <rect x="58" y="24" width="4" height="18" rx="2" fill="#f43f5e" />
                {/* Glowing animated Flame */}
                <motion.g
                  animate={{
                    scaleY: [1, 1.15, 0.95, 1.1, 1],
                    scaleX: [1, 0.9, 1.08, 0.94, 1]
                  }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: "60px 24px" }}
                >
                  <ellipse cx="60" cy="17" rx="3.5" ry="6.5" fill="#f59e0b" />
                  <ellipse cx="60" cy="18" rx="2" ry="4" fill="#fef08a" />
                </motion.g>
                {/* Little Sprinkles */}
                <circle cx="48" cy="80" r="1.5" fill="#f43f5e" />
                <circle cx="72" cy="82" r="1.5" fill="#8b5cf6" />
                <circle cx="60" cy="85" r="1.5" fill="#f59e0b" />
                <circle cx="52" cy="55" r="1.2" fill="#ec4899" />
                <circle cx="68" cy="56" r="1.2" fill="#3b82f6" />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-serif-title font-bold text-[#343039] tracking-tight leading-tight mb-4"
        >
          HAPPY BIRTHDAY,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e11d48] via-[#f43f5e] to-[#ec4899]">
            {friendName.toUpperCase()}!
          </span>{' '}
          🎉
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-lg sm:text-xl font-medium text-[#343039]/80 mb-6 max-w-lg"
        >
          "Another year of you making the world a little more special."
        </motion.p>

        {/* Card Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-white/70 backdrop-blur-sm border border-[#FFDDE7] rounded-3xl p-6 sm:p-8 shadow-sm max-w-lg mx-auto text-[#343039]/90 text-base sm:text-lg leading-relaxed mb-8"
        >
          <p className="mb-4">
            I hope today brings you a thousand little reasons to smile.
          </p>
          <p className="mb-4">
            You deserve happiness, beautiful surprises, and all the good things life has to offer.
          </p>
          <p className="font-handwriting text-2xl sm:text-3xl text-[#e11d48] pt-2">
            And yes, I still remember your special day. ❤️
          </p>
        </motion.div>

        {/* Scroll CTA Button */}
        <motion.button
          onClick={onExploreMore}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-[#FFDDE7] to-[#FFE6D5] text-[#343039] font-medium text-sm sm:text-base rounded-full shadow-sm border border-white hover:shadow-md transition-all cursor-pointer min-h-[44px]"
        >
          <span>There's More for You</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#343039]/70" />
        </motion.button>
      </div>
    </section>
  );
};
