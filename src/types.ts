export interface Chapter {
  id: number;
  chapterNumber: string;
  title: string;
  era: string;
  subtitle: string;
  paragraphs: string[];
  track: 'TRACK_A' | 'TRACK_B';
  quote?: string;
  highlight?: string;
}

export type TrackId = 'TRACK_A' | 'TRACK_B';

export interface AudioTrackInfo {
  id: TrackId;
  title: string;
  artist: string;
  era: string;
  vibe: string;
  description: string;
  sourceType?: 'file' | 'synth';
  fileName?: string;
  isCustomFile?: boolean;
}

export interface CoverGateData {
  question: string;
  acceptedAnswers: string[];
  hint: string;
  sealText: string;
  quote: string;
  subtitle: string;
}

export interface ChapterGateData {
  chapterId: number;
  memoryTitle: string;
  photoUrl: string;
  photoCaption: string;
  question: string;
  correctYear: number;
  hint: string;
}
