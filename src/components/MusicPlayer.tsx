import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Music, Disc, Sparkles, ChevronUp, ChevronDown, Check, Info } from 'lucide-react';
import { audioEngine, TrackType } from '../utils/audioEngine';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<TrackType | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = audioEngine.subscribe((track, playing) => {
      setCurrentTrack(track);
      setIsPlaying(playing);
      setIsMuted(audioEngine.getIsMuted());
    });
    return () => unsubscribe();
  }, []);

  const handleToggleMute = () => {
    const nextMuted = audioEngine.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleTrackChange = (track: TrackType) => {
    audioEngine.playTrack(track);
  };

  const getTrackTitle = (track: TrackType | null) => {
    switch (track) {
      case 'happy-birthday':
        return 'Happy Birthday 🎂';
      case 'memories':
        return 'Nostalgic Memories 🎹';
      case 'celebration':
        return 'Birthday Celebration 🎉';
      default:
        return 'Birthday Soundtrack 🎵';
    }
  };

  return (
    <>
      {/* Floating Music Control in Bottom-Right Corner */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end">
        {/* Expanded Track Selection Panel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="mb-2 w-72 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#FFDDE7] p-4 text-[#343039]"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <div className="flex items-center gap-2">
                  <Music className="w-4 h-4 text-pink-500" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Birthday Soundtracks
                  </span>
                </div>
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-md transition-colors"
                  title="Audio info"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Audio explanation / custom MP3 note */}
              {showInfo && (
                <div className="mb-3 p-2.5 bg-[#FFF9F3] border border-[#FFE6D5] rounded-xl text-xs text-slate-600 leading-relaxed">
                  <p className="font-medium text-[#343039] mb-1">🎵 Interactive Audio Engine</p>
                  <p className="mb-1">
                    Playing acoustic music box and soft piano chimes.
                  </p>
                  <p className="text-[11px] text-slate-500">
                    You can also put custom MP3 files in <code className="bg-white px-1 py-0.5 rounded text-pink-600 font-mono">public/audio/</code> (happy-birthday.mp3, memories.mp3, celebration.mp3).
                  </p>
                </div>
              )}

              {/* Track Options */}
              <div className="space-y-1.5">
                <button
                  onClick={() => handleTrackChange('happy-birthday')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    currentTrack === 'happy-birthday'
                      ? 'bg-[#FFDDE7] text-[#343039]'
                      : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>🎂</span>
                    <span>Happy Birthday to You</span>
                  </span>
                  {currentTrack === 'happy-birthday' && <Check className="w-3.5 h-3.5 text-pink-600" />}
                </button>

                <button
                  onClick={() => handleTrackChange('memories')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    currentTrack === 'memories'
                      ? 'bg-[#E9DFFF] text-[#343039]'
                      : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>🎹</span>
                    <span>Gentle Memories Piano</span>
                  </span>
                  {currentTrack === 'memories' && <Check className="w-3.5 h-3.5 text-purple-600" />}
                </button>

                <button
                  onClick={() => handleTrackChange('celebration')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    currentTrack === 'celebration'
                      ? 'bg-[#FFE6D5] text-[#343039]'
                      : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>🎉</span>
                    <span>Celebration Fanfare</span>
                  </span>
                  {currentTrack === 'celebration' && <Check className="w-3.5 h-3.5 text-amber-600" />}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Pill / Button */}
        <div className="flex items-center gap-1.5 p-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-[#FFDDE7]/80">
          {/* Vinyl spin indicator */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 pl-2 pr-1 py-1 hover:bg-[#FFF9F3] rounded-full transition-colors cursor-pointer"
            title="Choose soundtrack"
          >
            <motion.div
              animate={isPlaying && !isMuted ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="w-7 h-7 rounded-full bg-gradient-to-tr from-pink-400 to-purple-400 flex items-center justify-center text-white shadow-xs"
            >
              <Disc className="w-4 h-4" />
            </motion.div>
            <div className="text-left hidden sm:block max-w-[120px] truncate">
              <span className="text-[11px] font-semibold text-[#343039] block truncate">
                {getTrackTitle(currentTrack)}
              </span>
              <span className="text-[9px] text-slate-500 block">
                {isPlaying && !isMuted ? 'Playing' : 'Muted'}
              </span>
            </div>
            {isExpanded ? (
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>

          {/* Mute/Unmute Toggle */}
          <button
            onClick={handleToggleMute}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-all cursor-pointer ${
              isMuted
                ? 'bg-slate-100 text-slate-400 hover:text-slate-600'
                : 'bg-[#FFDDE7] text-[#343039] hover:bg-[#fca5c5]'
            }`}
            title={isMuted ? "Unmute music" : "Mute music"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-pink-600" />}
          </button>
        </div>
      </div>
    </>
  );
};
