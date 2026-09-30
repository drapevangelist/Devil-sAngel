import { Chapter } from '../types';

/**
 * =========================================================================
 * EDITABLE CONFIGURATION & VARIABLES (as specified in technical notes)
 * =========================================================================
 */

// Anniversary official date
export const ANNIVERSARY_DATE = '2023-10-01T00:00:00'; // October 1st anniversary

// Story-linked dual soundtracks
export const TRACK_A_SRC = '/audio/cant-help-falling-in-love.mp3'; // Elvis Presley (1961)
export const TRACK_B_SRC = '/audio/heavens-baby.mp3'; // Ayra Starr ft. Zayn (Contemporary)

// Asset placeholders (if custom graphics are provided)
export const ASSET_PLACEHOLDERS = {
  tree: null as string | null,
  lilies: null as string | null,
  envelope: null as string | null,
  waxSeal: null as string | null,
};

// Cover & Envelope configuration
export const COVER_DATA = {
  quote: "Some things take a long time to say. Other things took three years to realize.",
  subtitle: "A handwritten retrospective in five folds",
  sealInitials: "🤍",
};

// All 4 Chapters of the unfolding letter
export const CHAPTERS: Chapter[] = [
  {
    id: 1,
    chapterNumber: "Chapter I",
    title: "Before it had a name",
    era: "2018 — The Friendship Era",
    subtitle: "It all started with one message request",
    paragraphs: [
      "It all started with one message request. Just a hello, the kind you send out not knowing it'll be the last ordinary thing you ever say to someone.",
      "Truth is, you didn't chase a connection. You chased a name. I was the one everyone in school seemed to know, and I think some part of you just wanted to know me too, nothing deeper than that, or so you told yourself.",
      "But that hello turned into texts. Texts turned into the kind of late-night talks that make us forget what time it is, the kind where silence in a chat feels louder than words. You weren't looking for anything. You were just there, every night, waiting to see what I'd say next.",
      "And then came the day you'd been looking forward to without even admitting it to yourself: the day I'd finally see you. Your graduation ceremony 2019.",
      "I remember it clearly except you remember it wrong, because I walked right past you. I didn't recognize the face behind all those late-night words.",
      "Still laughing at how crazy that experience was. But looking back, that moment changed something between us. After that, I stopped letting you get away with me not having to know your face, you started sending your pictures, so I'd never have an excuse again.",
      "It worked. Because from that day to this one, your face has never left me. It's imprinted all over my memories, the first thing I see when I close my eyes and think of home."
    ],
    track: 'TRACK_A',
    quote: "That was 2018/19. You didn't know it yet, but you were already choosing me.",
    highlight: "2018/19 — The face that never left me"
  },
  {
    id: 2,
    chapterNumber: "Chapter II",
    title: "Unofficial, but never uncertain",
    era: "The In-Between Years",
    subtitle: "Lagos to Port Harcourt, and the quiet universe rearranging things",
    paragraphs: [
      "Funny how long we've been walking this road. Three years is what the calendar says about us, but we both know the calendar is lying. It's been longer than that. It's always been longer than that.",
      "I still can't tell you who made the first move. Maybe neither of us did, maybe we just slid into each other without ever agreeing to it out loud. No labels, no declarations. Just two people growing dangerously comfortable, saying things we never dressed up as love, because somehow we didn't need the words yet. We just knew.",
      "And then you moved. Lagos to Port Harcourt, and not long after, I got admitted into a school in the same city. I'm not going to pretend I chose PH because of you. I didn't. But when it happened, it felt less like coincidence and more like the universe quietly rearranging things in my favor.",
      "Of course, not everyone was smiling with us. Your mum reached out and asked me to keep my distance, worried I'd corrupt you. If she only knew what your mind was already capable of dreaming up long before I said a word.",
      "Then we lost each other for almost a year. No calls, no texts, just silence where a whole friendship used to be.",
      "But when we found our way back, it was like the distance had never happened at all. We didn't have to rebuild, we just picked up, tighter than before, like the time apart had only been dust settling before something steadier took root."
    ],
    track: 'TRACK_A',
    quote: "That was us, unofficial on paper, undeniable in every way that mattered.",
    highlight: "Unofficial on paper, undeniable in every way that mattered."
  },
  {
    id: 3,
    chapterNumber: "Chapter III",
    title: "The day it became official",
    era: "October 1st, 2023 — Independence Day",
    subtitle: "While the country celebrated independence, we quietly chose forever",
    paragraphs: [
      "October 1st, 2023. While the whole country was out celebrating Nigeria's independence, we were quietly plotting something of our own, a future neither of us had said out loud yet, but both of us had clearly already decided on.",
      "I was in Lagos that day. No knee on the ground, no grand gesture, no rehearsed speech — just me, working up the nerve to finally ask the question that had been sitting unofficial for far too long.",
      "And you said yes. That's it. That's the whole reason we're here three years later, still counting. One answer, one beautiful morning, and everything after became 'us' in a way it had never officially been before.",
      "Three years since that morning. Three years of growth we didn't always see happening in the moment. Of care that showed up in the small, unglamorous ways. Of attention that never really let up, even when life got loud. Of smiles that came easy, and tears too, the kind that come from caring about something enough to let it hurt sometimes."
    ],
    track: 'TRACK_B',
    quote: "October 1st gave the country its independence. It gave me you, properly, officially, unmistakably mine.",
    highlight: "October 1st, 2023 — Unmistakably mine."
  },
  {
    id: 4,
    chapterNumber: "Chapter IV",
    title: "Three Years In, Still Choosing You",
    era: "The Anniversary & The Vow",
    subtitle: "A person becoming more of who they were always meant to be",
    paragraphs: [
      "I've had a front-row seat to something most people never get to see; a person becoming more of who they were always meant to be. Three years, and I've watched you grow beyond the limits you used to accept as just... you.",
      "You're not perfect right now. Neither am I. But perfect was never the point, progress is, and yours has been undeniable. I remember when you weren't the most socially active person, and now look at you, founder of your own book club. Yes, it might've started as my idea, sha. I'll let you have that one. You ran with it and made it yours, and that's the part that actually matters.",
      "I won't pretend I've been the best boyfriend. There are things I haven't said, things I know I could've done better, and I carry that honestly instead of hiding behind excuses. But when I say I love you, I mean it completely. And I'm not just hoping to do better, I'm confident I will, because you're worth the version of me still under construction.",
      "We've been through enough that at some point, you wanted us to be just friends. I won't lie, I disagreed with that, and some part of me still does. But you have my word on this, and my word is my bond:",
      "I will not disappear from your life.",
      "I make that promise today, on this anniversary, and I intend to hold it, not loosely, not conveniently, but for as long as I have breath to keep it."
    ],
    track: 'TRACK_B',
    quote: "I will not disappear from your life. I make that promise today, on this anniversary, and I intend to hold it, not loosely, not conveniently, but for as long as I have breath to keep it.",
    highlight: "My word on this, and my word is my bond"
  }
];

