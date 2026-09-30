import React, { useState, useEffect } from 'react';
import { SealedEnvelopeScene } from './components/SealedEnvelopeScene';
import { GardenScene } from './components/GardenScene';
import { ChapterModal } from './components/ChapterModal';
import { GardenHUD } from './components/GardenHUD';
import { FloatingPetals } from './components/FloatingPetals';
import { CHAPTERS } from './data/letterData';
import { romanticAudioEngine } from './audio/audioEngine';

export default function App() {
  // Top-level scene: Scene 1 (Sealed Envelope) -> Scene 2 (The Landing Garden)
  const [scene, setScene] = useState<'SEALED_ENVELOPE' | 'GARDEN'>('SEALED_ENVELOPE');

  // Garden progression: Stage 1 to 5
  // Stage 1: Chapter 1 hanging page
  // Stage 2: Chapter 2 hanging page
  // Stage 3: Chapter 3 hanging page (golden hour sky, crossfade to Track B)
  // Stage 4: Chapter 4 hanging page (vivid blooming)
  // Stage 5: Closing crown page (camera zoomed out, all previous pages glowing)
  const [gardenStage, setGardenStage] = useState<number>(1);

  // Currently opened chapter modal (null = reading in garden, 1-4 = chapters, 5 = closing)
  const [openChapterId, setOpenChapterId] = useState<number | null>(null);

  // Leaf drift transition state (1.0s shrink & sideways drift)
  const [isDriftingAway, setIsDriftingAway] = useState<boolean>(false);

  // Camera pull-back zoom out for Stage 5
  const [isZoomedOut, setIsZoomedOut] = useState<boolean>(false);

  // Initialize audio engine on mount
  useEffect(() => {
    romanticAudioEngine.init();
  }, []);

  // Handle envelope opened -> enter Landing Garden
  const handleEnvelopeOpened = () => {
    setScene('GARDEN');
  };

  // Click on a hanging page in the garden
  const handlePageClick = (chapterId: number) => {
    setOpenChapterId(chapterId);
  };

  // Continue button inside chapter modal
  const handleContinueFromChapter = () => {
    if (isDriftingAway || openChapterId === null) return;

    // Start 1.0s leaf-drift animation
    setIsDriftingAway(true);

    const completedChapterId = openChapterId;

    setTimeout(() => {
      // Close modal and return to garden
      setOpenChapterId(null);
      setIsDriftingAway(false);

      // Advance garden stage based on completed chapter
      if (completedChapterId === 1) {
        setGardenStage(2);
      } else if (completedChapterId === 2) {
        // Chapter 2 -> Chapter 3 Turning Point:
        // Sky shifts to golden hue, music crossfades to TRACK_B
        setGardenStage(3);
        romanticAudioEngine.setTrack('TRACK_B');
      } else if (completedChapterId === 3) {
        // Chapter 3 -> Chapter 4:
        // Garden becomes more vivid/blooming with fuller lilies
        setGardenStage(4);
      } else if (completedChapterId === 4) {
        // Chapter 4 -> Closing:
        // Camera pulls back (1.5s zoom-out) to reveal full tree with all previous pages
        setGardenStage(5);
        setIsZoomedOut(true);
      }
    }, 1000);
  };

  const currentChapter = openChapterId && openChapterId <= 4
    ? CHAPTERS.find((c) => c.id === openChapterId) || null
    : null;

  return (
    <div className="relative min-h-screen w-full bg-[#FAF7F2] text-[#3D3535] overflow-x-hidden font-sans-ui selection:bg-[#E8C5C8] selection:text-[#3D3535]">
      
      {/* SCENE 1: THE SEALED ENVELOPE (Initial Load) */}
      {scene === 'SEALED_ENVELOPE' && (
        <SealedEnvelopeScene onEnvelopeOpened={handleEnvelopeOpened} />
      )}

      {/* SCENE 2: THE LANDING GARDEN (Unlocked once envelope is opened) */}
      {scene === 'GARDEN' && (
        <div className="relative min-h-screen w-full animate-in fade-in duration-1000">
          {/* Ambient Drifting Petals & Leaves */}
          <FloatingPetals />

          {/* Persistent Top HUD (Muted-by-default music toggle & quiet live anniversary counter) */}
          <GardenHUD />

          {/* The Garden Canvas with Fruit Tree, Swaying Lilies & Hanging Pages */}
          <GardenScene
            currentStage={gardenStage}
            onPageClick={handlePageClick}
            isZoomedOut={isZoomedOut}
          />

          {/* Unfolded Chapter Modal Overlay */}
          <ChapterModal
            chapter={currentChapter}
            isClosing={openChapterId === 5}
            onContinue={handleContinueFromChapter}
            isDriftingAway={isDriftingAway}
          />
        </div>
      )}
    </div>
  );
}
