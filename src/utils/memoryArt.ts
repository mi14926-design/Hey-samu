/**
 * Artistic SVG illustrations for the Polaroid Memory cards.
 * Generates warm, nostalgic, hand-crafted vector art with soft gradients
 * matching our color palette (#FFF9F3, #FFDDE7, #E9DFFF, #FFE6D5).
 */

export function getMemoryArtSvg(memoryId: string): string {
  switch (memoryId) {
    case 'mem-1': // Random adventures (scenic road/hill)
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="%23FFDDE7"/>
            <stop offset="60%" stop-color="%23FFE6D5"/>
            <stop offset="100%" stop-color="%23FFF9F3"/>
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(%23g1)"/>
        <circle cx="200" cy="180" r="70" fill="%23FFE6D5" opacity="0.8"/>
        <path d="M-20 260 Q 100 190 220 220 T 420 200 L 420 300 L -20 300 Z" fill="%23E9DFFF" opacity="0.7"/>
        <path d="M-20 280 Q 140 230 260 250 T 420 230 L 420 300 L -20 300 Z" fill="%23f5b7c7" opacity="0.6"/>
        <!-- Two silhouettes walking -->
        <circle cx="185" cy="195" r="7" fill="%23343039" opacity="0.75"/>
        <path d="M180 203 Q 185 200 190 203 L 188 220 L 182 220 Z" fill="%23343039" opacity="0.75"/>
        <circle cx="205" cy="197" r="7" fill="%23343039" opacity="0.75"/>
        <path d="M200 205 Q 205 202 210 205 L 208 221 L 202 221 Z" fill="%23343039" opacity="0.75"/>
        <!-- Sun sparkle -->
        <circle cx="310" cy="80" r="14" fill="%23FFE6D5"/>
        <path d="M310 60 L 310 100 M 290 80 L 330 80" stroke="%23ffc89b" stroke-width="2" stroke-linecap="round"/>
      </svg>`;

    case 'mem-2': // Coffee table talk
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
        <defs>
          <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="%23FFF9F3"/>
            <stop offset="100%" stop-color="%23FFE6D5"/>
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(%23g2)"/>
        <!-- Cozy wooden table -->
        <circle cx="200" cy="350" r="260" fill="%23f7ede2" stroke="%23FFE6D5" stroke-width="4"/>
        <!-- Mug 1 -->
        <rect x="130" y="140" width="46" height="54" rx="10" fill="%23FFDDE7"/>
        <path d="M176 152 C 190 152 190 178 176 178" stroke="%23f5b7c7" stroke-width="5" fill="none" stroke-linecap="round"/>
        <ellipse cx="153" cy="144" rx="16" ry="6" fill="%239c6644"/>
        <path d="M148 135 Q 150 120 155 110" stroke="%23d6a284" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.6"/>
        <!-- Mug 2 -->
        <rect x="224" y="130" width="48" height="56" rx="10" fill="%23E9DFFF"/>
        <path d="M224 142 C 210 142 210 168 224 168" stroke="%23c4b5fd" stroke-width="5" fill="none" stroke-linecap="round"/>
        <ellipse cx="248" cy="134" rx="17" ry="6" fill="%237f4f24"/>
        <path d="M245 125 Q 248 110 252 100" stroke="%23d6a284" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.6"/>
        <!-- Small sweet pastry & notebook -->
        <rect x="150" y="210" width="100" height="60" rx="4" fill="%23ffffff" stroke="%23FFE6D5" stroke-width="2"/>
        <line x1="165" y1="225" x2="235" y2="225" stroke="%23FFDDE7" stroke-width="2"/>
        <line x1="165" y1="238" x2="220" y2="238" stroke="%23FFDDE7" stroke-width="2"/>
      </svg>`;

    case 'mem-3': // Late night conversation / starry night
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
        <defs>
          <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="%23343039"/>
            <stop offset="70%" stop-color="%23584d63"/>
            <stop offset="100%" stop-color="%23E9DFFF"/>
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(%23g3)"/>
        <!-- Crescent Moon -->
        <path d="M300 60 A 24 24 0 0 0 316 100 A 28 28 0 1 1 300 60" fill="%23FFF9F3"/>
        <!-- Twinkling stars -->
        <circle cx="80" cy="50" r="2.5" fill="%23FFF9F3"/>
        <circle cx="150" cy="70" r="1.8" fill="%23FFF9F3"/>
        <circle cx="220" cy="40" r="3" fill="%23FFF9F3"/>
        <circle cx="340" cy="120" r="2" fill="%23FFF9F3"/>
        <circle cx="100" cy="130" r="2.2" fill="%23FFF9F3"/>
        <circle cx="180" cy="110" r="1.5" fill="%23FFF9F3"/>
        <!-- Fairy lights strung across -->
        <path d="M 0 160 Q 100 185 200 165 T 400 170" fill="none" stroke="%23FFF9F3" stroke-width="1.5" opacity="0.4"/>
        <circle cx="60" cy="172" r="5" fill="%23FFE6D5" opacity="0.9"/>
        <circle cx="130" cy="176" r="5" fill="%23FFDDE7" opacity="0.9"/>
        <circle cx="210" cy="166" r="5" fill="%23FFE6D5" opacity="0.9"/>
        <circle cx="280" cy="171" r="5" fill="%23FFDDE7" opacity="0.9"/>
        <circle cx="350" cy="168" r="5" fill="%23FFE6D5" opacity="0.9"/>
      </svg>`;

    case 'mem-4': // Golden hour sunset hill
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
        <defs>
          <linearGradient id="g4" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="%23f7a072"/>
            <stop offset="50%" stop-color="%23ffc89b"/>
            <stop offset="100%" stop-color="%23FFF9F3"/>
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(%23g4)"/>
        <!-- Big radiant glowing sun -->
        <circle cx="200" cy="160" r="50" fill="%23ffffff" opacity="0.85"/>
        <circle cx="200" cy="160" r="75" fill="%23ffe6a7" opacity="0.4"/>
        <!-- Soft hill contours -->
        <path d="M0 220 Q 130 180 240 210 T 400 190 L 400 300 L 0 300 Z" fill="%23b08968" opacity="0.5"/>
        <path d="M0 250 Q 160 210 280 240 T 400 230 L 400 300 L 0 300 Z" fill="%237f4f24" opacity="0.6"/>
      </svg>`;

    case 'mem-5': // Downtown stroll / city afternoon
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
        <defs>
          <linearGradient id="g5" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="%23E9DFFF"/>
            <stop offset="100%" stop-color="%23FFDDE7"/>
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(%23g5)"/>
        <!-- Stylized cozy buildings -->
        <rect x="40" y="120" width="60" height="180" rx="4" fill="%23ffffff" opacity="0.85"/>
        <rect x="110" y="90" width="70" height="210" rx="4" fill="%23FFF9F3" opacity="0.95"/>
        <rect x="190" y="140" width="55" height="160" rx="4" fill="%23ffffff" opacity="0.8"/>
        <rect x="255" y="110" width="65" height="190" rx="4" fill="%23FFF9F3" opacity="0.9"/>
        <rect x="330" y="150" width="50" height="150" rx="4" fill="%23ffffff" opacity="0.85"/>
        <!-- Little windows -->
        <rect x="125" y="110" width="14" height="20" rx="2" fill="%23FFE6D5"/>
        <rect x="150" y="110" width="14" height="20" rx="2" fill="%23FFE6D5"/>
        <rect x="125" y="145" width="14" height="20" rx="2" fill="%23FFDDE7"/>
        <rect x="150" y="145" width="14" height="20" rx="2" fill="%23FFDDE7"/>
      </svg>`;

    case 'mem-6': // Cafe corner / funny moments
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
        <defs>
          <linearGradient id="g6" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="%23FFDDE7"/>
            <stop offset="100%" stop-color="%23FFE6D5"/>
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(%23g6)"/>
        <!-- Laughing faces doodle & polaroid camera -->
        <rect x="140" y="90" width="120" height="110" rx="16" fill="%23ffffff" stroke="%23343039" stroke-width="3"/>
        <circle cx="200" cy="145" r="32" fill="%23E9DFFF" stroke="%23343039" stroke-width="3"/>
        <circle cx="200" cy="145" r="16" fill="%23343039"/>
        <circle cx="235" cy="110" r="8" fill="%23f7a072"/>
        <rect x="155" y="105" width="22" height="12" rx="3" fill="%23343039"/>
        <!-- Sparkles -->
        <path d="M90 70 L 90 90 M 80 80 L 100 80" stroke="%23343039" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M310 160 L 310 180 M 300 170 L 320 170" stroke="%23343039" stroke-width="2.5" stroke-linecap="round"/>
      </svg>`;

    case 'mem-7': // Backyard celebration
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
        <defs>
          <linearGradient id="g7" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="%23FFF9F3"/>
            <stop offset="50%" stop-color="%23FFDDE7"/>
            <stop offset="100%" stop-color="%23E9DFFF"/>
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(%23g7)"/>
        <!-- Bunting flags -->
        <path d="M 0 50 Q 100 90 200 60 T 400 65" fill="none" stroke="%23343039" stroke-width="1.5" stroke-dasharray="4 3"/>
        <polygon points="40,60 70,64 55,100" fill="%23FFDDE7"/>
        <polygon points="100,72 130,75 115,110" fill="%23FFE6D5"/>
        <polygon points="160,65 190,62 175,98" fill="%23E9DFFF"/>
        <polygon points="230,62 260,65 245,102" fill="%23FFDDE7"/>
        <polygon points="300,65 330,65 315,100" fill="%23FFE6D5"/>
        <!-- Cupcakes and candles -->
        <ellipse cx="200" cy="220" rx="55" ry="18" fill="%23f7ede2"/>
        <rect x="175" y="160" width="50" height="50" rx="8" fill="%23FFDDE7"/>
        <circle cx="200" cy="155" r="18" fill="%23FFE6D5"/>
      </svg>`;

    case 'mem-8': // Spontaneous roadtrip / drive
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
        <defs>
          <linearGradient id="g8" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="%23FFE6D5"/>
            <stop offset="100%" stop-color="%23FFF9F3"/>
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(%23g8)"/>
        <!-- Open road perspective -->
        <polygon points="180,120 220,120 360,300 40,300" fill="%23e5e5e5"/>
        <line x1="200" y1="125" x2="200" y2="295" stroke="%23ffffff" stroke-width="6" stroke-dasharray="16 12"/>
        <!-- Horizon mountains -->
        <polygon points="20,140 100,80 180,140" fill="%23E9DFFF" opacity="0.7"/>
        <polygon points="140,140 220,70 310,140" fill="%23FFDDE7" opacity="0.6"/>
        <polygon points="260,140 330,90 390,140" fill="%23FFE6D5" opacity="0.8"/>
      </svg>`;

    case 'mem-9': // Favorite music & headphones
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
        <defs>
          <linearGradient id="g9" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="%23E9DFFF"/>
            <stop offset="100%" stop-color="%23FFF9F3"/>
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(%23g9)"/>
        <!-- Retro headphones -->
        <path d="M130 160 A 70 70 0 0 1 270 160" fill="none" stroke="%23343039" stroke-width="8" stroke-linecap="round"/>
        <rect x="110" y="145" width="24" height="42" rx="8" fill="%23FFDDE7" stroke="%23343039" stroke-width="3"/>
        <rect x="266" y="145" width="24" height="42" rx="8" fill="%23FFDDE7" stroke="%23343039" stroke-width="3"/>
        <!-- Floating musical notes -->
        <circle cx="160" cy="90" r="6" fill="%23343039"/>
        <path d="M166 90 L 166 65 L 185 60 L 185 85" fill="none" stroke="%23343039" stroke-width="3"/>
        <circle cx="185" cy="85" r="6" fill="%23343039"/>
      </svg>`;

    default: // Cherished memories
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
        <defs>
          <linearGradient id="gd" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="%23FFDDE7"/>
            <stop offset="50%" stop-color="%23FFE6D5"/>
            <stop offset="100%" stop-color="%23E9DFFF"/>
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(%23gd)"/>
        <!-- Big soft heart -->
        <path d="M200 230 C 120 180 120 120 160 90 C 190 70 200 95 200 95 C 200 95 210 70 240 90 C 280 120 280 180 200 230 Z" fill="%23ffffff" opacity="0.85"/>
        <circle cx="140" cy="70" r="4" fill="%23FFDDE7"/>
        <circle cx="260" cy="70" r="4" fill="%23E9DFFF"/>
        <circle cx="200" cy="50" r="3" fill="%23FFE6D5"/>
      </svg>`;
  }
}
