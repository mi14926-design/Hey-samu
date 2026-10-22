import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, RotateCcw } from 'lucide-react';

interface FinalWishProps {
  friendName: string;
  onRestart: () => void;
}

export const FinalWish: React.FC<FinalWishProps> = ({
  friendName,
  onRestart
}) => {
  return (
    <section className="py-28 px-4 sm:px-6 relative text-center overflow-hidden bg-gradient-to-b from-transparent via-[#FFF9F3] to-[#FFDDE7]/30">
      {/* Soft floating stars in background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-amber-300/40"
            style={{
              top: `${10 + (i * 8)}%`,
              left: `${8 + ((i * 19) % 84)}%`
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/80">
        {/* Paced Reveal Messages */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-2 mb-8 text-lg sm:text-xl text-[#343039]/70 font-normal"
        >
          <p>Another birthday...</p>
          <p>Another chapter...</p>
          <p>Another year of memories waiting to happen.</p>
        </motion.div>

        {/* Highlight Sentence */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          <p className="text-2xl sm:text-3xl lg:text-4xl font-serif-title font-bold text-[#343039] leading-snug">
            "Whatever life brings, I hope it brings you happiness."
          </p>
        </motion.div>

        {/* Final Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-10"
        >
          <h3 className="font-handwriting text-4xl sm:text-5xl text-[#e11d48] font-bold mb-3">
            Happy Birthday, {friendName}. ❤️
          </h3>
          <p className="text-sm sm:text-base text-slate-500">
            Thank you for being part of some of my favorite memories.
          </p>
        </motion.div>

        {/* Relive Journey Button */}
        <motion.button
          onClick={onRestart}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-[#343039] font-medium text-sm sm:text-base rounded-full shadow-md border border-[#FFDDE7] hover:shadow-lg hover:border-pink-300 transition-all cursor-pointer min-h-[44px]"
        >
          <RotateCcw className="w-4 h-4 text-pink-500" />
          <span>Relive Our Little Journey ↺</span>
        </motion.button>
      </div>
    </section>
  );
};
