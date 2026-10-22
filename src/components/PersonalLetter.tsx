import React from 'react';
import { motion } from 'motion/react';
import { Mail, Heart } from 'lucide-react';

interface PersonalLetterProps {
  paragraphs: string[];
  closingQuote: string;
}

export const PersonalLetter: React.FC<PersonalLetterProps> = ({
  paragraphs,
  closingQuote
}) => {
  return (
    <section className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#FFDDE7] rounded-full text-xs font-medium text-[#343039]/70 mb-3">
            <Mail className="w-3.5 h-3.5 text-rose-500" />
            <span>From the Heart</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-[#343039] tracking-tight mb-2">
            Can I Tell You Something?
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            A quiet thought for your special day.
          </p>
        </div>

        {/* Parchment Letter Container */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-[#FFFDF9] rounded-3xl p-7 sm:p-12 shadow-xl border border-[#FFE6D5] overflow-hidden"
          style={{
            backgroundImage: `radial-gradient(#FFE6D5 0.75px, transparent 0.75px)`,
            backgroundSize: '20px 20px'
          }}
        >
          {/* Subtle wax seal stamp in top corner */}
          <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 shadow-md border-2 border-white/60 flex items-center justify-center text-white/90 transform rotate-12">
            <Heart className="w-6 h-6 fill-current text-white" />
          </div>

          {/* Letter Content */}
          <div className="space-y-4 text-[#343039] font-normal leading-relaxed text-base sm:text-lg">
            {paragraphs.map((para, i) => {
              const isGreeting = i === 0;
              const isEnding = i === paragraphs.length - 1;

              if (isGreeting) {
                return (
                  <p key={i} className="font-serif-title text-2xl font-bold text-[#343039] mb-4">
                    {para}
                  </p>
                );
              }

              if (isEnding) {
                return (
                  <p
                    key={i}
                    className="font-handwriting text-3xl sm:text-4xl font-medium text-[#e11d48] pt-4 leading-normal"
                  >
                    {para}
                  </p>
                );
              }

              return (
                <p key={i} className="text-[#343039]/85">
                  {para}
                </p>
              );
            })}
          </div>

          {/* Warm divider & closing note */}
          <div className="mt-10 pt-6 border-t border-[#FFDDE7]/80 text-center">
            <p className="font-handwriting text-2xl sm:text-3xl text-slate-700 italic">
              "{closingQuote}"
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
