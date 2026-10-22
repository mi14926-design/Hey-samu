import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Heart } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface BirthdayCakeProps {
  friendName: string;
  blownMessages: string[];
}

export const BirthdayCake: React.FC<BirthdayCakeProps> = ({
  friendName,
  blownMessages
}) => {
  const [candlesLit, setCandlesLit] = useState<boolean>(true);
  const [wishMade, setWishMade] = useState<boolean>(false);

  const handleBlowCandles = () => {
    if (!candlesLit) return;
    setCandlesLit(false);
    setWishMade(true);

    // Play celebration tune!
    audioEngine.playTrack('celebration');

    // Grand celebratory confetti burst!
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FFDDE7', '#FFE6D5', '#E9DFFF', '#f43f5e', '#ec4899', '#f59e0b', '#3b82f6', '#10b981']
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#FFDDE7', '#FFE6D5', '#a855f7', '#fbbf24']
      });
    }, 400);
  };

  const handleRelight = () => {
    setCandlesLit(true);
    setWishMade(false);
  };

  return (
    <section className="py-20 px-4 sm:px-6 relative text-center">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-8 bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 max-w-lg mx-auto shadow-xl border border-white/80">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#FFDDE7] rounded-full text-xs font-medium text-[#343039]/70 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Birthday Ritual</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-title font-bold text-[#343039] tracking-tight mb-2">
            Make a Wish! 🎂
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
            {candlesLit
              ? "Close your eyes, make a wish, and tap the candles."
              : "Your wish has been sent to the universe ✨"}
          </p>
        </div>

        {/* Interactive Cake Illustration */}
        <div
          onClick={handleBlowCandles}
          className={`relative p-6 sm:p-8 rounded-3xl bg-white/70 backdrop-blur-xs border border-[#FFE6D5] shadow-lg transition-all select-none ${
            candlesLit ? 'cursor-pointer hover:shadow-xl hover:scale-[1.02]' : 'cursor-default'
          }`}
        >
          {/* Subtle glow aura */}
          <div
            className={`absolute inset-0 rounded-3xl blur-2xl transition-opacity duration-700 ${
              candlesLit ? 'bg-amber-100/70 opacity-100' : 'bg-pink-100/30 opacity-40'
            }`}
          />

          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center mx-auto">
            <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-md">
              {/* Stand / Plate */}
              <ellipse cx="120" cy="210" rx="90" ry="16" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="3" />
              <path d="M 85 210 Q 120 225 155 210 L 145 228 L 95 228 Z" fill="#e2e8f0" />
              <rect x="80" y="226" width="80" height="6" rx="3" fill="#cbd5e1" />

              {/* Bottom Tier */}
              <rect x="45" y="140" width="150" height="65" rx="14" fill="#FFF9F3" stroke="#FFDDE7" strokeWidth="3" />
              {/* Cake bottom frosting drops */}
              <path
                d="M 45 155 Q 60 175 75 155 Q 90 175 105 155 Q 120 175 135 155 Q 150 175 165 155 Q 180 175 195 155"
                fill="#FFDDE7"
                stroke="none"
              />

              {/* Middle Tier */}
              <rect x="65" y="95" width="110" height="50" rx="10" fill="#FFF9F3" stroke="#E9DFFF" strokeWidth="3" />
              {/* Frosting drops */}
              <path
                d="M 65 108 Q 80 125 95 108 Q 110 125 125 108 Q 140 125 155 108 Q 170 125 175 108"
                fill="#E9DFFF"
                stroke="none"
              />

              {/* Decorative strawberries / berries on cake */}
              <circle cx="80" cy="95" r="6" fill="#f43f5e" />
              <circle cx="120" cy="95" r="6" fill="#f43f5e" />
              <circle cx="160" cy="95" r="6" fill="#f43f5e" />
              <circle cx="60" cy="140" r="5" fill="#f59e0b" />
              <circle cx="180" cy="140" r="5" fill="#f59e0b" />

              {/* Sprinkles on cake */}
              <line x1="85" y1="165" x2="95" y2="168" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="110" y1="175" x2="120" y2="170" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="145" y1="168" x2="155" y2="173" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="90" y1="120" x2="100" y2="123" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
              <line x1="140" y1="122" x2="150" y2="119" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />

              {/* 3 Candles */}
              {/* Left Candle */}
              <rect x="90" y="65" width="6" height="30" rx="2" fill="#ec4899" />
              {/* Center Candle */}
              <rect x="117" y="55" width="6" height="40" rx="2" fill="#8b5cf6" />
              {/* Right Candle */}
              <rect x="144" y="65" width="6" height="30" rx="2" fill="#f59e0b" />

              {/* Candle Wicks */}
              <line x1="93" y1="65" x2="93" y2="60" stroke="#343039" strokeWidth="1.5" />
              <line x1="120" y1="55" x2="120" y2="50" stroke="#343039" strokeWidth="1.5" />
              <line x1="147" y1="65" x2="147" y2="60" stroke="#343039" strokeWidth="1.5" />

              {/* Animated Flames when lit */}
              <AnimatePresence>
                {candlesLit && (
                  <motion.g
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Flame 1 */}
                    <g className="animate-flicker" style={{ transformOrigin: "93px 60px" }}>
                      <ellipse cx="93" cy="50" rx="4.5" ry="9" fill="#f59e0b" />
                      <ellipse cx="93" cy="51" rx="2.5" ry="5.5" fill="#fef08a" />
                    </g>
                    {/* Flame 2 (Center) */}
                    <g className="animate-flicker" style={{ transformOrigin: "120px 50px", animationDelay: "0.2s" }}>
                      <ellipse cx="120" cy="38" rx="5.5" ry="11" fill="#f59e0b" />
                      <ellipse cx="120" cy="39" rx="3" ry="7" fill="#fef08a" />
                    </g>
                    {/* Flame 3 */}
                    <g className="animate-flicker" style={{ transformOrigin: "147px 60px", animationDelay: "0.4s" }}>
                      <ellipse cx="147" cy="50" rx="4.5" ry="9" fill="#f59e0b" />
                      <ellipse cx="147" cy="51" rx="2.5" ry="5.5" fill="#fef08a" />
                    </g>
                  </motion.g>
                )}
              </AnimatePresence>

              {/* Gentle smoke curls when candles are blown out */}
              <AnimatePresence>
                {!candlesLit && (
                  <motion.g
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: [0, 0.7, 0], y: -25 }}
                    transition={{ duration: 1.8, ease: "easeOut" }}
                  >
                    <path d="M 93 58 Q 98 48 91 38 Q 96 28 92 18" stroke="#94a3b8" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <path d="M 120 48 Q 126 36 117 26 Q 124 16 119 6" stroke="#94a3b8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <path d="M 147 58 Q 152 48 145 38 Q 150 28 146 18" stroke="#94a3b8" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </motion.g>
                )}
              </AnimatePresence>
            </svg>
          </div>

          {candlesLit && (
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-[#FFDDE7] text-[#343039] rounded-full text-xs font-semibold shadow-xs"
            >
              <span>💨 Tap candles to blow them out</span>
            </motion.div>
          )}
        </div>

        {/* Revealed Blessing Message Card */}
        <AnimatePresence>
          {wishMade && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="mt-8 bg-white rounded-3xl p-6 sm:p-8 border border-pink-200 shadow-xl max-w-lg text-[#343039]"
            >
              <div className="w-12 h-12 rounded-full bg-[#FFDDE7] flex items-center justify-center mx-auto mb-4 text-pink-600">
                <Heart className="w-6 h-6 fill-current" />
              </div>

              <h3 className="font-serif-title text-2xl font-bold mb-3">
                A Birthday Blessing for You ✨
              </h3>

              <div className="space-y-3 text-base sm:text-lg text-slate-700 leading-relaxed mb-6">
                {blownMessages.map((msg, i) => (
                  <p key={i} className={i === blownMessages.length - 1 ? "font-semibold text-[#e11d48]" : ""}>
                    {msg}
                  </p>
                ))}
              </div>

              <button
                onClick={handleRelight}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFF9F3] hover:bg-[#FFE6D5] border border-slate-200 text-[#343039] text-xs font-medium rounded-full transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Light the candles again 🕯️</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
