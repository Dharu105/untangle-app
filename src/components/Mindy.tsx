import React from 'react';
import type { MindyMood } from '../types';

interface MindyProps {
  mood?: MindyMood;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function Mindy({ mood = 'idle', size = 120, className = '', style }: MindyProps) {
  const getEyes = () => {
    switch (mood) {
      case 'happy':
      case 'celebrating':
      case 'excited':
        return (
          <>
            <path d="M 34 44 Q 37 40 40 44" stroke="#24313A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M 56 44 Q 59 40 62 44" stroke="#24313A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          </>
        );
      case 'confused':
        return (
          <>
            <circle cx="37" cy="44" r="5" fill="#24313A"/>
            <circle cx="59" cy="44" r="5" fill="#24313A"/>
            <circle cx="39" cy="42" r="2" fill="white"/>
            <circle cx="61" cy="42" r="2" fill="white"/>
            <path d="M 47 36 L 50 33 L 53 36" stroke="#756B63" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </>
        );
      case 'thinking':
        return (
          <>
            <circle cx="37" cy="44" r="5" fill="#24313A"/>
            <circle cx="59" cy="44" r="5" fill="#24313A"/>
            <circle cx="39" cy="42" r="2" fill="white"/>
            <circle cx="61" cy="42" r="2" fill="white"/>
            <path d="M 52 34 Q 58 30 64 34" stroke="#4B9180" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <circle cx="66" cy="32" r="2" fill="#F6C343"/>
            <circle cx="70" cy="28" r="1.5" fill="#F6C343"/>
            <circle cx="73" cy="24" r="1" fill="#F6C343"/>
          </>
        );
      case 'encouraging':
        return (
          <>
            <circle cx="37" cy="44" r="5" fill="#24313A"/>
            <circle cx="59" cy="44" r="5" fill="#24313A"/>
            <circle cx="39" cy="42" r="2" fill="white"/>
            <circle cx="61" cy="42" r="2" fill="white"/>
          </>
        );
      default:
        return (
          <>
            <circle cx="37" cy="44" r="5" fill="#24313A"/>
            <circle cx="59" cy="44" r="5" fill="#24313A"/>
            <circle cx="39" cy="42" r="2" fill="white"/>
            <circle cx="61" cy="42" r="2" fill="white"/>
          </>
        );
    }
  };

  const getMouth = () => {
    switch (mood) {
      case 'happy':
      case 'excited':
        return <path d="M 38 56 Q 48 66 58 56" stroke="#24313A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>;
      case 'celebrating':
        return (
          <>
            <path d="M 36 54 Q 48 68 60 54" stroke="#24313A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <ellipse cx="48" cy="60" rx="6" ry="4" fill="#F7DDD0"/>
          </>
        );
      case 'confused':
        return <path d="M 40 58 Q 48 56 56 60" stroke="#24313A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>;
      case 'thinking':
        return <path d="M 40 58 L 56 58" stroke="#24313A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>;
      case 'encouraging':
        return <path d="M 39 56 Q 48 63 57 56" stroke="#24313A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>;
      default:
        return <path d="M 40 56 Q 48 62 56 56" stroke="#24313A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>;
    }
  };

  const getAccessories = () => {
    switch (mood) {
      case 'celebrating':
        return (
          <>
            <circle cx="20" cy="20" r="4" fill="#F6C343" opacity="0.8"/>
            <circle cx="76" cy="15" r="3" fill="#D9683B" opacity="0.7"/>
            <circle cx="85" cy="35" r="2.5" fill="#4B9180" opacity="0.8"/>
            <path d="M 15 35 L 18 28 L 21 35" stroke="#F6C343" strokeWidth="1.5" fill="none"/>
            <path d="M 72 42 L 75 35 L 78 42" stroke="#D9683B" strokeWidth="1.5" fill="none"/>
          </>
        );
      case 'thinking':
        return null;
      default:
        return null;
    }
  };

  const animClass = mood === 'celebrating' || mood === 'excited'
    ? 'wiggle-anim'
    : mood === 'idle'
    ? 'float-anim'
    : '';

  return (
    <div className={`inline-block ${animClass} ${className}`} style={{ width: size, height: size, ...style }}>
      <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        {getAccessories()}

        {/* Body */}
        <ellipse cx="48" cy="72" rx="28" ry="16" fill="#D9683B" opacity="0.9"/>

        {/* Tail */}
        <path d="M 72 70 Q 88 65 84 55 Q 80 48 74 58" fill="#F7DDD0" stroke="#D9683B" strokeWidth="1.5"/>

        {/* Head */}
        <circle cx="48" cy="46" r="28" fill="#F7DDD0"/>

        {/* Ears */}
        <path d="M 28 24 L 22 8 L 38 18" fill="#D9683B"/>
        <path d="M 30 22 L 24 10 L 36 18" fill="#F7DDD0"/>
        <path d="M 68 24 L 74 8 L 58 18" fill="#D9683B"/>
        <path d="M 66 22 L 72 10 L 60 18" fill="#F7DDD0"/>

        {/* Cheeks */}
        <ellipse cx="28" cy="52" rx="8" ry="5" fill="#D9683B" opacity="0.2"/>
        <ellipse cx="68" cy="52" rx="8" ry="5" fill="#D9683B" opacity="0.2"/>

        {/* Nose */}
        <ellipse cx="48" cy="52" rx="4" ry="3" fill="#D9683B"/>

        {/* Eyes */}
        {getEyes()}

        {/* Mouth */}
        {getMouth()}

        {/* Body spots/detail */}
        <ellipse cx="48" cy="68" rx="16" ry="10" fill="#F7DDD0" opacity="0.7"/>

        {/* Whiskers */}
        <line x1="20" y1="50" x2="36" y2="52" stroke="#756B63" strokeWidth="1" opacity="0.5"/>
        <line x1="20" y1="54" x2="36" y2="54" stroke="#756B63" strokeWidth="1" opacity="0.5"/>
        <line x1="60" y1="52" x2="76" y2="50" stroke="#756B63" strokeWidth="1" opacity="0.5"/>
        <line x1="60" y1="54" x2="76" y2="54" stroke="#756B63" strokeWidth="1" opacity="0.5"/>
      </svg>
    </div>
  );
}
