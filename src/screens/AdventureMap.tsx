import { useState } from 'react';
import { useGame } from '../context/GameContext';
import Mindy from '../components/Mindy';
import type { Screen } from '../types';

const mapLocations = [
  { id: 'soundGarden' as Screen, x: 60, y: 120, emoji: '🔊', name: 'Sound Garden', color: '#4B9180' },
  { id: 'letterGrove' as Screen, x: 160, y: 80, emoji: '🌳', name: 'Letter Grove', color: '#D9683B' },
  { id: 'kiteMeadow' as Screen, x: 260, y: 100, emoji: '🪁', name: 'Kite Meadow', color: '#756B63' },
  { id: 'pulsePath' as Screen, x: 80, y: 200, emoji: '🥁', name: 'Pulse Path', color: '#4B9180' },
  { id: 'mindyMixup' as Screen, x: 180, y: 180, emoji: '🐱', name: "Mindy's House", color: '#D9683B' },
  { id: 'bookCorner' as Screen, x: 290, y: 200, emoji: '📖', name: 'Book Corner', color: '#756B63' },
  { id: 'theMela' as Screen, x: 170, y: 280, emoji: '🎪', name: 'The Mela', color: '#F6C343' },
];

export default function AdventureMap() {
  const { navigate } = useGame();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="screen" style={{ background: '#FFF8EE', minHeight: '100%' }}>
      <div style={{ padding: '20px 24px 8px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('villageHome')} style={{ background: 'white', border: 'none', borderRadius: 12, width: 40, height: 40, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px rgba(36,49,58,0.1)' }}>←</button>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#24313A', margin: '0 0 2px' }}>🗺️ Adventure Map</h1>
          <p style={{ fontSize: 13, color: '#756B63', margin: 0 }}>Where should we go?</p>
        </div>
      </div>

      {/* Mindy hint */}
      <div style={{ padding: '0 24px 12px', display: 'flex', gap: 10, alignItems: 'center' }}>
        <Mindy mood="excited" size={56}/>
        <div style={{ background: '#F7DDD0', borderRadius: 14, padding: '10px 14px', flex: 1 }}>
          <p style={{ fontSize: 14, color: '#24313A', margin: 0 }}>Tap a place to start your adventure! 🌟</p>
        </div>
      </div>

      {/* Map */}
      <div style={{ margin: '0 16px', background: 'white', borderRadius: 24, overflow: 'hidden', boxShadow: '0 4px 20px rgba(36,49,58,0.1)', position: 'relative' }}>
        <svg viewBox="0 0 340 340" style={{ width: '100%' }}>
          {/* Background */}
          <rect width="340" height="340" fill="#DDE9DD"/>

          {/* Paths */}
          <path d="M 60 120 Q 110 80 160 80" stroke="#C4A882" strokeWidth="3" fill="none" strokeDasharray="6,4" opacity="0.7"/>
          <path d="M 160 80 Q 210 80 260 100" stroke="#C4A882" strokeWidth="3" fill="none" strokeDasharray="6,4" opacity="0.7"/>
          <path d="M 60 120 Q 60 160 80 200" stroke="#C4A882" strokeWidth="3" fill="none" strokeDasharray="6,4" opacity="0.7"/>
          <path d="M 80 200 Q 130 190 180 180" stroke="#C4A882" strokeWidth="3" fill="none" strokeDasharray="6,4" opacity="0.7"/>
          <path d="M 260 100 Q 280 150 290 200" stroke="#C4A882" strokeWidth="3" fill="none" strokeDasharray="6,4" opacity="0.7"/>
          <path d="M 180 180 Q 190 240 170 280" stroke="#C4A882" strokeWidth="3" fill="none" strokeDasharray="6,4" opacity="0.7"/>
          <path d="M 290 200 Q 260 250 170 280" stroke="#C4A882" strokeWidth="3" fill="none" strokeDasharray="6,4" opacity="0.7"/>

          {/* Decorative elements */}
          <circle cx="130" cy="150" r="8" fill="#4B9180" opacity="0.3"/>
          <circle cx="220" cy="140" r="6" fill="#4B9180" opacity="0.3"/>
          <circle cx="100" cy="250" r="5" fill="#F6C343" opacity="0.4"/>

          {/* River */}
          <path d="M 150 160 Q 170 170 190 160 Q 210 150 230 165" stroke="#B8D4E8" strokeWidth="6" fill="none" opacity="0.6"/>

          {/* Location markers */}
          {mapLocations.map(loc => (
            <g key={loc.id} onClick={() => navigate(loc.id)} style={{ cursor: 'pointer' }}>
              <circle
                cx={loc.x}
                cy={loc.y}
                r={hovered === loc.id ? 28 : 24}
                fill={loc.color}
                opacity="0.15"
                style={{ transition: 'r 0.2s' }}
              />
              <circle
                cx={loc.x}
                cy={loc.y}
                r={hovered === loc.id ? 20 : 18}
                fill="white"
                stroke={loc.color}
                strokeWidth="2.5"
                style={{ transition: 'r 0.2s' }}
                onMouseEnter={() => setHovered(loc.id)}
                onMouseLeave={() => setHovered(null)}
              />
              <text x={loc.x} y={loc.y + 6} textAnchor="middle" fontSize={hovered === loc.id ? "16" : "14"} style={{ transition: 'font-size 0.2s' }}>
                {loc.emoji}
              </text>
              <text x={loc.x} y={loc.y + 32} textAnchor="middle" fontSize="9" fill="#24313A" fontWeight="600">
                {loc.name.split(' ')[0]}
              </text>
            </g>
          ))}

          {/* Mindy position indicator */}
          <circle cx="160" cy="80" r="8" fill="#D9683B" opacity="0.4">
            <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.4;0.7;0.4" dur="2s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>

      {/* Location list */}
      <div style={{ padding: '16px 24px 24px' }}>
        <p style={{ fontSize: 14, color: '#756B63', margin: '0 0 10px', fontWeight: 700 }}>Quick access:</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {mapLocations.map(loc => (
            <button
              key={loc.id}
              onClick={() => navigate(loc.id)}
              style={{
                background: 'white',
                border: `1.5px solid ${loc.color}20`,
                borderRadius: 12,
                padding: '8px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer',
                boxShadow: '0 1px 4px rgba(36,49,58,0.06)',
                fontFamily: "'OpenDyslexic', 'Atkinson Hyperlegible', sans-serif",
                fontSize: 13,
                color: '#24313A',
                fontWeight: 700,
              }}
            >
              <span>{loc.emoji}</span>
              <span>{loc.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
