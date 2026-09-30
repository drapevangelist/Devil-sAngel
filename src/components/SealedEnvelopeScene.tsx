import React, { useState } from 'react';
import { COVER_DATA } from '../data/letterData';

interface SealedEnvelopeSceneProps {
  onEnvelopeOpened: () => void;
}

type SealPhase = 'idle' | 'cracking' | 'opening_flap' | 'light_expanding' | 'done';

export const SealedEnvelopeScene: React.FC<SealedEnvelopeSceneProps> = ({ onEnvelopeOpened }) => {
  const [phase, setPhase] = useState<SealPhase>('idle');

  const handleSealClick = () => {
    if (phase !== 'idle') return;

    // Phase 1: Seal cracks and rolls away (0.8s)
    setPhase('cracking');

    setTimeout(() => {
      // Phase 2: Flap opens upward (0.6s), revealing white light underneath
      setPhase('opening_flap');
    }, 750);

    setTimeout(() => {
      // Phase 3: Light expands to fill screen (1s crossfade)
      setPhase('light_expanding');
    }, 1300);

    setTimeout(() => {
      setPhase('done');
      onEnvelopeOpened();
    }, 2250);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F9EDE8] via-[#FAF7F2] to-[#F2E8E4] px-4 select-none">
      {/* Soft blurred ambient glow circles */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#E8B4B8]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-[#D8E2DC]/30 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#FAF0EE]/50 blur-2xl pointer-events-none" />

      {/* Main Envelope Card */}
      <div
        className={`relative z-10 w-full max-w-lg transition-all duration-700 ${
          phase === 'idle' ? 'animate-envelope-breathe' : ''
        } ${phase === 'light_expanding' || phase === 'done' ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'}`}
        style={{ perspective: '1200px' }}
      >
        {/* Parchment envelope body */}
        <div className="relative mx-auto w-full aspect-[16/11] rounded-2xl bg-[#FAF5EE] border border-[#E8DED2] shadow-[0_20px_50px_rgba(61,53,53,0.08)] overflow-visible">
          
          {/* Subtle interior letter peek / folded envelope lines */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            {/* Lower diagonal folds */}
            <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[260px] border-l-[#F3ECE0] border-t-[175px] border-t-transparent" />
            <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[260px] border-r-[#F0E8DC] border-t-[175px] border-t-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-0 border-b-[180px] border-b-[#EBE2D4] border-x-[260px] border-x-transparent" />
          </div>

          {/* Golden embossed corner flourishes */}
          <div className="absolute top-4 left-4 h-6 w-6 border-t border-l border-[#8A9A86]/40 rounded-tl-md" />
          <div className="absolute top-4 right-4 h-6 w-6 border-t border-r border-[#8A9A86]/40 rounded-tr-md" />
          <div className="absolute bottom-4 left-4 h-6 w-6 border-b border-l border-[#8A9A86]/40 rounded-bl-md" />
          <div className="absolute bottom-4 right-4 h-6 w-6 border-b border-r border-[#8A9A86]/40 rounded-br-md" />

          {/* Delicate handwritten metadata on the envelope face */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center pt-8">
            <span className="font-sans-ui text-[10px] uppercase tracking-[0.28em] text-[#8A9A86] font-medium">
              Three Years in the Making
            </span>

            <p className="mt-4 font-cormorant text-2xl sm:text-3xl italic text-[#3D3535] leading-snug font-light max-w-sm">
              &ldquo;{COVER_DATA.quote}&rdquo;
            </p>

            <span className="mt-4 font-sans-ui text-[11px] tracking-wider text-[#7A7272] uppercase">
              {COVER_DATA.subtitle}
            </span>

            {/* Click seal invitation note */}
            <div className="mt-8 flex items-center gap-1.5 text-[11px] font-sans-ui text-[#8A9A86] animate-pulse">
              <span>Touch the wax seal to unfold</span>
            </div>
          </div>

          {/* Envelope Top Flap */}
          <div
            className={`absolute top-0 left-0 right-0 h-0 border-t-[175px] border-t-[#F7EFE3] border-x-[260px] border-x-transparent z-20 transition-transform duration-700 shadow-xs ${
              phase === 'opening_flap' || phase === 'light_expanding' || phase === 'done'
                ? 'animate-flap-open'
                : ''
            }`}
            style={{ transformOrigin: 'top center' }}
          />

          {/* White divine light emitted when flap opens */}
          {(phase === 'opening_flap' || phase === 'light_expanding') && (
            <div className="absolute inset-0 z-25 flex items-center justify-center overflow-hidden pointer-events-none">
              <div className="w-64 h-64 rounded-full bg-white blur-xl opacity-90 animate-pulse" />
            </div>
          )}

          {/* The Wax Seal (Deep burgundy, circular, embossed heart) */}
          <button
            id="wax-seal-btn"
            onClick={handleSealClick}
            disabled={phase !== 'idle'}
            aria-label="Break wax seal to open letter"
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-[#7D1B2B] via-[#6B1724] to-[#4F0F1A] text-white shadow-[0_8px_20px_rgba(107,23,36,0.35)] cursor-pointer group transition-transform duration-300 hover:scale-105 active:scale-95 border-2 border-[#8A2535] ${
              phase === 'cracking' || phase === 'opening_flap' || phase === 'light_expanding'
                ? 'animate-seal-crack pointer-events-none'
                : ''
            }`}
          >
            {/* Outer embossed textured ring */}
            <div className="absolute inset-1 rounded-full border border-[#D4AF37]/40 pointer-events-none" />
            <div className="absolute inset-2 rounded-full border border-dashed border-[#FAF0EE]/30 pointer-events-none" />

            {/* Embossed Heart or Initials */}
            <span className="font-playfair text-xl sm:text-2xl select-none text-[#FDF4F5] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] group-hover:scale-110 transition-transform duration-300">
              {COVER_DATA.sealInitials}
            </span>

            {/* Delicate drip notches for realistic melted wax edge */}
            <div className="absolute -top-1 left-3 w-3 h-2 rounded-full bg-[#6B1724]" />
            <div className="absolute -bottom-1.5 right-4 w-3.5 h-2.5 rounded-full bg-[#5C101C]" />
            <div className="absolute top-4 -right-1 w-2.5 h-3 rounded-full bg-[#6B1724]" />
          </button>
        </div>
      </div>

      {/* Expanding White Light Overlay during transition (1.0s crossfade) */}
      {(phase === 'light_expanding' || phase === 'done') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="w-24 h-24 rounded-full bg-gradient-radial from-white via-white/95 to-transparent animate-light-expand" />
        </div>
      )}
    </div>
  );
};
