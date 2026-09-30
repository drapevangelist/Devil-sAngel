import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music2, Sparkles, CalendarHeart } from 'lucide-react';
import { romanticAudioEngine, AudioEngineState, TRACK_A } from '../audio/audioEngine';
import { AudioTrackInfo } from '../types';
import { ANNIVERSARY_DATE } from '../data/letterData';

export const GardenHUD: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [activeTrack, setActiveTrack] = useState<AudioTrackInfo>(TRACK_A);
  const [isCrossfading, setIsCrossfading] = useState<boolean>(false);
  const [showCounterDetail, setShowCounterDetail] = useState<boolean>(false);

  // Anniversary Live Counter state
  const [daysElapsed, setDaysElapsed] = useState<number>(1090);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = romanticAudioEngine.subscribe((state: AudioEngineState) => {
      setIsPlaying(state.isPlaying);
      setIsMuted(state.isMuted);
      setActiveTrack(state.activeTrack);
      setIsCrossfading(state.isCrossfading);
    });

    const calculateTime = () => {
      const start = new Date(ANNIVERSARY_DATE).getTime();
      const now = new Date().getTime();
      const diff = now >= start ? now - start : 1000 * 60 * 60 * 24 * 1095;

      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);

      setDaysElapsed(totalDays);
      setHours(hrs);
      setMinutes(mins);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const handleToggleSound = () => {
    romanticAudioEngine.toggleSound();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between p-4 sm:p-6 pointer-events-none">
      
      {/* Quiet live anniversary counter */}
      <div className="relative pointer-events-auto">
        <button
          id="anniversary-counter-btn"
          onClick={() => setShowCounterDetail(!showCounterDetail)}
          className="group flex items-center gap-2 rounded-full border border-[#E8DED2]/80 bg-[#FAF7F2]/90 px-3.5 py-1.5 text-xs font-sans-ui text-[#655E5E] shadow-xs backdrop-blur-xs transition-all duration-300 hover:border-[#8A9A86] hover:text-[#3D3535]"
          title="Click to view anniversary time"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E8B4B8] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#8A9A86]"></span>
          </span>
          <span className="tracking-wide">
            <span className="font-semibold text-[#3D3535]">Day {daysElapsed.toLocaleString()}</span> and counting
          </span>
        </button>

        {showCounterDetail && (
          <div
            id="anniversary-popover"
            className="absolute left-0 top-full mt-2 w-64 rounded-2xl border border-[#E8DED2] bg-[#FCF9F5] p-3.5 text-left shadow-lg backdrop-blur-md z-40 animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-center gap-1.5 text-[10px] font-sans-ui uppercase tracking-wider text-[#8A9A86] font-semibold mb-1">
              <CalendarHeart className="h-3 w-3 text-[#E8B4B8]" />
              <span>Since October 1st, 2023</span>
            </div>
            <p className="font-cormorant text-base text-[#3D3535] italic">
              {daysElapsed} days, {hours}h, {minutes}m accounted for.
            </p>
          </div>
        )}
      </div>

      {/* Top Corner Story-Linked Music Controller (Muted by default, pulsing note invites her) */}
      <div className="relative pointer-events-auto flex items-center gap-2">
        {/* Soft crossfading notification pill */}
        {isCrossfading && (
          <div className="hidden sm:flex items-center gap-1 text-[10px] text-[#8A9A86] font-sans-ui bg-[#FAF7F2]/95 px-2.5 py-1 rounded-full border border-[#D8E2DC] shadow-xs animate-pulse">
            <Sparkles className="h-2.5 w-2.5 text-[#E8B4B8]" />
            <span>Crossfading to {activeTrack.title}...</span>
          </div>
        )}

        {/* Music toggle button */}
        <button
          id="music-toggle-btn"
          onClick={handleToggleSound}
          className={`group flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-sans-ui shadow-xs backdrop-blur-xs transition-all duration-300 ${
            !isMuted && isPlaying
              ? 'border-[#8A9A86] bg-[#FAF7F2]/95 text-[#3D3535]'
              : 'border-[#E8B4B8] bg-[#FAF0EE]/95 text-[#655E5E] animate-pulse hover:bg-[#FAF0EE]'
          }`}
          title={isMuted ? 'Turn sound on for soundtrack' : 'Mute soundtrack'}
        >
          {/* Pulsing Music Note Icon */}
          <span className="relative flex h-3.5 w-3.5 items-center justify-center">
            {isMuted ? (
              <Music2 className="h-3.5 w-3.5 text-[#E8B4B8] animate-bounce" />
            ) : (
              <Music2 className="h-3.5 w-3.5 text-[#8A9A86] animate-spin" style={{ animationDuration: '6s' }} />
            )}
          </span>

          {/* Sound status indicator */}
          <div className="flex items-center gap-1 text-[11px]">
            {isMuted ? (
              <span className="text-[#8A9A86] font-medium">Turn sound on ♪</span>
            ) : (
              <div className="flex items-center gap-1.5">
                <Volume2 className="h-3.5 w-3.5 text-[#8A9A86]" />
                <span className="hidden sm:inline text-[#3D3535] font-medium max-w-[130px] truncate">
                  {activeTrack.title}
                </span>
              </div>
            )}
          </div>
        </button>
      </div>
    </header>
  );
};
