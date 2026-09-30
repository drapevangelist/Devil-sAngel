import { AudioTrackInfo, TrackId } from '../types';
import { TRACK_A_SRC, TRACK_B_SRC } from '../data/letterData';
import { getStoredAudioTrack, saveAudioTrackBlob, removeStoredAudioTrack } from './audioStorage';

export const TRACK_A: AudioTrackInfo = {
  id: 'TRACK_A',
  title: "Can't Help Falling in Love",
  artist: 'Elvis Presley',
  era: '1961 / Nostalgic Classic',
  vibe: 'Warm, acoustic, tender & nostalgic',
  description: 'Plays softly through the Landing Garden, Chapter 1, and Chapter 2.',
  sourceType: 'file',
  fileName: 'cant-help-falling-in-love.mp3',
};

export const TRACK_B: AudioTrackInfo = {
  id: 'TRACK_B',
  title: 'Heaven Baby',
  artist: 'Ayra Starr (feat. ZAYN)',
  era: 'Present Day / Contemporary Afro-Soul',
  vibe: 'Dreamy, rhythmic, intimate & modern',
  description: 'Crossfades in at Chapter 3 ("The Day It Became Official") through Chapter 4 & Closing.',
  sourceType: 'file',
  fileName: 'heavens-baby.mp3',
};

export interface AudioEngineState {
  isPlaying: boolean;
  isMuted: boolean;
  activeTrack: AudioTrackInfo;
  isAutoplayBlocked: boolean;
  isCrossfading: boolean;
  volume: number;
  hasRealFileA: boolean;
  hasRealFileB: boolean;
}

class RomanticAudioEngine {
  // Per specification: muted by default upon entering garden
  private isPlaying: boolean = false;
  private isMuted: boolean = true;
  private activeTrackId: TrackId = 'TRACK_A';
  private isInitialized: boolean = false;
  private isAutoplayBlocked: boolean = false;
  private isCrossfading: boolean = false;
  private targetVolume: number = 0.7;
  private currentVolume: number = 0;

  private audioA: HTMLAudioElement | null = null;
  private audioB: HTMLAudioElement | null = null;
  private hasRealFileA: boolean = true;
  private hasRealFileB: boolean = true;

  private crossfadeTimer: number | null = null;
  private fadeInTimer: number | null = null;

  private listeners: Set<(state: AudioEngineState) => void> = new Set();

  public subscribe(listener: (state: AudioEngineState) => void) {
    this.listeners.add(listener);
    this.notify();
    return () => this.listeners.delete(listener);
  }

  private notify() {
    const currentTrack = this.activeTrackId === 'TRACK_A' ? { ...TRACK_A } : { ...TRACK_B };

    const state: AudioEngineState = {
      isPlaying: this.isPlaying && !this.isMuted,
      isMuted: this.isMuted,
      activeTrack: currentTrack,
      isAutoplayBlocked: this.isAutoplayBlocked,
      isCrossfading: this.isCrossfading,
      volume: this.targetVolume,
      hasRealFileA: this.hasRealFileA,
      hasRealFileB: this.hasRealFileB,
    };

    this.listeners.forEach((fn) => fn(state));
  }

  public async init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    if (typeof window !== 'undefined') {
      this.setupAudioElements();
      await this.checkStoredTracks();
    }

