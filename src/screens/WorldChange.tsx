import { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import Mindy from '../components/Mindy';

export default function WorldChange() {
  const { state, navigate } = useGame();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 600);
    const t2 = setTimeout(() => setStage(2), 1400);
    const t3 = setTimeout(() => setStage(3), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const changes = [
    { icon: '☁️ → ⛅', label: 'Storm is clearing!', color: '#4B9180' },
    { icon: '🌱 → 🌳', label: 'A new tree grew!', color: '#4B9180' },
    { icon: '🐝', label: 'Bumble joins the village!', color: '#F6C343' },
    { icon: '🌉', label: 'A bridge appeared!', color: '#D9683B' },
  ];

  return (
    <div className="screen" style={{
      background: 'linear-gradient(180deg, #B8D4E8 0%, #DDE9DD 50%, #FFF8EE 100%)',
      minHeight: '100%',
      padding: '32px 28px',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#24313A', margin: '0 0 6px' }}>
          The village is changing! ✨
        </h1>
        <p style={{ fontSize: 16, color: '#756B63', margin: 0 }}>Your untangling is working!</p>
      </div>

      {/* Village scene */}
      <div style={{ background: 'white', borderRadius: 24, padding: '20px', marginBottom: 20, boxShadow: '0 4px 20px rgba(36,49,58,0.1)', textAlign: 'center' }}>
        <svg viewBox="0 0 340 180" style={{ width: '100%' }}>
          {/* Sky */}
          <rect width="340" height="120" fill={stage >= 2 ? '#B8D4E8' : '#9BA8B5'} style={{ transition: 'fill 1s' }}/>

          {/* Storm clouds (clearing) */}
          <ellipse cx="80" cy="40" rx="60" ry="30" fill={stage >= 1 ? '#DDE9DD' : '#6B7A85'} style={{ transition: 'fill 1s' }} opacity="0.7"/>
          <ellipse cx="200" cy="25" rx="80" ry="35" fill={stage >= 1 ? '#E8F4E8' : '#5A6E7A'} style={{ transition: 'fill 1s' }} opacity="0.6"/>
          <ellipse cx="290" cy="45" rx="55" ry="28" fill={stage >= 1 ? '#DDE9DD' : '#6B7A85'} style={{ transition: 'fill 1s' }} opacity="0.7"/>

          {/* Sun emerging */}
          {stage >= 2 && (
            <circle cx="280" cy="30" r="25" fill="#F6C343" opacity="0.9" style={{ animation: 'grow 0.8s ease-out' }}/>
          )}

          {/* Ground */}
          <rect x="0" y="120" width="340" height="60" fill="#DDE9DD"/>

          {/* Houses */}
          <rect x="20" y="100" width="50" height="60" rx="4" fill="#F7DDD0"/>
          <polygon points="20,100 70,100 45,75" fill="#D9683B"/>
          <rect x="35" y="125" width="20" height="35" rx="4" fill="#C4A882" opacity="0.7"/>

          <rect x="200" y="95" width="60" height="65" rx="4" fill="#F7DDD0"/>
          <polygon points="200,95 260,95 230,68" fill="#4B9180"/>
          <rect x="218" y="120" width="24" height="40" rx="4" fill="#C4A882" opacity="0.7"/>

          {/* Bridge */}
          {stage >= 3 && (
            <>
              <rect x="100" y="128" width="90" height="12" rx="4" fill="#C4A882" style={{ animation: 'grow 0.6s ease-out' }}/>
              <line x1="110" y1="128" x2="110" y2="118" stroke="#A08060" strokeWidth="3"/>
              <line x1="135" y1="128" x2="135" y2="113" stroke="#A08060" strokeWidth="3"/>
              <line x1="160" y1="128" x2="160" y2="113" stroke="#A08060" strokeWidth="3"/>
              <line x1="185" y1="128" x2="185" y2="118" stroke="#A08060" strokeWidth="3"/>
              <line x1="110" y1="118" x2="185" y2="118" stroke="#A08060" strokeWidth="2"/>
            </>
          )}

          {/* Trees */}
          <circle cx="130" cy="108" r={stage >= 2 ? 20 : 12} fill="#4B9180" style={{ transition: 'r 0.8s' }}/>
          <rect x="126" y="120" width="8" height="30" fill="#756B63" opacity="0.5"/>

          {/* Creature */}
          {stage >= 3 && (
            <text x="310" y="130" fontSize="20" style={{ animation: 'grow 0.5s ease-out' }}>🐝</text>
          )}
        </svg>
      </div>

      {/* Change list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {changes.map((c, i) => (
          <div key={i} style={{
            background: 'white',
            borderRadius: 14,
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            boxShadow: '0 2px 8px rgba(36,49,58,0.07)',
            opacity: stage > i ? 1 : 0.3,
            transform: `translateX(${stage > i ? 0 : 20}px)`,
            transition: `all 0.4s ease ${i * 0.15}s`,
          }}>
            <span style={{ fontSize: 20 }}>{c.icon}</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: c.color }}>{c.label}</span>
            {stage > i && <span style={{ marginLeft: 'auto', fontSize: 18 }}>✓</span>}
          </div>
        ))}
      </div>

      {/* Storm progress */}
      <div style={{ background: 'white', borderRadius: 16, padding: '14px 16px', marginBottom: 24, boxShadow: '0 2px 8px rgba(36,49,58,0.07)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#4B9180' }}>⛅ Tangle Storm</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#24313A' }}>{state.stormProgress}% cleared</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${state.stormProgress}%`, background: 'linear-gradient(90deg, #4B9180, #DDE9DD)' }}/>
        </div>
      </div>

      <Mindy mood="celebrating" size={80} style={{ display: 'block', margin: '0 auto 20px' }}/>

      <button className="btn-primary" onClick={() => navigate('villageHome')}>
        🏡 Back to the Village!
      </button>
    </div>
  );
}