// Closing chapter & Hidden Note
export const CLOSING_DATA = {
  sectionLabel: "Closing",
  title: "A Promise Forward",
  paragraphs: [
    "Three years down. I'm not interested in stopping here.",
    "I don't know everything year four holds, or five, or the ones after that, nobody gets that kind of certainty. But I know what I'm bringing into them: more patience than I started with, more honesty than I used to offer, and a version of me that keeps choosing to show up, especially on the days it isn't easy.",
    "So here's my vow, plain and without decoration:"
  ],
  vow: "I promise to keep growing, not just for myself, but for us. I promise to keep choosing you, not out of habit, but on purpose, again and again, for as long as you'll let me. And I promise, no matter what road we take from here, I will not disappear.",
  conclusion: "Here's to the years that haven't happened yet.",
  hiddenMessage: {
    salutation: "To my devil's angel,",
    paragraphs: [
      "Sweet enough to make me believe in angels. Naughty enough to remind me you're still mine, not some untouchable saint on a pedestal.",
      "That's what I've always loved about you, you never made me choose between the two. You're the softest thing in my life and the most dangerous thing to my heart, both at once, both fully you.",
      "Angel when the world's watching. Devil when it's just us."
    ],
    closing: "I wouldn't want you any other way. 😈🤍"
  }
};
