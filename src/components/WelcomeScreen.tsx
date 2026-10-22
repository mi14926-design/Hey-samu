import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface WelcomeScreenProps {
  friendName: string;
  birthdayDate: string;
  onOpenSurprise: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  friendName,
  birthdayDate,
  onOpenSurprise
}) => {
  const [step, setStep] = useState<number>(0);
  const [isOpening, setIsOpening] = useState<boolean>(false);

  useEffect(() => {
    // Step 0: "Hey, Moti! 👀❤️"
    const timer1 = setTimeout(() => {
      setStep(1); // "Someone really special was born on October 23..."
    }, 1400);

    const timer2 = setTimeout(() => {
      setStep(2); // "And I made something just for you. 🎁"
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleOpenClick = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Fire sound & music!
    audioEngine.playTrack('happy-birthday');

    // Confetti burst from center and sides
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFDDE7', '#FFE6D5', '#E9DFFF', '#f472b6', '#fbbf24', '#ffffff']
    });

    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFDDE7', '#E9DFFF', '#fb7185']
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFE6D5', '#FFDDE7', '#a855f7']
      });
    }, 250);

    // Transition smoothly after animation completes
    setTimeout(() => {
      onOpenSurprise();
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 sm:px-6 select-none overflow-hidden">
      {/* High-visibility crisp photo background */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <img
          src="/assets/aistudio/IMG-20251020-WA0246_389f9e48.jpg"
          alt="Birthday Friend"
          className="w-full h-full object-cover object-[center_20%] sm:object-center transition-transform duration-1000 scale-100"
        />
        {/* Soft atmospheric darkening vignette for readability without washing out */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
      </div>

      {/* Floating subtle sparkles in background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200/50"
            style={{
              top: `${15 + (i * 11)}%`,
              left: `${10 + ((i * 17) % 80)}%`
            }}
            animate={{
              y: [0, -12, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.9, 1.1, 0.9]
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4
            }}
          >
            <Sparkles className="w-5 h-5" />
          </motion.div>
        ))}
      </div>

      {/* Frosted Glass Container for Content */}
      <div className="relative w-full max-w-md mx-auto text-center flex flex-col items-center bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/70">
        {/* Step 0: Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-2"
        >
          <span className="font-handwriting text-3xl sm:text-4xl text-[#343039] font-bold tracking-wide">
            Hey,Samu Moti! 👀❤️
          </span>
        </motion.div>

        {/* Step 1: Special reveal */}
        <div className="min-h-[56px] flex items-center justify-center mb-6">
          <AnimatePresence mode="wait">
            {step >= 1 && (
              <motion.p
                key="step1"
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-lg sm:text-xl text-[#343039]/80 font-normal leading-relaxed"
              >
                Someone really special was born on{' '}
                <span className="font-semibold text-[#e11d48] border-b-2 border-[#FFDDE7]">
                  {birthdayDate}
                </span>
                ...
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Step 2: Gift box and surprise teaser */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, type: 'spring', damping: 20 }}
              className="flex flex-col items-center w-full"
            >
              <p className="font-serif-title text-xl sm:text-2xl text-[#343039] font-medium mb-8">
                And I made something just for you. 🎁
              </p>

              {/* Animated Gift Box Container */}
              <div className="relative my-4 cursor-pointer group" onClick={handleOpenClick}>
                {/* Glowing aura */}
                <motion.div
                  className="absolute inset-0 bg-[#FFDDE7] rounded-3xl blur-xl"
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.5, 0.85, 0.5]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Gift Box Graphic */}
                <motion.div
                  animate={isOpening ? { scale: 1.25, rotate: -3 } : { y: [0, -6, 0] }}
                  transition={isOpening ? { duration: 0.4 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-40 h-40 flex items-center justify-center"
                >
                  {/* Gift Box Body */}
                  <div className="relative w-32 h-32 bg-gradient-to-br from-[#FFE6D5] to-[#FFDDE7] rounded-2xl shadow-xl border border-white/60 flex items-center justify-center overflow-hidden">
                    {/* Ribbon Vertical */}
                    <div className="absolute top-0 bottom-0 w-6 bg-[#f472b6] shadow-sm" />
                    {/* Ribbon Horizontal */}
                    <div className="absolute left-0 right-0 h-6 bg-[#f472b6] shadow-sm" />

                    {/* Shimmer overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent" />
                  </div>

                  {/* Gift Box Lid & Bow */}
                  <motion.div
                    className="absolute -top-3 w-36 h-10 bg-gradient-to-r from-[#ffd3df] to-[#ffe2d1] rounded-lg shadow-md border border-white/80 flex items-center justify-center z-10"
                    animate={
                      isOpening
                        ? { y: -70, x: -30, rotate: -25, opacity: 0 }
                        : { y: [0, -2, 0] }
                    }
                    transition={isOpening ? { duration: 0.6, ease: "easeOut" } : { duration: 2.5, repeat: Infinity }}
                  >
                    {/* Bow ribbon */}
                    <div className="absolute -top-4 flex items-center justify-center gap-0.5">
                      <div className="w-6 h-6 border-4 border-[#f472b6] rounded-full rotate-45 -mr-1 shadow-sm" />
                      <div className="w-6 h-6 border-4 border-[#f472b6] rounded-full -rotate-45 -ml-1 shadow-sm" />
                    </div>
                  </motion.div>

                  {/* Confetti particles shooting out on click */}
                  {isOpening && (
                    <motion.div
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 2.5, opacity: 0 }}
                      transition={{ duration: 0.7 }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <Heart className="w-10 h-10 text-rose-500 fill-rose-400" />
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Action Button */}
              <motion.button
                onClick={handleOpenClick}
                disabled={isOpening}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="mt-6 px-8 py-4 bg-[#343039] text-[#FFF9F3] text-base sm:text-lg font-medium rounded-full shadow-lg hover:bg-black transition-all duration-200 flex items-center gap-3 cursor-pointer group min-h-[48px]"
              >
                <span>{isOpening ? "Opening surprise..." : "Open Your Surprise 🎀"}</span>
                <Sparkles className="w-5 h-5 text-[#FFDDE7] group-hover:rotate-12 transition-transform" />
              </motion.button>

              <p className="mt-3 text-xs text-[#343039]/50 font-light">
                Tap anywhere on the gift to unwrap
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
