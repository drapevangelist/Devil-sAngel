import React from 'react';
import { Sparkles, Check } from 'lucide-react';

interface GardenSceneProps {
  currentStage: number; // 1, 2, 3, 4, 5
  onPageClick: (chapterId: number) => void;
  isZoomedOut: boolean;
}

export const GardenScene: React.FC<GardenSceneProps> = ({
  currentStage,
  onPageClick,
  isZoomedOut,
}) => {
  // Dynamic sky gradient based on story phase:
  // Stages 1 & 2: Dusty morning tones (blush / lavender / morning mist)
  // Stage 3: Warm golden hue (golden-hour shift)
  // Stages 4 & 5: Vivid blooming warm light
  const getSkyStyle = () => {
    if (currentStage >= 4) {
      return 'from-[#FBD8D0] via-[#F8CCB5] to-[#FCF4EC]';
    }
    if (currentStage === 3) {
      return 'from-[#FDE0CE] via-[#F7D2C0] to-[#FAF1E6]';
    }
    return 'from-[#F4E6E8] via-[#ECE1ED] to-[#FDF7F0]';
  };

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden select-none bg-gradient-to-b ${getSkyStyle()} transition-colors duration-3000 ease-in-out`}
    >
      {/* Distant soft sun / golden morning aura */}
      <div
        className={`absolute top-12 right-1/4 w-80 h-80 rounded-full blur-3xl transition-opacity duration-3000 pointer-events-none ${
          currentStage >= 3 ? 'bg-[#FFD6A5]/45 opacity-100' : 'bg-[#E8B4B8]/25 opacity-70'
        }`}
      />

      {/* Camera / view container with subtle 1.5s zoom-out at closing step 5 */}
      <div
        className={`relative w-full min-h-screen flex items-end justify-center transition-transform duration-1500 ease-in-out ${
          isZoomedOut ? 'scale-[0.88] sm:scale-[0.92] translate-y-2' : 'scale-100 translate-y-0'
        }`}
        style={{ transformOrigin: 'bottom center' }}
      >
        {/* Soft rolling garden hills in the background */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-48 sm:h-64 pointer-events-none opacity-40"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#D5E0D5"
            d="M0,192L60,186.7C120,181,240,171,360,181.3C480,192,600,224,720,224C840,224,960,192,1080,181.3C1200,171,1320,181,1380,186.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
          <path
            fill="#E3EBE3"
            d="M0,256L80,245.3C160,235,320,213,480,218.7C640,224,800,256,960,261.3C1120,267,1280,245,1360,235L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>

        {/* Foreground rolling lush grass lawn */}
        <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-t from-[#B7C7B3] via-[#CAD6C7] to-transparent pointer-events-none" />

        {/* THE MAIN FRUIT TREE (Center-left) */}
        <div className="relative w-full max-w-4xl h-[78vh] sm:h-[84vh] flex items-end justify-start px-4 sm:px-12 pointer-events-none">
          
          {/* Animated Tree Container with natural 4.6s calm sway */}
          <div className="relative w-full h-full animate-tree-sway">
            <svg
              viewBox="0 0 800 700"
              className="w-full h-full overflow-visible drop-shadow-[0_12px_24px_rgba(61,53,53,0.06)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Root flare & base shadow */}
              <ellipse cx="340" cy="670" rx="90" ry="16" fill="#8A9A86" opacity="0.25" />

              {/* Trunk Base & Main Stem */}
              <path
                d="M320,670 Q330,560 310,480 Q290,400 325,320 Q340,280 350,220"
                stroke="#6B5950"
                strokeWidth="48"
                strokeLinecap="round"
              />
              {/* Bark wood shading texture line */}
              <path
                d="M328,665 Q338,565 318,485 Q300,405 333,325 Q348,285 354,225"
                stroke="#57463E"
                strokeWidth="14"
                strokeLinecap="round"
                opacity="0.45"
              />

              {/* Branch 1 (Lower Right Branch) -> Where Chapter 1 Page Hangs */}
              <path
                d="M315,480 Q390,460 480,480 Q530,490 580,470"
                stroke="#6B5950"
                strokeWidth="24"
                strokeLinecap="round"
              />
              <path
                d="M480,480 Q520,520 560,530"
                stroke="#6B5950"
                strokeWidth="14"
                strokeLinecap="round"
              />

              {/* Branch 2 (Mid-Left Arching Branch) -> Where Chapter 2 Page Hangs */}
              <path
                d="M310,410 Q240,380 180,390 Q120,400 80,370"
                stroke="#6B5950"
                strokeWidth="22"
                strokeLinecap="round"
              />
              <path
                d="M180,390 Q150,440 120,460"
                stroke="#6B5950"
                strokeWidth="12"
                strokeLinecap="round"
              />

              {/* Branch 3 (Center Arching Upper-Right) -> Where Chapter 3 Page Hangs */}
              <path
                d="M325,320 Q410,290 510,300 Q600,310 650,280"
                stroke="#6B5950"
                strokeWidth="20"
                strokeLinecap="round"
              />
              <path
                d="M460,295 Q520,240 570,230"
                stroke="#6B5950"
                strokeWidth="14"
                strokeLinecap="round"
              />

              {/* Branch 4 (Upper Left Arching Branch) -> Where Chapter 4 Page Hangs */}
              <path
                d="M340,260 Q260,220 200,210 Q140,200 110,160"
                stroke="#6B5950"
                strokeWidth="18"
                strokeLinecap="round"
              />

              {/* Branch 5 (Crown Top Branch) -> Where Closing Page Hangs */}
              <path
                d="M350,220 Q350,150 370,100 Q380,70 395,50"
                stroke="#6B5950"
                strokeWidth="16"
                strokeLinecap="round"
              />

              {/* Lush Foliage Clouds / Leaf Clusters (Pastel Sage & Blush Tints) */}
              {/* Crown Canopy */}
              <circle cx="380" cy="90" r="75" fill="#8FA48B" opacity="0.85" />
              <circle cx="340" cy="130" r="65" fill="#A2B79E" opacity="0.9" />
              <circle cx="430" cy="120" r="60" fill="#93A88F" opacity="0.8" />
              <circle cx="390" cy="70" r="50" fill="#B5CBB2" opacity="0.75" />

              {/* Upper Left Canopy */}
              <circle cx="160" cy="190" r="70" fill="#8FA48B" opacity="0.88" />
              <circle cx="110" cy="170" r="55" fill="#A2B79E" opacity="0.85" />
              <circle cx="210" cy="170" r="50" fill="#B5CBB2" opacity="0.75" />

              {/* Upper Right Canopy */}
              <circle cx="560" cy="270" r="75" fill="#8FA48B" opacity="0.88" />
              <circle cx="630" cy="260" r="60" fill="#A2B79E" opacity="0.82" />
              <circle cx="510" cy="250" r="55" fill="#B5CBB2" opacity="0.8" />

              {/* Lower Right Canopy */}
              <circle cx="540" cy="460" r="65" fill="#8FA48B" opacity="0.88" />
              <circle cx="590" cy="470" r="50" fill="#A2B79E" opacity="0.8" />

              {/* Lower Left Canopy */}
              <circle cx="140" cy="400" r="60" fill="#8FA48B" opacity="0.88" />
              <circle cx="90" cy="410" r="45" fill="#A2B79E" opacity="0.8" />

              {/* Delicate hanging blush fruits / blossoms on branches */}
              <circle cx="370" cy="175" r="9" fill="#E8B4B8" opacity="0.95" />
              <circle cx="440" cy="155" r="8" fill="#F5E1DC" opacity="0.9" />
              <circle cx="530" cy="335" r="10" fill="#E8B4B8" opacity="0.95" />
              <circle cx="610" cy="315" r="8.5" fill="#F5E1DC" opacity="0.9" />
              <circle cx="190" cy="245" r="9" fill="#E8B4B8" opacity="0.95" />
              <circle cx="130" cy="225" r="8" fill="#F5E1DC" opacity="0.9" />
              <circle cx="510" cy="510" r="8.5" fill="#E8B4B8" opacity="0.9" />
              <circle cx="160" cy="440" r="9" fill="#E8B4B8" opacity="0.9" />

              {/* Extra blooming blossoms if stage 4+ */}
              {currentStage >= 4 && (
                <>
                  <circle cx="330" cy="95" r="11" fill="#E8B4B8" opacity="0.95" />
                  <circle cx="480" cy="110" r="10" fill="#F5C2C7" opacity="0.95" />
                  <circle cx="250" cy="190" r="10" fill="#E8B4B8" opacity="0.95" />
                  <circle cx="470" cy="270" r="11" fill="#F5C2C7" opacity="0.95" />
                  <circle cx="560" cy="430" r="9.5" fill="#E8B4B8" opacity="0.95" />
                </>
              )}
            </svg>

            {/* HANGING PAGES / LEAVES SUSPENDED FROM BRANCHES */}
            <div className="absolute inset-0 pointer-events-auto">
              
              {/* PAGE 1: Lower Right Branch (cx: 560, cy: 530 in viewBox ~ x: 70%, y: 72%) */}
              {(currentStage === 1 || isZoomedOut) && (
                <div
                  className="absolute"
                  style={{ top: '68%', left: '68%' }}
                >
                  <HangingPageItem
                    chapterId={1}
                    isCurrent={currentStage === 1}
                    isPast={currentStage > 1}
                    title="Chapter I"
                    subtitle="Before it had a name"
                    onClick={() => onPageClick(1)}
                  />
                </div>
              )}

              {/* PAGE 2: Mid-Left Branch (cx: 170, cy: 400 in viewBox ~ x: 21%, y: 55%) */}
              {(currentStage === 2 || (isZoomedOut && currentStage >= 2)) && (
                <div
                  className="absolute"
                  style={{ top: '54%', left: '20%' }}
                >
                  <HangingPageItem
                    chapterId={2}
                    isCurrent={currentStage === 2}
                    isPast={currentStage > 2}
                    title="Chapter II"
                    subtitle="Unofficial, but never uncertain"
                    onClick={() => onPageClick(2)}
                  />
                </div>
              )}

              {/* PAGE 3: Center Upper-Right Branch (cx: 580, cy: 280 in viewBox ~ x: 72%, y: 38%) */}
              {(currentStage === 3 || (isZoomedOut && currentStage >= 3)) && (
                <div
                  className="absolute"
                  style={{ top: '38%', left: '70%' }}
                >
                  <HangingPageItem
                    chapterId={3}
                    isCurrent={currentStage === 3}
                    isPast={currentStage > 3}
                    title="Chapter III"
                    subtitle="The day it became official"
                    onClick={() => onPageClick(3)}
                    isTurningPoint
                  />
                </div>
              )}

              {/* PAGE 4: Upper Left Branch (cx: 180, cy: 210 in viewBox ~ x: 22%, y: 28%) */}
              {(currentStage === 4 || (isZoomedOut && currentStage >= 4)) && (
                <div
                  className="absolute"
                  style={{ top: '28%', left: '22%' }}
                >
                  <HangingPageItem
                    chapterId={4}
                    isCurrent={currentStage === 4}
                    isPast={currentStage > 4}
                    title="Chapter IV"
                    subtitle="Three Years In, Still Choosing You"
                    onClick={() => onPageClick(4)}
                  />
                </div>
              )}

              {/* PAGE 5: Crown Top Branch (cx: 390, cy: 80 in viewBox ~ x: 48%, y: 11%) */}
              {currentStage === 5 && (
                <div
                  className="absolute"
                  style={{ top: '10%', left: '46%' }}
                >
                  <HangingPageItem
                    chapterId={5}
                    isCurrent={currentStage === 5}
                    isPast={false}
                    title="Closing"
                    subtitle="A Promise Forward"
                    onClick={() => onPageClick(5)}
                    isCrownTop
                  />
                </div>
              )}
            </div>
          </div>

          {/* LILIES AT THE TREE'S BASE (Natural sway with offset timing) */}
          <div className="absolute bottom-2 left-10 sm:left-24 z-10 pointer-events-none flex items-end">
            
            {/* Lily Cluster 1 (Left Base - offset sway A) */}
            <div className="animate-lily-a origin-bottom">
              <svg width="90" height="110" viewBox="0 0 90 110" fill="none">
                {/* Stem */}
                <path d="M45,110 Q40,65 48,25" stroke="#7C9277" strokeWidth="4" strokeLinecap="round" />
                <path d="M45,95 Q25,80 15,65" stroke="#8A9A86" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M48,85 Q65,70 75,55" stroke="#8A9A86" strokeWidth="3.5" strokeLinecap="round" />

                {/* White Lily Bloom */}
                <path d="M48,25 C30,15 25,-5 48,-5 C70,-5 65,15 48,25 Z" fill="#FDFBF7" stroke="#E8DED2" strokeWidth="1" />
                <path d="M48,25 C32,28 15,15 28,5 C38,0 45,15 48,25 Z" fill="#FAF5EE" stroke="#E8DED2" strokeWidth="0.8" />
                <path d="M48,25 C64,28 80,15 68,5 C58,0 51,15 48,25 Z" fill="#FAF5EE" stroke="#E8DED2" strokeWidth="0.8" />

                {/* Golden Stamens */}
                <circle cx="48" cy="8" r="2.5" fill="#D4AF37" />
                <circle cx="43" cy="11" r="2" fill="#E8B4B8" />
                <circle cx="53" cy="11" r="2" fill="#E8B4B8" />
              </svg>
            </div>

            {/* Lily Cluster 2 (Center-Right Base - offset sway B) */}
            <div className="animate-lily-b origin-bottom -ml-4 mb-1">
              <svg width="110" height="130" viewBox="0 0 110 130" fill="none">
                {/* Stems */}
                <path d="M55,130 Q60,75 50,30" stroke="#7C9277" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M52,105 Q30,90 20,70" stroke="#8A9A86" strokeWidth="4" strokeLinecap="round" />
                <path d="M56,90 Q75,75 88,58" stroke="#8A9A86" strokeWidth="4" strokeLinecap="round" />

                {/* Main Bloom */}
                <path d="M50,30 C32,18 28,-10 50,-10 C72,-10 68,18 50,30 Z" fill="#FFFFFF" stroke="#E8DED2" strokeWidth="1" />
                <path d="M50,30 C32,34 12,20 26,8 C38,0 46,18 50,30 Z" fill="#FAF5EE" stroke="#E8DED2" strokeWidth="0.8" />
                <path d="M50,30 C68,34 88,20 74,8 C62,0 54,18 50,30 Z" fill="#FAF5EE" stroke="#E8DED2" strokeWidth="0.8" />

                {/* Golden Stamens */}
                <circle cx="50" cy="5" r="3" fill="#D4AF37" />
                <circle cx="44" cy="9" r="2.5" fill="#E8B4B8" />
                <circle cx="56" cy="9" r="2.5" fill="#E8B4B8" />
              </svg>
            </div>

            {/* Fuller Blooming Lilies if Stage 4 or 5 */}
            {currentStage >= 4 && (
              <div className="animate-lily-a origin-bottom -ml-5 mb-2">
                <svg width="85" height="100" viewBox="0 0 85 100" fill="none">
                  <path d="M42,100 Q46,55 38,20" stroke="#7C9277" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M38,20 C24,10 20,-8 38,-8 C56,-8 52,10 38,20 Z" fill="#FFFFFF" stroke="#E8B4B8" strokeWidth="1" />
                  <circle cx="38" cy="4" r="2.5" fill="#D4AF37" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface HangingPageItemProps {
  chapterId: number;
  isCurrent: boolean;
  isPast: boolean;
  title: string;
  subtitle: string;
  onClick: () => void;
  isTurningPoint?: boolean;
  isCrownTop?: boolean;
}

const HangingPageItem: React.FC<HangingPageItemProps> = ({
  chapterId,
  isCurrent,
  isPast,
  title,
  subtitle,
  onClick,
  isTurningPoint = false,
  isCrownTop = false,
}) => {
  return (
    <div className="relative group cursor-pointer" onClick={onClick}>
      {/* Delicate golden thread holding the page from branch */}
      <div className="w-[1.5px] h-9 sm:h-12 bg-gradient-to-b from-[#D4AF37] to-[#E8DED2] mx-auto opacity-70" />

      {/* The Hanging Parchment Page with organic sway & shimmer */}
      <div
        className={`relative -mt-1 rounded-xl p-3 sm:p-4 text-center transition-all duration-500 animate-hanging-page shadow-md ${
          isCurrent
            ? 'animate-page-shimmer bg-[#FCF9F5] border-2 border-[#D4AF37]/80 hover:scale-105 active:scale-95'
            : isPast
            ? 'bg-[#FAF7F2]/90 border border-[#8A9A86]/50 opacity-85 hover:opacity-100'
            : 'bg-[#FAF7F2] border border-[#E8DED2]'
        }`}
        style={{ width: isCrownTop ? '150px' : '135px' }}
      >
        {/* Shimmer badge */}
        {isCurrent && (
          <div className="absolute -top-2.5 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#FAF0EE] border border-[#D4AF37] shadow-xs">
            <Sparkles className="h-3 w-3 text-[#D4AF37] animate-spin" style={{ animationDuration: '4s' }} />
          </div>
        )}

        {isPast && (
          <div className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#8A9A86] text-white">
            <Check className="h-2.5 w-2.5" />
          </div>
        )}

        {/* Delicate label */}
        <span className="block font-sans-ui text-[9px] uppercase tracking-[0.2em] text-[#8A9A86] font-semibold">
          {title}
        </span>

        {/* Subtitle / hint */}
        <p className="mt-1 font-cormorant text-xs sm:text-[13px] text-[#3D3535] italic leading-tight line-clamp-2">
          {subtitle}
        </p>

        {isCurrent && (
          <span className="mt-1.5 inline-block text-[9px] font-sans-ui text-[#D4AF37] font-medium tracking-wide">
            [ touch to open ]
          </span>
        )}
      </div>
    </div>
  );
};
