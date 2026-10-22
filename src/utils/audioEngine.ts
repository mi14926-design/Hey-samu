/**
 * Audio Engine for Birthday Surprise Website
 * Supports both custom MP3 files (/audio/happy-birthday.mp3, etc.)
 * and a high-fidelity Web Audio API acoustic music box / soft piano synthesizer fallback.
 */

export type TrackType = 'happy-birthday' | 'memories' | 'celebration';

interface Note {
  pitch: number; // Hz
  duration: number; // in seconds
  time: number; // offset in seconds
}

// Note frequencies (Hz)
const NOTE_FREQ: Record<string, number> = {
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, B5: 987.77,
  C6: 1046.50, D6: 1174.66, E6: 1318.51, G6: 1567.98
};

class BirthdayAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.65;
  private currentTrack: TrackType | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private loopTimer: number | null = null;
  private activeNodes: (OscillatorNode | GainNode)[] = [];
  private htmlAudio: HTMLAudioElement | null = null;
  private onTrackChangeCallbacks: ((track: TrackType | null, isPlaying: boolean) => void)[] = [];

  constructor() {
    // AudioContext will be initialized on user gesture
  }

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(cb: (track: TrackType | null, isPlaying: boolean) => void) {
    this.onTrackChangeCallbacks.push(cb);
    cb(this.currentTrack, this.isPlaying);
    return () => {
      this.onTrackChangeCallbacks = this.onTrackChangeCallbacks.filter(c => c !== cb);
    };
  }

  private notify() {
    this.onTrackChangeCallbacks.forEach(cb => cb(this.currentTrack, this.isPlaying && !this.isMuted));
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      const targetGain = muted ? 0 : this.volume;
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.05);
    }
    if (this.htmlAudio) {
      this.htmlAudio.muted = muted;
    }
    this.notify();
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentTrack(): TrackType | null {
    return this.currentTrack;
  }

  public playTrack(track: TrackType) {
    this.initContext();
    if (this.currentTrack === track && this.isPlaying) {
      return;
    }

    this.stopCurrent();
    this.currentTrack = track;
    this.isPlaying = true;
    this.notify();

    // Try HTML5 Audio first if file exists
    const audioPath = `/audio/${track === 'happy-birthday' ? 'happy-birthday.mp3' : track === 'memories' ? 'memories.mp3' : 'celebration.mp3'}`;
    const testAudio = new Audio(audioPath);
    testAudio.volume = this.volume;
    testAudio.muted = this.isMuted;
    testAudio.loop = track !== 'celebration';

    const playPromise = testAudio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.htmlAudio = testAudio;
          testAudio.onended = () => {
            if (track === 'celebration') {
              this.playTrack('happy-birthday');
            }
          };
        })
        .catch(() => {
          // If mp3 is not found or fails to load, use our beautiful acoustic Web Audio API synthesizer
          this.playSynthesizedTrack(track);
        });
    } else {
      this.playSynthesizedTrack(track);
    }
  }

  public stopCurrent() {
    if (this.htmlAudio) {
      this.htmlAudio.pause();
      this.htmlAudio.currentTime = 0;
      this.htmlAudio = null;
    }

    if (this.loopTimer) {
      window.clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }

    this.activeNodes.forEach(node => {
      try {
        if ('stop' in node) {
          (node as OscillatorNode).stop();
        }
        node.disconnect();
      } catch {
        // Already stopped
      }
    });
    this.activeNodes = [];
    this.isPlaying = false;
  }

  public pause() {
    if (this.htmlAudio) {
      this.htmlAudio.pause();
    }
    this.stopCurrent();
    this.notify();
  }

  // Synthesizes charming Music Box & Soft Piano tones using Web Audio API
  private playBellNote(ctx: AudioContext, destination: AudioNode, freq: number, startTime: number, duration: number, isBass = false) {
    const osc = ctx.createOscillator();
    const oscHarmonic = ctx.createOscillator();
    const noteGain = ctx.createGain();

    // Warm music box / soft electric piano timbre
    osc.type = isBass ? 'triangle' : 'sine';
    oscHarmonic.type = 'sine';

    osc.frequency.setValueAtTime(freq, startTime);
    oscHarmonic.frequency.setValueAtTime(freq * 2.01, startTime); // Slight harmonic sparkle

    // Envelope: quick gentle attack, mellow chime decay
    const attack = isBass ? 0.04 : 0.015;
    const decay = duration * 1.5;

    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.exponentialRampToValueAtTime(isBass ? 0.35 : 0.28, startTime + attack);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + decay);

    osc.connect(noteGain);
    oscHarmonic.connect(noteGain);
    noteGain.connect(destination);

    osc.start(startTime);
    oscHarmonic.start(startTime);
    osc.stop(startTime + decay);
    oscHarmonic.stop(startTime + decay);

    this.activeNodes.push(osc, oscHarmonic, noteGain);
  }

  private playSynthesizedTrack(track: TrackType) {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;
    const now = ctx.currentTime + 0.05;

    if (track === 'happy-birthday') {
      // "Happy Birthday to You" Melody with Music Box accompaniment
      const bpm = 96;
      const beat = 60 / bpm;

      // Note schedule: [pitchName, lengthInBeats]
      const melody: [string, number][] = [
        ['G4', 0.75], ['G4', 0.25], ['A4', 1.0], ['G4', 1.0], ['C5', 1.0], ['B4', 2.0],
        ['G4', 0.75], ['G4', 0.25], ['A4', 1.0], ['G4', 1.0], ['D5', 1.0], ['C5', 2.0],
        ['G4', 0.75], ['G4', 0.25], ['G5', 1.0], ['E5', 1.0], ['C5', 1.0], ['B4', 1.0], ['A4', 1.5],
        ['F5', 0.75], ['F5', 0.25], ['E5', 1.0], ['C5', 1.0], ['D5', 1.0], ['C5', 2.5]
      ];

      // Bass chords
      const bass: [string, number, number][] = [
        ['C3', 0, 3], ['G3', 3, 3],
        ['G3', 6, 3], ['C3', 9, 3],
        ['C3', 12, 3], ['F3', 15, 3],
        ['C3', 18, 2], ['G3', 20, 1], ['C3', 21, 3]
      ];

      let t = 0;
      melody.forEach(([noteName, beats]) => {
        const freq = NOTE_FREQ[noteName];
        if (freq) {
          this.playBellNote(ctx, this.masterGain!, freq, now + t * beat, beats * beat * 0.95);
        }
        t += beats;
      });

      bass.forEach(([noteName, startBeat, beats]) => {
        const freq = NOTE_FREQ[noteName];
        if (freq) {
          this.playBellNote(ctx, this.masterGain!, freq, now + startBeat * beat, beats * beat * 0.95, true);
        }
      });

      const totalDuration = (t + 1) * beat * 1000;
      this.loopTimer = window.setTimeout(() => {
        if (this.isPlaying && this.currentTrack === 'happy-birthday') {
          this.playSynthesizedTrack('happy-birthday');
        }
      }, totalDuration);
    } else if (track === 'memories') {
      // Gentle, nostalgic acoustic piano pattern (warm soothing arpeggios)
      const bpm = 74;
      const beat = 60 / bpm;
      const arpeggios = [
        ['C4', 'E4', 'G4', 'B4', 'C5', 'G4', 'E4', 'G4'],
        ['A3', 'C4', 'E4', 'A4', 'C5', 'A4', 'E4', 'C4'],
        ['F3', 'A3', 'C4', 'E4', 'A4', 'E4', 'C4', 'A3'],
        ['G3', 'B3', 'D4', 'G4', 'B4', 'G4', 'D4', 'B3']
      ];

      let t = 0;
      arpeggios.forEach((chord) => {
        chord.forEach((noteName) => {
          const freq = NOTE_FREQ[noteName];
          if (freq) {
            this.playBellNote(ctx, this.masterGain!, freq, now + t * beat * 0.5, beat * 1.2);
          }
          t += 0.5;
        });
      });

      const totalDuration = t * beat * 1000;
      this.loopTimer = window.setTimeout(() => {
        if (this.isPlaying && this.currentTrack === 'memories') {
          this.playSynthesizedTrack('memories');
        }
      }, totalDuration);
    } else if (track === 'celebration') {
      // Joyful celebratory fanfare with bright ascending chimes
      const fanfare: [string, number, number][] = [
        ['C5', 0, 0.2], ['E5', 0.15, 0.2], ['G5', 0.3, 0.2], ['C6', 0.45, 0.5],
        ['E5', 0.7, 0.18], ['G5', 0.85, 0.18], ['E6', 1.0, 0.6],
        ['G5', 1.3, 0.15], ['C6', 1.45, 0.15], ['E6', 1.6, 0.15], ['G6', 1.75, 1.2],
        ['C4', 0, 1.2], ['G3', 0.7, 1.0], ['C4', 1.6, 1.5]
      ];

      fanfare.forEach(([noteName, offset, dur]) => {
        const freq = NOTE_FREQ[noteName];
        if (freq) {
          this.playBellNote(ctx, this.masterGain!, freq, now + offset, dur);
        }
      });

      // After fanfare finishes, transition back to joyful Happy Birthday
      window.setTimeout(() => {
        if (this.isPlaying && this.currentTrack === 'celebration') {
          this.playTrack('happy-birthday');
        }
      }, 3200);
    }
  }
}

export const audioEngine = new BirthdayAudioEngine();
