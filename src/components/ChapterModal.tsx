import React, { useState } from 'react';
import { Chapter } from '../types';
import { CLOSING_DATA } from '../data/letterData';
import { ArrowRight, Leaf, Sparkles } from 'lucide-react';

interface ChapterModalProps {
  chapter: Chapter | null;
  isClosing: boolean;
  onContinue: () => void;
  isDriftingAway: boolean;
}

export const ChapterModal: React.FC<ChapterModalProps> = ({
  chapter,
  isClosing,
  onContinue,
  isDriftingAway,
}) => {
  const [heartBloomed, setHeartBloomed] = useState<boolean>(false);
  const [bloomingAnimation, setBloomingAnimation] = useState<boolean>(false);

  if (!chapter && !isClosing) return null;

  const handleHeartClick = () => {
    if (heartBloomed || bloomingAnimation) return;
    setBloomingAnimation(true);
    setTimeout(() => {
      setBloomingAnimation(false);
      setHeartBloomed(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
      {/* Blurred & Dimmed Garden Backdrop (garden remains faintly visible) */}
      <div
        className="fixed inset-0 bg-[#FAF7F2]/70 backdrop-blur-md transition-opacity duration-700 pointer-events-auto"
        onClick={() => {
          // Keep reading comfortable, allow continue on backdrop click only if not drifting
        }}
      />

      {/* Unfolding Letter Sheet Card */}
      <div
        className={`relative z-10 w-full max-w-2xl my-auto rounded-3xl border border-[#E8DED2]/90 bg-[#FCF9F5]/98 p-8 sm:p-14 shadow-2xl transition-all duration-700 ${
          isDriftingAway ? 'animate-leaf-drift pointer-events-none' : 'animate-unfold-center'
        }`}
      >
        {/* Soft parchment corner flourish marks */}
        <div className="absolute top-4 left-4 h-6 w-6 border-t border-l border-[#8A9A86]/40 rounded-tl-md" />
        <div className="absolute top-4 right-4 h-6 w-6 border-t border-r border-[#8A9A86]/40 rounded-tr-md" />
        <div className="absolute bottom-4 left-4 h-6 w-6 border-b border-l border-[#8A9A86]/40 rounded-bl-md" />
        <div className="absolute bottom-4 right-4 h-6 w-6 border-b border-r border-[#8A9A86]/40 rounded-br-md" />

        {/* Regular Chapter 1 - 4 Content */}
        {chapter && !isClosing && (
          <div>
            {/* Chapter Header */}
            <header className="mb-8 border-b border-[#E8DED2]/60 pb-6 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <span className="font-sans-ui text-xs uppercase tracking-[0.25em] text-[#8A9A86] font-medium">
                  {chapter.chapterNumber}
                </span>
                <span className="font-sans-ui text-[11px] tracking-wider text-[#7A7272]">
                  {chapter.era}
                </span>
              </div>

              <h2 className="mt-3 font-playfair text-2xl sm:text-3xl md:text-4xl text-[#3D3535] font-normal leading-tight">
                {chapter.title}
              </h2>

              <p className="mt-2 font-cormorant text-lg italic text-[#655E5E]">
                {chapter.subtitle}
              </p>
            </header>

            {/* Paragraphs with staggered 300ms fade-in */}
            <div className="space-y-6 text-left">
              {chapter.paragraphs.map((para, idx) => {
                const isDisappearVow = para.trim() === "I will not disappear from your life.";

                if (isDisappearVow) {
                  return (
                    <div
                      key={idx}
                      className="my-8 rounded-2xl border-l-4 border-[#8A9A86] bg-[#8A9A86]/10 px-6 py-5 shadow-xs animate-paragraph-reveal"
                      style={{ animationDelay: `${(idx + 1) * 300}ms` }}
                    >
                      <p className="font-playfair text-xl sm:text-2xl text-[#3D3535] font-normal italic tracking-wide">
                        &ldquo;{para}&rdquo;
                      </p>
                    </div>
                  );
                }

                return (
                  <p
                    key={idx}
                    className={`font-cormorant text-lg sm:text-xl text-[#3D3535] leading-relaxed font-light animate-paragraph-reveal ${
                      idx === 0
                        ? 'first-letter:float-left first-letter:mr-3 first-letter:text-4xl first-letter:font-normal first-letter:font-playfair first-letter:text-[#8A9A86]'
                        : ''
                    }`}
                    style={{ animationDelay: `${(idx + 1) * 300}ms` }}
                  >
                    {para}
                  </p>
                );
              })}
            </div>

            {/* Pull Quote Callout */}
            {chapter.quote && (
              <blockquote
                className="my-8 rounded-2xl border-l-2 border-[#8A9A86] bg-[#FAF7F2]/80 px-6 py-4 animate-paragraph-reveal"
                style={{ animationDelay: `${(chapter.paragraphs.length + 1) * 300}ms` }}
              >
                <p className="font-cormorant text-xl italic text-[#3D3535] leading-relaxed">
                  &ldquo;{chapter.quote}&rdquo;
                </p>
                {chapter.highlight && (
                  <cite className="mt-2 block font-sans-ui text-xs not-italic text-[#7A7272] uppercase tracking-wider">
                    — {chapter.highlight}
                  </cite>
                )}
              </blockquote>
            )}

            {/* Soft Continue Affordance (leaf / arrow icon) */}
            <div
              className="mt-10 pt-6 border-t border-[#E8DED2]/60 flex items-center justify-center sm:justify-end animate-paragraph-reveal"
              style={{ animationDelay: `${(chapter.paragraphs.length + 2) * 300}ms` }}
            >
              <button
                id="chapter-continue-btn"
                onClick={onContinue}
                className="group flex items-center gap-2.5 rounded-full border border-[#D8E2DC] bg-[#FAF7F2] px-6 py-2.5 text-xs font-sans-ui font-medium uppercase tracking-widest text-[#3D3535] transition-all duration-300 hover:border-[#8A9A86] hover:bg-[#E3EBE6]/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Continue through the garden</span>
                <Leaf className="h-3.5 w-3.5 text-[#8A9A86] transition-transform duration-300 group-hover:rotate-12" />
              </button>
            </div>
          </div>
        )}

        {/* Closing Chapter (Chapter 5) Content */}
        {isClosing && (
          <div>
            <header className="mb-8 border-b border-[#E8DED2]/60 pb-6 text-center sm:text-left">
              <span className="font-sans-ui text-xs uppercase tracking-[0.25em] text-[#8A9A86] font-medium">
                {CLOSING_DATA.sectionLabel}
              </span>
              <h2 className="mt-3 font-playfair text-2xl sm:text-3xl md:text-4xl text-[#3D3535] font-normal leading-tight">
                {CLOSING_DATA.title}
              </h2>
            </header>

            <div className="space-y-6 text-left">
              {CLOSING_DATA.paragraphs.map((para, idx) => (
                <p
                  key={idx}
                  className="font-cormorant text-lg sm:text-xl text-[#3D3535] leading-relaxed font-light animate-paragraph-reveal"
                  style={{ animationDelay: `${(idx + 1) * 300}ms` }}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* The Forward Vow */}
            <div
              className="my-8 rounded-2xl border-l-4 border-[#8A9A86] bg-[#8A9A86]/10 p-6 sm:p-8 text-left shadow-xs animate-paragraph-reveal"
              style={{ animationDelay: `${(CLOSING_DATA.paragraphs.length + 1) * 300}ms` }}
            >
              <span className="block font-sans-ui text-[11px] uppercase tracking-widest text-[#8A9A86] font-medium mb-3">
                The Vow — Plain & Without Decoration
              </span>
              <p className="font-cormorant text-xl sm:text-2xl text-[#3D3535] leading-relaxed italic">
                &ldquo;{CLOSING_DATA.vow}&rdquo;
              </p>
            </div>

            {/* Conclusion text */}
            <div
              className="my-6 text-center sm:text-left animate-paragraph-reveal"
              style={{ animationDelay: `${(CLOSING_DATA.paragraphs.length + 2) * 300}ms` }}
            >
              <p className="font-cormorant text-xl sm:text-2xl text-[#3D3535] italic font-normal">
                {CLOSING_DATA.conclusion}
              </p>
            </div>

            {/* Pulsing White Heart (🤍) affordance */}
            {!heartBloomed && (
              <div
                className="mt-10 pt-6 border-t border-[#E8DED2]/60 flex flex-col items-center justify-center animate-paragraph-reveal"
                style={{ animationDelay: `${(CLOSING_DATA.paragraphs.length + 3) * 300}ms` }}
              >
                <button
                  id="closing-heart-btn"
                  onClick={handleHeartClick}
                  aria-label="Click the heart to bloom"
                  className={`group relative flex items-center justify-center p-3 rounded-full hover:scale-110 active:scale-95 transition-transform duration-300 ${
                    bloomingAnimation ? 'animate-heart-bloom' : 'animate-heart-pulse'
                  }`}
                >
                  <span className="text-3xl select-none filter drop-shadow-[0_2px_8px_rgba(232,180,184,0.6)]">
                    🤍
                  </span>
                </button>
                <span className="mt-2 text-[11px] font-sans-ui text-[#8A9A86] tracking-wide">
                  [ touch the heart 🤍 ]
                </span>
              </div>
            )}

            {/* Hidden Message Card blooms open */}
            {heartBloomed && (
              <div
                id="hidden-final-card"
                className="mt-8 rounded-2xl border border-[#E8B4B8]/80 bg-gradient-to-b from-[#FAF0EE]/95 to-[#FCF9F5] p-6 sm:p-10 text-left shadow-lg backdrop-blur-xs animate-in fade-in zoom-in-95 duration-700"
              >
                <div className="flex items-center justify-between gap-2 mb-6 border-b border-[#E8DED2]/60 pb-3">
                  <div className="flex items-center gap-2 text-[#8A9A86]">
                    <Sparkles className="h-4 w-4 text-[#E8B4B8]" />
                    <span className="font-sans-ui text-xs uppercase tracking-widest text-[#8A9A86] font-medium">
                      The Hidden Note
                    </span>
                  </div>
                  <span className="text-xs font-sans-ui text-[#7A7272]">
                    For your eyes only 🤍
                  </span>
                </div>

                <h3 className="font-playfair text-2xl sm:text-3xl text-[#3D3535] font-normal italic mb-5">
                  {CLOSING_DATA.hiddenMessage.salutation}
                </h3>

                <div className="space-y-4 font-cormorant text-lg sm:text-xl text-[#3D3535] leading-relaxed font-light">
                  {CLOSING_DATA.hiddenMessage.paragraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                <div className="mt-8 pt-5 border-t border-[#E8DED2]/60 flex items-center justify-between">
                  <p className="font-playfair text-xl sm:text-2xl text-[#3D3535] font-normal italic">
                    {CLOSING_DATA.hiddenMessage.closing}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
