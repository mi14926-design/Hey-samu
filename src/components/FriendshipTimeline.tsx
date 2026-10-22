import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, HeartHandshake, Laugh, Sun, Sparkles, Clock, Heart, ZoomIn, X, Calendar, MessageCircle } from 'lucide-react';
import { TimelineMilestone } from '../config/birthdayData';

interface FriendshipTimelineProps {
  milestones: TimelineMilestone[];
}

export const FriendshipTimeline: React.FC<FriendshipTimelineProps> = ({ milestones }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<{
    url: string;
    title: string;
    date: string;
    subtitle: string;
  } | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'MessageCircle':
        return <MessageCircle className="w-5 h-5 text-sky-500" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-indigo-500" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-pink-500" />;
      case 'Laugh':
        return <Laugh className="w-5 h-5 text-amber-500" />;
      case 'Sun':
        return <Sun className="w-5 h-5 text-orange-500" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-rose-500" />;
      default:
        return <Clock className="w-5 h-5 text-purple-500" />;
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 max-w-xl mx-auto shadow-xl border border-white/80">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#FFDDE7] rounded-full text-xs font-medium text-[#343039]/70 mb-3">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-100" />
            <span>Our Chapters</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-title font-bold text-[#343039] tracking-tight mb-2">
            A Little Journey Through Our Friendship ❤️
          </h2>
          <p className="text-sm sm:text-base text-[#343039]/70 max-w-lg mx-auto">
            From the very first conversation to this special day.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-[#FFDDE7] space-y-12 ml-4 sm:ml-8">
          {milestones.map((milestone, index) => {
            return (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Timeline Node Dot */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-10 h-10 rounded-full bg-white border-2 border-[#FFDDE7] shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getIcon(milestone.iconName)}
                </div>

                {/* Milestone Content Card */}
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-md hover:shadow-lg transition-shadow">
                  {/* Top metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold text-rose-500 tracking-wide uppercase flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {milestone.date}
                    </span>
                    <span className="text-[11px] font-medium text-slate-600 bg-[#FFF9F3] px-2.5 py-0.5 rounded-full border border-[#FFE6D5]">
                      {milestone.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-serif-title font-bold text-[#343039] mb-1">
                    {milestone.title}
                  </h3>

                  {/* Subtitle / Quote */}
                  <p className="font-handwriting text-xl sm:text-2xl text-slate-700 leading-snug mb-3">
                    "{milestone.subtitle}"
                  </p>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {milestone.description}
                  </p>

                  {/* Beautiful Framed Photo Sizing (Portrait 3:4 / 4:5 Frame) */}
                  {milestone.photoUrl && (
                    <div className="mt-5 flex justify-center">
                      <div
                        onClick={() =>
                          setSelectedPhoto({
                            url: milestone.photoUrl!,
                            title: milestone.title,
                            date: milestone.date,
                            subtitle: milestone.subtitle,
                          })
                        }
                        className="relative bg-white p-3 sm:p-4 pb-4 sm:pb-5 rounded-2xl shadow-md hover:shadow-2xl border border-rose-100/90 transition-all duration-300 max-w-[340px] sm:max-w-[380px] w-full group/frame cursor-pointer"
                      >
                        {/* Washi Tape Accent */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 washi-tape -rotate-1 rounded-xs pointer-events-none z-10 opacity-85" />

                        {/* Photo Matting Frame */}
                        <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-stone-100 shadow-inner group/photo">
                          <img
                            src={milestone.photoUrl}
                            alt={milestone.title}
                            className="w-full h-full object-cover object-[center_top] group-hover/frame:scale-104 transition-transform duration-700"
                            loading="lazy"
                          />

                          {/* Hover Zoom Prompt */}
                          <div className="absolute inset-0 bg-black/0 group-hover/frame:bg-black/20 transition-colors flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-rose-500 opacity-0 group-hover/frame:opacity-100 transition-all scale-75 group-hover/frame:scale-100 shadow-lg">
                              <ZoomIn className="w-5 h-5" />
                            </div>
                          </div>
                        </div>

                        {/* Frame Bottom Tag */}
                        <div className="mt-3 px-1 flex items-center justify-between text-xs">
                          <span className="font-handwriting text-lg sm:text-xl text-[#343039]">
                            {milestone.tag}
                          </span>
                          <span className="text-[11px] font-semibold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                            {milestone.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Timeline Photo Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 max-h-[92vh] flex flex-col"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-slate-800 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo Display - Full Uncropped View */}
              <div className="w-full flex-1 min-h-[300px] max-h-[62vh] bg-stone-900/10 rounded-2xl overflow-hidden flex items-center justify-center shadow-inner relative">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="max-h-[62vh] w-auto max-w-full object-contain rounded-xl shadow-md"
                />
              </div>

              {/* Caption */}
              <div className="pt-4 px-1">
                <div className="flex items-center justify-between text-xs text-rose-500 font-semibold mb-1">
                  <span>{selectedPhoto.date}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif-title font-bold text-[#343039]">
                  {selectedPhoto.title}
                </h3>
                <p className="font-handwriting text-2xl text-slate-700 leading-snug mt-1">
                  "{selectedPhoto.subtitle}"
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
