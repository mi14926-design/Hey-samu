import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Heart, Gift, MessageSquare, Mail, X, Sparkles } from 'lucide-react';
import { SurpriseEasterEgg } from '../config/birthdayData';

interface HiddenSurprisesProps {
  surprises: SurpriseEasterEgg[];
}

export const HiddenSurprises: React.FC<HiddenSurprisesProps> = ({ surprises }) => {
  const [activeSurprise, setActiveSurprise] = useState<SurpriseEasterEgg | null>(null);

  const getSurpriseIcon = (type: string) => {
    switch (type) {
      case 'star':
        return <Star className="w-5 h-5 text-amber-500 fill-amber-300" />;
      case 'heart':
        return <Heart className="w-5 h-5 text-rose-500 fill-rose-300" />;
      case 'gift':
        return <Gift className="w-5 h-5 text-indigo-500" />;
      case 'balloon':
        return <span className="text-xl">🎈</span>;
      case 'envelope':
        return <Mail className="w-5 h-5 text-pink-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <>
      {/* Floating Easter Egg Icons scattered along margins */}
      <div className="fixed inset-y-0 left-2 sm:left-4 z-30 pointer-events-none flex flex-col justify-around py-24">
        {surprises.slice(0, 3).map((item, idx) => (
          <motion.button
            key={item.id}
            onClick={() => setActiveSurprise(item)}
            className="pointer-events-auto w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md border border-[#FFDDE7] flex items-center justify-center transition-all hover:scale-115 active:scale-95 cursor-pointer backdrop-blur-xs"
            title="Tap for a hidden surprise!"
            animate={{
              y: [0, -6, 0],
              rotate: [0, idx % 2 === 0 ? 8 : -8, 0]
            }}
            transition={{
              duration: 3 + idx,
              repeat: Infinity,
              ease: "easeInOut",
              delay: idx * 0.7
            }}
          >
            {getSurpriseIcon(item.type)}
          </motion.button>
        ))}
      </div>

      <div className="fixed inset-y-0 right-2 sm:right-4 z-30 pointer-events-none flex flex-col justify-around py-32">
        {surprises.slice(3).map((item, idx) => (
          <motion.button
            key={item.id}
            onClick={() => setActiveSurprise(item)}
            className="pointer-events-auto w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md border border-[#FFDDE7] flex items-center justify-center transition-all hover:scale-115 active:scale-95 cursor-pointer backdrop-blur-xs"
            title="Tap for a hidden surprise!"
            animate={{
              y: [0, -8, 0],
              rotate: [0, idx % 2 === 0 ? -10 : 10, 0]
            }}
            transition={{
              duration: 3.5 + idx,
              repeat: Infinity,
              ease: "easeInOut",
              delay: idx * 0.9
            }}
          >
            {getSurpriseIcon(item.type)}
          </motion.button>
        ))}
      </div>

      {/* Easter Egg Modal */}
      <AnimatePresence>
        {activeSurprise && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              className="relative max-w-sm w-full bg-white rounded-3xl p-6 shadow-2xl border border-[#FFDDE7] text-center text-[#343039]"
            >
              <button
                onClick={() => setActiveSurprise(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-full bg-[#FFF9F3] border border-[#FFE6D5] flex items-center justify-center mx-auto mb-4 text-3xl shadow-inner">
                {activeSurprise.emoji}
              </div>

              <h4 className="font-serif-title text-xl font-bold mb-2">
                {activeSurprise.title}
              </h4>

              <p className="text-base text-slate-600 leading-relaxed mb-5">
                {activeSurprise.message}
              </p>

              <button
                onClick={() => setActiveSurprise(null)}
                className="w-full py-2.5 px-4 bg-[#343039] text-[#FFF9F3] text-xs font-semibold rounded-xl hover:bg-black transition-colors cursor-pointer"
              >
                Sweet! Keep Exploring ✨
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
