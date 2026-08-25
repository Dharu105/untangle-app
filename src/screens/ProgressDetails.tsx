import { useState } from 'react';
import { useGame } from '../context/GameContext';

type Tab = 'week' | 'month' | 'all';

const mockData: Record<Tab, { label: string; sound: number; letter: number; syllable: number; reading: number }[]> = {
  week: [
    { label: 'Mon', sound: 52, letter: 68, syllable: 58, reading: 38 },
    { label: 'Tue', sound: 55, letter: 70, syllable: 60, reading: 40 },
    { label: 'Wed', sound: 58, letter: 72, syllable: 61, reading: 42 },
    { label: 'Thu', sound: 55, letter: 70, syllable: 60, reading: 40 },
    { label: 'Fri', sound: 60, letter: 73, syllable: 63, reading: 43 },
    { label: 'Sat', sound: 62, letter: 74, syllable: 64, reading: 44 },
    { label: 'Sun', sound: 55, letter: 70, syllable: 60, reading: 40 },
  ],
  month: [
    { label: 'Wk 1', sound: 45, letter: 60, syllable: 50, reading: 32 },
    { label: 'Wk 2', sound: 50, letter: 65, syllable: 55, reading: 36 },
    { label: 'Wk 3', sound: 54, letter: 68, syllable: 58, reading: 39 },
    { label: 'Wk 4', sound: 60, letter: 73, syllable: 62, reading: 43 },
  ],
  all: [
    { label: 'Aug', sound: 35, letter: 50, syllable: 42, reading: 25 },
    { label: 'Sep', sound: 45, letter: 60, syllable: 52, reading: 32 },
    { label: 'Oct', sound: 55, letter: 70, syllable: 60, reading: 40 },
  ],
};

export default function ProgressDetails() {
  const { state, navigate } = useGame();
  const [tab, setTab] = useState<Tab>('week');

  const data = mockData[tab];
  const latest = data[data.length - 1];

  const skills = [
    { key: 'sound' as const, label: 'Sound Awareness', color: '#4B9180' },
    { key: 'letter' as const, label: 'Letter Recognition', color: '#D9683B' },
    { key: 'syllable' as const, label: 'Syllable Skills', color: '#756B63' },
    { key: 'reading' as const, label: 'Reading Patterns', color: '#F6C343' },
  ];

  return (
    <div className="screen" style={{ background: '#FFF8EE', minHeight: '100%' }}>
      <div style={{ padding: '24px 24px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('parentDashboard')} style={{ background: 'white', border: 'none', borderRadius: 12, width: 40, height: 40, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px rgba(36,49,58,0.1)' }}>←</button>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#24313A', margin: 0 }}>📊 Progress Details</h1>
      </div>

      {/* Tab bar */}
      <div style={{ padding: '0 24px 16px', display: 'flex', gap: 8 }}>
        {(['week', 'month', 'all'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: 12,
              background: tab === t ? '#D9683B' : 'white',
              color: tab === t ? 'white' : '#756B63',
              border: 'none',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 700,
              fontFamily: "'OpenDyslexic', 'Atkinson Hyperlegible', sans-serif",
              boxShadow: '0 2px 6px rgba(36,49,58,0.07)',
              transition: 'all 0.2s',
            }}
          >
            {t === 'week' ? 'This Week' : t === 'month' ? 'Month' : 'All Time'}
          </button>
        ))}
      </div>

      <div style={{ padding: '0 24px 24px' }}>
        {/* Chart */}
        <div className="card" style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#24313A', margin: '0 0 16px' }}>Progress Chart</p>
          <svg viewBox={`0 0 ${data.length * 50} 100`} style={{ width: '100%', overflow: 'visible' }}>
            {skills.map((s, si) => (
              <polyline
                key={s.key}
                points={data.map((d, i) => `${i * 50 + 25},${100 - d[s.key]}`).join(' ')}
                fill="none"
                stroke={s.color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.8"
              />
            ))}
            {data.map((d, i) => (
              <text key={i} x={i * 50 + 25} y="115" textAnchor="middle" fontSize="9" fill="#756B63">{d.label}</text>
            ))}
          </svg>
          {/* Legend */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 8 }}>
            {skills.map(s => (
              <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 12, height: 3, borderRadius: 2, background: s.color }}/>
                <span style={{ fontSize: 11, color: '#756B63' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Current values */}
        {skills.map(s => {
          const curr = state[s.key === 'letter' ? 'letterAccuracy' : s.key === 'sound' ? 'soundAccuracy' : s.key === 'syllable' ? 'syllableAccuracy' : 'readingProgress'];
          const prev = latest[s.key] - 5;
          const delta = curr - prev;
          return (
            <div key={s.key} className="card" style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#24313A' }}>{s.label}</span>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  {delta > 0 && <span style={{ fontSize: 12, color: '#4B9180', fontWeight: 700 }}>↑ +{delta}%</span>}
                  {delta < 0 && <span style={{ fontSize: 12, color: '#D9683B', fontWeight: 700 }}>↓ {delta}%</span>}
                  <span style={{ fontSize: 14, fontWeight: 700, color: s.color }}>{curr}%</span>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${curr}%`, background: s.color }}/>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
