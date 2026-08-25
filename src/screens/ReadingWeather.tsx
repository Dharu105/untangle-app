import { useGame } from '../context/GameContext';

export default function ReadingWeather() {
  const { state, navigate } = useGame();

  const avg = Math.round((state.letterAccuracy + state.soundAccuracy + state.syllableAccuracy + state.readingProgress) / 4);

  const weather = avg >= 75
    ? { type: 'clear', icon: '☀️', title: 'Clear Sky', desc: 'Strong progress across repeated activities.', cardClass: 'weather-clear', trend: '+8% this week' }
    : avg >= 55
    ? { type: 'clearing', icon: '⛅', title: 'Clearing', desc: 'Recent activities show improvement.', cardClass: 'weather-clearing', trend: '+4% this week' }
    : { type: 'storm', icon: '🌩️', title: 'Tangle Storm', desc: 'Some patterns need more practice.', cardClass: 'weather-storm', trend: 'Keep going!' };

  const history = [
    { week: '4 weeks ago', icon: '🌩️', label: 'Storm' },
    { week: '3 weeks ago', icon: '🌩️', label: 'Storm' },
    { week: '2 weeks ago', icon: '⛅', label: 'Clearing' },
    { week: 'Last week', icon: '⛅', label: 'Clearing' },
    { week: 'This week', icon: weather.icon, label: weather.title },
  ];

  return (
    <div className="screen" style={{ background: '#FFF8EE', minHeight: '100%' }}>
      <div style={{ padding: '24px 24px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('parentDashboard')} style={{ background: 'white', border: 'none', borderRadius: 12, width: 40, height: 40, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px rgba(36,49,58,0.1)' }}>←</button>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#24313A', margin: 0 }}>🌦️ Reading Weather</h1>
      </div>

      <div style={{ padding: '0 24px 24px' }}>
        {/* Main weather card */}
        <div className={`weather-card ${weather.cardClass}`} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 64, marginBottom: 12 }}>{weather.icon}</div>
          <h2 style={{ fontSize: 26, fontWeight: 700, margin: '0 0 8px', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
            {weather.title}
          </h2>
          <p style={{ fontSize: 16, opacity: 0.9, margin: '0 0 16px', lineHeight: 1.5 }}>{weather.desc}</p>
          <div style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 12, padding: '10px 16px', display: 'inline-block' }}>
            <span style={{ fontSize: 15, fontWeight: 700 }}>Trend: {weather.trend}</span>
          </div>
        </div>

        {/* Weather history */}
        <div className="card" style={{ marginBottom: 14 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#24313A', margin: '0 0 14px' }}>📈 Weather History</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, justifyContent: 'space-between' }}>
            {history.map((h, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: i === 4 ? 28 : 20, marginBottom: 4 }}>{h.icon}</div>
                <div style={{ fontSize: 9, color: '#756B63', lineHeight: 1.3 }}>{h.week.split(' ').slice(-2).join(' ')}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, padding: '10px', background: '#DDE9DD', borderRadius: 10 }}>
            <p style={{ fontSize: 13, color: '#4B9180', margin: 0 }}>
              ✨ Improving over the past 3 weeks. Keep up the short sessions!
            </p>
          </div>
        </div>

        {/* Skill breakdown */}
        {[
          { label: 'Letter Recognition', val: state.letterAccuracy, icon: '🔤' },
          { label: 'Sound Awareness', val: state.soundAccuracy, icon: '🔊' },
          { label: 'Syllable Skills', val: state.syllableAccuracy, icon: '🥁' },
          { label: 'Reading Progress', val: state.readingProgress, icon: '📖' },
        ].map(s => (
          <div key={s.label} className="card" style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#24313A' }}>{s.icon} {s.label}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: s.val >= 70 ? '#4B9180' : s.val >= 50 ? '#D9683B' : '#756B63' }}>{s.val}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${s.val}%`, background: s.val >= 70 ? '#4B9180' : s.val >= 50 ? '#D9683B' : '#756B63' }}/>
            </div>
          </div>
        ))}

        <button className="btn-primary" onClick={() => navigate('insights')}>
          View Recommendations →
        </button>
      </div>
    </div>
  );
}
