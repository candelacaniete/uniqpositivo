import { useId } from 'react';

export default function UniqLogo({ className = '', compact = false }) {
  const viewBox = compact ? '0 0 120 120' : '0 0 360 180';
  const uniqueId = useId().replaceAll(':', '');
  const ringId = `uniqLogoRing-${uniqueId}`;
  const glowId = `uniqLogoGlow-${uniqueId}`;

  return (
    <svg className={className} viewBox={viewBox} role="img" aria-labelledby="uniq-logo-title">
      <title id="uniq-logo-title">Uniq Positivo</title>
      <defs>
        <linearGradient id={ringId} x1="12%" x2="88%" y1="90%" y2="10%">
          <stop offset="0%" stopColor="#9B4F35" />
          <stop offset="52%" stopColor="#C98763" />
          <stop offset="100%" stopColor="#D8B98C" />
        </linearGradient>
        <filter id={glowId} x="-35%" y="-35%" width="170%" height="170%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {compact ? (
        <>
          <circle cx="60" cy="60" r="54" fill="#241F1B" stroke={`url(#${ringId})`} strokeWidth="3" />
          <path
            d="M60 22 C44 42 35 56 36 72 C37 89 49 100 60 104 C71 100 83 89 84 72 C85 56 76 42 60 22Z"
            fill="none"
            stroke="#FFF9F1"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="5"
          />
          <path
            d="M60 33 C61 50 60 69 60 96 M48 62 C55 66 59 72 60 83 M72 62 C65 66 61 72 60 83"
            fill="none"
            stroke="#FFF9F1"
            strokeLinecap="round"
            strokeWidth="3"
          />
        </>
      ) : (
        <>
          <circle cx="94" cy="90" r="68" fill="#241F1B" stroke={`url(#${ringId})`} strokeWidth="3" />
          <path
            d="M94 34 C73 61 62 79 63 100 C64 122 80 136 94 141 C108 136 124 122 125 100 C126 79 115 61 94 34Z"
            fill="none"
            stroke="#FFF9F1"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="5"
          />
          <path
            d="M94 48 C96 72 94 97 94 132 M78 86 C88 92 93 101 94 116 M110 86 C100 92 95 101 94 116"
            fill="none"
            stroke="#FFF9F1"
            strokeLinecap="round"
            strokeWidth="3"
          />
          <text
            x="182"
            y="89"
            fill="#241F1B"
            filter={`url(#${glowId})`}
            fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
            fontSize="52"
            fontWeight="500"
            letterSpacing="4"
          >
            UNIQ
          </text>
          <text
            x="186"
            y="124"
            fill="#746A62"
            fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
            fontSize="18"
            fontWeight="600"
            letterSpacing="8"
          >
            POSITIVO
          </text>
        </>
      )}
    </svg>
  );
}
