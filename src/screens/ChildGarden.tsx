import { useGame } from '../context/GameContext';
import Mindy from '../components/Mindy';

export default function ChildGarden() {
  const { state, navigate } = useGame();

  const letterLevel = Math.min(5, Math.floor(state.letterAccuracy / 20));
  const soundLevel = Math.min(5, Math.floor(state.soundAccuracy / 20));
  const wordLevel = Math.min(5, Math.floor(state.syllableAccuracy / 20));
  const readLevel = Math.min(5, Math.floor(state.readingProgress / 20));

  return (
    <div className="screen" style={{ background: 'linear-gradient(180deg, #DDE9DD 0%, #FFF8EE 40%)', minHeight: '100%' }}>
      <div style={{ padding: '20px 24px 8px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#24313A', margin: 0 }}>🌱 My Learning Garden</h1>
      </div>

      {/* Garden scene */}
      <div style={{ margin: '0 24px 20px', background: 'white', borderRadius: 24, overflow: 'hidden', boxShadow: '0 4px 20px rgba(36,49,58,0.1)' }}>
        <svg viewBox="0 0 342 200" style={{ width: '100%' }}>
          {/* Sky */}
          <rect width="342" height="130" fill="#B8D4E8"/>
          <ellipse cx="60" cy="40" rx="50" ry="22" fill="white" opacity="0.7"/>
          <ellipse cx="280" cy="30" rx="60" ry="25" fill="white" opacity="0.6"/>
          <circle cx="290" cy="25" r="20" fill="#F6C343" opacity="0.8"/>

          {/* Ground */}
          <rect x="0" y="130" width="342" height="70" fill="#DDE9DD"/>
          <ellipse cx="171" cy="130" rx="180" ry="15" fill="#4B9180" opacity="0.3"/>

          {/* Letter Tree */}
          <rect x="30" y="95" width="10" height="45" fill="#8B6914" opacity="0.7"/>
          <circle cx="35" cy={100 - letterLevel * 8} r={14 + letterLevel * 4} fill="#4B9180" opacity="0.8"/>
          {letterLevel > 2 && <text x="35" y={90 - letterLevel * 8 + 5} textAnchor="middle" fontSize="10">A</text>}

          {/* Sound Flowers */}
          {Array.from({ length: soundLevel }).map((_, i) => (
            <g key={i} transform={`translate(${70 + i * 22}, 130)`}>
              <rect x="-2" y="-30" width="4" height="30" fill="#4B9180" opacity="0.7"/>
              <circle cx="0" cy="-30" r="9" fill="#F7DDD0"/>
              <circle cx="0" cy="-30" r="5" fill="#D9683B"/>
            </g>
          ))}

          {/* Word Kites */}
          {Array.from({ length: Math.min(wordLevel, 3) }).map((_, i) => (
            <g key={i} transform={`translate(${165 + i * 40}, ${60 - i * 15})`}>
              <polygon points="0,-12 8,0 0,12 -8,0" fill={['#D9683B', '#4B9180', '#F6C343'][i]} opacity="0.8"/>
              <line x1="0" y1="12" x2={-5 + i * 3} y2="40" stroke="#756B63" strokeWidth="1"/>
            </g>
          ))}

          {/* Reading Tree */}
          <rect x="295" y="100" width="10" height="40" fill="#8B6914" opacity="0.7"/>
          <circle cx="300" cy={105 - readLevel * 5} r={12 + readLevel * 3} fill="#4B9180" opacity="0.7"/>
          {readLevel > 1 && <text x="300" y={100 - readLevel * 5 + 4} textAnchor="middle" fontSize="9">📖</text>}

          {/* Creatures */}
          {state.unlockedCreatures.map((c, i) => (
            <text key={c.id} x={90 + i * 35} y="155" fontSize="18">{c.emoji}</text>
          ))}
        </svg>
      </div>

      {/* Sections */}
      <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[
          { label: '🌳 Letter Tree', value: state.letterAccuracy, color: '#D9683B', tap: 'letterGrove' },
          { label: '🌸 Sound Flowers', value: state.soundAccuracy, color: '#4B9180', tap: 'soundGarden' },
          { label: '🪁 Word Kites', value: state.syllableAccuracy, color: '#756B63', tap: 'kiteMeadow' },
          { label: '📖 Reading Tree', value: state.readingProgress, color: '#4B9180', tap: 'bookCorner' },
        ].map(sec => (
          <button
            key={sec.label}
            onClick={() => navigate(sec.tap as any)}
            style={{ background: 'white', borderRadius: 16, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(36,49,58,0.07)', textAlign: 'left', fontFamily: "'OpenDyslexic', 'Atkinson Hyperlegible', sans-serif" }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: '#24313A' }}>{sec.label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: sec.color }}>{sec.value}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${sec.value}%`, background: sec.color }}/>
              </div>
            </div>
            <span style={{ color: '#756B63' }}>›</span>
          </button>
        ))}

        {/* Creatures */}
        <div style={{ background: 'white', borderRadius: 16, padding: '16px', boxShadow: '0 2px 8px rgba(36,49,58,0.07)' }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#24313A', margin: '0 0 12px' }}>🐾 Village Friends ({state.unlockedCreatures.length})</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {state.unlockedCreatures.map(c => (
              <div key={c.id} style={{ textAlign: 'center' }}>
                <div className="creature-badge">{c.emoji}</div>
                <p style={{ fontSize: 11, color: '#756B63', margin: '4px 0 0' }}>{c.name}</p>
              </div>
            ))}
            {state.unlockedCreatures.length < 5 && (
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#F7DDD0', border: '2px dashed #D9683B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#D9683B' }}>+</div>
            )}
          </div>
        </div>
      </div>

      <div style={{ padding: '12px 24px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Mindy mood="happy" size={52}/>
          <p style={{ fontSize: 14, color: '#756B63', margin: 0 }}>Your garden is growing! Keep exploring! 🌱</p>
        </div>
      </div>
    </div>
  );
}
