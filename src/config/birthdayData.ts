/**
 * Central Configuration for Birthday Surprise Website
 * You can customize the friend's name, date, photos, captions, timeline milestones,
 * notes, and letters in one convenient place.
 */

export interface MemoryPhoto {
  id: string;
  url: string;
  caption: string;
  dateOrYear: string;
  themeColor: string; // for polaroid accent or badge
  description?: string;
  location?: string;
}

export interface TimelineMilestone {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  iconName: string;
  photoUrl?: string;
  tag: string;
}

export interface LittleThingItem {
  id: string;
  title: string;
  body: string;
  icon: string;
  tagline: string;
}

export interface SurpriseEasterEgg {
  id: string;
  title: string;
  message: string;
  emoji: string;
  type: 'star' | 'heart' | 'gift' | 'balloon' | 'envelope';
}

export const BIRTHDAY_CONFIG = {
  // Best Friend's info
  friendName: "Bestie",
  birthdayDate: "October 23",
  formattedDate: "October 23",
  friendPhotoUrl: "/assets/aistudio/IMG-20251020-WA0246_389f9e48.jpg",

  // Audio tracks
  audio: {
    happyBirthday: "/audio/happy-birthday.mp3",
    memories: "/audio/memories.mp3",
    celebration: "/audio/celebration.mp3"
  },

  // Opening screen copy
  opening: {
    initialSalutation: "Hey, you! 👀❤️",
    specialReveal: "Someone really special was born on October 23...",
    surpriseTeaser: "And I made something just for you. 🎁",
    ctaButton: "Open Your Surprise 🎀"
  },

  // Main hero greeting copy
  hero: {
    mainHeading: "HAPPY BIRTHDAY, BEST FRIEND! 🎉",
    subheading: "Another year of you making the world a little more special.",
    paragraph1: "I hope today brings you a thousand little reasons to smile.",
    paragraph2: "You deserve happiness, beautiful surprises, and all the good things life has to offer.",
    closingLine: "And yes, I still remember your special day. ❤️",
    scrollButton: "There's More for You ↓"
  },

  // 10 Curated Memories for the Scrapbook & Photo Gallery
  memories: [
    {
      id: "mem-1",
      url: "/assets/aistudio/IMG-20251020-WA0246_389f9e48.jpg",
      caption: "The Birthday Star ✨",
      dateOrYear: "October 2025",
      themeColor: "#FFDDE7",
      description: "Sitting on the Stairs Like Won the Universe. 🌍",
      location: "Campus Steps"
    },
    {
      id: "mem-2",
      url: "/assets/aistudio/February_23_a2922172.jpg",
      caption: "UIU Spring Orientation 🎓",
      dateOrYear: "February 2023",
      themeColor: "#FFE6D5",
      description: "Our university journey began at UIU, but our friendship started with a hello on Messenger . Spring Orientation became one of the early chapters of our unforgettable story.",
      location: "UIU Campus Grounds"
    },
    {
      id: "mem-3",
      url: "/assets/aistudio/March_23_b0cf5745.JPG",
      caption: "Campus Days 🏛️",
      dateOrYear: "March 2023",
      themeColor: "#E9DFFF",
      description: "Our first picture as friends. A simple moment that became a beautiful memory. 🤍✨",
      location: "UIU Campus Gallery"
    },
    {
      id: "mem-4",
      url: "/assets/aistudio/Jun_23_52fe1c60.JPG",
      caption: "A Random Presentation Day 🌸",
      dateOrYear: "June 2023",
      themeColor: "#FFF9F3",
      description: "Just another presentation day at UIU that turned into a special memory. Between classes, presentations, and little moments together, we captured a beautiful piece of our growing friendship.",
      location: "Campus Bricks"
    },
    {
      id: "mem-5",
      url: "/assets/aistudio/February_24_bc29ccc3.jpg",
      caption: "Panam City Heritage 🏰",
      dateOrYear: "February 2024",
      themeColor: "#FFDDE7",
      description: "Exploring the historic red-brick streets of Panam Nagar with a friend, capturing beautiful photos, sharing laughs, and creating unforgettable memories together.",
      location: "Panam Nagar, Sonargaon"
    },
    {
      id: "mem-6",
      url: "/assets/aistudio/December_24_79723adc.jpg",
      caption: "Sajek Valley Adventure 🌄",
      dateOrYear: "December 2024",
      themeColor: "#E9DFFF",
      description: "Enjoying the breathtaking beauty of Sajek Valley, surrounded by misty mountains, endless green hills, and peaceful views. A beautiful travel memory filled with adventure, friendship, and moments worth cherishing forever.",
      location: "Sajek Valley, Rangamati"
    },
    {
      id: "mem-7",
      url: "/assets/aistudio/January_25_328064f5.jpg",
      caption: "Nila Market ✨",
      dateOrYear: "January 2025",
      themeColor: "#FFE6D5",
      description: "A fun evening spent together with friends at Nila Market, enjoying the lights, cozy atmosphere, and making beautiful memories.",
      location: "Winter Fair Lights"
    },
    {
      id: "mem-8",
      url: "/assets/aistudio/September_25_3fe0b758.jpg",
      caption: "UIU Unplugged 9 🎸",
      dateOrYear: "September 2025",
      themeColor: "#FFF9F3",
      description: "A memorable day at UIU Unplugged 9 with friends and special guest, enjoying the festival atmosphere, music, and capturing fun moments together.",
      location: "Campus Festival Field"
    },
    {
      id: "mem-9",
      url: "/assets/aistudio/October_25_3ccc6806.jpg",
      caption: "After Completing Project Show 💙",
      dateOrYear: "October 2025",
      themeColor: "#FFDDE7",
      description: "A happy moment with friends after successfully completing our project show, celebrating the hard work, teamwork, and memories we made together.",
      location: "University Campus"
    },
    {
      id: "mem-10",
      url: "/assets/aistudio/December_25_0cd6c6f2.JPG",
      caption: "My Birthday 🌿",
      dateOrYear: "December 2025",
      themeColor: "#E9DFFF",
      description: "A special birthday moment spent on campus, surrounded by good vibes, a peaceful atmosphere, and memories worth keeping forever.",
      location: "Campus Central Lawn"
    },
  ] as MemoryPhoto[],

  // Little Things that remind me of you
  littleThings: [
    {
      id: "lt-1",
      title: "When You Got Mad and I Tried to Make It Up",
      body: "You would sometimes get upset over little things and sit quietly, while I tried my best to make you smile and get you to forgive me.",
      icon: "Heart",
      tagline: "Little Fights, Sweet Moments"
    },
    {
      id: "lt-2",
      title: "Our random conversations",
      body: "From deep conversations at midnight to thousands of random little things, we could talk for hours without ever running out of things to say..",
      icon: "MessageCircle",
      tagline: "Late Nights"
    },
    {
      id: "lt-3",
      title: "Those Silly Secrets Only We Understood",
      body: "We had our own little secrets where just saying one specific word was enough to leave everyone else confused, while we shared a smile that only we understood.",
      icon: "Smile",
      tagline: "Our Little Secrets"
    },
    {
      id: "lt-4",
      title: "Campus Adda with You",
      body: "Those endless adda sessions on campus, sharing stories and laughing about little things. Ordinary moments that slowly became some of my favorite memories.",
      icon: "Heart",
      tagline: "Time Well Spent"
    },
    {
      id: "lt-5",
      title: "How easily we could talk about everything",
      body: "Never having to filter thoughts or pretend to be someone else. Just being 100% our real, imperfect selves.",
      icon: "Coffee",
      tagline: "Safe Space"
    },
    {
      id: "lt-6",
      title: "The happiness of having a friend like you",
      body: "Knowing that for a meaningful chapter of life, there was someone who understood your wavelength without words.",
      icon: "Gift",
      tagline: "A True Gift"
    }
  ] as LittleThingItem[],

  // Friendship Timeline milestones
  timeline: [

    {
      id: "tl-1",
      title: "Our First Hello on Messenger 💬",
      subtitle: "Who knew one simple message would begin such an unforgettable friendship?",
      date: "February 2023",
      description: "It all started with a simple hello on Messenger. Just a little conversation that neither of us knew would lead to countless memories, endless adda, and a friendship that became a special part of our university life.",
      iconName: "MessageCircle",
      photoUrl: "/assets/aistudio/February_23_a2922172.jpg",
      tag: "Where It All Began"
    },
    {
      id: "tl-2",
      title: "Campus Days & Inside Jokes",
      subtitle: "Walking campus halls and talking about everything under the sun.",
      date: "March 2023",
      description: "From morning classes to corridor hangs, talking to you became the easiest and most natural thing in the world.",
      iconName: "HeartHandshake",
      photoUrl: "/assets/aistudio/March_23_b0cf5745.JPG",
      tag: "Campus Companions"
    },
    {
      id: "tl-3",
      title: "Adventures & Panam City",
      subtitle: "Historic streets, and days we took countless photos.",
      date: "February 2024",
      description: "Exploring ancient heritage ruins, laughing through photo shoots, and turning an ordinary trip into legendary memories.",
      iconName: "Laugh",
      photoUrl: "/assets/aistudio/February_24_bc29ccc3.jpg",
      tag: "Heritage Place"
    },
    {
      id: "tl-4",
      title: "Winter Evening at Nila Market ✨",
      subtitle: "All of us together, enjoying the winter breeze, glowing lights, and each other's company.",
      date: "January 2025",
      description: "A winter evening spent exploring Nila Market with all our friends. Walking beneath the glowing fairy lights, sharing endless adda, laughing together, and enjoying every little moment made this outing a memory worth keeping forever.",
      iconName: "Sparkles",
      photoUrl: "/assets/aistudio/January_25_328064f5.jpg",
      tag: "Winter Evening"
    },
    {
      id: "tl-5",
      title: "October 23 — Celebrating You",
      subtitle: "Things may change, but your special day will always matter.",
      date: "October 23 & Always",
      description: "Time and life take everyone on unexpected paths, but genuine appreciation never fades. Wishing you endless happiness, peace, and sunshine.",
      iconName: "Sparkles",
      photoUrl: "/assets/aistudio/IMG-20251020-WA0246_389f9e48.jpg",
      tag: "Birthday Star"
    }
  ] as TimelineMilestone[],

  // Personal Letter (Section 9)
  personalLetter: {
    heading: "Can I Tell You Something?",
    paragraphs: [
      "Moti,",
      "I don't really know when things started changing between us.",
      "We used to talk so much, and now sometimes it feels like we're living in completely different worlds.",
      "Maybe I did something wrong without realizing it. Maybe things just changed with time.",
      "I don't know.",
      "But I do know one thing.",
      "I'm really grateful for the friendship we shared.",
      "All those conversations, jokes, and little memories still make me smile.",
      "And even though we don't talk the way we used to, I still wish the best for you.",
      "I didn't make this website to make things awkward or to expect anything from you.",
      "I just wanted to make your birthday a little special.",
      "Because your birthday is still worth celebrating.",
      "And you'll always be someone I'm happy to have known.",
      "Happy Birthday. ❤️"
    ],
    closingQuote: "No matter how much changes, some memories will always be special."
  },

  // Birthday Wish section (Section 10)
  birthdayWish: {
    heading: "Make a Wish! 🎂",
    instruction: "Close your eyes, make a wish, and tap the candles.",
    blownMessage: [
      "May this new chapter bring you peace, laughter, good health, exciting opportunities, and everything your heart wishes for.",
      "You deserve a beautiful year ahead.",
      "Happy Birthday, once again! 🎉❤️"
    ]
  },

  // Hidden Easter Eggs / Surprises (Section 11)
  surprises: [
    {
      id: "surp-1",
      title: "Birthday Compliment ✨",
      message: "You have a natural ability to bring warmth and energy into any room you walk into.",
      emoji: "🌟",
      type: "star"
    },
    {
      id: "surp-2",
      title: "A Little Friendship Note 💌",
      message: "Even on the quietest days, the good times we shared remain bright in my heart.",
      emoji: "❤️",
      type: "heart"
    },
    {
      id: "surp-3",
      title: "Secret Birthday Blessing 🎁",
      message: "May all the kindness and laughter you gave to others come back to you tenfold this year.",
      emoji: "🎀",
      type: "gift"
    },
    {
      id: "surp-4",
      title: "Funny Memory Unlocked 😂",
      message: "Remember that time we couldn't stop laughing and had to pretend we were coughing? Classic.",
      emoji: "🎈",
      type: "balloon"
    },
    {
      id: "surp-5",
      title: "An Extra Birthday Wish 📜",
      message: "I hope you are surrounded by people who appreciate how genuine, kind, and unique you are.",
      emoji: "✉️",
      type: "envelope"
    }
  ] as SurpriseEasterEgg[],

  // Final Farewell section (Section 12)
  finalWish: {
    line1: "Another birthday...",
    line2: "Another chapter...",
    line3: "Another year of memories waiting to happen.",
    highlight: "Whatever life brings, I hope it brings you happiness.",
    subtext: "Thank you for being part of some of my favorite memories.",
    restartButton: "Relive Our Little Journey ↺"
  }
};
