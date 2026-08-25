import { useGame } from '../context/GameContext';

const skillLevels = [
  { val: 85, label: 'Strong' },
  { val: 65, label: 'Growing' },
  { val: 45, label: 'Improving' },
  { val: 30, label: 'Needs More Practice' },
];

function getLevel(val: number) {
  if (val >= 80) return { label: 'Strong', color: '#4B9180', bg: '#DDE9DD' };
  if (val >= 60) return { label: 'Growing', color: '#D9683B', bg: '#F7DDD0' };
  if (val >= 40) return { label: 'Improving', color: '#756B63', bg: '#F0EAE0' };
  return { label: 'Needs More Practice', color: '#756B63', bg: '#F0EAE0' };
}

export default function ParentGarden() {
  const { state, navigate } = useGame();

  const skills = [
    { id: 'letter', label: 'Letter Recognition', emoji: '🔤', desc: 'Recognising individual letter shapes and names', value: state.letterAccuracy },
    { id: 'sound', label: 'Sound Awareness', emoji: '🔊', desc: 'Hearing and matching individual sounds in words', value: state.soundAccuracy },
    { id: 'blend', label: 'Sound Blending', emoji: '🔀', desc: 'Blending sounds together to form words', value: Math.round((state.soundAccuracy + state.syllableAccuracy) / 2) },
    { id: 'syllable', label: 'Syllable Skills', emoji: '🥁', desc: 'Breaking words into syllable parts', value: state.syllableAccuracy },
    { id: 'reading', label: 'Reading Patterns', emoji: '📖', desc: 'Recognising common word patterns when reading', value: state.readingProgress },
  ];

  return (
    <div className="screen" style={{ background: '#FFF8EE', minHeight: '100%' }}>
      <div style={{ padding: '24px 24px 12px' }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#24313A', margin: '0 0 4px' }}>
          🌱 Literacy Garden
        </h1>
        <p style={{ fontSize: 15, color: '#756B63', margin: 0 }}>
          {state.childName || "Aarav"}'s skill growth over time
        </p>
      </div>

      {/* Visual garden */}
      <div style={{ margin: '0 24px 20px', background: 'white', borderRadius: 24, overflow: 'hidden', boxShadow: '0 4px 20px rgba(36,49,58,0.1)' }}>
        <svg viewBox="0 0 342 160" style={{ width: '100%' }}>
          <rect width="342" height="110" fill="#B8D4E8"/>
          <circle cx="300" cy="30" r="22" fill="#F6C343" opacity="0.9"/>
          <ellipse cx="60" cy="40" rx="50" ry="20" fill="white" opacity="0.6"/>

          <rect x="0" y="110" width="342" height="50" fill="#DDE9DD"/>
          <ellipse cx="171" cy="110" rx="180" ry="12" fill="#4B9180" opacity="0.3"/>

          {skills.map((s, i) => {
            const lv = getLevel(s.value);
            const x = 30 + i * 65;
            const barHeight = Math.max(15, (s.value / 100) * 70);
            return (
              <g key={s.id}>
                <rect x={x - 12} y={110 - barHeight} width={24} height={barHeight} rx="4" fill={lv.color} opacity="0.7"/>
                <text x={x} y="128" textAnchor="middle" fontSize="9" fill="#756B63">{s.emoji}</text>
                <text x={x} y="140" textAnchor="middle" fontSize="8" fill="#756B63">{s.value}%</text>
              </g>
            );
          })}
        </svg>
      </div>

      <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {skills.map(s => {
          const lv = getLevel(s.value);
          return (
            <div key={s.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 20 }}>{s.emoji}</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: '#24313A' }}>{s.label}</span>
                  </div>
                  <p style={{ fontSize: 13, color: '#756B63', margin: 0 }}>{s.desc}</p>
                </div>
                <span className={`insight-pill ${lv.label === 'Strong' ? 'insight-strong' : lv.label === 'Growing' ? 'insight-growing' : 'insight-needs'}`}>
                  {lv.label}
                </span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${s.value}%`, background: lv.color }}/>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                <span style={{ fontSize: 12, color: '#756B63' }}>Current: {s.value}%</span>
                <span style={{ fontSize: 12, color: lv.color, fontWeight: 700 }}>{lv.label}</span>
              </div>
            </div>
          );
        })}

        <button className="btn-sage" onClick={() => navigate('insights')}>
          💡 View Recommendations
        </button>
      </div>
    </div>
  );
}