    this.notify();
  }

  private setupAudioElements() {
    // 1. Setup Track A: Elvis Presley - Can't Help Falling in Love
    this.audioA = new Audio();
    this.audioA.loop = true;
    this.audioA.preload = 'auto';
    this.audioA.volume = 0;
    this.audioA.src = TRACK_A_SRC;

    this.audioA.addEventListener('canplay', () => {
      this.hasRealFileA = true;
      this.notify();
    });

    // 2. Setup Track B: Ayra Starr ft. Zayn - Heaven Baby
    this.audioB = new Audio();
    this.audioB.loop = true;
    this.audioB.preload = 'auto';
    this.audioB.volume = 0;
    this.audioB.src = TRACK_B_SRC;

    this.audioB.addEventListener('canplay', () => {
      this.hasRealFileB = true;
      this.notify();
    });
  }

  private async checkStoredTracks() {
    try {
      const storedA = await getStoredAudioTrack('TRACK_A');
      if (storedA && storedA.blob && this.audioA) {
        this.audioA.src = URL.createObjectURL(storedA.blob);
      }
    } catch {
      // fallback to default
    }

    try {
      const storedB = await getStoredAudioTrack('TRACK_B');
      if (storedB && storedB.blob && this.audioB) {
        this.audioB.src = URL.createObjectURL(storedB.blob);
      }
    } catch {
      // fallback to default
    }

    this.notify();
  }

  private async playElement(el: HTMLAudioElement | null) {
    if (!el) return;
    try {
      const playPromise = el.play();
      if (playPromise !== undefined) {
        await playPromise;
        this.isAutoplayBlocked = false;
      }
    } catch (err: unknown) {
      const error = err as { name?: string };
      if (error && error.name === 'NotAllowedError') {
        this.isAutoplayBlocked = true;
      }
    }
    this.notify();
  }

  /**
   * Toggles sound on or off. When turning on, fades in softly.
   */
  public async toggleSound() {
    if (!this.isInitialized) {
      await this.init();
    }

    if (this.isMuted) {
      // Unmute and fade in
      this.isMuted = false;
      this.isPlaying = true;
      this.isAutoplayBlocked = false;

      const activeEl = this.activeTrackId === 'TRACK_A' ? this.audioA : this.audioB;
      const inactiveEl = this.activeTrackId === 'TRACK_A' ? this.audioB : this.audioA;

      if (inactiveEl) {
        inactiveEl.pause();
        inactiveEl.volume = 0;
      }

      if (activeEl) {
        activeEl.volume = 0;
        await this.playElement(activeEl);

        // Soft fade in over 800ms
        let step = 0;
        const totalSteps = 16;
        if (this.fadeInTimer) clearInterval(this.fadeInTimer);
        this.fadeInTimer = window.setInterval(() => {
          step++;
          if (activeEl) {
            activeEl.volume = Math.min(this.targetVolume, (step / totalSteps) * this.targetVolume);
          }
          if (step >= totalSteps) {
            if (this.fadeInTimer) clearInterval(this.fadeInTimer);
            this.fadeInTimer = null;
          }
        }, 50);
      }
    } else {
      // Mute softly
      this.isMuted = true;
      this.isPlaying = false;
      if (this.audioA) {
        this.audioA.pause();
        this.audioA.volume = 0;
      }
      if (this.audioB) {
        this.audioB.pause();
        this.audioB.volume = 0;
      }
    }

    this.notify();
  }

  /**
   * Smoothly crossfades between TRACK_A and TRACK_B over 1.8 seconds.
   * State (muted or unmuted) persists.
   */
  public setTrack(trackId: TrackId) {
    if (this.activeTrackId === trackId) return;
    this.activeTrackId = trackId;

    if (!this.isInitialized) {
      this.init();
    }

    const incomingIsB = trackId === 'TRACK_B';
    const targetAudio = incomingIsB ? this.audioB : this.audioA;
    const outgoingAudio = incomingIsB ? this.audioA : this.audioB;

    if (!targetAudio || !outgoingAudio) {
      this.notify();
      return;
    }

    if (this.isMuted) {
      // If currently muted, just switch the active track silently
      targetAudio.pause();
      targetAudio.volume = 0;
      outgoingAudio.pause();
      outgoingAudio.volume = 0;
      this.notify();
      return;
    }

    // Active crossfade over 1800ms
    if (this.crossfadeTimer) {
      clearInterval(this.crossfadeTimer);
      this.crossfadeTimer = null;
    }

    this.isCrossfading = true;
    targetAudio.volume = 0;
    this.playElement(targetAudio);

    const duration = 1800;
    const steps = 30;
    const stepTime = duration / steps;
    let currentStep = 0;

    this.crossfadeTimer = window.setInterval(() => {
      currentStep++;
      const progress = currentStep / steps; // 0 to 1

      if (outgoingAudio) {
        outgoingAudio.volume = Math.max(0, (1 - progress) * this.targetVolume);
      }
      if (targetAudio) {
        targetAudio.volume = Math.min(this.targetVolume, progress * this.targetVolume);
      }

      if (currentStep >= steps) {
        if (this.crossfadeTimer) {
          clearInterval(this.crossfadeTimer);
          this.crossfadeTimer = null;
        }
        this.isCrossfading = false;
        outgoingAudio.pause();
        outgoingAudio.volume = 0;
        targetAudio.volume = this.targetVolume;
        this.notify();
      }
    }, stepTime);

    this.notify();
  }

  public getActiveTrackId(): TrackId {
    return this.activeTrackId;
  }
}

export const romanticAudioEngine = new RomanticAudioEngine();
