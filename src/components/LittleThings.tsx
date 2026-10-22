import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageCircle, Smile, Heart, Coffee, Gift, ChevronDown, CheckCircle2 } from 'lucide-react';
import { LittleThingItem } from '../config/birthdayData';

interface LittleThingsProps {
  items: LittleThingItem[];
}

export const LittleThings: React.FC<LittleThingsProps> = ({ items }) => {
  const [openedId, setOpenedId] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 'MessageCircle':
        return <MessageCircle className="w-5 h-5 text-pink-500" />;
      case 'Smile':
        return <Smile className="w-5 h-5 text-purple-500" />;
      case 'Heart':
        return <Heart className="w-5 h-5 text-rose-500 fill-rose-100" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-amber-600" />;
      case 'Gift':
        return <Gift className="w-5 h-5 text-indigo-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-pink-500" />;
    }
  };

  const toggleCard = (id: string) => {
    setOpenedId(openedId === id ? null : id);
  };

  return (
    <section className="py-18 px-4 sm:px-6 relative bg-gradient-to-b from-transparent via-[#FFDDE7]/15 to-transparent">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 max-w-xl mx-auto shadow-xl border border-white/80">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E9DFFF] rounded-full text-xs font-medium text-[#343039]/70 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            <span>Cherished Details</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-title font-bold text-[#343039] tracking-tight mb-2">
            The Little Things I Still Remember ✨
          </h2>
          <p className="text-sm sm:text-base text-[#343039]/70 max-w-lg mx-auto">
            Tap each note to unfold a quiet memory that still makes me smile.
          </p>
        </div>

        {/* 6 Interactive Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, index) => {
            const isOpen = openedId === item.id;

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onClick={() => toggleCard(item.id)}
                className={`relative rounded-2xl p-5 border transition-all duration-300 cursor-pointer select-none ${
                  isOpen
                    ? 'bg-white shadow-lg border-pink-200 ring-2 ring-pink-100'
                    : 'bg-white/80 hover:bg-white shadow-xs hover:shadow-md border-slate-200/70'
                }`}
              >
                {/* Card Top Row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF9F3] border border-slate-100 flex items-center justify-center shrink-0 shadow-xs">
                    {getIcon(item.icon)}
                  </div>
                  <span className="text-[11px] font-medium text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full">
                    {item.tagline}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="font-serif-title text-lg font-bold text-[#343039] leading-snug mb-2">
                  {item.title}
                </h3>

                {/* Card Body - Expands on tap */}
                <AnimatePresence>
                  {isOpen ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-100 mt-2">
                        {item.body}
                      </p>
                      <div className="mt-3 flex items-center gap-1.5 text-xs text-rose-500 font-medium font-handwriting text-lg">
                        <Heart className="w-3.5 h-3.5 fill-rose-400" />
                        <span>I haven't forgotten.</span>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex items-center gap-1 text-xs text-slate-400 pt-1 group">
                      <span>Tap to read note</span>
                      <ChevronDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Playful Bestie Dramatic Meme Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 max-w-md mx-auto bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 shadow-2xl border border-rose-200/90 text-center relative overflow-hidden"
        >
          {/* Header pill */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#FFF9F3] border border-amber-200 rounded-full text-xs font-semibold text-amber-800 mb-4 shadow-xs">
            <span>😂 The Dramatic Bestie Truth</span>
          </div>

          {/* Framed meme image with warm aesthetic */}
          <div className="relative mx-auto max-w-[280px] sm:max-w-[300px] rounded-2xl overflow-hidden shadow-lg border-4 border-amber-100 bg-[#fff9db] p-2 hover:scale-102 transition-transform duration-300">
            <img
              src="/assets/aistudio/image_1cc02034.png"
              alt="Meriiiiii BeStiiiii Koo Meriiiiii Yaad Bhiii Nhiiiii Aatiiiii"
              className="w-full h-auto object-contain rounded-xl"
            />
          </div>

          {/* Caption */}
          <h4 className="mt-4 font-handwriting text-2xl sm:text-3xl text-[#343039] font-medium leading-snug">
            "Me every single time we haven't talked in a while... 👉👈🥺"
          </h4>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xs mx-auto">
            A little bit dramatic? Maybe. But no matter how quiet life gets, you are always remembered and cherished!
          </p>
        </motion.div>
      </div>
    </section>
  );
};
